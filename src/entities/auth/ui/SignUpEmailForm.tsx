import { AuthForm } from "@entities/auth/ui/AuthForm.tsx"
import { useToast } from "@entities/toast/model/useToast"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { useTimer } from "@shared/hooks/useTimer"
import { Button } from "@shared/ui/Button.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { signUpEmailSchema } from "../constants/signUpValidateSchemas"
import { setAuthStage, setUserInfo } from "../model/AuthSlice"
import { useConfirmEmail } from "../model/useConfirmEmail"

interface FormFields {
  email: string
  password: string
  name: string
}

const toastHideTime = 2
export const SignUpEmailForm = () => {
  const dispatch = useAppDispatch()

  const { isError, isLoading, isSuccess, confirmEmail, error } =
    useConfirmEmail()

  const {
    clearErrors,
    reset,
    setError,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(signUpEmailSchema),
  })

  const { addToast } = useToast()
  const { reset: resetTimer, time } = useTimer({
    timeGap: 1,
    finalTime: 4,
    callback: clearErrors,
  })

  useEffect(() => {
    if (!isError) return

    reset()
    setError("root", { message: error?.message })
    resetTimer()
    addToast({
      content: error?.message || "couldn't send code",
      type: "error",
      duration: 2,
    })
  }, [isError])

  useEffect(() => {
    if (!isSuccess) return
    addToast({
      content: "code was succesfuly sent",
      type: "info",
      duration: 2,
    })
    dispatch(setUserInfo(getValues()))
    dispatch(setAuthStage("sign-up-code"))
  }, [isLoading])

  const onSubmit = async (authData: FormFields) => {
    if (isLoading) return
    await confirmEmail(authData.email)
  }

  return (
    <FormContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <FormField
          isError={Boolean(errors.root) || Boolean(errors.email)}
          input={{
            type: "text",
            placeholder: "Full Name",
            register: { ...register("name") },
          }}
        />
        <FormField
          isError={Boolean(errors.root) || Boolean(errors.email)}
          input={{
            type: "email",
            placeholder: "Email / Username",
            register: { ...register("email") },
          }}
        />
        <FormField
          aria-autocomplete="none"
          isError={Boolean(errors.root) || Boolean(errors.password)}
          input={{
            type: "password",
            placeholder: "Password",
            register: { ...register("password") },
          }}
        />
        <Button filled isLoading={isLoading}>
          Create your first account
        </Button>
      </AuthForm>
    </FormContainer>
  )
}
const FormContainer = styled.div``
