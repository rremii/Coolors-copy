import { AuthForm } from "@entities/auth/ui/AuthForm.tsx"
import { AuthSubmitBtn } from "@entities/auth/ui/components/AuthSubmitBtn.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { useTimer } from "@shared/hooks/useTimer"
import { Toast } from "@shared/ui/Toast"
import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import styled from "styled-components"
import { signUpEmailSchema } from "../constants/signUpValidateSchemas"
import { setAuthStage, setUserInfo, toggleAuth } from "../model/AuthSlice"
import { useConfirmEmail } from "../model/useConfirmEmail"
import { Button } from "@shared/ui/Button.tsx"

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
    register, getValues,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(signUpEmailSchema),
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


  useEffect(() => {
    if (!isSuccess) return
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
        {/*<AuthSubmitBtn $isLoading={isLoading}>*/}
        {/*</AuthSubmitBtn>*/}
      </AuthForm>
      {createPortal(
        <Toast isActive={!!errors.root && time <= toastHideTime}>
          {errors.root?.message}
        </Toast>,
        document.body,
      )}
    </FormContainer>
  )
}
const FormContainer = styled.div``
