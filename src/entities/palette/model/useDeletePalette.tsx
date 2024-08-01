import { useDeletePaletteMutation } from "@entities/palette"

export const useDeletePalette = () => {
  const [deletePalette, { isLoading, isError, error }] =
    useDeletePaletteMutation()

  const handleDelete = async (paletteId: number) => {
    await deletePalette(paletteId).unwrap()
  }

  return {
    deletePalette: handleDelete,
    isLoading,
    isError,
    error,
  }
}
