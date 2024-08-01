import { useGetPalettesQuery } from "@entities/palette"
import { useGetMe } from "@entities/user/model/useGetMe.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const useGetPalettes = () => {
  const isLoggedIn = useTypedSelector((state) => state.Auth.isLoggedIn)

  const { user } = useGetMe()

  const { data: palettes, isLoading } = useGetPalettesQuery(user?.id, {
    skip: isLoggedIn !== "success" || !user,
  })

  return { palettes, isLoading }
}
