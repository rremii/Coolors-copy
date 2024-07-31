import styled from "styled-components"
import { ProfileIcon } from "@shared/ui/ProfileIcon.tsx"
import { FC, ReactNode } from "react"
import { useGetMe } from "@entities/user/model/useGetMe.tsx"
import { ColorType } from "@entities/colors/types.ts"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import { hexToRgb } from "@shared/helpers/hexToRgb.ts"


interface Props {
  width?: string
  height?: string
  fontSize?: number
}


const calcUserBgColor = (color: ColorType) => {

  const r = color[0] + 110
  const g = color[1] + 110
  const b = color[2] + 110

  return [(r > 230) ? 230 : r, (g > 230) ? 230 : g, (b > 230) ? 230 : b]
}

export const UserIcon: FC<Props> = ({ height, width, fontSize }) => {

  const { user, isLoading } = useGetMe()

  if (!user) return


  const userBgColor = calcUserBgColor(hexToRgb(user.colorHex))


  return <ProfileIcon $width={width} $height={height} $color={user.colorHex} $bcColor={rgbToHex(userBgColor)}
                      $fontSize={fontSize}>{user.name.slice(0, 1)}</ProfileIcon>
}
