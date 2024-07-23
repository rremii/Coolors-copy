import styled from "styled-components"
import Copy from "@icons/copy.svg?react"
import { FC } from "react"


interface Props {
  onClick?: () => void
}

export const CopyBtn: FC<Props> = ({ onClick }) => {


  return <CopyBtnLayout onClick={onClick}>
    <Copy />
  </CopyBtnLayout>
}
const CopyBtnLayout = styled.button`


    svg {
        width: 18px;
        height: 18px;
        fill: gray;
    }
`