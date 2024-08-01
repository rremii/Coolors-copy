import { createColors } from "@entities/colors/model/colorsSlice.ts"
import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const useSetDefaultColorsFromUrl = () => {
  const dispatch = useAppDispatch()

  const colors = useTypedSelector((state) => state.Colors.colors)
  const colorsFromUrl = useGetColorsFromUrl()

  const location = useLocation()

  useEffect(() => {
    if (!colorsFromUrl.length || colors.length) return

    dispatch(createColors(colorsFromUrl))
  }, [location])
}
