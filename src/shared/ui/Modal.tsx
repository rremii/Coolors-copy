import styled from "styled-components"

export const Modal = styled.article<{
  $isOpen?: boolean
  $left?: string
  $top?: string
}>`
    position: fixed;
    display: block;


    top: ${({ $top }) => $top};
    left: ${({ $left }) => $left};

    z-index: 20;
    background-color: white;

    transition: 0.3s opacity;
    pointer-events: ${({ $isOpen }) => ($isOpen ? "initial" : "none")};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
`
