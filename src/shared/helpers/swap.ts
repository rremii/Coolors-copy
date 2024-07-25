export function swap<T>(
  [index1, index2]: [number, number],
  array: Array<T>
): Array<T> {
  const newArr = [...array]

  const temp = newArr[index1]
  newArr[index1] = newArr[index2]
  newArr[index2] = temp

  return newArr
}
