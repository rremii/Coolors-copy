import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useEffect } from "react"
import { createColors, setHasMountAnimation } from "@entities/colors/model/colorsSlice.ts"

export const useSetDefaultColorsFromUrl = () => {
  const dispatch = useAppDispatch()


  const colors = useTypedSelector(state => state.Colors.colors)
  const colorsFromUrl = useGetColorsFromUrl()


  useEffect(() => {
    if (colors.length)
      dispatch(setHasMountAnimation(true))
    else
      dispatch(createColors(colorsFromUrl))
  }, [colorsFromUrl.length, dispatch])


}