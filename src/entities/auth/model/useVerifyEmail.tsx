import { useConfirmEmailMutation, useVerifyCodeMutation } from "../api/AuthApi"

export const useVerifyCode = () => {
  const [verifyCode, { isLoading, isError, isSuccess, error }] =
    useVerifyCodeMutation()

  const handleVerify = async (code: string) => {
    return await verifyCode(code).unwrap()
  }

  return {
    verifyCode: handleVerify,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}