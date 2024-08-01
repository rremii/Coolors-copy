import { useRandomizeColors } from "@widgets/ColorsDragNDrop/model/useRandomizeColors"
import styled from "styled-components"

export const GenerateColors = () => {
  const { randomize } = useRandomizeColors()

  return <GenerateBtn onClick={randomize}>Generate</GenerateBtn>
}
const GenerateBtn = styled.button`
  padding: 7px 12px;
  border: 1px solid black;
  border-radius: 7px;
  font-size: 14px;
`
