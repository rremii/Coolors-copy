import styled from "styled-components"
import { useLogout } from "@entities/auth/model/useLogout.tsx"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/ui/model/UiSlice.ts"

export const Logout = () => {
  const dispatch = useAppDispatch()

  const { logout } = useLogout()


  const handleLogout = async () => {
    dispatch(closeMenu("sidebar"))
    await logout()
  }

  return <LogoutBtn onClick={handleLogout}>
    Sign out
  </LogoutBtn>
}
const LogoutBtn = styled.button` //TODO  reuse all the burger btns
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