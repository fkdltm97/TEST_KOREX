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

export default function Live({setAdd,setEdit,setCancle}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }

  /*data map*/
  const LiveListItem =[
    {
      live_id :0,
      path:"/",
      condition:"오늘",
      number:"1234567889",
      personnel:20,
      type:"today"
    },
    {
      live_id :1,
      path:"/",
      condition:"2일후",
      number:"1234567889",
      personnel:10,
      type:"days"
    },
    {
      live_id :2,
      path:"/",
      condition:"예약취소",
      number:"1234567889",
      personnel:50,
      type:"cancel"
    },
    {
      live_id :3,
      path:"/",
      condition:"만료",
      number:"1234567889",
      personnel:55,
      type:"end"
    }
]

    return (
        <Container>
          <WrapReserve>
            <TopTitle>Live 시청예약세팅</TopTitle>
            <TopInfo>
              <Link onClick={()=>{setAdd(true)}}>
                <AddBtn>추가</AddBtn>
              </Link>
            </TopInfo>
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
                <LiveList setCancle={setCancle} setEdit={setEdit} value={value} type={type} type2={type2}/>
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
  display:flex;justify-content:flex-end;align-items:center;
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
const AddBtn = styled.div`
  width:80px;height:32px;
  line-height:30px;text-align:center;
  border-radius: 4px;
  border: solid 2px #2b664d;
  color:#2b664d;font-size:13px;font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    width:calc(100vw*(80/428));height:calc(100vw*(32/428));
    line-height:calc(100vw*(30/428));
    }
`
const ReserveList = styled.ul`
  width:100%;
`
