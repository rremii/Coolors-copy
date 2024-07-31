export const checkIfValid = (value: string): string | null => {

  if (value.length === 0)
    return "Name is required"

  if (value.length >= 20)
    return "Max length is 20"

  return null
}