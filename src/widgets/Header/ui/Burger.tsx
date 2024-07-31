import { BurgerBtn } from "@shared/ui/BurgerBtn.tsx"
import { useEffect, useState } from "react"
import { BurgerModal } from "@widgets/Header/ui/BurgerModal.tsx"
import { createPortal } from "react-dom"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { closeMenu, openMenu } from "@entities/ui/model/UiSlice.ts"

export const Burger = () => {
  const dispatch = useAppDispatch()

  const isSideBar = useTypedSelector(state => state.Ui.sidebar.isOpen)


  const toggleBurger = () => {
    if (isSideBar)
      dispatch(closeMenu("sidebar"))
    else
      dispatch(openMenu("sidebar"))
  }

  return <>
    <BurgerBtn onClick={toggleBurger} />
    {createPortal(<>
        <Overlay onClick={toggleBurger} $zIndex={10} $color="rgba(0,0,0,0.5)" $isActive={isSideBar} />
        <BurgerModal isOpen={isSideBar} />
      </>,
      document.body)}
  </>
}