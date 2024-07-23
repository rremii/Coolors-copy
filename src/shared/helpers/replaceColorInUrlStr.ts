export const replaceColorInUrlStr = (colorHex: string, url: string, index: number) => {

  return url
    .split("-")
    .map((color, i) => i === index ? colorHex.slice(1) : color)
    .join("-")

}