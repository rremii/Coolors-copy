import styled from "styled-components"

export const Spinner = styled.div<{
  $width?: string
  $height?: string
  $color?: string
  $size?: number
}>`
  border-radius: 50%;

  width: ${({ $width }) => $width || "50px"};
  height: ${({ $height }) => $height || "50px"};

  border-top: ${({ $size }) => $size || "3px"} solid
    ${({ $color }) => $color || "black"};

  animation: spin 0.7s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`
