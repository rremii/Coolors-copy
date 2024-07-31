import {
  CrossCont,
  FooterCont,
  LinkWithText,
  SubHeader,
} from "@features/authModal/ui/Content/ContentLayout.tsx"
import { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { AuthStages, setAuthStage, toggleAuth } from "@entities/auth"
import Cross from "@icons/cross.svg?react"
import { SignUpCodeForm } from "@entities/auth/ui/SignUpCodeForm.tsx"
import styled from "styled-components"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { useConfirmEmail } from "@entities/auth/model/useConfirmEmail.tsx"


export const SignUpCodeContent: FC = () => {


  const dispatch = useAppDispatch()

  const email = useTypedSelector(state => state.Auth.email)

  const { confirmEmail } = useConfirmEmail()

  const { reset: resetTimer, time, timerState } = useTimer({
    finalTime: 60,
    timeGap: 1,
    isUnversed: true,
  })

  const sendTheCodeAgain = async () => {
    if (timerState === "running") return
    resetTimer()

    await confirmEmail(email)
  }

  const closeModal = () => {
    dispatch(toggleAuth(false))
  }

  return <>
    <Header>
      <CrossCont onClick={closeModal}>
        <Cross />
      </CrossCont>
      <h2>Confirm your email</h2>
    </Header>
    <SubHeader style={{ textAlign: "justify" }}>Enter the color code received via email, or click on the link,
      to <strong>confirm your
        account</strong></SubHeader>

    <SignUpCodeForm />

    <FooterCont>
      <LinkWithText>
        Email not received?
        <h4 onClick={sendTheCodeAgain} className="high-lighted">
          {timerState === "running" ? " Send again in " + time : "Send again"}
        </h4>
      </LinkWithText>
    </FooterCont>
  </>
}
const Header = styled.header`
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px;

    margin-bottom: 24px;
    position: relative;

    & div:first-child {
        padding: 0;
        margin: 0;
        width: 13px;
        height: 13px;
    }

    h2 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        font-size: 16px;
        font-weight: 500;
    }
`