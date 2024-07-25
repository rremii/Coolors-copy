import styled from "styled-components"
import { useState } from "react"

export const withIsHovered = (Component) => (props) => {
  const [isHovered, setHovered] = useState(false)

  const onMouseEnter = () => {
    setHovered(true)
  }
  const onMouseLeave = () => {
    setHovered(false)
  }
  return (
    <Overlay onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
      <Component {...props} isHidden={!isHovered} />
    </Overlay>
  )
}

const Overlay = styled.div``
