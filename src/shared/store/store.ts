import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { ColorsReducer } from "@entities/colors/model/colorsSlice.ts"
import { AuthReducer } from "@entities/auth"

const rootReducer = combineReducers({
  Colors: ColorsReducer,
  Auth: AuthReducer,
  // [Api.reducerPath]: Api.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware().concat(Api.middleware),
    devTools: true,
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
