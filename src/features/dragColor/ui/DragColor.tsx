import { FC, forwardRef } from "react"
import { SettingBtn } from "@shared/ui/SettingBtn.tsx"
import DragIcon from "@icons/arrows-horizontal.svg?react"
import styled from "styled-components"

interface Props {
  isHidden?: boolean
  iconColor?: string
}

export const DragColor: FC<Props> = forwardRef(
  ({ isHidden, iconColor }, ref) => {
    return (
      <SettingBtn ref={ref} isHidden={isHidden}>
        <IconCont>
          <DragIcon stroke={iconColor} />
        </IconCont>
      </SettingBtn>
    )
  }
)
const IconCont = styled.div`
  width: max-content;
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    transform: rotate(90deg);
  }
`
