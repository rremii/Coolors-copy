import { IToast } from "@entities/toast/type.ts"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface initialState {
  toasts: IToast[]
}

const initialState = {
  toasts: [],
} as initialState

export const toastSlice = createSlice({
  name: "toastSlice",
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<IToast>) {
      const { content, type, id } = action.payload

      let maxId = 0
      state.toasts.forEach((color) => maxId < color.id && (maxId = color.id))

      state.toasts.push({
        content,
        type,
        id,
      })
    },

    removeToast(state, action: PayloadAction<{ id: number }>) {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload.id
      )
    },
  },
})

export const { addToast, removeToast } = toastSlice.actions

export const toastReducer = toastSlice.reducer
