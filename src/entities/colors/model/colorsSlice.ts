import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ColorType } from "@entities/colors/types.ts"

export interface IColorCell {
  color: ColorType
  id: number
}

interface initialState {
  colors: IColorCell[]
  hasMountAnimation: boolean
}

const initialState = {
  colors: [],
  hasMountAnimation: false
} as initialState

export const ColorsSlice = createSlice({
  name: "ColorsSlice",
  initialState,
  reducers: {
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
    insertColor(state, action: PayloadAction<{ index: number, color: ColorType }>) {
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

export const { setColors, createColors, removeColor, insertColor, setHasMountAnimation } = ColorsSlice.actions

export const ColorsReducer = ColorsSlice.reducer