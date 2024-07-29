import { AuthStages, toggleAuth } from "@entities/auth"
import { authModalContentFabric } from "@features/authModal/model/authModalContentFabric.tsx"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Modal } from "@shared/ui/Modal.tsx"
import { Overlay } from "@shared/ui/Overlay.tsx"
import styled from "styled-components"

export const AuthModal = () => {
  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector((state) => state.Auth.isOpen)
  const stage = useTypedSelector((state) => state.Auth.stage)

  const closeAuth = () => {
    dispatch(toggleAuth(false))
  }

  const AuthModalContent = authModalContentFabric(stage)
  return (
    <>
      <Overlay $isActive={isOpen} onClick={closeAuth} $zIndex={100} />
      <AuthModalLayout $authStage={stage} $isOpen={isOpen}>
        <AuthModalContent />
      </AuthModalLayout>
    </>
  )
}
const AuthModalLayout = styled(Modal)<{
  $authStage: AuthStages
}>`
    overflow: hidden;
    border-radius: 14px;
    width: 100%;
    max-width: 380px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    transition: 0.3s all;
    height: 100%;
    max-height: ${({ $authStage }: { $authStage: AuthStages }) => {
      if ($authStage === "sign-in") return "360px"
      if ($authStage === "sign-up-email") return "420px"
      if ($authStage === "sign-up-code") return "340px"
    }};

    @media screen and (max-width: 500px) {
        opacity: 1;
        top: initial;
        bottom: 0;
        transform: translateX(-50%) translateY(${({ $isOpen }) => ($isOpen ? 0 : "100%")});
        max-width: initial;
    };
}


`
