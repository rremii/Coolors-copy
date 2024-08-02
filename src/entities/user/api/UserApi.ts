import { Api } from "@shared/api/config/Api"
import { IUserInfo } from "../types"

export const UserApi = Api.injectEndpoints({
  endpoints: (build) => ({
    GetMe: build.query<IUserInfo, void>({
      query: () => ({
        url: "users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
  overrideExisting: false,
})
export const { GetMe } = UserApi.endpoints

export const { useLazyGetMeQuery, useGetMeQuery } = UserApi
