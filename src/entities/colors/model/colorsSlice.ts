import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ColorType } from "@entities/colors/types.ts"

interface IColorCell {
  color: ColorType
  id: number
}

interface initialState {
  colors: IColorCell[]
  withAnimation: boolean
}

const initialState = {
  colors: [],
  withAnimation: false
} as initialState

export const ColorsSlice = createSlice({
  name: "ColorsSlice",
  initialState,
  reducers: {
    setWithAnimation(state, action: PayloadAction<boolean>) {
      state.withAnimation = action.payload
    },
    setColors(state, action: PayloadAction<ColorType[]>) {
      state.colors = action.payload.map((color, index) => ({
          id: index,
          color
        })
      )
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

export const { setColors, removeColor, insertColor, setWithAnimation } = ColorsSlice.actions

export const ColorsReducer = ColorsSlice.reducer