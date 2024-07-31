import styled from "styled-components"
import Cross from "@icons/cross.svg?react"
import { FC } from "react"

interface Props {
  onCrossClick?: () => void
}

export const Header: FC<Props> = ({ onCrossClick }) => {

  return <HeaderLayout>
    <div className="cross-cont" onClick={onCrossClick}>
      <Cross />
    </div>
    <h3 className="title">Save Palette</h3>
  </HeaderLayout>
}
const HeaderLayout = styled.header`
    display: flex;

    position: relative;
    padding: 0 16px;
    font-weight: 500;
    height: 46px;
    box-shadow: rgba(0, 0, 0, 0.075) 0 1px;
    align-items: center;

    .cross-cont {
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        svg, img {
            fill: black;
            width: 18px;
            height: 18px;
        }
    }

    .title {
        font-size: 16px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`