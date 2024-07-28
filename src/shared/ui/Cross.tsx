import styled from "styled-components"
import { FC } from "react"

interface Props {
  isHidden: boolean
  onClick: () => void
}

export const Cross: FC<Props> = ({ isHidden, onClick }) => {
  return (
    <AddColorLayout $isHidden={isHidden} onClick={onClick}>
      <CrossCont className="CrossCont">
        <div />
        <div />
      </CrossCont>
    </AddColorLayout>
  )
}
const AddColorLayout = styled.div<{
  $isHidden?: boolean
}>`
    width: 55px;
    height: 55px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s ease;
    transform: ${({ $isHidden }) => ($isHidden ? "scale(0)" : "scale(1)")};
    z-index: 10;

    &:hover .CrossCont {
        background-color: rgba(0, 0, 0, 0.07);
    }
`
const CrossCont = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: relative;

    div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: black;
        width: 70%;
        height: 3px;
        border-radius: 3px;
    }

    div:nth-of-type(1) {
        transform: translate(-50%, -50%) rotate(90deg);
    }
`
