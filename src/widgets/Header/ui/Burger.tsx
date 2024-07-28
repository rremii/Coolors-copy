import { BurgerBtn } from "@shared/ui/BurgerBtn.tsx"
import { useState } from "react"
import { BurgerModal } from "@widgets/Header/ui/BurgerModal.tsx"
import { createPortal } from "react-dom"
import { Overlay } from "@shared/ui/Overlay.tsx"

export const Burger = () => {

  const [isOpen, setIsOpen] = useState(false)


  const toggleBurger = () => {
    setIsOpen((isOpen) => !isOpen)
  }

  return <>
    <BurgerBtn onClick={toggleBurger} />
    {createPortal(<>
        <Overlay onClick={toggleBurger} $zIndex={10} $color="rgba(0,0,0,0.5)" $isActive={isOpen} />
        <BurgerModal isOpen={isOpen} />
      </>,
      document.body)}
  </>
}