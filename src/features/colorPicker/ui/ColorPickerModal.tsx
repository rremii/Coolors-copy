import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { ColorPicker } from "@features/colorPicker/ui/ColorPicker.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useColorPickerCoords } from "@features/colorPicker/model/useColorPickerCoords.tsx"

interface Props {
  isOpen: boolean
  openBtn: HTMLElement | null
}

export const ColorPickerModal: FC<Props> = ({ isOpen, openBtn }) => {


  const changeColor = (color: string) => {
    // setColor(color)
    // onColorChange(color)
  }


  const { coords, modalRef } = useColorPickerCoords(openBtn, isOpen)

  return <PickerModal ref={modalRef} className="PickerModal" $isOpen={isOpen} $x={coords.x + "px"} $y={coords.y + "px"}>
    <ColorPicker color={"#16b8cc"} onColorChange={changeColor} />
  </PickerModal>

}
const PickerModal = styled(Modal)`
    background-color: white;
    border-radius: 10px;
    z-index: 101;


    @media screen and (max-width: 768px) {
        opacity: 1;
        width: 100vw;
        top: calc(100% - 315px);
        left: 50%;
        transition: .3s transform;
        transform: translateX(-50%) ${({ $isOpen }) => ($isOpen ? "" : "translateY(101%)")};
        border-radius: 10px 10px 0 0;

        max-width: 80vw;
    }
    @media screen and (max-width: 400px) {
        max-width: initial;
    }
`