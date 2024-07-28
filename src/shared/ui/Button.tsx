import { FC, ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
  filled?: boolean
}

//TODO nice idea of storybook
export const Button: FC<Props> = ({ children, filled }) => {

  if (filled)
    return <FilledBtn>{children}</FilledBtn>
  else
    return <SimpleBtn>{children}</SimpleBtn>
}
const FilledBtn = styled.button`
    font-family: Inter, sans-serif;
    font-size: 15px;
    font-weight: 500;
    background-color: rgb(0, 102, 255);
    color: white;
    transition: 0.3s;
    padding: 7px 10px;
    border-radius: 10px;

    &:hover {
        background-color: rgb(1, 82, 204);
    }
`

const SimpleBtn = styled.button`
    font-family: Inter, sans-serif;
    font-size: 15px;
    font-weight: 500;
    color: black;
    transition: 0.3s;
    padding: 7px 10px;
    border-radius: 10px;

    &:hover {
        color: rgb(0, 102, 255);
    }
`