import styled from "styled-components"
import { FC, ReactNode } from "react"

interface Props {
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
}

export const Header: FC<Props> = ({ left, center, right }) => {

  return <HeaderLayout>
    <div className="left">
      {left}
    </div>
    <div className="center">
      {center}
    </div>
    <div className="right">
      {right}
    </div>
  </HeaderLayout>
}
const HeaderLayout = styled.header`
    padding: 10px;
    height: 60px;
    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }

`



