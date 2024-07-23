import { FC } from "react"
import { IPicker } from "@features/colorPicker/model/types.ts"
import { RGBPicker } from "@shared/modules/RGBPicker/RGBPicker.tsx"


export const RGBPickerAdapter: FC<IPicker> = (props) => {
  
  return <RGBPicker {...props} />
}
// const RGBPickerLayout = styled.div`
//
// `