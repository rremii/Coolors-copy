import { CreatePaletteDto, IPalette } from "@entities/palette/types.ts"
import { Api } from "@shared/api/config/Api"

export const paletteApi = Api.injectEndpoints({
  endpoints: (build) => ({
    getPalettes: build.query<IPalette[], number>({
      query: (userId) => ({
        url: "palette?userId=" + userId,
        method: "GET",
      }),
      providesTags: ["Palette"],
    }),
    createPalette: build.mutation<IPalette, CreatePaletteDto>({
      query: (createPaletteDto) => ({
        url: "palette",
        method: "POST",
        data: createPaletteDto,
      }),
      invalidatesTags: ["Palette"],
    }),
    deletePalette: build.mutation<IPalette, number>({
      query: (paletteId) => ({
        url: "palette/" + paletteId,
        method: "DELETE",
      }),
      invalidatesTags: ["Palette"],
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetPalettesQuery,
  useCreatePaletteMutation,
  useDeletePaletteMutation,
} = paletteApi
