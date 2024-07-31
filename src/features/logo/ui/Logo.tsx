import LogoIcon from "@icons/logo.svg?react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"


export const Logo = () => {

  const navigate = useNavigate()

  const onCLick = () => {
    navigate("/")
  }

  return <LogoLayout onClick={onCLick}>
    <LogoIcon />
  </LogoLayout>
}
const LogoLayout = styled.div`
    cursor: pointer;
    width: min-content;
    height: min-content;
`