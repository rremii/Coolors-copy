import { ColorLineBox } from "@shared/ui/ColorLineBox.tsx"
import { RemoveColor } from "@features/removeColor/ui/RemoveColor.tsx"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import { AddColorWithOverlay } from "@features/addColorWithOverlay/ui/AddColorWithOverlay.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { ColorType } from "@entities/colors/types.ts"
import { FC, useState } from "react"
import { withDeleting, WithDeletingProps } from "@entities/colors/model/with-deleting.tsx"

interface Props extends WithDeletingProps {
  colorId: number
  colorIndex: number
  color: ColorType
  isLastIndex: boolean
}

const ColorLine: FC<Props> = ({
                                colorId,
                                colorIndex,
                                isLastIndex,
                                color,
                                isDeleting,
                                delayDeleteCb
                              }) => {

  const withAnimation = useTypedSelector(state => state.Colors.withAnimation)


  const [isHovered, setHovered] = useState(false)


  const settings = [
    (props) => <RemoveColor {...props} delayDeleteCb={delayDeleteCb} index={colorIndex} isHidden={!isHovered} />,
    (props) => <RemoveColor {...props} delayDeleteCb={delayDeleteCb} index={colorIndex} isHidden={!isHovered} />
  ]

  return <ColorLineBox
    onHover={setHovered}
    hasMountAnimation={withAnimation}
    hasUnMountAnimation={isDeleting}
    key={colorId}
    colorHexNode={<div>{rgbToHex(color)}</div>}
    colorNameNode={<div>Blue</div>}
    settingsNodes={
      settings.map((Setting, i) => <Setting key={i} />)
    }
    color={color}
    addColorNode={!isLastIndex ? <AddColorWithOverlay index={colorIndex} /> : null}
  />
}

export const ColorLineWithDeleting = withDeleting(ColorLine, 500)
