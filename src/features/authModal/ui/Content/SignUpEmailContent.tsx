import {
  CrossCont,
  FooterCont,
  Header,
  LinkWithText,
  SubHeader,
} from "@features/authModal/ui/Content/ContentLayout.tsx"
import Cross from "@icons/cross.svg?react"
import { FC } from "react"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { AuthStages, setAuthStage, toggleAuth } from "@entities/auth"


export const SignUpEmailContent: FC = () => {
  const dispatch = useAppDispatch()

  const goToAuthStage = (stage: AuthStages) => {
    dispatch(setAuthStage(stage))
  }

  const closeModal = () => {
    dispatch(toggleAuth(false))
  }

  return <>
    <div>
      <CrossCont onClick={closeModal}>
        <Cross />
      </CrossCont>
    </div>
    <Header>Sign up</Header>
    <SubHeader>Create a free account with your email.</SubHeader>
    qwewqe
    <FooterCont>
      <LinkWithText>Already have an account?
        <h4
          onClick={() => goToAuthStage("sign-in")}
          className="high-lighted"
        >Sign in</h4>
      </LinkWithText>
    </FooterCont>
  </>
}