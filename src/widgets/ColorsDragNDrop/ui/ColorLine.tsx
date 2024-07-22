import { ColorLineBox } from "@shared/ui/ColorLineBox.tsx"
import { RemoveColor } from "@features/removeColor/ui/RemoveColor.tsx"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import { AddColorWithOverlay } from "@features/addColorWithOverlay/ui/AddColorWithOverlay.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { ColorType } from "@entities/colors/types.ts"
import { FC, forwardRef, useState } from "react"
import { withDeleting, WithDeletingProps } from "@entities/colors/model/with-deleting.tsx"
import { DragColor } from "@features/dragColor/ui/DragColor.tsx"
import { LockColor } from "@features/lockColor/ui/LockColor.tsx"
import { getContrastColor } from "@shared/helpers/getContrastColor.ts"
import { ColorName } from "@features/colorName/ui/ColorName.tsx"

interface Props extends WithDeletingProps {
  colorId: number
  colorIndex: number
  color: ColorType
  isLastIndex: boolean
  style?: React.CSSProperties
  dragBtnRef?: (node: HTMLElement) => void
}

const ColorLine: FC<Props> = forwardRef(({
                                           colorId,
                                           colorIndex,
                                           isLastIndex,
                                           color,
                                           isDeleting,
                                           delayDeleteCb,
                                           style,
                                           dragBtnRef
                                         }, ref) => {
  const hasMountAnimation = useTypedSelector(state => state.Colors.hasMountAnimation)


  const [isHovered, setHovered] = useState(false)


  const settings = [
    (props) => <RemoveColor  {...props} delayDeleteCb={delayDeleteCb} index={colorIndex} />,
    (props) => <DragColor  {...props} ref={dragBtnRef} />,
    (props) => <LockColor  {...props} colorIndex={colorIndex} />
  ]

  return <ColorLineBox
    style={style}
    ref={ref}
    onHover={setHovered}
    hasMountAnimation={hasMountAnimation}
    hasUnMountAnimation={isDeleting}
    key={colorId}
    colorHexNode={<div>{rgbToHex(color)}</div>}
    colorNameNode={<ColorName color={color} />}
    settingsNodes={
      settings.map((Setting, i) =>
        <Setting
          isHidden={!isHovered}
          iconColor={getContrastColor(color)}
          key={i} />)
    }
    color={color}
    addColorNode={!isLastIndex ? <AddColorWithOverlay index={colorIndex} /> : null}
  />
})

export const ColorLineWithDeleting = withDeleting(ColorLine, 400)
