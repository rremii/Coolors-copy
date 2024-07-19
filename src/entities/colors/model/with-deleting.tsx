import { FC } from "react"
import { useDelay } from "@shared/hooks/useDelay.tsx"

export type DelayDeleteCbType = <ArgsT, ReturnT>(cb: (args: ArgsT) => void) => (args: ArgsT) => ReturnT

export interface WithDeleting {
  isDeleting: boolean
}

export interface WithDelayDeleting {
  delayDeleteCb: DelayDeleteCbType
}

export type WithDeletingProps = WithDeleting & WithDelayDeleting

export const withDeleting = (Component: FC, delayTime: number) => (props) => {

  const [isDeleting, delayDeleteCb] = useDelay(delayTime)


  return <Component isDeleting={isDeleting} delayDeleteCb={delayDeleteCb} {...props} />

}