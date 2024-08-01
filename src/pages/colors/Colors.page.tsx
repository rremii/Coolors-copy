import { KeyCodes, useKeyPress } from "@shared/hooks/useKeyPress.tsx"
import { useRandomizeColors } from "@widgets/ColorsDragNDrop/model/useRandomizeColors"
import { useSetDefaultColorsFromUrl } from "@widgets/ColorsDragNDrop/model/useSetDefaultColorsFromUrl.tsx"
import { ColorsDragNDrop } from "@widgets/ColorsDragNDrop/ui/ColorsDragNDrop.tsx"
import styled from "styled-components"

export const ColorsPage = () => {
  useSetDefaultColorsFromUrl()

  const { randomize } = useRandomizeColors()
  useKeyPress(KeyCodes.space, randomize)

  return (
    <ColorsPageLayout>
      <ColorsDragNDrop />
    </ColorsPageLayout>
  )
}
const ColorsPageLayout = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
