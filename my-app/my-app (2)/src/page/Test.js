
//component
// import IntroPage from '../component/common/IntroPage';
import { Mobile, PC } from "../MediaQuery"

//css
import styled from "styled-components"

export default function MainPage() {
  return (
    <>
    <div>
      <Mobile>
        <div className="mobile_container">
        <Title>이건 모바일 !!</Title>
        </div>
      </Mobile>
    </div>

    <div className="pc_container">
      <PC >
        <Title>요건 PC !!!</Title>
      </PC>
    </div>
</>
  );
}


const Title = styled.div`
    color:red;
    @media ${(props) => props.theme.mobile} {
        color:blue;
    }
`
