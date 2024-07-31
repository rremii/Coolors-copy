import styled from "styled-components"

export const Options = () => {

  return <OptionsLayout>
    <div className="option active">
      Info
    </div>
  </OptionsLayout>
}
const OptionsLayout = styled.div`
    padding: 0 20px;
    display: flex;
    height: 56px;
    box-shadow: inset rgba(0, 0, 0, 0.075) 0 -1px;

    .active {
        color: #0066ff !important;
        border-bottom: 1px solid #0066ff;
    }

    .option {
        color: gray;
        transition: 0.3s;
        height: 100%;
        font-size: 15px;
        padding: 0 10px;
        display: flex;
        align-items: center;

        &:hover {
            color: black;
        }
    }
`