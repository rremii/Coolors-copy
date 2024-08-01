import { ToastType } from "@entities/toast/type.ts"
import CheckMarkIcon from "@icons/check-mark.svg?react"
import WarnIcon from "@icons/warn.svg?react"
import { FC, ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
  type: ToastType
  styles: React.CSSProperties
}

export const Toast: FC<Props> = ({ children, styles, type }) => {
  return (
    <ToastLayout style={styles} $type={type}>
      <div className="icon-cont">
        {type === "error" ? <WarnIcon /> : <CheckMarkIcon />}
      </div>
      {children}
    </ToastLayout>
  )
}

const ToastLayout = styled.div<{
  $type?: ToastType
}>`
  text-align: center;
  display: flex;
  color: white;

  background-color: ${({ $type }) => ($type === "error" ? "#ed1245" : "black")};
  transition: 0.4s;

  position: absolute;

  left: 50%;

  bottom: 0;

  height: min-content;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 20px;

  width: max-content;

  align-items: center;
  gap: 10px;

  animation: slideIn 0.5s forwards;

  @keyframes slideIn {
    from {
      bottom: -50px;
    }
    to {
      bottom: 20px;
    }
  }

  .icon-cont {
    width: 25px;
    height: 25px;

    img,
    svg {
      width: 22px;
      height: 22px;

      circle {
        fill: white;
      }

      path {
        stroke: white;
      }
    }
  }
`
