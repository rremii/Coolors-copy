import { useLogout } from "@entities/auth/model/useLogout.tsx"
import { useToast } from "@entities/toast/model/useToast"
import { closeMenu } from "@entities/ui/model/UiSlice.ts"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import styled from "styled-components"

export const Logout = () => {
  const dispatch = useAppDispatch()

  const { logout } = useLogout()
  const { addToast } = useToast()

  const handleLogout = async () => {
    dispatch(closeMenu("sidebar"))

    addToast({
      content: "You were logged out",
      type: "info",
      duration: 2,
    })
    await logout()
  }

  return <LogoutBtn onClick={handleLogout}>Sign out</LogoutBtn>
}
const LogoutBtn = styled.button`
  //TODO  reuse all the burger btns
  font-size: 18px;
  font-weight: 400;
  height: 34px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  width: 100%;
  border-radius: 10px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }

  @media screen and (max-width: 768px) {
    &:hover {
      background-color: white;
    }
  }
`
