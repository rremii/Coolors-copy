import { useRef, useState } from "react"
import { swap } from "@shared/helpers/swap.ts"


//todo
function sortIndexesByShift<T>(indexes: Array<T>, shifts: Array<number>): Array<T> {
  if (shifts.length < 2) return indexes

  let direction = 0

  for (const shift of shifts) {
    if (shift) {
      direction = shift
      break
    }
  }

  let newIndexes = [...indexes]

  if (direction < 0) {
    //from left to right in arr
    for (let i = 1; i < shifts.length; i++) {
      if (shifts[i] === -1) newIndexes = swap([i, i - 1], newIndexes)
    }
  }
  if (direction > 0) {
    //from right to left in arr
    for (let i = shifts.length - 2; i >= 0; i--) {
      if (shifts[i] === 1) newIndexes = swap([i, i + 1], newIndexes)
    }
  }

  return newIndexes
}

export const useDragIndexesDemo = (indexes, setIndexes, axisCoord: "X" | "Y") => {

  const indexShifts = useRef([])
  const dragIndex = useRef<number | null>(null)
  const firstAxisCoord = useRef(0)
  const [deltaAxisCoord, setDeltaCoord] = useState(0)

  const dragBtn = useRef<HTMLElement | null>(null)


  const resetDrag = () => {
    dragBtn.current = null
    dragIndex.current = null
    firstAxisCoord.current = 0
    indexShifts.current = new Array(indexes.length || 0).fill(0)
    setDeltaCoord(0)
  }

  function onDragEnd() {

    const newIndexes = sortIndexesByShift(indexes, indexShifts.current)

    setIndexes(newIndexes)
    resetDrag()
  }


  //todo
  const onDragStart = (index: number) => (e: DragEvent) => {
    resetDrag()
    dragIndex.current = index
  }
  const onDragEnter = (index: number) => {
    if (index === dragIndex.current) return
    if (!indexShifts.current[index]) {
      indexShifts.current[index] = deltaAxisCoord < 0 ? +1 : -1
    } else {
      indexShifts.current[index] = 0
    }
  }


  const onDrag = (e: DragEvent) => {
    if (dragIndex.current === null) return

    const curCoord = axisCoord === "Y" ? e.clientY : e.clientX


    if (!firstAxisCoord.current)
      firstAxisCoord.current = curCoord
    else {
      const deltaCoord = curCoord - firstAxisCoord.current

      setDeltaCoord(deltaCoord)
    }
  }


  const setIndexRef = (index: number) => (indexEl: HTMLElement | null) => {
    if (!indexEl) return
    const isDragged = index === dragIndex.current


    indexEl.ondragenter = !isDragged ? () => onDragEnter(index) : null
    indexEl.draggable = false //TODO how to clean | save arr of elements and clean on unmount? sounds like a trash:D
    indexEl.ondragstart = onDragStart(index)

  }
  const setContainerRef = (containerEl: HTMLElement | null) => {
    if (!containerEl) return

    containerEl.draggable = false
    containerEl.ondragover = onDrag

  }
  const setDragBtnRef = (index: number) => (btnEl: HTMLElement | null) => {
    if (!btnEl) return


    dragBtn.current = btnEl
    const isDragged = index === dragIndex.current

    btnEl.ondragover = (e) => e.preventDefault()
    btnEl.draggable = true
    btnEl.ondragend = onDragEnd
    btnEl.ondragstart = !isDragged ? () => onDragStart(index) : null
  }


  return {
    indexShifts: indexShifts.current,
    dragIndex: dragIndex.current,
    deltaAxisCoord,
    refs: { setIndexRef, setContainerRef, setDragBtnRef }
  }

}