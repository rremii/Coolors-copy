import { useAuth } from "@entities/auth"
import { AuthModal } from "@features/authModal/ui/AuthModal.tsx"
import { getRandomColor } from "@shared/helpers/getRandomColor.ts"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import React, { FC, useEffect } from "react"
import { createPortal } from "react-dom"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { HeaderWithBurger } from "@widgets/Header/ui/HeaderWithBurger.tsx"
import { createColors } from "@entities/colors/model/colorsSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"

interface Props {
  children: React.ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useAuth()


  const location = useLocation()

  useEffect(() => {
    if (location.pathname.slice(1)) return


    const color1 = getRandomColor()
    const color2 = getRandomColor()

    const hex1 = rgbToHex(color1).slice(1)
    const hex2 = rgbToHex(color2).slice(1)

    navigate(`/${hex1}-${hex2}`)
    dispatch(createColors([color1, color2]))
  }, [location.pathname])

  return (
    <LayoutStyles>
      <HeaderWithBurger />
      {children}
      {createPortal(<AuthModal />, document.body)}
    </LayoutStyles>
  )
}
export default AppLayout
const LayoutStyles = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    position: relative;
    overflow-x: hidden;
    margin: 0 auto;
    background-color: white;
`
