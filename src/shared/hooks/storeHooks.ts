import { useDispatch, useSelector } from "react-redux"
import { RootState, store } from "../store/store.ts"

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useTypedSelector = useSelector.withTypes<RootState>()
