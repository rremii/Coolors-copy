import { Toast } from "@entities/toast/ui/Toast.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import styled from "styled-components"

export const ToastBox = () => {
  const toasts = useTypedSelector((state) => state.toast.toasts)

  return (
    <ToastBoxLayout>
      {toasts.map(({ type, id, content }, i) => {
        const index = toasts.length - 1 - i

        const height = 45
        const styles: React.CSSProperties = {
          height: height + "px",
          transition: "0.3s",
          transform: `translateX(-50%) translateY(-${(height + 10) * index}px)`,
          opacity: index >= 4 ? 0 : 1,
        }

        return (
          <Toast styles={styles} key={id} type={type}>
            {content}
          </Toast>
        )
      })}
    </ToastBoxLayout>
  )
}
const ToastBoxLayout = styled.div`
  pointer-events: none;
  position: fixed;

  overflow-y: hidden;
  overflow-x: visible;
  z-index: 110;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 500px;
`
