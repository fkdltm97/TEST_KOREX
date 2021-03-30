//react
import React ,{useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";

//css
import styled from "styled-components"
import RightArrow from '../../img/notice/right_arrow.png';

export default function NoticePagenation() {
    const [activeIndex,setActiveIndex] = useState(0);
    return (
        <Container>
          <WrapListPagenation>
          {/*이전 버튼 */}
            <PrevBtn>
              <Link>
                <InPrevBtn>이전</InPrevBtn>
              </Link>
            </PrevBtn>
            <WrapPageNumber>
              <PageNumber>
                <Link>
                  <InNumber active={activeIndex == 0} onClick={()=>{setActiveIndex(0)}}>1</InNumber>
                </Link>
              </PageNumber>
              <PageNumber>
                <Link>
                  <InNumber active={activeIndex == 1} onClick={()=>{setActiveIndex(1)}}>2</InNumber>
                </Link>
              </PageNumber>
              <PageNumber>
                <Link>
                  <InNumber active={activeIndex == 2} onClick={()=>{setActiveIndex(2)}}>3</InNumber>
                </Link>
              </PageNumber>
              <PageNumber>
                <Link>
                  <InNumber active={activeIndex == 3} onClick={()=>{setActiveIndex(3)}}>4</InNumber>
                </Link>
              </PageNumber>
            </WrapPageNumber>
            {/*다음 버튼 */}
            <NextBtn>
              <Link>
                <InNextBtn>다음</InNextBtn>
              </Link>
            </NextBtn>
          </WrapListPagenation>
        </Container>
  );
}

const Container = styled.div`
  width:100%;
  padding-bottom:100px;
  @media ${(props) => props.theme.mobile} {
    padding-bottom:calc(100vw*(100/428));
  }
`
const WrapListPagenation = styled.div`
  width:400px;
  margin:50px auto;
  display:flex;
  justify-content:center;
  align-items:center;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    margin:calc(100vw*(40/428)) auto;
  }
`
const PrevBtn = styled.div`
`
const InPrevBtn = styled.div`
  font-size:15px;
  transform:skew(-0.1deg);
  color:#707070;
  font-weight:800;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
  }
`
const WrapPageNumber = styled.div`
  display:flex;
  justfy-content:flex-start;
  align-items:center;
  margin:0 37px;
  @media ${(props) => props.theme.mobile} {
    margin:0 calc(100vw*(33/428));
  }
`
const PageNumber = styled.div`
  margin-right:15px;
  &:last-child{margin-right:0;}
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(20/428));
  }
`
const InNumber = styled.div`
  font-size:15px;
  transform:skew(-0.1deg);
  font-weight:800;
  color:#707070;
  color:${({active}) => active ? "#FE7A01" : "#979797"};
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
  }

`
const NextBtn = styled(PrevBtn)`
`
const InNextBtn = styled(InPrevBtn)`
`
