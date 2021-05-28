//react
import React ,{useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";

//css
import styled from "styled-components"
import RightArrow from '../../img/notice/right_arrow.png';

export default function SubTitle() {
  const [activeIndex,setActiveIndex] = useState(0);
  const NoticeListItem =[
    {
      notice_id : 0,
      src:RightArrow,
      path:"/NoticeDetail",
      title:"[공지] 공지사항",
      date:"2021년 3월 8일"
    },
    {
      notice_id : 1,
      src:RightArrow,
      path:"/NoticeDetail",
      title:"[공지] 공지사항 제목이 길어질시는 이렇게 처리되어집니다. 두줄로 처리됩니다. 두줄로 처리됩니다. 두줄로 처리됩니다.",
      date:"2021년 3월 6일"
    },
    {
      notice_id : 2,
      src:RightArrow,
      path:"/NoticeDetail",
      title:"[공지] 공지사항 제목이 길어질시는 이렇게 처리되어집니다. 두줄로 처리됩니다. 두줄로 처리됩니다. 두줄로 처리됩니다.",
      date:"2021년 3월 6일"
    },
    {
      notice_id : 3,
      src:RightArrow,
      path:"/NoticeDetail",
      title:"[공지] 공지사항 제목이 길어질시는 이렇게 처리되어집니다. 두줄로 처리됩니다. 두줄로 처리됩니다. 두줄로 처리됩니다.",
      date:"2021년 3월 6일"
    },
    {
      notice_id : 4,
      src:RightArrow,
      path:"/NoticeDetail",
      title:"[공지] 공지사항 제목이 길어질시는 이렇게 처리되어집니다. 두줄로 처리됩니다. 두줄로 처리됩니다. 두줄로 처리됩니다.",
      date:"2021년 3월 6일"
    },
    {
      notice_id : 5,
      src:RightArrow,
      path:"/NoticeDetail",
      title:"[공지] 공지사항 제목이 길어질시는 이렇게 처리되어집니다. 두줄로 처리됩니다. 두줄로 처리됩니다. 두줄로 처리됩니다.",
      date:"2021년 3월 6일"
    },
    ]
    return (
        <Container>
          <WrapNoticeBody>
            <NoticeList>
            {
              NoticeListItem.map((value) => {
                return(
                  <List>
                    <Link to={value.path} className="data_link"></Link>
                      <NoticeTitle>
                        <Title>{value.title}</Title>
                        <NoticeDate>{value.date}</NoticeDate>
                      </NoticeTitle>
                      <GoDetail>
                        <RightArrowImg src={value.src}/>
                      </GoDetail>
                  </List>
                )
              })
            }
            </NoticeList>

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

          </WrapNoticeBody>
        </Container>
  );
}

const Container = styled.div`
  width:100%;
  @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(390/428));
        margin:0 auto;
    }
`
const WrapNoticeBody = styled.div`
  width:640px;
  margin:0 auto;
  @media ${(props) => props.theme.mobile} {
        width:100%;
        margin:0 auto;
    }
`
const NoticeList = styled.ul`
  width:100%;
  padding-top:15px;
  @media ${(props) => props.theme.mobile} {
        width:100%;
        padding-top:calc(100vw*(10/428));
    }
`
const List = styled.li`
  position:relative;
  width:100%;
  padding:25px 40px;
  border-bottom:1px solid #f2f2f2;
  display:flex;justify-content:space-between;align-items:center;
  @media ${(props) => props.theme.mobile} {
        width:100%;
        padding:calc(100vw*(21/428)) calc(100vw*(27/428));
    }
`
const NoticeTitle = styled.div`
  width:97%;
  transform:skew(0.1deg);
  @media ${(props) => props.theme.mobile} {

    }
`
const Title = styled.h2`
  width:97%;
  font-size:15px;
  margin-bottom:10px;
  color:#4a4a4a;
  font-weight:800;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(5/428));
    }
`
const NoticeDate = styled.p`
  font-size:12px;
  color:#4a4a4a;
  font-weight:600;
  transform:skew(0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
  }
`
const GoDetail = styled.span`

`
const RightArrowImg = styled.img`
  width:8px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(5/428));
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
  justify-content:flex-start;
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
