//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Filter from '../../../../img/member/filter.png';
import Bell from '../../../../img/member/bell.png';
import BellActive from '../../../../img/member/bell_active.png';
import Location from '../../../../img/member/loca.png';
import Set from '../../../../img/member/setting.png';
import Item from '../../../../img/main/item01.png';
import Noimg from '../../../../img/main/main_icon3.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';

import { Mobile, PC } from "../../../../MediaQuery"

export default function Request({updateMapModal,visitorModal,calModal,map,setMap,filter,setFilter,setVisit,vCal,setVCal,value,type,type2}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  // const showModal =()=>{
  //   setMenu(!menu);
  // }

  const onClickEl = () => {
    setMap(true);
    updateMapModal(value.v_id);
  }

  // 알람
  const onClickAlarm = (e) => {
    // true 알람 활성화, false 알람 비활성화
    // console.log(e.target.checked);
  }

  // 동반고객 보기
  const onClickVisit = () => {
    setVisit(true);
    visitorModal();
  }

  // 수정
  const onClickModify = () => {
    setVCal(true);
    calModal();
  }

  // 예약취소
  const onClickCancel = () => {
  }

  // 삭제
  const onClickDelete = () => {
  }

  return (
    <Container>
      <Li opacity={type2}>
        <Infos>
          <Condition>상태:<Orange color={type}>{value.condition}</Orange></Condition>
          <Number>등록번호 {value.number}</Number>
          <Title>{value.project}</Title>
          <Address>
            <Link onClick={() => {onClickEl(value)}}>
              <AddressTitle>{value.address}<LocaImg src={value.locaImg}/></AddressTitle>
            </Link>
          </Address>
          <DateTime>
            <Date>{value.date}</Date>
            <Time>{value.time}</Time>
          </DateTime>
          <Visitor>동반고객 {value.visitor}</Visitor>
        </Infos>
        <RightMenu>
          <Alarm>
            <AlarmCheck type="checkbox" name="" onClick={(e) => onClickAlarm(e)} value="" id={"check"+value.v_id}/>
            <Label for={"check"+value.v_id}/>
          </Alarm>
          <Menu>
            <div onClick={() => setMenu(!menu)} className="linkToDiv">
              <MenuIcon/>
                {
                  menu ?
                  <InMenu>
                    <Div>
                      <div className={["data_link", "linkToDiv"]}/>
                      <InDiv onClick={() => {onClickVisit()}}>동반고객 보기</InDiv>
                    </Div>
                    <Div>
                      <div className={["data_link", "linkToDiv"]}/>
                      <InDiv onClick={() => {onClickModify();}}>수정</InDiv>
                    </Div>
                    <Div>
                      <div className={["data_link", "linkToDiv"]}/>
                      <InDiv onClick={() => onClickCancel()}>예약취소</InDiv>
                    </Div>
                    <Div>
                      <div className={["data_link", "linkToDiv"]}/>
                      <InDiv onClick={() => onClickDelete()}>삭제</InDiv>
                    </Div>
                  </InMenu>
                  :
                  null
                }
            </div>
          </Menu>
        </RightMenu>
      </Li>
    </Container>
  );
}

const Pb = styled.b`
  display:block;
  @media ${(props) => props.theme.mobile} {
        display:inline;
    }
`
const Mb = styled.b`
  display:inline;
  @media ${(props) => props.theme.mobile} {
        display:block;
    }
`
const Container = styled.div`

`
const Li = styled.li`
  width:100%;
  position:relative;
  display:block;
  padding:29px 32px;
  border-bottom:1px solid #f7f8f8;
  opacity:${({opacity}) => opacity};
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(29/428)) calc(100vw*(15/428));
  }
`
const Img = styled.div`
  width:106px;
  height:106px;
  margin-right:40px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(80/428));
    height:calc(100vw*(80/428));
    margin-right:calc(100vw*(18/428));
  }
`
const ItemImg = styled.img`
  width:100%;
  height:100%;border-radius:3px;
  border:1px solid #e4e4e4;
`
const Infos = styled.div`
`
const Condition = styled.h4`
  font-size:15px;color:#707070;font-weight:800;
  transform:skew(-0.1deg);
  margin-bottom:33px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    margin-bottom:calc(100vw*(30/428));
  }
`
const Orange = styled(Condition)`
  color:${({color}) => color};
  display:inline-block;
  margin-left:5px;
  margin-bottom:0;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(5/428));
  }
`
const Green = styled(Orange)`
  color:#01684b;
`
const Gray = styled(Orange)`
  color:#707070;
  opacity:0.5;
`
const Number = styled.p`
  font-size:14px;color:#979797;
  transform:skew(-0.1deg);
  margin-bottom:8px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-bottom:calc(100vw*(6/428));
  }
`
const Title = styled.h4`
  font-size:15px;margin-bottom:6px;
  font-weight:800;transform:skew(-0.1deg);
  color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(6/428));
  }
`

