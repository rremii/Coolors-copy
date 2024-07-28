import styled from "styled-components"
import { FC } from "react"

interface Props {
  onClick?: () => void
}

export const BurgerBtn: FC<Props> = ({ onClick }) => {


  return <BurgerLayout onClick={onClick}>
    <div />
    <div />
    <div />
  </BurgerLayout>
}
const BurgerLayout = styled.button`
    width: 30px;
    height: 30px;


    position: relative;

    div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 2px;
        border-radius: 5px;
        background-color: black;
    }

    div:nth-child(1) {
        transform: translateX(-50%) translateY(calc(-50% - 4px));
    }

    div:nth-child(2) {
        transform: translateX(-50%) translateY(calc(-50% + 6px));
    }

`