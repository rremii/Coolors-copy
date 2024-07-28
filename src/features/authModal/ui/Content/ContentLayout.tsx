import styled from "styled-components"

export const CrossCont = styled.div`
    cursor: pointer;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0 0;

    margin-left: 16px;

    svg, img {
        fill: black;
        width: 20px;
        height: 20px;
    }

`

export const Header = styled.h2`
    text-align: center;
    font-size: 35px;
    margin-bottom: 10px;
    margin-top: 10px;
    font-weight: 600;
    padding: 0 24px;
`

export const SubHeader = styled.h3`
    text-align: center;
    font-size: 16px;
    color: rgb(125, 124, 131);
    padding: 0 24px;
`


export const FooterCont = styled.footer`

    border-top: solid 1px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 16px 0;
`

export const LinkWithText = styled.a`
    display: flex;
    gap: 3px;
    font-size: 14px;

    .high-lighted {
        cursor: pointer;
        color: rgb(0, 100, 249);
        font-size: inherit;
    }
`