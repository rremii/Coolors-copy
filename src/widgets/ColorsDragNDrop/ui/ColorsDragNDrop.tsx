import { ColorLineWithDeleting } from "@widgets/ColorsDragNDrop/ui/ColorLine.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useDragIndexes } from "@shared/hooks/useDragIndexes.tsx"
import { IColorCell, setColors, setHasMountAnimation } from "@entities/colors/model/colorsSlice.ts"
import styled from "styled-components"
import { useSetColorsToUrl } from "@entities/colors/model/useSetColorsToUrl.tsx"
import { useRef } from "react"

export const ColorsDragNDrop = () => {
  const dispatch = useAppDispatch()

  const colors = useTypedSelector(state => state.Colors.colors)


  const { setColorsToUrl } = useSetColorsToUrl()

  const setNewColors = (colors: IColorCell[]) => {

    console.log(colors)
    dispatch(setHasMountAnimation(false))
    setColorsToUrl(colors.map(({ color }) => color))
    dispatch(setColors(colors))
  }

  const screenWidth = useRef<number>(document.body.clientWidth)


  const axis = screenWidth.current <= 768 ? "Y" : "X"
  const {
    deltaAxisCoord,
    indexShifts,
    dragIndex,
    refs
  } = useDragIndexes(colors, setNewColors, axis)


  return <DragNDropLayout ref={refs.setContainerRef}>
    {colors.map(({ color, id }, index) => {
      const isLastIndex = index === colors.length - 1

      const isDragged = index === dragIndex

      const styles = {
        transition: isDragged ? "0s" : "0.2s",
        transform: `translate${axis}(${isDragged ? deltaAxisCoord + "px" : indexShifts[index] * 100 + "%"})`,
        pointerEvents: isDragged ? "none" : "initial",
        zIndex: isDragged ? 100 : colors.length - index
      }
      return <ColorLineWithDeleting
        dragBtnRef={refs.setDragBtnRef(index)}
        style={styles}
        ref={refs.setIndexRef(index)}
        key={id}
        color={color}
        colorId={id}
        colorIndex={index}
        isLastIndex={isLastIndex}
      />
    })}
  </DragNDropLayout>
}
const DragNDropLayout = styled.div<{
  $isDragged?: boolean
  $deltaX?: number
  $curShift?: number
}>`
    position: relative;
    display: flex;
    background-color: white;
    width: 100%;
    height: 100%;
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }

`