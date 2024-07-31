import styled from "styled-components"
import { UserIcon } from "@entities/user/ui/UserIcon.tsx"
import { useGetMeQuery } from "@entities/user"
import { useEffect } from "react"
import { useGetMe } from "@entities/user/model/useGetMe.tsx"

export const ProfileInfo = () => {

  const { user, isLoading } = useGetMe()

  return <ProfileInfoLayout>
    <UserIcon height={"140px"} width={"140px"} fontSize={80} />

    <div className="name">
      {!isLoading && user ? user.name : "LOADING"}
    </div>


  </ProfileInfoLayout>
}
const ProfileInfoLayout = styled.div`
    padding-top: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 50px;

    .name {
        font-size: 35px;
        font-weight: bold;
        margin-bottom: 100px;
    }
`