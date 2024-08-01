import { useGetPalettes } from "@entities/palette/model/useGetPalettes.tsx"
import { Spinner } from "@shared/ui/Spinner"
import { Palette } from "@widgets/palettes/ui/Palette.tsx"
import styled from "styled-components"

export const Palettes = () => {
  const { palettes, isLoading } = useGetPalettes()

  return (
    <PalettesLayout>
      {!isLoading && palettes ? (
        palettes?.map((palette) => <Palette key={palette.id} {...palette} />)
      ) : (
        <Spinner />
      )}
    </PalettesLayout>
  )
}
const PalettesLayout = styled.div`
  width: 100%;
  display: grid;

  gap: 20px;

  padding: 0 42px;
  grid-template-columns: repeat(3, 1fr);

  max-width: 1200px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media screen and (max-width: 600px) {
    padding: 0 10px;
  }
`
