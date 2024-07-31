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
    padding: 0 20px;
    //height: 60px;
    //min-height: 60px;
    flex: 0 0 60px;

    width: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.075) 0 1px;

    & > div {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

    }

`



