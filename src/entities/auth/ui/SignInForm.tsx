import { AuthForm } from "@entities/auth/ui/components/AuthForm.tsx"
import { AuthSubmitBtn } from "@entities/auth/ui/components/AuthSubmitBtn.tsx"
import { FormField } from "@entities/auth/ui/components/FormField.tsx"
import { yupResolver } from "@hookform/resolvers/yup"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { Toast } from "@shared/ui/Toast.tsx"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { signInSchema } from "../constants/signInValidateSchemas"
import { useLogin } from "../model/useLogin"

interface FormFields {
  email: string
  password: string
}

const toastHideTime = 2 //sec
export const SignInForm = () => {
  const { login, error, isError, isLoading } = useLogin()

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
  }, [isError])

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
        <AuthSubmitBtn $isLoading={isLoading}>Sign in</AuthSubmitBtn>
      </AuthForm>
      {createPortal(
        <Toast isActive={!!errors.root && time <= toastHideTime}>
          {errors.root?.message}
        </Toast>,
        document.body
      )}
    </FormContainer>
  )
}

const FormContainer = styled.div``
