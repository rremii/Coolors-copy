import styled from "styled-components"

export const AuthSubmitBtn = styled.button<{
  $isLoading?: boolean
}>`
    width: 100%;

    height: 45px;
    border-radius: 10px;
    background: ${({ $isLoading }) => ($isLoading ? "rgb(0,91,231)" : "rgb(0, 102, 255)")};
    color: #ffffff;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    position: relative;


    &::after {
        display: none;
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border-top: 2px solid white;
    }

    ${({ $isLoading }) => $isLoading && `
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
