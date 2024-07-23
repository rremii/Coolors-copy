import styled from "styled-components"
import { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { replaceCharByIndex } from "@shared/modules/RGBPicker/utils/replaceCharByIndex.ts"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import { hexToRgb } from "@shared/helpers/HexToRgb.ts"
import { replaceColorChanel } from "@shared/modules/RGBPicker/utils/replaceColorChanel.ts"


interface Props {
  chanel: "red" | "green" | "blue"
  colorHex: string
  onColorChange: (colorHex: string) => void
  name: string
}

export const ColorChanel: FC<Props> = ({ chanel, colorHex, onColorChange, name }) => {


  const maxColor = replaceColorChanel(chanel, colorHex, "ff")
  const minColor = replaceColorChanel(chanel, colorHex, "00")


  const calcInitValue = () => {
    if (chanel === "red") return hexToRgb(colorHex)?.at(0) || 0
    if (chanel === "green") return hexToRgb(colorHex)?.at(1) || 0
    if (chanel === "blue") return hexToRgb(colorHex)?.at(2) || 0
  }
  const [rgbEl, setRgbEl] = useState(calcInitValue)


  useEffect(() => {
    const hex = rgbToHex([rgbEl, rgbEl, rgbEl]).slice(1, 3)
    onColorChange(replaceColorChanel(chanel, colorHex, hex))
  }, [rgbEl])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rgbEl = +e.target.value || 0

    if (rgbEl > 255) rgbEl = 255
    setRgbEl(rgbEl)
  }

  return <ColorChanelLayout>
    <div className="top-cont">
      <label className="chanel">{name}</label>
      <input value={rgbEl} onChange={handleColorChange} type="text" className="value-input" />
    </div>
    <ColorRange value={rgbEl} onChange={handleColorChange} min={0} max={255} step={1} $colorHex={colorHex}
                $colorMin={minColor}
                $colorMax={maxColor}
                className="range" type="range" />

  </ColorChanelLayout>
}
const ColorChanelLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .top-cont {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .chanel {
            font-size: 13px;
            font-weight: 500;
        }

        .value-input {
            display: flex;
            align-items: center;
            justify-content: center;

            text-align: center;

            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 6px;
            font-size: 13px;
            width: 40px;
            height: 26px;
            padding: 0 5px;
        }
    }


`
export const ColorRange = styled.input<{
  $colorHex?: string
  $colorMin?: string
  $colorMax?: string
}>`
    width: 100%;

    -webkit-appearance: none;
    background: rgba(255, 255, 255, 0.6);
    background-image: ${({ $colorMin, $colorMax }) => `linear-gradient(to right, ${$colorMin}, ${$colorMax})`};
    background-repeat: no-repeat;
    height: 10px;
    border-radius: 5px;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: ${({ $colorHex }) => $colorHex};
        cursor: grab;
        box-shadow: 0 0 2px 0 #555;
        transition: background .3s ease-in-out;
        border: 5px solid white;
    }


    &::-webkit-slider-runnable-track {

        -webkit-appearance: none;
        box-shadow: none;
        border: none;
    }
`
