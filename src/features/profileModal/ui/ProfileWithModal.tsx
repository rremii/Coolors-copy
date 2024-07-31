import { UserIcon } from "@entities/user/ui/UserIcon.tsx"
import { ProfileModal } from "@features/profileModal/ui/ProfileModal.tsx"
import styled from "styled-components"
import { useState } from "react"

export const ProfileWithModal = () => {

  const [isHovered, setHovered] = useState(false)

  return <Container onMouseLeave={() => setHovered(false)} onMouseEnter={() => setHovered(true)}>
    <UserIcon />
    <ProfileModal isOpen={isHovered} />
  </Container>
}
const Container = styled.div`
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
`