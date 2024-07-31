import styled from "styled-components"
import { useScreenSize } from "@shared/hooks/useScreenSize.tsx"
import { SavePalette } from "@features/savePaletteModal/ui/SavePalette.tsx"

export const SubHeader = () => {

  const isMobile = useScreenSize(768)


  return <SubHeaderLayout>
    <SavePalette />
  </SubHeaderLayout>
}
const SubHeaderLayout = styled.div`
    flex: 0 0 56px;
    box-shadow: rgba(0, 0, 0, 0.075) 0 1px;

    padding: 0 14px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`