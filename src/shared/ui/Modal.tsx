import styled from "styled-components"

export const Modal = styled.article<{
  $isOpen?: boolean
  $x?: string
  $y?: string
}>`
    position: fixed;
    max-width: 300px;
    width: 90vw;
    transition: 0.3s opacity;

    top: ${({ $y }) => $y};
    left: ${({ $x }) => $x};

    z-index: 20;
    background-color: white;
    pointer-events: ${({ $isOpen }) => ($isOpen ? "initial" : "none")};
    display: block;

    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};



`
