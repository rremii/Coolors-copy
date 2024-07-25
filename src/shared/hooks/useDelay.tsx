// import { useEffect, useState } from "react"
//
// export function useDelay<ArgsT, ReturnT>(cb: (args: ArgsT) => ReturnT, delay: number = 200) {
//
//   const [isDelaying, setDelaying] = useState<boolean | null>(null)
//   const [args, setArgs] = useState<ArgsT | null>(null)
//
//   useEffect(() => {
//     if (isDelaying === false && cb) {
//       cb(args)
//       setArgs(null)
//     }
//   }, [isDelaying])
//
//   function delayedCb(args: ArgsT): ReturnT {
//     if (isDelaying) return
//     setDelaying(true)
//     setArgs(args)
//
//     const timerId = setTimeout(() => {
//       setDelaying(false)
//
//       if (timerId)
//         window.clearTimeout(+timerId)
//     }, delay)
//   }
//
//   return [isDelaying, delayedCb]
//
// }

import { useState } from "react"
import { flushSync } from "react-dom"

export function useDelay(delay = 200) {
  const [isDelaying, setDelaying] = useState(false)

  function delayedCb<ArgsT, ReturnT>(cb: (args: ArgsT) => void) {
    return (args: ArgsT): ReturnT => {
      if (isDelaying) return

      setDelaying(true)

      const timerId = setTimeout(() => {
        flushSync(() => {
          setDelaying(false)
        })
        flushSync(() => {
          cb(args)
        })

        if (timerId) window.clearTimeout(+timerId)
      }, delay)
    }
  }

  return [isDelaying, delayedCb]
}
