import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { ColorPicker } from "@features/colorPicker/ui/ColorPicker.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { useColorPickerCoords } from "@features/colorPicker/model/useColorPickerCoords.tsx"
import { ColorType } from "@entities/colors/types.ts"
import { replaceColorInUrlStr } from "@shared/helpers/replaceColorInUrlStr.ts"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { replaceColor, setColors } from "@entities/colors/model/colorsSlice.ts"
import { hexToRgb } from "@shared/helpers/HexToRgb.ts"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"

interface Props {
  isOpen: boolean
  openBtn: HTMLElement | null
  index: number
  color: ColorType
}

export const ColorPickerModal: FC<Props> = ({ isOpen, openBtn, color, index }) => {
  const dispatch = useAppDispatch()


  const location = useLocation()
  const navigate = useNavigate()


  // const [chosenColor, setChosenColor] = useState(rgbToHex(color))


  // useEffect(() => {
  //
  //   const pathName = location.pathname.slice(1)
  //   const rgbColor = hexToRgb(chosenColor)
  //
  //   if (!rgbColor || isOpen) return
  //
  //   const newColorUrl = replaceColorInUrlStr(chosenColor, pathName, index)
  //
  //   dispatch(replaceColor({ index, color: rgbColor }))
  //   navigate("/" + newColorUrl)
  //
  // }, [isOpen])

  const changeColor = (color: string) => {
    // setChosenColor(color)
    const pathName = location.pathname.slice(1)
    const rgbColor = hexToRgb(color)

    if (!rgbColor) return

    const newColorUrl = replaceColorInUrlStr(color, pathName, index)

    dispatch(replaceColor({ index, color: rgbColor }))
    navigate("/" + newColorUrl)
  }


  const { coords, modalRef } = useColorPickerCoords(openBtn, isOpen)


  return <PickerModal ref={modalRef} className="PickerModal" $isOpen={isOpen} $x={coords.x + "px"} $y={coords.y + "px"}>
    <ColorPicker color={rgbToHex(color)} onColorChange={changeColor} />
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