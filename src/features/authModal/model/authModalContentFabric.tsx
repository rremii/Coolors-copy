import { AuthStages } from "@entities/auth"
import { SignInContent } from "@features/authModal/ui/Content/SignInContent.tsx"
import { SignUpCodeContent } from "@features/authModal/ui/Content/SignUpCodeContent.tsx"
import { SignUpEmailContent } from "@features/authModal/ui/Content/SignUpEmailContent.tsx"
import { FC } from "react"

//TODO ask if it worth using fabric | ui logic in redux
export const authModalContentFabric = (authStage: AuthStages): FC => {
  switch (authStage) {
    case "sign-in":
      return SignInContent
    case "sign-up-email":
      return SignUpEmailContent
    case "sign-up-code":
      return SignUpCodeContent
    default:
      return SignInContent
  }
}
