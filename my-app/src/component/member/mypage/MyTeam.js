//react
import React ,{useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";

//css
import styled from "styled-components"
import Item from '../../../img/member/item.png';
import NoImg from '../../../img/member/company_no.png';
import RightArrow from '../../../img/notice/right_arrow.png';

export default function SubTitle() {
  const TeamListItem =[
    {
      Team_id : 0,
      path:"/Mypage",
      src:Item,
      title:"삼성물산",
      src2:RightArrow
    },
    {
      /*중개사일경우*/
      Team_id : 1,
      path:"/Mypage",
      src:NoImg,
      title:"럭키공인중개사",
      src2:RightArrow
    },
    {
      /*분양대행사 일경우*/
      Team_id : 2,
      path:"/Mypage",
      src:NoImg,
      title:"AAA 프로젝트",
      src2:RightArrow
    }
    ]
    return (
        <Container>
          <WrapTeamBody>
            <TeamList>
            {
              TeamListItem.map((value) => {
                return(
                  <List>
                    <Link to={value.path} className="data_link"></Link>
                      <TeamTitle>
                        <ItemImg src={value.src}/>
                        <Title>{value.title}</Title>
                      </TeamTitle>
                      <GoDetail>
                        <RightArrowImg src={value.src2} />
                      </GoDetail>
                  </List>
                )
              }
            )
          }
            </TeamList>
          </WrapTeamBody>
        </Container>
  );
}

const Container = styled.div`
  width:100%;
  @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(390/428));
        margin:0 auto;
        padding-bottom:calc(100vw*(100/428));
    }
`
const WrapTeamBody = styled.div`
  width:640px;
  margin:0 auto;
  @media ${(props) => props.theme.mobile} {
        width:100%;
        margin:0 auto;
    }
`
const TeamList = styled.ul`
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
  display:flex;justfy-content:space-between;align-items:center;
  @media ${(props) => props.theme.mobile} {
        width:100%;
        padding:calc(100vw*(21/428)) calc(100vw*(27/428));
    }
`
const TeamTitle = styled.div`
  width:97%;
  display:flex;justify-content:flex-start;align-items:center;
  transform:skew(0.1deg);
  @media ${(props) => props.theme.mobile} {

    }
`
const ItemImg = styled.img`
  width:55px;height:55px;
  border-radius:3px;
  margin-right:20px;
  border:1px solid #e4e4e4;
  transform:skew(0.1deg);
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(55/428));height:calc(100vw*(55/428));
    margin-right:calc(100vw*(28/428));
    }
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
const TeamDate = styled.p`
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
