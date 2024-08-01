import { FC, ReactNode } from "react"
import styled from "styled-components"

interface Props {
  children: ReactNode
  filled?: boolean
  isLoading?: boolean
  height?: string
  width?: string
  onClick?: () => void
  type?: "submit" | "reset" | "button"
}

//TODO nice idea of storybook or make a fabric
export const Button: FC<Props> = ({
  children,
  filled,
  isLoading,
  height,
  width,
  onClick,
  type,
}) => {
  if (filled)
    return (
      <FilledBtn
        type={type}
        $width={width}
        $height={height}
        onClick={onClick}
        $isLoading={isLoading}
      >
        {children}
      </FilledBtn>
    )
  else return <SimpleBtn onClick={onClick}>{children}</SimpleBtn>
}
const FilledBtn = styled.button<{
  isLoading?: boolean
  $width?: string
  $height?: string
}>`
  font-family: Inter, sans-serif;
  font-size: 15px;
  font-weight: 500;
  //background-color: rgb(0, 102, 255);
  color: white;
  transition: 0.3s;
  padding: 7px 10px;
  border-radius: 10px;
  position: relative;
  background: ${({ $isLoading }) =>
    $isLoading ? "rgb(0,91,231)" : "rgb(0, 102, 255)"};

  height: ${({ $height }) => $height || "46px"};
  width: ${({ $width }) => $width || "100%"};

  &:hover {
    background-color: rgb(1, 82, 204);
  }

  &::after {
    display: none;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border-top: 2px solid white;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    `
      color: transparent;

      &::after {
          display:initial;
          animation: spin 0.7s infinite linear ;
      } 
    `};

  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
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
