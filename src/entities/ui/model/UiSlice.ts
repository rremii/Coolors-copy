import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RegisterDto } from "../types"

type Menus = "sidebar"

interface initialState {
  sidebar: {
    isOpen: boolean
  }
}

const initialState = {

  sidebar: {
    isOpen: false,
  },

} as initialState

export const UiSlice = createSlice({
  name: "UiSlice",
  initialState,
  reducers: {
    openMenu(state, action: PayloadAction<Menus>) {
      state[action.payload].isOpen = true
    },
    closeMenu(state, action: PayloadAction<Menus>) {
      state[action.payload].isOpen = false
    },
  },
})

export const {
  openMenu, closeMenu,
} = UiSlice.actions

export const UiReducer = UiSlice.reducer
