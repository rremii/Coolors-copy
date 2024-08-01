import { AuthForm } from "@entities/auth/ui/AuthForm.tsx"
import { useToast } from "@entities/toast/model/useToast"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppDispatch } from "@shared/hooks/storeHooks"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { Button } from "@shared/ui/Button.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { signInSchema } from "../constants/signInValidateSchemas"
import { toggleAuth } from "../model/AuthSlice"
import { useLogin } from "../model/useLogin"

interface FormFields {
  email: string
  password: string
}

const toastHideTime = 2 //sec
export const SignInForm = () => {
  const dispatch = useAppDispatch()

  const { login, error, isError, isLoading, isSuccess } = useLogin()

  const {
    clearErrors,
    reset,
    setError,
    handleSubmit,
    register,

    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(signInSchema),
  })

  const { addToast } = useToast()
  const { reset: resetTimer } = useTimer({
    timeGap: 1,
    finalTime: 4,
    callback: clearErrors,
  })

  useEffect(() => {
    if (isSuccess) {
      addToast({
        duration: 2,
        type: "info",
        content: "you were logged in",
      })

      dispatch(toggleAuth(false))
    }
    if (isError) {
      reset()
      resetTimer()

      addToast({
        duration: 2,
        type: "error",
        content: error?.message || "couldn't sign in",
      })
    }
  }, [isLoading])

  const onSubmit = async (authData: FormFields) => {
    if (isLoading) return
    await login(authData)
  }

  return (
    <FormContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
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
          Sign in
        </Button>
      </AuthForm>
    </FormContainer>
  )
}

const FormContainer = styled.div``
