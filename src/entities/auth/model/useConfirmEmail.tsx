import { useConfirmEmailMutation } from "../api/AuthApi"

export const useConfirmEmail = () => {
  const [confirmEmail, { isLoading, isError, isSuccess, error }] =
    useConfirmEmailMutation()

  const handleConfirm = async (code: string) => {
    await confirmEmail(code)
  }

  return {
    confirmEmail: handleConfirm,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
