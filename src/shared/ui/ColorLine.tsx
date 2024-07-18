import styled from "styled-components"
import { FC, ReactNode, useState } from "react"
import { colorToString } from "@shared/helpers/colorToString.ts"
import { ColorType } from "@entities/colors/types.ts"


interface Props {
  color: ColorType
  settingsNodes: Array<FC>
  colorNameNode: ReactNode
  colorHexNode: ReactNode
  addColorNode: ReactNode
  withAnimation: boolean
  index: number
}


export const ColorLine: FC<Props> = ({
                                       color,
                                       colorNameNode,
                                       colorHexNode,
                                       addColorNode,
                                       settingsNodes,
                                       withAnimation,
                                       index
                                     }) => {

  const [isHovered, setHovered] = useState(false)


  const onMouseEnter = () => {
    setHovered(true)
  }
  const onMouseLeave = () => {
    setHovered(false)
  }
  return <LineLayout $withAnimation={withAnimation} onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}
                     className="ColorLine"
                     $color={colorToString(color)}>
    <SettingsBox>
      {settingsNodes.map((Setting, i) => <Setting index={index} isHidden={!isHovered} key={i} />)}
    </SettingsBox>
    <ColorHexBox>
      {colorHexNode}
    </ColorHexBox>
    <ColorNameBox>
      {colorNameNode}
    </ColorNameBox>
    <AddColorCont>
      {addColorNode}
    </AddColorCont>
  </LineLayout>
}
const LineLayout = styled.div<{
  $colorStr?: string
  $withAnimation?: boolean
}>`
    background-color: ${({ $color }) => $color || "black"};
    padding-bottom: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    position: relative;
    animation: ${({ $withAnimation }) => $withAnimation ? "0.5s growUp forwards" : "0s growUp forwards"};
    width: 100%;
    @keyframes growUp {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }
`
const SettingsBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`
const ColorHexBox = styled.div`
    font-size: 30px;
    margin: 20px 0;
    font-weight: bold; //todo delete
`
const ColorNameBox = styled.div`
    font-size: 12px;
`

const AddColorCont = styled.div`
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) translateX(50%);
    z-index: 1;
`