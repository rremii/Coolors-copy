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


export const SignUpCodeContent: FC = () => {


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
    <Header>Confirm your email</Header>
    <SubHeader>Enter the color code received via email, or click on the link, to <strong>confirm your
      account</strong></SubHeader>
    qwewqe
    <FooterCont>
      <LinkWithText>
        Email not received?
        <h4
          onClick={() => goToAuthStage("sign-up-email")}
          className="high-lighted"
        >Send Again</h4>
      </LinkWithText>
    </FooterCont>
  </>
}