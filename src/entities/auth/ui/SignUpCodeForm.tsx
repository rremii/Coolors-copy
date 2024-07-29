import { AuthForm } from "@entities/auth/ui/components/AuthForm.tsx"
import { AuthSubmitBtn } from "@entities/auth/ui/components/AuthSubmitBtn.tsx"
import { FormField } from "@entities/auth/ui/components/FormField.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import styled from "styled-components"
import { useConfirmEmail } from "@entities/auth/model/useConfirmEmail.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signUpCodeSchema, signUpEmailSchema } from "@entities/auth/constants/signUpValidateSchemas.ts"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { useEffect } from "react"
import { setAuthStage, setUserInfo, toggleAuth } from "@entities/auth"
import { useVerifyCode } from "@entities/auth/model/useVerifyEmail.tsx"
import { createPortal } from "react-dom"
import { Toast } from "@shared/ui/Toast.tsx"
import { useRegister } from "@entities/auth/model/useRegister.tsx"


interface FormFields {
  code: string
}

const toastHideTime = 2 //sec
export const SignUpCodeForm = () => {
  const dispatch = useAppDispatch()

  const userName = useTypedSelector(state => state.Auth.name)
  const userEmail = useTypedSelector(state => state.Auth.email)
  const userPassword = useTypedSelector(state => state.Auth.password)

  const { isError, verifyCode, error } =
    useVerifyCode()
  const { register: registerUser, isLoading, isSuccess } = useRegister()

  const {
    clearErrors,
    reset,
    setError,
    handleSubmit,
    register, watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: yupResolver(signUpCodeSchema),
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
    dispatch(toggleAuth(false))
  }, [isLoading])

  const onSubmit = ({ code }: FormFields) => {
    if (isLoading) return

    verifyCode(code).then(async () => {
      await registerUser({
        name: userName, email: userEmail, password: userPassword, colorHex: "#" + code,
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
            beforeInput: <ColorPreview $color={curCode ? "#" + curCode : "#fff"} />,
            type: "text",
            placeholder: "Enter the code",
            register: { ...register("code") },
          }}
        />
        <AuthSubmitBtn $isLoading={isLoading}>OK</AuthSubmitBtn>
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
