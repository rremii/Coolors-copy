import { useEffect, useRef, useState } from "react"

export const useColorPickerCoords = (
  openBtn: HTMLElement | null,
  isOpen: boolean
) => {
  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
  })

  const modalRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const modal = modalRef.current
    if (!openBtn || !isOpen || !modal) return

    const bodyWidth = document.body.clientWidth

    const { x, y, width } = openBtn.getBoundingClientRect()
    const { width: modalWidth, height: modalHeight } =
      modal.getBoundingClientRect()

    let newX = x + width / 2 - modalWidth / 2
    const newY = y - modalHeight - 25

    if (newX < 0) newX = 10
    if (newX + modalWidth > bodyWidth) newX = bodyWidth - modalWidth - 10

    setCoords({ x: newX, y: newY })
  }, [openBtn, isOpen])

  return { coords, modalRef }
}
