import { useDeletePalette } from "@entities/palette/model/useDeletePalette"
import { useToast } from "@entities/toast/model/useToast"
import DeleteIcon from "@icons/delete.svg?react"
import { FC } from "react"
import styled from "styled-components"

interface Props {
  id: number
}

export const DeletePalette: FC<Props> = ({ id }) => {
  const { deletePalette, isLoading } = useDeletePalette()

  const { addToast } = useToast()

  const handleDelete = () => {
    deletePalette(id)
      .then(() =>
        addToast({
          content: "Palette was deleted",
          type: "info",
        })
      )
      .catch(() =>
        addToast({
          content: "couldn't delete the palette",
          type: "error",
        })
      )
  }

  return (
    <DeletePaletteBtn onClick={handleDelete}>
      <DeleteIcon />
    </DeletePaletteBtn>
  )
}
const DeletePaletteBtn = styled.button`
  width: 30px;
  height: 30px;
  svg,
  img {
    width: 20px;
    height: 20px;
  }
`
