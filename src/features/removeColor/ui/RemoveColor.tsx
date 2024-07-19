import { SettingCell } from "@shared/ui/SettingCell.tsx"
import Cross from "@icons/cross.svg?react"
import { useRemoveColorFromUrl } from "@features/removeColor/model/useRemoveColorFromUrl.tsx"
import { FC, useEffect, useRef, useState } from "react"
import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
import { removeColor } from "@entities/colors/model/colorsSlice.ts"
import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
import { WithDelayDeleting } from "@entities/colors/model/with-deleting.tsx"

interface Props extends WithDelayDeleting {
  index: number
  isHidden: boolean
}


export const RemoveColor: FC<Props> = ({ index, isHidden, delayDeleteCb }) => {
  const dispatch = useAppDispatch()

  const { removeColorFromUrl } = useRemoveColorFromUrl(index)


  const colors = useGetColorsFromUrl()

  const handleRemoveColor = () => {
    if (colors.length <= 2) return

    removeColorFromUrl()
    dispatch(removeColor({ index }))
  }


  return <SettingCell onClick={delayDeleteCb<void, void>(handleRemoveColor)} icon={<Cross />} isHidden={isHidden} />
}


// import { SettingCell } from "@shared/ui/SettingCell.tsx"
// import Cross from "@icons/cross.svg?react"
// import { useRemoveColorFromUrl } from "@features/removeColor/model/useRemoveColorFromUrl.tsx"
// import { FC, useEffect, useRef, useState } from "react"
// import { useAppDispatch } from "@shared/hooks/storeHooks.ts"
// import { removeColor } from "@entities/colors/model/colorsSlice.ts"
// import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
// import { useDelay } from "@shared/hooks/useDelay.tsx"
//
// interface Props {
//   index: number
//   isHidden: boolean
// }
//
// export const RemoveColor: FC<Props> = ({ index, isHidden }) => {
//   const dispatch = useAppDispatch()
//
//   const { removeColorFromUrl } = useRemoveColorFromUrl(index)
//
//
//   const colors = useGetColorsFromUrl()
//
//   const handleRemoveColor = () => {
//     if (colors.length <= 2) return
//
//     removeColorFromUrl()
//     dispatch(removeColor({ index }))
//   }
//
//   // const [isDeleting, removeWithDelay] = useDelay<void, void>(handleRemoveColor, 500)
//   const [isDeleting, delayCb] = useDelay(500)
//
//
//   useEffect(() => {
//     console.log(isDeleting)
//   }, [isDeleting])
//
//   return <SettingCell onClick={delayCb<void, void>(handleRemoveColor)} icon={<Cross />} isHidden={isHidden} />
//   // return <SettingCell onClick={removeWithDelay} icon={<Cross />} isHidden={isHidden} />
// }