import WarnIcon from "@icons/warn.svg?react"
import { FC, ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
  isActive?: boolean
}

export const Toast: FC<Props> = ({ children, isActive }) => {
  return (
    <ToastLayout $isActive={isActive}>
      <div className="icon-cont">
        <WarnIcon />
      </div>
      {children}
    </ToastLayout>
  )
}

const ToastLayout = styled.div<{
  $isActive?: boolean
}>`
  text-align: center;
  display: flex;
  position: fixed;
  color: white;
  z-index: 101;
  background-color: #ed1245;

  left: 50%;
  transition: 0.4s transform;
  transform: translateX(-50%)
    translateY(${({ $isActive }) => ($isActive ? "-30px" : "100%")});
  height: min-content;
  bottom: 0;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 20px;

  width: max-content;
  align-items: center;
  gap: 10px;

  .icon-cont {
    width: 25px;
    height: 25px;

    img,
    svg {
      width: 25px;
      height: 25px;

      circle {
        fill: white;
      }

      path {
        stroke: white;
      }
    }
  }
`
