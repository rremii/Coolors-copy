import styled from "styled-components"
import { FormField } from "@shared/ui/FormField.tsx"
import { useLogin } from "@entities/auth/model/useLogin.tsx"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { signInSchema } from "@entities/auth/constants/signInValidateSchemas.ts"
import { useTimer } from "@shared/hooks/useTimer.tsx"
import { ChangeEvent, FC, useEffect, useState } from "react"
import { paletteInfoSchema } from "@features/savePaletteModal/constants/paletteInfoSchema.ts"
import { Simulate } from "react-dom/test-utils"
import reset = Simulate.reset
import { PaletteInfoFields } from "@features/savePaletteModal/ui/SavePaletteModal.tsx"
import { checkIfValid } from "@features/savePaletteModal/helpers/checkIfValid.ts"


interface Props {
  isError: boolean
  onChange: (formValues: PaletteInfoFields) => void
}

export const InfoForm: FC<Props> = ({ onChange, isError }) => {

  const [errorMsg, setErrorMsg] = useState("")


  const handleChange = (e: React.ChangeEvent) => {
    if (!e.target) return
    const name = e.target?.value

    const error = checkIfValid(name)
    
    if (error) setErrorMsg(error)
    else setErrorMsg("")

    onChange({ name })
  }


  return <InfoFormLayout>
    <FormField
      label="Name" isError={!!errorMsg || isError}
      input={{
        type: "text",
        placeholder: "My new palette",
        onChange: handleChange,
      }} />
  </InfoFormLayout>
}
const InfoFormLayout = styled.div`
    padding: 24px;

    input {
        height: 46px !important;
    }
`