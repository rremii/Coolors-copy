import { useEffect } from "react"

export enum KeyCodes {
  space = "Space",
}

export const useKeyPress = (keyCode: KeyCodes, cb: () => void) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === keyCode as string) cb()
  }

  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress)

    return () => {
      document.removeEventListener("keypress", handleKeyPress)
    }
  }, [handleKeyPress])
}
