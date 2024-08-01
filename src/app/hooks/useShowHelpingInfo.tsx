import { useToast } from "@entities/toast/model/useToast"
import { useScreenSize } from "@shared/hooks/useScreenSize"
import { useEffect } from "react"

export const useShowHelpingInfo = () => {
  const { addToast } = useToast()
  const isMobile = useScreenSize(768)
  let wasShown = false
  useEffect(() => {
    if (isMobile || wasShown) return

    addToast({
      content: "You can generate new colors by pressing the space",
      type: "info",
      duration: 4,
    })
    wasShown = true
  }, [])
}
