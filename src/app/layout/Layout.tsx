import React, { FC } from "react"
import { Header } from "@shared/ui/Header.tsx"
import { HeaderWithBurger } from "@widgets/Header/ui/HeaderWithBurger.tsx"

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return <>
    <HeaderWithBurger />
    {children}
  </>
}
export default Layout
