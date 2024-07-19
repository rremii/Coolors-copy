import styled from "styled-components"
import { FC, ReactNode } from "react"

interface Props {
  isHidden: boolean
  onClick: (arg: void) => void
  icon: ReactNode
}

export const SettingCell: FC<Props> = ({ isHidden, icon, onClick }) => {


  return <SettingCellLayout onClick={() => onClick()} $isHidden={isHidden}>
    {icon}
  </SettingCellLayout>
}
const SettingCellLayout = styled.div<{
  $isHidden?: boolean
}>`
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    transition: .2s;


    pointer-events: ${({ $isHidden }) => $isHidden ? "none" : "initial"};
    opacity: ${({ $isHidden }) => $isHidden ? 0 : 1};

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    svg, img {
        width: 18px;
        height: 18px;
    }
`