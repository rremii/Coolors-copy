import { Header } from "@shared/ui/Header.tsx"
import { useScreenSize } from "@shared/hooks/useScreenSize.tsx"
import { Burger } from "@widgets/Header/ui/Burger.tsx"
import styled from "styled-components"
import { OpenAuthBtn } from "@features/authModal/ui/OpenAuthBtn.tsx"
import { Button } from "@shared/ui/Button.tsx"
import { useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { ProfileWithModal } from "@features/profileModal/ui/ProfileWithModal.tsx"
import { Logo } from "@features/logo/ui/Logo.tsx"


export const HeaderWithBurger = () => {


  const isLoggedIn = useTypedSelector(state => state.Auth.isLoggedIn)

  const isMobile = useScreenSize(768)


  const headerNodes = isMobile ? {
    left: <Burger />,
    center: <Logo />,
  } : {
    left: <Logo />,
    right: <AuthBtnsContainer>
      {isLoggedIn === "success" ? (
        <ProfileWithModal />
      ) : (<>
        <OpenAuthBtn authStage="sign-in" buttonNode={<Button>Sign in</Button>} />
        <OpenAuthBtn authStage="sign-up-email" buttonNode={<Button height={"36px"} filled>Sign up</Button>} />
      </>)}
    </AuthBtnsContainer>,
  }

  return <Header {...headerNodes} />
}

const AuthBtnsContainer = styled.div`
    height: 100%;

    display: flex;
    gap: 10px;
    align-items: center;

`