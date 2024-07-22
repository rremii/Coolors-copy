import styled from "styled-components"
import { forwardRef, useState } from "react"

export const withOverlay = (Component) => (props => {

  const [isHovered, setHovered] = useState(false)


  const onMouseEnter = () => {
    setHovered(true)
  }
  const onMouseLeave = () => {
    setHovered(false)
  }
  return <Overlay onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
    <Component  {...props} isHidden={!isHovered} />
  </Overlay>
})

const Overlay = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100px;
    height: 100px;
    border-radius: 50%;

`