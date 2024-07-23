import React from "react"
import {
  clamp,
  getHueCoordinates,
  getSaturationCoordinates,
  hsvToRgb,
  parseColor,
  rgbToHex
} from "../Utils"
import "./ColorPicker.css"
import { FreeSelector } from "./Options"


interface ColorPickerProps {
  color: string;

  onChange(color: string): void;
}

export const ColorPicker = (props: ColorPickerProps) => {
  const { color, onChange } = props

  const parsedColor = parseColor(color)
  const satCoords = getSaturationCoordinates(parsedColor)
  const hueCoords = getHueCoordinates(parsedColor)

  const handleHexChange = (event) => {
    var val = event.target.value
    if (val?.slice(0, 1) !== "#") {
      val = "#" + val
    }
    onChange(val)
  }


  const handleSaturationChange = (event) => {
    const { width, height, left, top } = event.target.getBoundingClientRect()

    const x = clamp(event.clientX - left, 0, width)
    const y = clamp(event.clientY - top, 0, height)

    const s = (x / width) * 100
    const v = 100 - (y / height) * 100

    const rgb = hsvToRgb({ h: parsedColor?.hsv.h, s, v })

    onChange(rgbToHex(rgb))
  }
  const handleHueChange = (event) => {
    const { width, left } = event.target.getBoundingClientRect()
    const x = clamp(event.clientX - left, 0, width)
    const h = Math.round((x / width) * 360)

    const hsv = { h, s: parsedColor?.hsv.s, v: parsedColor?.hsv.v }
    const rgb = hsvToRgb(hsv)

    onChange(rgbToHex(rgb))
  }

  return (
    <div className="cp-container">
      <FreeSelector
        parsedColor={parsedColor}
        satCoords={satCoords}
        hueCoords={hueCoords}
        onSaturationChange={handleSaturationChange}
        onHueChange={handleHueChange}
      />
      <div className="cp-input-container">
        <div className="color-preview" style={{ backgroundColor: parsedColor.hex }} />
        <input className="color-input" type="text" value={parsedColor?.hex} onChange={handleHexChange} />
      </div>
    </div>
  )
}

