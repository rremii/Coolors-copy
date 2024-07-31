import React, { FC } from "react"
import { Header } from "@shared/ui/Header.tsx"
import { HeaderWithBurger } from "@widgets/Header/ui/HeaderWithBurger.tsx"
import { SubHeader } from "@widgets/subHeader/ui/SubHeader.tsx"
import { useScreenSize } from "@shared/hooks/useScreenSize.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

interface Props {
  children: React.ReactNode
}


const Layout: FC<Props> = ({ children }) => {

  const isMobile = useScreenSize(768)


  return <>
    {isMobile ?
      <>
        {children}
        <SubHeader />
      </> :
      <>
        <SubHeader />
        {children}
      </>}
  </>
}
export default Layout
