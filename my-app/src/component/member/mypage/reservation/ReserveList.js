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

export default function Request({map,setMap,filter,setFilter,reserve,setReserve,value,type,type2,updateMapModal,updateReserveModal}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{  
    setMenu(!menu);
  }


  // 클릭 아이디
  const onClickAddress = (data) => {
    console.log(data.reserve_id);
    // setMap(true);
    // updateMapModal();
  }

  const onClickAlarm = (e) => {
    // true 알람 활성화, false 알랄 비활성화
    // console.log(e.target.checked);
  }

  // 예약 취소 버튼
  const onClickCancel = () => {
  };

  // 수정 버튼
  const onClickModify = () => {
    setReserve(true);
    updateReserveModal();
  }

  // 삭제 버튼
  const onClickDelete = () => {
  }

  return (
    <Container>
      <Li opacity={type2}>
        <Img>
          <ItemImg src={value.src?value.src:Noimg} alt="img"/>
          {/*상품이미지가 없을경우*/}
          {/* <ItemImg src={Noimg} alt="img"/> */}
        </Img>

        <Infos>
          <Condition>상태:<Orange color={type}>{value.condition}</Orange></Condition>
          <Number>등록번호 {value.number}</Number>
          <Address>
            <div className="linkToDiv" onClick={() => {onClickAddress(value)}}>
              <AddressTitle>{value.address}<LocaImg src={value.locaImg}/></AddressTitle>
            </div>
          </Address>
          <DateTime>
            <Date>{value.date}</Date>
            <Time>{value.time}</Time>
          </DateTime>
        </Infos>
        <RightMenu>
          <Alarm>
            <AlarmCheck type="checkbox" name="" value="" onClick={(e) => onClickAlarm(e)} id={"check"+value.reserve_id}/>
            <Label for={"check"+value.reserve_id}/>
          </Alarm>
          <Menu>
            <div className="linkToDiv" onClick={showModal}>
              <MenuIcon/>
                {
                  menu ?
                  <InMenu>
                    <Div>
                      <div className={["data_link", "linkToDiv"]}></div>
                      <InDiv onClick={() => onClickCancel()}>예약취소</InDiv>
                    </Div>
                    <Div>
                      <div className={["data_link", "linkToDiv"]}></div>
                      <InDiv onClick={()=>{onClickModify()}}>수정</InDiv>
                    </Div>
                    <Div>
                      <div className={["data_link", "linkToDiv"]}></div>
                      <InDiv onClick={() => {onClickDelete()}}>삭제</InDiv>
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
  display:flex;justify-content:flex-start;align-items:center;
  padding:29px 24px 29px 20px;
  border-bottom:1px solid #f7f8f8;
  opacity:${({opacity}) => opacity};
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(29/428)) 0;
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
  margin-bottom:5px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
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
`
const Date = styled.div`
  display:inline-block;
  font-weight:800;color:#4a4a4a;
  transform:skew(-0.1deg);
`
const Time = styled(Date)`
  margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(5/428));
  }
`
const RightMenu = styled.div`
    position:absolute;
    right:0;
    top:50%;transform:translateY(-50%);
    @media ${(props) => props.theme.mobile} {
      top:calc(100vw*(20/428));
      transform:none;
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
    left:calc(100vw*(-10/428));
    width:calc(100vw*(80/428));
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
