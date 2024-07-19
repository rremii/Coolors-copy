import styled from "styled-components"
import { FC, ReactNode, useEffect, useState } from "react"
import { colorToString } from "@shared/helpers/colorToString.ts"
import { ColorType } from "@entities/colors/types.ts"


interface Props {
  color: ColorType
  settingsNodes: ReactNode[]
  colorNameNode: ReactNode
  colorHexNode: ReactNode
  addColorNode: ReactNode
  hasMountAnimation: boolean
  hasUnMountAnimation: boolean
  onHover: (isHovered: boolean) => void
}


export const ColorLineBox: FC<Props> = ({
                                          color,
                                          colorNameNode,
                                          colorHexNode,
                                          addColorNode,
                                          settingsNodes,
                                          hasMountAnimation,
                                          hasUnMountAnimation,
                                          onHover
                                        }) => {


  const onMouseEnter = () => {
    onHover(true)
  }
  const onMouseLeave = () => {
    onHover(false)
  }
  return <LineLayout $hasMountAnimation={hasMountAnimation}
                     $hasUnMountAnimation={hasUnMountAnimation}
                     $color={colorToString(color)}
                     className="ColorLine"
                     onMouseLeave={onMouseLeave}
                     onMouseEnter={onMouseEnter}
  >
    <div className="content-box">
      <SettingsBox>
        {settingsNodes}
      </SettingsBox>
      <ColorHexBox>
        {colorHexNode}
      </ColorHexBox>
      <ColorNameBox>
        {colorNameNode}
      </ColorNameBox>
    </div>
    <AddColorCont>
      {addColorNode}
    </AddColorCont>
  </LineLayout>
}
const LineLayout = styled.div<{
  $colorStr?: string
  $hasMountAnimation?: boolean
  $hasUnMountAnimation?: boolean
}>`
    background-color: ${({ $color }) => $color || "black"};
    padding-bottom: 80px;
    position: relative;
    width: 100%;


    ${({ $hasMountAnimation }) => $hasMountAnimation ?
            "animation: 0.4s growUp forwards;" :
            "animation: 0s growUp forwards;"}
    ${({ $hasUnMountAnimation }) => $hasUnMountAnimation ?
            "animation: 0.4s growDown forwards;" : ""};


    @keyframes growUp {
        0% {
            width: 0;
        }

        100% {
            width: 100%;
        }
    }
    @keyframes growDown {
        0% {
            width: 100%;
        }
        100% {
            width: 0;
        }
    }

    .content-box {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
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