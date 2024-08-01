import { useConfirmEmailMutation } from "../api/AuthApi"

export const useConfirmEmail = () => {
  const [confirmEmail, { isLoading, isError, isSuccess, error }] =
    useConfirmEmailMutation()

  const handleConfirm = async (email: string) => {
    return await confirmEmail(email)
  }

  return {
    confirmEmail: handleConfirm,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
