import { useRef, useState } from "react"
import { swap } from "@shared/helpers/swap.ts"

function sortIndexesByShift<T>(
  indexes: Array<T>,
  shifts: Array<number>,
): Array<T> {
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
    for (let i = 1; i < shifts.length; i++)
      if (shifts[i] === -1) newIndexes = swap([i, i - 1], newIndexes)
  }
  if (direction > 0) {
    //from right to left in arr
    for (let i = shifts.length - 2; i >= 0; i--)
      if (shifts[i] === 1) newIndexes = swap([i, i + 1], newIndexes)
  }

  return newIndexes
}

export function useDragIndexes<T>(indexes: T[], setIndexes: (indexes: T[]) => void, axisCoord: "X" | "Y") {
  const indexShifts = useRef([])
  const dragIndex = useRef<number | null>(null)
  const firstAxisCoord = useRef(0)
  const [deltaAxisCoord, setDeltaCoord] = useState<number>(0)
  const isDraggin = useRef(false)

  const allIndexes = useRef<HTMLElement[]>([])
  const dragIndexEl = useRef<HTMLElement | null>(null)
  const dragBtn = useRef<HTMLElement | null>(null)

  const resetDrag = () => {
    allIndexes.current.forEach((indexEl) => indexEl.focus())
    allIndexes.current = []
    dragBtn.current = null
    dragIndexEl.current = null
    dragIndex.current = null
    firstAxisCoord.current = 0
    indexShifts.current = new Array(indexes.length || 0).fill(0) as number[]
    setDeltaCoord(0)
  }

  const onDrag = (e: DragEvent) => {
    const indexEl = dragIndexEl.current
    const btn = dragBtn.current

    if (!isDraggin.current || !indexEl || !btn) return

    const curCoord = axisCoord === "Y" ? e.clientY : e.clientX

    if (!firstAxisCoord.current) firstAxisCoord.current = curCoord
    else {
      const deltaCoord = curCoord - firstAxisCoord.current
      setDeltaCoord(deltaCoord)

      const indexWidth = dragIndexEl.current?.clientWidth || 0
      const indexHeight = dragIndexEl.current?.clientHeight || 0
      const breakValue = axisCoord === "Y" ? indexHeight : indexWidth

      handleIsEntered(deltaCoord, breakValue)
    }
  }

  function handleIsEntered(deltaCoords: number, breakValue: number) {
    const index = dragIndex.current
    const shifts = [...indexShifts.current.map(() => 0)]

    if (Math.abs(deltaCoords) > breakValue / 2) {
      const indexesAmount = Math.ceil(Math.abs(deltaCoords) / breakValue)

      for (let i = 1; i < indexesAmount + 1; i++) {
        if (deltaCoords < 0) {
          shifts[index - i] = 1
        }
        if (deltaCoords > 0) {
          shifts[index + i] = -1
        }
      }
    }

    indexShifts.current = shifts
  }

  function onDragEnd() {
    isDraggin.current = false

    const newIndexes = sortIndexesByShift(indexes, indexShifts.current)
    setIndexes(newIndexes)

    resetDrag()
  }

  const onDragStart = (index: number, btnEl: HTMLElement) => () => {

    dragBtn.current = btnEl
    dragIndex.current = index
    isDraggin.current = true

    let newDragIndexEl: HTMLElement | null = null
    allIndexes.current.forEach(
      (indexEl) => indexEl.contains(btnEl) && (newDragIndexEl = indexEl),
    )

    if (newDragIndexEl) dragIndexEl.current = newDragIndexEl
  }

  const setIndexRef = (index: number) => (indexEl: HTMLElement | null) => {
    if (!indexEl) return

    const isDragged = index === dragIndex.current

    if (!allIndexes.current.includes(indexEl)) {
      indexShifts.current[index] = 0
      allIndexes.current = [...allIndexes.current, indexEl]
    }

    if (isDragged) dragIndexEl.current = indexEl
  }
  const setContainerRef = (containerEl: HTMLElement | null) => {
    if (!containerEl) return

    containerEl.draggable = false
    containerEl.ondragover = onDrag
  }
  const setDragBtnRef = (index: number) => (btnEl: HTMLElement | null) => {
    if (!btnEl) return

    btnEl.ondragend = onDragEnd
    btnEl.draggable = true
    btnEl.ondragstart = onDragStart(index, btnEl)
  }

  return {
    indexShifts: indexShifts.current,
    dragIndex: dragIndex.current,
    deltaAxisCoord,
    isDraggin: isDraggin.current,
    refs: { setIndexRef, setContainerRef, setDragBtnRef },
  }
}
