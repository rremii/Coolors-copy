import { withAuthRedirect } from "@entities/auth/model/with-authRedirect.tsx"
import { ProfileInfo } from "@widgets/ProfileInfo/ui/ProfileInfo.tsx"
import { Palettes } from "@widgets/palettes/ui/Palettes.tsx"
import styled from "styled-components"

const ProfilePage = () => {
  return (
    <ProfilePageLayout>
      <ProfileInfo />
      <Palettes />
    </ProfilePageLayout>
  )
}

export const ProfilePageWithAuth = withAuthRedirect(ProfilePage)
const ProfilePageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`
