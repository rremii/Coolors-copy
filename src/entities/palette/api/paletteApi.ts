import { Api } from "@shared/api/config/Api"
import { IUserInfo } from "@entities/User/types.ts"
import { CreatePaletteDto, IPalette } from "@entities/palette/types.ts"
import { DefaultResponse } from "@entities/auth/types.ts"

export const paletteApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getPalettes: build.query<IPalette[], number>({
      query: (userId) => ({
        url: "palette?userId=" + userId,
        method: "GET",
      }),
      providesTags: ["palette"],
    }),
    createPalette: build.mutation<IPalette, CreatePaletteDto>({
      query: (createPaletteDto) => ({
        url: "palette",
        method: "POST",
        data: createPaletteDto,
      }),
      invalidateTags: ["palette"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPalettesQuery,
  useCreatePaletteMutation,
} = paletteApi