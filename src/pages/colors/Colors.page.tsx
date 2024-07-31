import { KeyCodes } from "@shared/hooks/useKeyPress.tsx"
import { useRandomizeColorsKeyPress } from "@widgets/ColorsDragNDrop/model/useRandomizeColorsKeyPress.tsx"
import { useSetDefaultColorsFromUrl } from "@widgets/ColorsDragNDrop/model/useSetDefaultColorsFromUrl.tsx"
import { ColorsDragNDrop } from "@widgets/ColorsDragNDrop/ui/ColorsDragNDrop.tsx"
import styled from "styled-components"
import { useEffect, useRef } from "react"

export const ColorsPage = () => {

  useSetDefaultColorsFromUrl()

  useRandomizeColorsKeyPress(KeyCodes.space)


  // const onKeyDown = () => {
  //   console.log("qwe")
  // }

  // const ref = useRef<HTMLElement | null>(null)
  //
  // useEffect(() => {
  //   if (!ref.current) return
  //
  //   ref.current?.addEventListener("keydown", onKeyDown)
  //
  //   return () => removeEventListener("keydown", onKeyDown)
  //
  // }, [ref])


  return (
    <ColorsPageLayout>
      <ColorsDragNDrop />
    </ColorsPageLayout>
  )
}
const ColorsPageLayout = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`
