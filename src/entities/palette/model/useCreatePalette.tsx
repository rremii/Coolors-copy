import { useAppDispatch } from "@shared/hooks/storeHooks"
import { useEffect } from "react"
import { useCreatePaletteMutation } from "@entities/palette"
import { CreatePaletteDto } from "@entities/palette/types.ts"

export const useCreatePalette = () => {

  const [createPalette, { isLoading, isError, error }] =
    useCreatePaletteMutation()


  const handleCreate = async (createDto: CreatePaletteDto) => {
    await createPalette(createDto)
  }

  return {
    createPalette: handleCreate,
    isLoading,
    isError,
    error,
  }
}
