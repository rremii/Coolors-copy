import styled from "styled-components"
import React, { FC, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getRandomColor } from "@shared/helpers/getRandomColor.ts"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"

interface Props {
  children: React.ReactNode
}

const AppLayout: FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.slice(1)) return

    const color1 = getRandomColor()
    const color2 = getRandomColor()

    const hex1 = rgbToHex(color1).slice(1)
    const hex2 = rgbToHex(color2).slice(1)

    navigate(`/${hex1}-${hex2}`)
  }, [])

  return <LayoutStyles>{children}</LayoutStyles>
}
export default AppLayout
const LayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  background-color: white;
`
