export const removeColorFromUrlStr = (index: number, colorsUrl: string) => {
  return colorsUrl
    .split("-")
    .filter((_, i) => i !== index)
    .join("-")
}