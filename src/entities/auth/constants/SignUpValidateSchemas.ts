import * as yup from "yup"

export const signUpEmailSchema = yup
  .object()
  .shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("field is required"),
    name: yup
      .string()
      .max(20, "Max name length is 20 digits")
      .required("Name is required"),
  })
  .required()

export const signUpCodeSchema = yup
  .object()
  .shape({
    code: yup.string().length(6).required(),
  })
  .required()
