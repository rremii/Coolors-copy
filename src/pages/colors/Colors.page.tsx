import styled from "styled-components"
import { ColorLine } from "@shared/ui/ColorLine.tsx"
import { SettingCell } from "@shared/ui/SettingCell.tsx"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { AddColorWithOverlay } from "@features/addColorWithOverlay/ui/AddColorWithOverlay.tsx"
import { RemoveColor } from "@features/removeColor/ui/RemoveColor.tsx"
import { useSetDefaultColorsFromUrl } from "@entities/colors/model/useSetDefaultColorsFromUrl.tsx"

export const ColorsPage = () => {


  const colors = useTypedSelector(state => state.Colors.colors)
  const withAnimation = useTypedSelector(state => state.Colors.withAnimation)


  useSetDefaultColorsFromUrl()


  const settings = [
    RemoveColor,
    RemoveColor,
    RemoveColor,
    RemoveColor
  ]

  return <ColorsPageLayout>
    {colors.map(({ color, id }, index) => {
      const isLast = index === (colors.length - 1)

      return <ColorLine
        withAnimation={withAnimation}
        key={id}
        index={index}
        colorHexNode={<div>{rgbToHex(color)}</div>}
        colorNameNode={<div>Blue</div>}
        color={color}
        settingsNodes={settings}
        addColorNode={!isLast ? <AddColorWithOverlay index={index} /> : null}
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