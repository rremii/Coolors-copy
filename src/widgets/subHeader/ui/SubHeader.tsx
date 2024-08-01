import { GenerateColors } from "@features/generateColors/ui/GenerateColors"
import { SavePalette } from "@features/savePaletteModal/ui/SavePalette.tsx"
import styled from "styled-components"

export const SubHeader = () => {
  return (
    <SubHeaderLayout>
      <GenerateColors />
      <SavePalette />
    </SubHeaderLayout>
  )
}
const SubHeaderLayout = styled.div`
  flex: 0 0 56px;
  box-shadow: rgba(0, 0, 0, 0.075) 0 1px;

  padding: 0 14px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`
