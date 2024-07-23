import styled from "styled-components"
import { FC, useRef, useState } from "react"
import { ColorPickerModal } from "@features/colorPicker/ui/ColorPickerModal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { createPortal } from "react-dom"
import { ColorType } from "@entities/colors/types.ts"


interface Props {
  decorationColor: string
  color: ColorType
  index: number
}

export const ColorPickerWithBtn: FC<Props> = ({ children, decorationColor, color, index }) => {


  const [isPicker, setIsPicker] = useState(false)


  const openBtnRef = useRef<HTMLButtonElement | null>(null)


  const closePicker = () => {
    setIsPicker(false)
  }
  const openPicker = () => {
    setIsPicker(true)
  }

  return <>
    <ColorPickerWithBtnLayout>

      <OpenPickerBtn ref={openBtnRef} onClick={openPicker} $isActive={isPicker} $color={decorationColor}>
        {children}
      </OpenPickerBtn>

      {createPortal(
        <>
          <Overlay onClick={closePicker} $isActive={isPicker} $zIndex={100} $color={"rgba(0,0,0,0.45)"} />
          <ColorPickerModal color={color} index={index} openBtn={openBtnRef.current} isOpen={isPicker} />
        </>,
        document.body
      )}
    </ColorPickerWithBtnLayout>
  </>
}
const ColorPickerWithBtnLayout = styled.div`
    position: relative;
    width: min-content;
    height: min-content;
        // z-index: ${({ $isActive }) => $isActive ? 2 : 0};

    .PickerModal {
        left: 50%;
        transform: translateX(-50%);
        bottom: calc(100% + 20px);
    }
`
const OpenPickerBtn = styled.button<{
  $color?: string,
  $isActive?: boolean
}>`


    font-size: clamp(20px, 2.5vw, 30px);


    padding: 10px 7px;
    border-radius: 10px;
    color: ${({ $color }) => $color};
    z-index: -1;

    &:after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: inherit;

        transition: 0.3s;
        opacity: ${({ $isActive }) => $isActive ? 0.2 : 0};
        background-color: ${({ $color }) => $color};
    }

    &:hover:after {
        opacity: 0.2;
    }




`