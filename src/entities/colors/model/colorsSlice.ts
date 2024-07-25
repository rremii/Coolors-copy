import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ColorType } from "@entities/colors/types.ts"
import { RootState } from "@shared/store/store.ts"

export interface IColorCell {
  color: ColorType
  id: number
  //todo can add isLocked and implement locking in easier way !!!!!!!!!
}

interface initialState {
  colors: IColorCell[]
  lockedColorsIds: number[]
  hasMountAnimation: boolean
}

const initialState = {
  colors: [],
  hasMountAnimation: false,
  lockedColorsIds: [],
} as initialState

export const ColorsSlice = createSlice({
  name: "ColorsSlice",
  initialState,
  reducers: {
    addLockedColor(state, action: PayloadAction<{ id: number }>) {
      if (!state.lockedColorsIds.find((id) => id === action.payload.id))
        state.lockedColorsIds.push(action.payload.id)
    },
    removeLockedColor(state, action: PayloadAction<{ id: number }>) {
      state.lockedColorsIds = state.lockedColorsIds.filter(
        (id) => id !== action.payload.id,
      )
    },

    setHasMountAnimation(state, action: PayloadAction<boolean>) {
      state.hasMountAnimation = action.payload
    },
    updateColors(state, action: PayloadAction<ColorType[]>) {
      state.colors = state.colors.map((color, index) => ({
        ...color,
        color: action.payload[index],
      }))
    },
    createColors(state, action: PayloadAction<ColorType[]>) {
      state.colors = action.payload.map((color, index) => ({
        id: index,
        color,
      }))
    },
    setColors(state, action: PayloadAction<IColorCell[]>) {
      state.colors = action.payload
    },
    replaceColor(
      state,
      action: PayloadAction<{ index: number; color: ColorType }>,
    ) {
      const { color, index } = action.payload

      state.colors = state.colors.map((colorCell, i) =>
        i === index ? { color, id: colorCell.id } : colorCell,
      )
    },
    insertNewColor(
      state,
      action: PayloadAction<{ index: number; color: ColorType }>,
    ) {
      const { index, color } = action.payload

      let maxId: number = state.colors[0].id
      state.colors.forEach((color) => maxId < color.id && (maxId = color.id))

      state.colors = [
        ...state.colors.slice(0, index + 1),
        { id: maxId + 1, color },
        ...state.colors.slice(index + 1),
      ]
    },
    removeColor(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload

      state.colors = state.colors.filter((_, i) => i !== index)
    },
  },
})

export const {
  setColors,
  createColors,
  removeLockedColor,
  addLockedColor,
  removeColor,
  insertNewColor,
  setHasMountAnimation,
  replaceColor,
  updateColors,
} = ColorsSlice.actions

export const ColorsReducer = ColorsSlice.reducer

export const getLockedColorIndexes = createSelector(
  [
    (state: RootState) => state.Colors.lockedColorsIds,
    (state: RootState) => state.Colors.colors,
  ],
  (lockedColorsIds, colors) => {
    const lockedIndexes: number[] = []
    colors.forEach(
      ({ id }, index) =>
        lockedColorsIds.includes(id) && lockedIndexes.push(index),
    )
    return lockedIndexes
  },
)
