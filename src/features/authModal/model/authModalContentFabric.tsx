import { AuthStages, setAuthStage, toggleAuth } from "@entities/auth"
import { FC } from "react"
import { SignInContent } from "@features/authModal/ui/Content/SignInContent.tsx"
import { SignUpEmailContent } from "@features/authModal/ui/Content/SignUpEmailContent.tsx"
import { SignUpCodeContent } from "@features/authModal/ui/Content/SignUpCodeContent.tsx"


//TODO ask if it worth using fabric
export const authModalContentFabric = (authStage: AuthStages): FC => {

  switch (authStage) {
    case "sign-up-code":
      return SignUpCodeContent
    case "sign-in":
      return SignInContent
    case "sign-up-email":
      return SignUpEmailContent
    default :
      return SignInContent
  }
}
