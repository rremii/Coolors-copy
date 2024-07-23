import styled from "styled-components"
import { FC } from "react"
import { IPicker } from "@features/colorPicker/model/types.ts"


export const RGBPicker: FC<IPicker> = () => {


  return <RGBPickerLayout>
    rgb
    <input type="range" />

  </RGBPickerLayout>
}
const RGBPickerLayout = styled.div`

    input[type="range"] {
        -webkit-appearance: none;
        margin-right: 15px;
        width: 200px;
        height: 7px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 5px;
        background-image: linear-gradient(#ff4500, #ff4500);
        background-size: 70% 100%;
        background-repeat: no-repeat;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #ff4500;
        cursor: ew-resize;
        box-shadow: 0 0 2px 0 #555;
        transition: background .3s ease-in-out;
    }

    input[type=range]::-webkit-slider-runnable-track {
        -webkit-appearance: none;
        box-shadow: none;
        border: none;
        background: transparent;
    }
`