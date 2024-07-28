import {
  CrossCont,
  FooterCont,
  Header,
  LinkWithText,
  SubHeader,
} from "@features/authModal/ui/Content/ContentLayout.tsx"
import { FC } from "react"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { AuthStages, setAuthStage, toggleAuth } from "@entities/auth"
import Cross from "@icons/cross.svg?react"

export const SignInContent: FC = () => {
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
    <Header>Sign in</Header>
    <SubHeader>Sign in with your email here.</SubHeader>
    qwewqe
    <FooterCont>
      <LinkWithText>
        Don&apos;t have an account?
        <h4
          onClick={() => goToAuthStage("sign-up-email")}
          className="high-lighted"
        >Sign up</h4>
      </LinkWithText>
    </FooterCont>
  </>
}