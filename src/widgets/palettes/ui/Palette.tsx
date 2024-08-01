import { IPalette } from "@entities/palette/types.ts"
import { useToast } from "@entities/toast/model/useToast"
import { getContrastColor } from "@shared/helpers/getContrastColor.ts"
import { hexToRgb } from "@shared/helpers/hexToRgb.ts"
import { FC } from "react"
import styled from "styled-components"

interface Props extends IPalette {}

export const Palette: FC<Props> = ({ colors, name, id }) => {
  const { addToast } = useToast()

  const copyColor = (color: string) => {
    navigator.clipboard
      .writeText(color)
      .then(() =>
        addToast({ type: "info", content: `Color ${color} is copied` })
      )
      .catch((err) =>
        addToast({ type: "info", content: "Couldn't copy the color" })
      )
  }

  const colorsArr = colors.split("-")

  return (
    <PaletteLayout>
      <div className="colors">
        {colorsArr.map((color, index) => (
          <Color onClick={() => copyColor(color)} key={index} $color={color}>
            <span>{color}</span>
          </Color>
        ))}
      </div>
      <div className="info">
        <div className="name">{name}</div>
      </div>
    </PaletteLayout>
  )
}
const Color = styled.div<{
  $color: string
}>`
  background-color: ${({ $color }) => $color || "red"};

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 100%;

  transition: 0.2s flex-basis;
  position: relative;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 14px;
    opacity: 0;
    transition: 0.3s opacity;
    color: ${({ $color }) => getContrastColor(hexToRgb($color)) || "black"};
  }

  &:hover {
    flex: 1 1 200%;

    span {
      opacity: 1;
    }
  }
`
const PaletteLayout = styled.div`
  width: 100%;
  height: 140px;

  display: flex;
  flex-direction: column;

  .colors {
    flex: 1 1 auto;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
  }

  .info {
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;

    .name {
      font-size: 14px;
      font-weight: 500;
    }
  }
`
