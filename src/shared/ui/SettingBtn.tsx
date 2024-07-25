import styled from "styled-components"
import React, { FC, forwardRef, ReactNode } from "react"

interface Props {
  children: ReactNode
  isHidden?: boolean
  onClick?: () => void
  styles?: React.CSSProperties | null
}

export const SettingBtn: FC<Props> = forwardRef<HTMLButtonElement, Props>(
  ({ children, isHidden, onClick, styles }, ref) => {
    return (
      <SettingCellLayout
        $styles={styles}
        ref={ref}
        onClick={onClick}
        $isHidden={isHidden}
      >
        {children}
      </SettingCellLayout>
    )
  },
)
const SettingCellLayout = styled.button<{
  $isHidden?: boolean
  $styles?: React.CSSProperties | null
}>`
    ${({ $styles }) => $styles || ""}

    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    transition: 0.2s; //todo does not work
    pointer-events: ${({ $isHidden }) => ($isHidden ? "none" : "initial")};
    opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: rgba(0, 0, 0, 0.07);
    }

    svg,
    img {
        width: 20px;
        height: 20px;
    }
`
