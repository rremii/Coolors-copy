export const addNewColorToUrlStr = (index: number, colorHex: string, colorsUrl: string) => {

  const splitedUrl = colorsUrl.split("-")

  const insertedUrl = [
    ...splitedUrl.slice(0, index + 1),
    colorHex.slice(1),
    ...splitedUrl.slice(index + 1)
  ]
  return insertedUrl.join("-")
}