const Address = styled.div`
  width:100%;
`
const AddressTitle = styled.div`
  display:inline-block;
  font-size:18px;margin-bottom:8px;
  font-weight:800;color:#4a4a4a;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(6/428));
  }
`
const LocaImg = styled.img`
  display:inline-block;width:20px;margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    margin-left:calc(100vw*(3/428));
  }
`
const DateTime = styled.div`
  width:100%;
  margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(6/428));
  }
`
const Date = styled.div`
  display:inline-block;
  font-size:15px;color:#01684b;
  font-weight:800;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const Time = styled(Date)`
  margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(5/428));
  }
`
const Visitor = styled.p`
  font-size:15px;color:#4a4a4a;font-weight:800;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const RightMenu = styled.div`
    position:absolute;
    right:32px;
    top:30px;
    @media ${(props) => props.theme.mobile} {
      top:calc(100vw*(20/428));right:0;
      display:flex;justify-content:flex-start;
    }
`
const Alarm = styled.div`
  margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:0;
    margin-right:calc(100vw*(5/428));
  }
`
const AlarmCheck = styled.input`
  display:none;
  &:checked + label{background:url(${BellActive}) no-repeat center center; background-size:20px 20px}
  @media ${(props) => props.theme.mobile} {
    &:checked + label{background:url(${BellActive}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428))}
  }
`
const Label = styled.label`
  display:inline-block;
  width:36px;height:36px;
  border-radius:5px;
  border:1px solid #e4e4e4;
  background:url(${Bell}) no-repeat center center; background-size:20px 20px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(31/428));
    height:calc(100vw*(31/428));
    background:url(${Bell}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428));
  }
`
const Menu = styled(Alarm)`
  margin-bottom:0;
  @media ${(props) => props.theme.mobile} {
    margin-right:0;
  }
`
const MenuIcon = styled.div`
  width:36px;height:36px;
  border-radius:5px;
  border:1px solid #e4e4e4;
  background:url(${Set}) no-repeat center center; background-size:20px 20px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(31/428));
    height:calc(100vw*(31/428));
    background:url(${Set}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428));
  }
`
const Bg = styled.div`
  position:fixed;width:100%;height:100%;
  background:rgba(0,0,0,0.2);left:0;top:0;
`
const InMenu = styled.ul`
  position:absolute;
  top:46px;left:44px;
  width:112px;
  border:1px solid #707070;
  border-radius:8px;
  background:#fff;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(35/428));
    left:calc(100vw*(-30/428));
    width:calc(100vw*(100/428));
  }

`
const Div = styled.li`
  position:relative;
  font-size:13px;
  transform:skew(-0.1deg);
  border-radius:8px;
  padding:4px 0 4px 17px;
  transition:all 0.3s;
  &:hover{background:#f8f7f7;}
  &:first-child{padding-top:8px;}
  &:last-child{padding-bottom:8px;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    padding:calc(100vw*(4/428)) 0 calc(100vw*(4/428)) calc(100vw*(12/428));
    &:first-child{padding-top:calc(100vw*(8/428));}
    &:last-child{padding-bottom:calc(100vw*(8/428));}
  }
`
const InDiv = styled.div`
  width:100%;height:100%;
`
