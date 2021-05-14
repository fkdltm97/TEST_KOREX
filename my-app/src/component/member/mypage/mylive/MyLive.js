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

import LiveList from "./LiveList";

import CommonTopInfo from '../../../../component/member/mypage/commonList/commonTopInfo';

export default function Live({updateModal}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }

  /*data map*/
  const LiveListItem =[
    {
      live_id :0,
      src:Item,
      path:"/",
      condition:"오늘",
      number:"1234567889",
      project:"프로젝트명1",
      type:"today"
    },
    {
      live_id :1,
      src:Item,
      path:"/",
      condition:"2일후",
      number:"1234567889",
      project:"프로젝트명2",
      type:"days"
    },
    {
      live_id :2,
      src:Item,
      path:"/",
      condition:"예약취소",
      number:"1234567889",
      project:"프로젝트명3",
      type:"cancel"
    },
    {
      live_id :3,
      src:Item,
      path:"/",
      condition:"만료",
      number:"1234567889",
      project:"프로젝트명4",
      type:"end"
    }
]

  const topInfoContent = () => {
    return(
      <div onClick={() => {updateModal();}} className="linkToDiv">
        <FilterImg src={Filter} alt="filter"/>
      </div>
    )
  }

    return (
        <Container>
          <WrapReserve>
            <TopTitle>내 Live시청예약</TopTitle>
            {/* -- 수정코드입니다. */}
            <CommonTopInfo length={3} leftComponent={topInfoContent()}/>
            {/* -- 원래 코드입니다. */}
            {/*
              <TopInfo>
                <All>총 <GreenColor>3</GreenColor> 건</All>
                <div onClick={() => {updateModal();}} className="linkToDiv">
                  <FilterImg src={Filter} alt="filter"/>
                </div>
              </TopInfo>
            */}
            <ReserveList>
            {
            LiveListItem.map((value) => {

              const type=()=>{
                if(value.type == "today") {
                  return "#fe7a01"
                }else if(value.type == "cancel") {
                  return "#707070"
                } else if(value.type == "days") {
                  return "#01684b"
                }
              }
              const type2=()=>{
                if(value.type == "today") {
                  return 1
                }else if(value.type == "cancel") {
                  return 0.5
                } else if(value.type == "days") {
                  return 1
                } else if(value.type == "end") {
                  return 0.5
                }
              }

              return(
                <LiveList value={value} type={type} type2={type2}/>
              )
            })
          }
        </ReserveList>
      </WrapReserve>
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
    width:680px;
    margin:0 auto;
    padding:24px 0 250px;
    @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(380/428));
      padding:calc(100vw*(30/428)) 0 calc(100vw*(150/428));
      }
`
const WrapReserve = styled.div`
  width:100%;
`
const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(16/428));
    }
`
const TopInfo = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding:16px 40px;
  margin-top:40px;
  border-top:1px solid #f2f2f2;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(30/428));
    padding:calc(100vw*(22/428)) calc(100vw*(18/428));
    }
`
const All = styled.span`
  font-size:17px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const GreenColor = styled(All)`
  color:#01684b;
`
const FilterImg = styled.img`
  display:inline-block;
  width:18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
  }
`
const ReserveList = styled.ul`
  width:100%;
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
