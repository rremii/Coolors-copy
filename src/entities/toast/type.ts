export type ToastType = "info" | "error"

export interface IToast {
  type: ToastType
  content: string
  id: number
}