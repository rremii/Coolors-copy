import { useAuth } from "@entities/auth"
import { ToastBox } from "@entities/toast/ui/ToastBox.tsx"
import { AuthModal } from "@features/authModal/ui/AuthModal.tsx"
import { HeaderWithBurger } from "@widgets/Header/ui/HeaderWithBurger.tsx"
import React, { FC } from "react"
import { createPortal } from "react-dom"
import styled from "styled-components"
import { useSetColorsWithRedirect } from "../hooks/useSetColorsWithRedirect"
import { useShowHelpingInfo } from "../hooks/useShowHelpingInfo"

interface Props {
  children: React.ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  useAuth()

  useShowHelpingInfo()

  useSetColorsWithRedirect()

  return (
    <LayoutStyles>
      <HeaderWithBurger />
      {children}
      {createPortal(
        <>
          <AuthModal />
          <ToastBox />
        </>,
        document.body
      )}
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
