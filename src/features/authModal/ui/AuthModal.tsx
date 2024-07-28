import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { FC } from "react"
import { useAppDispatch, useTypedSelector } from "@shared/hooks/storeHooks.ts"
import { Overlay } from "@shared/ui/Overlay.tsx"
import { toggleAuth } from "@entities/auth"
import { authModalContentFabric } from "@features/authModal/model/authModalContentFabric.tsx"


export const AuthModal = () => {

  const dispatch = useAppDispatch()

  const isOpen = useTypedSelector(state => state.Auth.isOpen)
  const stage = useTypedSelector(state => state.Auth.stage)

  const closeAuth = () => {
    dispatch(toggleAuth(false))
  }


  const AuthModalContent = authModalContentFabric(stage)
  return <>
    <Overlay $isActive={isOpen} onClick={closeAuth} $zIndex={100} />
    <AuthModalLayout $isOpen={isOpen}>
      <AuthModalContent authStage={stage} />
    </AuthModalLayout>
  </>
}
const AuthModalLayout = styled(Modal)`
    border-radius: 14px;
    width: 100%;
    max-width: 380px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    transition: 0.3s;
    @media screen and (max-width: 500px) {
        opacity: 1;
        top: initial;
        bottom: 0;
        transform: translateX(-50%) translateY(${({ $isOpen }) => $isOpen ? 0 : "100%"});
        max-width: initial;
    };
}


`