import { ColorLineWithDeleting } from "@widgets/ColorsDragNDrop/ui/ColorLine.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { IColorCell, setColors, setHasMountAnimation } from "@entities/colors/model/colorsSlice.ts"
import styled from "styled-components"
import { useSetColorsToUrl } from "@entities/colors/model/useSetColorsToUrl.tsx"
import { useRef } from "react"
import { useDragIndexes } from "@shared/hooks/useDragIndexes.tsx"

export const ColorsDragNDrop = () => {
  const dispatch = useAppDispatch()

  const colors = useTypedSelector(state => state.Colors.colors)


  const { setColorsToUrl } = useSetColorsToUrl()

  const setNewColors = (colors: IColorCell[]) => {
    dispatch(setHasMountAnimation(false))
    setColorsToUrl(colors.map(({ color }) => color))
    dispatch(setColors(colors))
  }

  const screenWidth = useRef<number>(document.body.clientWidth)


  const axis = screenWidth.current <= 768 ? "Y" : "X" //todo
  const {
    deltaAxisCoord,
    indexShifts,
    dragIndex,
    refs,
    isDraggin
  } = useDragIndexes(colors, setNewColors, axis)


  return <DragNDropLayout ref={refs.setContainerRef}>
    {colors.map(({ color, id }, index) => {
      const isLastIndex = index === colors.length - 1

      const isDragged = index === dragIndex

      const styles = isDraggin ? {
        transition: isDragged ? "0s" : "0.3s",
        transform: `translate${axis}(${isDragged ? deltaAxisCoord + "px" : indexShifts[index] * 100 + "%"})`,
        zIndex: isDragged ? 100 : "initial"
      } : {
        transition: "0s",
        pointerEvents: "initial",
        zIndex: "initial"
      }
      return <ColorLineWithDeleting
        id={id}
        isDraggin={isDraggin}
        dragBtnRef={refs.setDragBtnRef(index)}
        style={styles}
        ref={refs.setIndexRef(index)}
        key={id}
        color={color}
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