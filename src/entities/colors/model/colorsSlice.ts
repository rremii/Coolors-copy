import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ColorType } from "@entities/colors/types.ts"
import { RootState } from "@shared/store/store.ts"
import { type } from "node:os"

export interface IColorCell {
  color: ColorType
  id: number
}

interface initialState {
  colors: IColorCell[]
  lockedColorsIndexes: number[]
  hasMountAnimation: boolean
}

const initialState = {
  colors: [],
  hasMountAnimation: false,
  lockedColorsIndexes: []
} as initialState

export const ColorsSlice = createSlice({
  name: "ColorsSlice",
  initialState,
  reducers: {

    addLockedIndex(state, action: PayloadAction<number>) {
      if (!state.lockedColorsIndexes.includes(action.payload))
        state.lockedColorsIndexes.push(action.payload)
    },
    removeLockedIndex(state, action: PayloadAction<number>) {
      state.lockedColorsIndexes = state.lockedColorsIndexes.filter((index) => index !== action.payload)
    },

    setHasMountAnimation(state, action: PayloadAction<boolean>) {
      state.hasMountAnimation = action.payload
    },
    createColors(state, action: PayloadAction<ColorType[]>) {
      state.colors = action.payload.map((color, index) => ({
          id: index,
          color
        })
      )
    },
    setColors(state, action: PayloadAction<IColorCell[]>) {
      state.colors = action.payload
    },
    replaceColor(state, action: PayloadAction<{ index: number, color: ColorType }>) {
      const { color, index } = action.payload

      state.colors = state.colors.map((colorCell, i) => i === index ? { color, id: colorCell.id } : colorCell)
    },
    insertNewColor(state, action: PayloadAction<{ index: number, color: ColorType }>) {
      const { index, color } = action.payload


      let maxId = state.colors[0]
      state.colors.forEach(color => maxId < color.id && (maxId = color.id))


      state.colors = [
        ...state.colors.slice(0, index + 1),
        { id: maxId + 1, color },
        ...state.colors.slice(index + 1)]

    },
    removeColor(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload

      state.colors = state.colors.filter((_, i) => i !== index)

    }
  }
})

export const {
  setColors,
  createColors,
  removeLockedIndex,
  addLockedIndex,
  removeColor,
  insertNewColor,
  setHasMountAnimation,
  replaceColor
} = ColorsSlice.actions

export const ColorsReducer = ColorsSlice.reducer


export const getIsIndexLocked = createSelector(
  [
    (state: RootState, index: number) => state.Colors.lockedColorsIndexes.find((id) => id === index)
  ],
  (color) => typeof color === "number"
)
