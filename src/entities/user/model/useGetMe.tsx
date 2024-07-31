import { useGetMeQuery } from "@entities/user"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"

export const useGetMe = () => {

  const isLoggedIn = useTypedSelector(state => state.Auth.isLoggedIn)


  const { data: user, isLoading } = useGetMeQuery({
    skip: isLoggedIn !== "success",
  })


  return { user, isLoading }
}