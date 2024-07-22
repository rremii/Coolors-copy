import styled from "styled-components"
import { useSetDefaultColorsFromUrl } from "@entities/colors/model/useSetDefaultColorsFromUrl.tsx"
import { ColorsDragNDrop } from "@widgets/ColorsDragNDrop/ui/ColorsDragNDrop.tsx"

export const ColorsPage = () => {

  useSetDefaultColorsFromUrl()


  return <ColorsPageLayout>
    <ColorsDragNDrop />
  </ColorsPageLayout>
}
const ColorsPageLayout = styled.div`
    width: 100%;
    height: 100%;
    position: relative;

`
