import { ColorType } from "@entities/colors/types.ts"

export const getRandomColor = (): ColorType => {
  return [
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  ]
}
