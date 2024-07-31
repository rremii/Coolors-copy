import styled from "styled-components"
import { FC, ReactNode } from "react"

// interface Props {
//   color: string
//   bcColor: string
//   children: ReactNode
// }
//
// export const ProfileIcon: FC<Props> = ({ bcColor, color, children }) => {
//   return <IconLayout>
//     {children}
//   </IconLayout>
// }
export const ProfileIcon = styled.div<{
  $color: string
  $bcColor: string
  $width?: string
  $height?: string
  $fontSize?: number
}>`
    width: ${({ $width }) => $width || "40px"};
    height: ${({ $height }) => $height || "40px"};
    display: flex;
    align-items: center;
    justify-content: center;


    font-size: ${({ $fontSize }) => $fontSize ? $fontSize + "px" : "27px"};
    font-weight: bolder;
    border-radius: 50%;
    background-color: ${({ $bcColor }) => $bcColor};
    color: ${({ $color }) => $color};


`
