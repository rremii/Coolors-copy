import React from "react"
import { ColorLineBox } from "@shared/ui/ColorLineBox.tsx"
import { RemoveColor } from "@features/removeColor/ui/RemoveColor.tsx"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import { AddColorWithOverlay } from "@features/addColorWithOverlay/ui/AddColorWithOverlay.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { ColorType } from "@entities/colors/types.ts"
import { FC, forwardRef, useState } from "react"
import {
  withDeleting,
  WithDeletingProps,
} from "@entities/colors/model/with-deleting.tsx"
import { DragColor } from "@features/dragColor/ui/DragColor.tsx"
import { LockColor } from "@features/lockColor/ui/LockColor.tsx"
import { getContrastColor } from "@shared/helpers/getContrastColor.ts"
import { ColorName } from "@features/colorName/ui/ColorName.tsx"
import { CopyColor } from "@features/copyColor/ui/CopyColor.tsx"
import { ColorPickerWithBtn } from "@features/colorPicker/ui/ColorPickerWithBtn.tsx"

interface Props extends WithDeletingProps {
  colorIndex: number
  color: ColorType
  isLastIndex: boolean
  style?: React.CSSProperties
  dragBtnRef?: (node: HTMLElement) => void
  isDraggin?: boolean
  isDragged?: boolean
  id: number
}

const ColorLine: FC<Props> = forwardRef<HTMLElement, Props>(
  (
    {
      colorIndex,
      isLastIndex,
      color,
      isDeleting,
      delayDeleteCb,
      style,
      dragBtnRef,
      isDraggin,
      isDragged,
      id,
    },
    ref,
  ) => {
    const hasMountAnimation = useTypedSelector(
      (state) => state.Colors.hasMountAnimation,
    )

    const [isHovered, setHovered] = useState(false)

    const settings = [
      (props) => (<RemoveColor{...props} delayDeleteCb={delayDeleteCb} colorIndex={colorIndex} />),
      (props) => <DragColor {...props} ref={dragBtnRef} />,
      (props) => <CopyColor {...props} color={color} />,
      (props) => <LockColor {...props} colorId={id} colorIndex={colorIndex} />,
    ]

    return (
      <ColorLineBox
        style={{ ...style, backgroundColor: rgbToHex(color) }}
        ref={ref}
        onHover={setHovered}
        hasMountAnimation={hasMountAnimation}
        hasUnMountAnimation={isDeleting}
        colorHexNode={
          <ColorPickerWithBtn
            decorationColor={getContrastColor(color)}
            color={color}
            index={colorIndex}
          >
            {rgbToHex(color)}
          </ColorPickerWithBtn>
        }
        colorNameNode={<ColorName color={color} />}
        settingsNodes={settings.map((Setting, i) => (
          <Setting
            isHidden={isDraggin ? !isDragged : !isHovered}
            iconColor={getContrastColor(color)}
            key={i}
          />
        ))}
        addColorNode={
          !isDraggin && !isLastIndex ? (
            <AddColorWithOverlay index={colorIndex} />
          ) : null
        }
      />
    )
  },
)

export const ColorLineWithDeleting = withDeleting(ColorLine, 400)
