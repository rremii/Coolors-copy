import styled from "styled-components"
import { FC, useEffect, useRef, useState } from "react"
import { ColorPickerModal } from "@features/colorPicker/ui/ColorPickerModal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { createPortal } from "react-dom"


interface Props {
  decorationColor: string
}

export const ColorPickerWithBtn: FC<Props> = ({ children, decorationColor }) => {


  const [isPicker, setIsPicker] = useState(false)


  const openBtnRef = useRef<HTMLButtonElement | null>(null)


  const closePicker = () => {
    setIsPicker(false)
  }
  const openPicker = () => {
    setIsPicker(true)
  }

  return <>
    <ColorPickerWithBtnLayout $isActive={isPicker}>
      <Overlay onClick={closePicker} $isActive={isPicker} $zIndex={100} $color={"rgba(0,0,0,0.45)"} />

      <OpenPickerBtn ref={openBtnRef} onClick={openPicker} $isActive={isPicker} $color={decorationColor}>
        {children}
      </OpenPickerBtn>

      {createPortal(
        <ColorPickerModal openBtn={openBtnRef.current} isOpen={isPicker} />,
        document.body
      )}
    </ColorPickerWithBtnLayout>
  </>
}
const ColorPickerWithBtnLayout = styled.div<{
  $isActive?: boolean
}>`
    position: relative;
    width: min-content;
    height: min-content;
    z-index: ${({ $isActive }) => $isActive ? 2 : 0};

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