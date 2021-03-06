//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Louder from '../../../../img/member/louder.png';
import Checking from '../../../../img/member/checking.png';
import LiveUser from '../../../../img/member/live_user.png';

export default function PersonalAndCompany() {

    return (
        <Container>
          <FlexBox>
            <Left>
              <Link to="/MyVisitManage" className="data_link"/>
              <Title>프로젝트 ID</Title>
              <Visit>
                방문예약 12 
              </Visit>
            </Left>
          </FlexBox>
          
          <FlexBox>
            <Left>
              <Link to="/MyLiveManage" className="data_link"/>
              <Date>2021.02.12 화요일 16:30</Date>
              <Title>Live 시청예약</Title>
            </Left>
            <Right>
              <IconImg src={LiveUser}/>
              <UserNumber>20</UserNumber>
            </Right>
          </FlexBox>
        </Container>
  );
}

const Container = styled.div`
    width:100%;
`
const FlexBox = styled.div`
  display:flex;width:100%;
  justify-content:space-between;align-items:center;
  padding:0 50px 50px 40px;
  margin-bottom:50px;
  border-bottom:1px solid #f2f2f2;
  &:last-child{margin-bottom:0;padding-bottom:0;border-bottom:none;}
  @media ${(props) => props.theme.mobile} {
    padding:0 calc(100vw*(30/428)) calc(100vw*(30/428)) calc(100vw*(30/428));
    margin-bottom:calc(100vw*(30/428));
    }
`
const Left = styled.div`
  width:100%;position:relative;
  display:block;
`
const Title = styled.h2`
  display:inline-block;
  font-size:15px;font-weight:800;transform:skew(-0.1deg);
  color:#4a4a4a;cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    }
`
const Visit = styled.p`
  font-size:13px;color:#979797;
  font-weight:600;transform:skew(-0.1deg);
  margin-top:6px;cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    margin-top:calc(100vw*(6/428));
    }
`
const Right = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  @media ${(props) => props.theme.mobile} {
    }
`
const Date = styled(Visit)`
  margin-top:0;
  margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
      margin-bottom:calc(100vw*(6/428));
    }
`
const IconImg = styled.img`
  display:inline-block;
  width:20px;margin-right:11px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    margin-right:calc(100vw*(8/428));
    }
`
const UserNumber = styled.p`
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    }
`
