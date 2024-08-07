import {
  AuthResponse,
  DefaultResponse,
  LoginDto,
  RegisterDto,
} from "@entities/auth/types.ts"
import { Api } from "@shared/api/config/Api.ts"

export const AuthApi = Api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<AuthResponse, RegisterDto>({
      query: (registerData: RegisterDto) => ({
        url: "auth/register",
        method: "POST",
        data: registerData,
      }),
    }),
    login: build.mutation<AuthResponse, LoginDto>({
      query: (loginData) => ({
        url: "auth/login",
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: ["User"],
    }),
    confirmEmail: build.mutation<DefaultResponse, string>({
      query: (email) => ({
        url: "confirm-code/send-code",
        method: "POST",
        data: { email },
      }),
    }),

    verifyCode: build.mutation<DefaultResponse, string>({
      query: (code) => ({
        url: "confirm-code/verify-code",
        method: "POST",
        data: { code },
      }),
      invalidatesTags: ["User"],
    }),
    logout: build.mutation<DefaultResponse, void>({
      query: () => ({
        url: "auth/logout",
        method: "DELETE",
      }),
    }),

    refresh: build.query<AuthResponse, void>({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})
export const { refresh } = AuthApi.endpoints
export const {
  useRefreshQuery,
  useRegisterMutation,
  useLoginMutation,
  useConfirmEmailMutation,
  useVerifyCodeMutation,
  useLogoutMutation,
} = AuthApi
