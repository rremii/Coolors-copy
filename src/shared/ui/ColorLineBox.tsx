import styled from "styled-components"
import { FC, forwardRef, ReactNode, useEffect, useRef } from "react"
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
  style?: React.CSSProperties
}


export const ColorLineBox: FC<Props> = forwardRef(({
                                                     color,
                                                     colorNameNode,
                                                     colorHexNode,
                                                     addColorNode,
                                                     settingsNodes,
                                                     hasMountAnimation,
                                                     hasUnMountAnimation,
                                                     onHover,
                                                     style
                                                   }, ref) => {
  const onMouseEnter = () => {
    onHover(true)
  }
  const onMouseLeave = () => {
    onHover(false)
  }


  return <ColorLineBoxLayout
    style={style}
    ref={ref}
    className="ColorLineBox"
    onMouseLeave={onMouseLeave}
    onMouseEnter={onMouseEnter}
    $hasMountAnimation={hasMountAnimation}
    $hasUnMountAnimation={hasUnMountAnimation}
    $color={colorToString(color)}
  >
    <div className="content-box">
      <SettingsBox className="SettingsBox">
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
  </ColorLineBoxLayout>
})
export const ColorLineBoxLayout = styled.div<{
  $colorStr?: string
  $hasMountAnimation?: boolean
  $hasUnMountAnimation?: boolean
}>`
    background-color: ${({ $color }) => $color || "black"};
    padding-bottom: 80px;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
    ${({ $hasMountAnimation }) => $hasMountAnimation ?
            "animation: 0.4s growUp forwards;" :
            "animation: 0s growUp forwards;"}
    ${({ $hasUnMountAnimation }) => $hasUnMountAnimation ?
            "animation: 0.4s growDown forwards;" : ""};


    &:hover .SettingsBox * {
        opacity: 1;
    }

    .SettingsBox * {
        opacity: 0;
    }


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

    @media screen and (max-width: 768px) {
        padding-bottom: 0;

        @keyframes growUp {
            0% {
                height: 0;
            }
            100% {
                height: 100%;
            }
        }
        @keyframes growDown {
            0% {
                height: 100%;
            }
            100% {
                height: 0;
            }
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
        @media screen and (max-width: 768px) {
            padding: 0 30px;
            justify-content: space-between;
            flex-direction: row-reverse;
        }
    }

`
const SettingsBox = styled.div`

    display: flex;
    flex-direction: column;
    gap: 5px;
    @media screen and (max-width: 768px) {
        flex-direction: row;
    }
`
const ColorHexBox = styled.div`
    font-size: 30px;
    margin: 20px 0;
    font-weight: bold; //todo delete
`
const ColorNameBox = styled.div`
    @media screen and (max-width: 768px) {
        display: none;
    }
    font-size: 12px;
`

const AddColorCont = styled.div`

    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) translateX(50%);
    z-index: 100;
    @media screen and (max-width: 768px) {
        top: 100%;
        right: 50%;
        transform: translateY(-50%) translateX(50%);
    }
`