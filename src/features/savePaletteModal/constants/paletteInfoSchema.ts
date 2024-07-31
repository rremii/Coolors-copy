import * as yup from "yup"

export const paletteInfoSchema = yup
  .object()
  .shape({
    name: yup.string().max(30).required(),
  })
  .required()
