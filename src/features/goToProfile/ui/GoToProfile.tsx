import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { closeMenu } from "@entities/ui/model/UiSlice.ts"

export const GoToProfile = () => {

  const dispatch = useAppDispatch()

  const onClick = () => {
    dispatch(closeMenu("sidebar"))
  }

  return <GoToProfileBtn onClick={onClick} to={"/profile"}>
    Profile
  </GoToProfileBtn>
}
const GoToProfileBtn = styled(NavLink)`
    height: 34px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    width: 100%;
    border-radius: 10px;
    font-weight: 400;

    font-size: 18px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.12);
    }

    @media screen and (max-width: 768px) {
        &:hover {
            background-color: white;
        }
    }
`