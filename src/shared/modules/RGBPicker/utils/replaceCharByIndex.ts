export const replaceCharByIndex = (str: string, index1: number, index2: number, value: string) => {

  const strSecondPart = str.slice(index2 + 1)
  const strFirstPart = str.slice(0, index1)

  return strFirstPart + value + strSecondPart

}