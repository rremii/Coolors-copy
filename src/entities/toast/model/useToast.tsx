import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks"
import { ToastType } from "../type"
import { addToast, removeToast } from "./toastSlice"

export const useToast = () => {
  const dispatch = useAppDispatch()

  const toasts = useTypedSelector((state) => state.toast.toasts)

  const add = ({
    content,
    duration = 2,
    type,
  }: {
    content: string
    type: ToastType
    duration?: number //sec
  }) => {
    let maxId = 0
    toasts.forEach((color) => maxId < color.id && (maxId = color.id))

    const id = maxId + 1
    dispatch(addToast({ content, type, id }))

    const timer = setTimeout(() => {
      dispatch(removeToast({ id }))
      clearTimeout(timer)
    }, duration * 1000)
  }

  return {
    addToast: add,
  }
}
