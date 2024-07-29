import { OpenAuthBtn } from "@features/authModal/ui/OpenAuthBtn.tsx"
import { Modal } from "@shared/ui/Modal.tsx"
import { FC } from "react"
import styled from "styled-components"

interface Props {
  isOpen: boolean
}

export const BurgerModal: FC<Props> = ({ isOpen }) => {
  return (
    <BurgerModalLayout $top={"0"} $left={"0"} $isOpen={isOpen}>
      <div className="section">
        <div className="title">ACCOUNT</div>
        <OpenAuthBtn
          authStage="sign-in"
          buttonNode={<OpenButton>Sign in</OpenButton>}
        />
        <OpenAuthBtn
          authStage="sign-up-email"
          buttonNode={<OpenButton>Sign up</OpenButton>}
        />
      </div>
    </BurgerModalLayout>
  )
}
const OpenButton = styled.button`
  width: 100%;
  display: flex;
  font-size: 18px;
  padding: 5px 0;
  margin: 5px 0;
  font-weight: 500;
`
const BurgerModalLayout = styled(Modal)`
  opacity: 1;
  transition: 0.3s transform;
  transform: translateX(${({ $isOpen }) => ($isOpen ? "0" : "-100%")});
  background-color: white;
  width: 270px;
  height: 100%;
  padding: 20px 30px;

  .section {
    display: flex;
    flex-direction: column;

    .title {
      font-size: 18px;
      font-weight: 600;
      color: rgb(177, 176, 181);
      margin-bottom: 15px;
    }
  }
`
