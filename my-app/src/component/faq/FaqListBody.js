//react
import React ,{useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";

//css
import styled from "styled-components"
import RightArrow from '../../img/notice/right_arrow.png';

export default function SubTitle() {
  const FaqListItem =[
    {
      faq_id : 0,
      src:RightArrow,
      path:"/FaqDetail",
      title:"FAQ입니다. 질문이 많이 많이 길어질시 이렇게 표시됩니다. 질문이 많이 많이 길어질시 이렇게 표시됩니다."
    },
    {
      faq_id : 1,
      src:RightArrow,
      path:"/FaqDetail",
      title:"부동산 관리에 대해 문의드립니다."
    },
    {
      faq_id : 2,
      src:RightArrow,
      path:"/FaqDetail",
      title:"부동산 관리에 대해 문의드립니다.",
      date:"2021년 3월 8일"
    },
    {
      faq_id : 3,
      src:RightArrow,
      path:"/FaqDetail",
      title:"부동산 관리에 대해 문의드립니다.",
      date:"2021년 3월 8일"
    },
    {
      faq_id : 4,
      src:RightArrow,
      path:"/FaqDetail",
      title:"부동산 관리에 대해 문의드립니다."
    },
    {
      faq_id : 5,
      src:RightArrow,
      path:"/FaqDetail",
      title:"부동산 관리에 대해 문의드립니다."
    }
    ]
    return (
        <Container>
          <WrapFaqBody>
            <FaqList>
            {
            FaqListItem.map((value) => {
              return(
                <List>
                  <Link to={value.path} className="data_link"></Link>
                    <FaqTitle>
                      <Title>{value.title}</Title>
                    </FaqTitle>
                    <GoDetail>
                      <RightArrowImg src={value.src}/>
                    </GoDetail>
                </List>
              )}
            )
          }
            </FaqList>
          </WrapFaqBody>
        </Container>
  );
}

const Container = styled.div`
  width:100%;
`
const WrapFaqBody = styled.div`
  width:640px;
  margin:0 auto;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(390/428));
      margin:0 auto;
    }
`
const FaqList = styled.ul`
  width:100%;
`
const List = styled.li`
  position:relative;
  width:100%;
  padding:40px;
  border-bottom:1px solid #f2f2f2;
  display:flex;justfy-content:space-between;align-items:center;
  @media ${(props) => props.theme.mobile} {
      padding: calc(100vw*(40/428)) calc(100vw*(20/428));
    }
`
const FaqTitle = styled.div`
  width:97%;
  transform:skew(0.1deg);
`
const Title = styled.h2`
  width:97%;
  font-size:15px;
  color:#4a4a4a;
  font-weight:800;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
    }
`
const GoDetail = styled.span`

`
const RightArrowImg = styled.img`
  width:8px;
  vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(10/428));
    }
`
