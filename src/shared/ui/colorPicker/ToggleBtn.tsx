import styled from "styled-components"
import { FC } from "react"
import Arrow from "@icons/arrow.svg?react"

interface Props {
  onClick: () => void
  isActive?: boolean
}

export const ToggleBtn: FC<Props> = ({ children, onClick, isActive }) => {
  return (
    <ToggleBtnLayout onClick={onClick} $isActive={isActive}>
      {children}
      <Arrow />
    </ToggleBtnLayout>
  )
}
const ToggleBtnLayout = styled.button<{
  $isActive?: boolean
}>`
  display: flex;
  gap: 5px;
  font-size: 15px;
  align-items: center;
  color: ${({ $isActive }) => ($isActive ? "dodgerblue" : "black")};

  svg {
    transition: 0.2s transform;
    transform: ${({ $isActive }) => ($isActive ? "rotate(-180deg)" : "")};
    stroke: ${({ $isActive }) => ($isActive ? "dodgerblue" : "black")};
    width: 14px;
    height: 14px;
  }

  &:hover {
    color: dodgerblue;

    svg {
      stroke: dodgerblue;
    }
  }
`
