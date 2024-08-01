import { toggleAuth } from "@entities/auth"
import { signUpCodeSchema } from "@entities/auth/constants/signUpValidateSchemas.ts"
import { useRegister } from "@entities/auth/model/useRegister.tsx"
import { useVerifyCode } from "@entities/auth/model/useVerifyEmail.tsx"
import { AuthForm } from "@entities/auth/ui/AuthForm.tsx"
import { useToast } from "@entities/toast/model/useToast"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { Button } from "@shared/ui/Button.tsx"
import { FormField } from "@shared/ui/FormField.tsx"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import styled from "styled-components"

interface FormFields {
  code: string
}

const toastHideTime = 2 //sec
export const SignUpCodeForm = () => {
  const dispatch = useAppDispatch()

  const userName = useTypedSelector((state) => state.Auth.name)
  const userEmail = useTypedSelector((state) => state.Auth.email)
  const userPassword = useTypedSelector((state) => state.Auth.password)

  const { isError, verifyCode, error } = useVerifyCode()
  const { register: registerUser, isLoading, isSuccess } = useRegister()

  const {
    clearErrors,
    reset,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(signUpCodeSchema),
  })

  const { addToast } = useToast()
  const { reset: resetTimer } = useTimer({
    timeGap: 1,
    finalTime: 4,
    callback: clearErrors,
  })

  useEffect(() => {
    if (!isError) return

    reset()
    resetTimer()
    addToast({
      content: error?.message || "couldn't create an account",
      type: "error",
      duration: 2,
    })
  }, [isError])

  useEffect(() => {
    if (!isSuccess) return
    dispatch(toggleAuth(false))
    addToast({
      content: "Your account was created",
      type: "info",
      duration: 2,
    })
  }, [isLoading])

  const onSubmit = ({ code }: FormFields) => {
    if (isLoading) return

    verifyCode(code).then(async () => {
      await registerUser({
        name: userName,
        email: userEmail,
        password: userPassword,
        colorHex: "#" + code,
      })
    })
  }

  const curCode = watch("code")
  return (
    <FormContainer>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label="Color code"
          isError={Boolean(errors.root) || Boolean(errors.code)}
          input={{
            beforeInput: (
              <ColorPreview $color={curCode ? "#" + curCode : "#fff"} />
            ),
            type: "text",
            placeholder: "Enter the code",
            register: { ...register("code") },
          }}
        />
        <Button filled isLoading={isLoading}>
          OK
        </Button>
      </AuthForm>
    </FormContainer>
  )
}

const ColorPreview = styled.div<{
  $color: string
}>`
  border-radius: 5px;
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: ${({ $color }) => $color};
`
const FormContainer = styled.div``
