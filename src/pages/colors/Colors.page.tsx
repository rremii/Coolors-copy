import styled from "styled-components"
import { useSetDefaultColorsFromUrl } from "@widgets/ColorsDragNDrop/model/useSetDefaultColorsFromUrl.tsx"
import { ColorsDragNDrop } from "@widgets/ColorsDragNDrop/ui/ColorsDragNDrop.tsx"
import { useRandomizeColorsKeyPress } from "@widgets/ColorsDragNDrop/model/useRandomizeColorsKeyPress.tsx"
import { KeyCodes } from "@shared/hooks/useKeyPress.tsx"

export const ColorsPage = () => {

  useSetDefaultColorsFromUrl()

  useRandomizeColorsKeyPress(KeyCodes.space)


  return <ColorsPageLayout>
    <ColorsDragNDrop />
  </ColorsPageLayout>
}
const ColorsPageLayout = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

`
