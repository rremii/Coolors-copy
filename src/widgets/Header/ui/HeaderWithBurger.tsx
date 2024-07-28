import { Header } from "@shared/ui/Header.tsx"
import { useScreenSize } from "@shared/hooks/useScreenSize.tsx"
import { Burger } from "@widgets/Header/ui/Burger.tsx"
import styled from "styled-components"
import { OpenAuthBtn } from "@features/authModal/ui/OpenAuthBtn.tsx"
import { Button } from "@shared/ui/Button.tsx"
import Logo from "@icons/logo.svg?react"


export const HeaderWithBurger = () => {


  const isMobile = useScreenSize(768)


  const headerNodes = isMobile ? {
    left: <Burger />,
    center: <Logo />,
  } : {
    left: <Logo />,
    right: <AuthBtnsContainer>
      <OpenAuthBtn authStage="sign-in" buttonNode={<Button>Sign in</Button>} />
      <OpenAuthBtn authStage="sign-up-email" buttonNode={<Button filled>Sign up</Button>} />
    </AuthBtnsContainer>,
  }

  return <Header {...headerNodes} />
}

const AuthBtnsContainer = styled.div`

    display: flex;
    gap: 10px;
    align-items: center;

`