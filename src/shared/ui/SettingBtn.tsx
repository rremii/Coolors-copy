import styled from "styled-components"
import { FC, forwardRef, ReactNode } from "react"

interface Props {
  isHidden?: boolean
  onClick?: (arg: void) => void
}

export const SettingBtn: FC<Props> = forwardRef(({ children, isHidden, onClick }, ref) => {


  return <SettingCellLayout ref={ref} onClick={onClick} $isHidden={isHidden}>
    {children}
  </SettingCellLayout>
})
const SettingCellLayout = styled.button<{
  $isHidden?: boolean
}>`
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    transition: .2s;
    pointer-events: ${({ $isHidden }) => $isHidden ? "none" : "initial"};
    opacity: ${({ $isHidden }) => $isHidden ? 0 : 1};

    display: flex;
    align-items: center;
    justify-content: center;


    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }

    svg, img {
        width: 20px;
        height: 20px;
    }
`