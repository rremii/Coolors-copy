import { useGetColorsFromUrl } from "@entities/colors/model/useGetColorsFromUrl.tsx"
import { useCreatePalette } from "@entities/palette/model/useCreatePalette.tsx"
import { useToast } from "@entities/toast/model/useToast"
import { useGetMe } from "@entities/user/model/useGetMe.tsx"
import { checkIfValid } from "@features/savePaletteModal/helpers/checkIfValid.ts"
import { Header } from "@features/savePaletteModal/ui/Header.tsx"
import { InfoForm } from "@features/savePaletteModal/ui/InfoForm.tsx"
import { Options } from "@features/savePaletteModal/ui/Options.tsx"
import { rgbToHex } from "@shared/helpers/rgbToHex.ts"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { Button } from "@shared/ui/Button.tsx"
import { Modal } from "@shared/ui/Modal.tsx"
import { FC, FormEvent, useEffect, useState } from "react"
import styled from "styled-components"

interface Props {
  isOpen: boolean
  closeModal: () => void
}

export interface PaletteInfoFields {
  name: string
}

const toastHideTime = 2 //sec
export const SavePaletteModal: FC<Props> = ({ isOpen, closeModal }) => {
  const { user } = useGetMe()

  const colorsFromUrl = useGetColorsFromUrl()
  const { createPalette, error, isError, isLoading } = useCreatePalette()
  const { addToast } = useToast()

  const [paletteInfo, setPaletteInfo] = useState<PaletteInfoFields>({
    name: "",
  })
  const [apiError, setApiError] = useState("")

  const { reset: resetTimer, time } = useTimer({
    timeGap: 1,
    finalTime: 4,
    callback: () => setApiError(""),
  })

  useEffect(() => {
    if (!isError) return
    setApiError(error?.message)
    resetTimer()

    addToast({
      content: error?.message || "Couldn't save the palette",
      type: "error",
    })
  }, [isError])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (checkIfValid(paletteInfo.name) || !user) return

    createPalette({
      colorsHex: colorsFromUrl.map((color) => rgbToHex(color)),
      name: paletteInfo.name,
      userId: user.id,
    })
      .then(() => {
        closeModal()
        addToast({
          content: "Palette was succesfuly saved",
          type: "info",
        })
      })
      .catch((error) => setApiError(error.message))

    e.target.reset()
  }

  const onInfoChange = ({ name }: PaletteInfoFields) => {
    setPaletteInfo({ name })
  }
  return (
    <SavePaletteLayout $top={"0px"} $left={"0px"} $isOpen={isOpen}>
      <Header onCrossClick={closeModal} />
      <Options />
      <form onSubmit={onSubmit}>
        <InfoForm onChange={onInfoChange} isError={!!apiError} />
        <div className="btn-cont">
          <Button type="submit" isLoading={isLoading} filled>
            Save
          </Button>
        </div>
      </form>
    </SavePaletteLayout>
  )
}
const SavePaletteLayout = styled(Modal)`
  //TODO extract the modal functionality to some abstraction
  border-radius: 14px;
  width: 100%;
  max-width: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  transition: 0.3s all;

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 500px) {
    opacity: 1;
    top: initial;
    bottom: 0;
    transform: translateX(-50%)
      translateY(${({ $isOpen }) => ($isOpen ? 0 : "100%")});
    max-width: initial;
  }

  .btn-cont {
    width: 100%;
    padding: 16px;
    box-shadow: rgba(0, 0, 0, 0.075) 0 -1px;

    button {
      height: 46px;
      width: 100%;
    }
  }
`
