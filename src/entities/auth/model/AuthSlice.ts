import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type loggedInType = "first loading" | "success" | "rejected"


export type AuthStages = "sign-in" | "sign-up-email" | "sign-up-code"

interface initialState {
  isLoggedIn: loggedInType
  isPending: boolean
  email: string
  avatar: string
  name: string
  ///ui
  stage: AuthStages
  isOpen: boolean
}


const initialState = {
  email: "",
  isLoggedIn: "first loading",
  isPending: true,
  avatar: "",
  name: "",
  ////ui
  stage: "sign-in",
  isOpen: false,
} as initialState

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {
    setAuthRejected(state) {
      state.isPending = false
      state.isLoggedIn = "rejected"
    },
    setAuthSuccess(state) {
      state.isPending = false
      state.isLoggedIn = "success"
    },
    setAuthInitial(state) {
      state.isPending = true
      state.isLoggedIn = "first loading"
      state.stage = "sign-in"
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload
    },
    setUserInfo(state, action: PayloadAction<{ name: string, avatar: string }>) {
      state.name = action.payload.name
      state.avatar = action.payload.avatar
    },
    //ui
    toggleAuth(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload
    },
    setAuthStage(state, action: PayloadAction<AuthStages>) {
      state.stage = action.payload
    },
  },
})

export const {
  setAuthRejected,
  setUserInfo,
  setAuthInitial,
  setAuthSuccess,
  setEmail,
  setAuthStage,
  toggleAuth,
} = AuthSlice.actions

export const AuthReducer = AuthSlice.reducer