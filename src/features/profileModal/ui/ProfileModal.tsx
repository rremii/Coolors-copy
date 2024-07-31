import styled from "styled-components"
import { Modal } from "@shared/ui/Modal.tsx"
import { FC } from "react"
import { GoToProfile } from "@features/goToProfile/ui/GoToProfile.tsx"
import { Logout } from "@features/logout/ui/Logout.tsx"


interface Props {
  isOpen: boolean
}

export const ProfileModal: FC<Props> = ({ isOpen }) => {

  return <ProfileModalLayout $isOpen={isOpen}>
    <GoToProfile />
    <Logout />
  </ProfileModalLayout>
}
const ProfileModalLayout = styled(Modal)`
    padding: 8px 8px 8px 8px;
    box-shadow: rgba(0, 0, 0, 0.05) 0 0 0 1px, rgba(0, 0, 0, 0.12) 0 15px 30px 0px;
    position: absolute;
    top: 100%;
    right: 0;
    transform: translateY(-3px) translateX(15px);
    background-color: white;
    width: 125px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    align-items: flex-start;



`