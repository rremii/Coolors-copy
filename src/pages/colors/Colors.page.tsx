import styled from "styled-components"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useSetDefaultColorsFromUrl } from "@entities/colors/model/useSetDefaultColorsFromUrl.tsx"
import { ColorLineWithDeleting } from "@widgets/ColorLine.tsx"

export const ColorsPage = () => {


  const colors = useTypedSelector(state => state.Colors.colors)


  useSetDefaultColorsFromUrl()


  return <ColorsPageLayout>
    {colors.map(({ color, id }, index) => {
      const isLast = index === (colors.length - 1)
      return <ColorLineWithDeleting
        key={id}
        color={color}
        colorId={id}
        colorIndex={index}
        isLastIndex={isLast}
      />
    })}
  </ColorsPageLayout>

}
const ColorsPageLayout = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;
    display: flex;
`