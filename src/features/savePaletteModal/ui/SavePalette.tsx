import { useToast } from "@entities/toast/model/useToast"
import { SavePaletteModal } from "@features/savePaletteModal/ui/SavePaletteModal.tsx"
import HeartIcon from "@icons/heart.svg?react"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useState } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"

export const SavePalette = () => {
  const isLoggedIn = useTypedSelector((state) => state.Auth.isLoggedIn)

  const [isOpen, setOpen] = useState(false)
  const { addToast } = useToast()

  const openModal = () => {
    if (isLoggedIn !== "success")
      return addToast({
        content: "Login first,to save the palette",
        type: "error",
        duration: 2,
      })
    setOpen(true)
  }
  const closeModal = () => setOpen(false)

  return (
    <>
      <SavePaletteLayout onClick={openModal}>
        <HeartIcon />
        <span>Save</span>
      </SavePaletteLayout>
      {createPortal(
        <>
          <SavePaletteModal closeModal={closeModal} isOpen={isOpen} />
          <Overlay onClick={closeModal} $zIndex={100} $isActive={isOpen} />
        </>,
        document.body
      )}
    </>
  )
}
const SavePaletteLayout = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;

  padding: 10px 12px;

  border-radius: 10px;

  span {
    font-size: 14px;
  }

  svg,
  img {
    width: 18px !important;
    height: 18px !important;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
`
