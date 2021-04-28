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
import Noimg from '../../../../img/member/company_no.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';

import { Mobile, PC } from "../../../../MediaQuery"

//component
import RequestListPage from "./RequestList";
import RequestSorting from "./RequestSorting";

export default function Request({mannerModal,value,type}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }
  /*data map*/
  const RequestListItem =[
    {
      Request_id : 0,
      img:Item,
      date:"21.00.00 - 21.00.00",
      condition:"검토대기",
      conditionDate:"2021.00.00",
      number:"2D0000324",
      title:"충남내포신도시2차대방엘리움더센트럴",
      kinds:"아파트",
      address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
      trade:"매매",
      type:"waiting"
    },
    {
      Request_id : 1,
      img:Item,
      date:"21.00.00 - 21.00.00",
      condition:"거래준비",
      conditionDate:"2021.00.00",
      number:"2D0000324",
      title:"충남내포신도시2차대방엘리움더센트럴",
      kinds:"아파트",
      address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)  강남구 서초동 서초동 서초동",
      trade:"매매",
      type:"readyDeal"
    },
    {
      Request_id : 2,
      img:Noimg,
      date:"21.00.00 - 21.00.00",
      condition:"의뢰 철회",
      conditionDate:"2021.00.00",
      number:"2D0000324",
      title:"충남내포신도시2차대방엘리움더센트럴",
      kinds:"아파트",
      address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
      trade:"매매",
      type:"requestCancel"
    },
    {
      Request_id : 2,
      img:Noimg,
      date:"21.00.00 - 21.00.00",
      condition:"위임 취소",
      conditionDate:"2021.00.00",
      number:"2D0000324",
      title:"충남내포신도시2차대방엘리움더센트럴",
      kinds:"아파트",
      address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
      trade:"매매",
      type:"delegationCancel"
    }
]

    return (
        <Container>
          <WrapRequest>
            <TopTitle>내 중개의뢰</TopTitle>
            <RequestSorting/>{/*컴포넌트입니다*/}
            <TopInfo>
              <All>총 <GreenColor>4</GreenColor> 건</All>
              <FilterAndAdd>
                <Link to="/AddRequest">
                  <AddBtn>추가</AddBtn>
                </Link>
              </FilterAndAdd>
            </TopInfo>
            <RequestList>
            {
            RequestListItem.map((value) => {

              const type=()=>{
                if(value.type == "waiting") { //검토대기
                  return 1
                }else if(value.type == "readyDeal") {//거래준비
                  return 1
                } else if(value.type == "requestCancel") { // 의뢰 철회
                  return 0.5
                } else if(value.type == "delegationCancel") { // 위임 취소
                  return 0.5
                }
              }

              return(
                <RequestListPage mannerModal={mannerModal} type={type} value={value}/>
              )
            })
          }

        </RequestList>
      </WrapRequest>
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
const WrapRequest = styled.div`
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
  margin-top:30px;
  border-top:1px solid #f2f2f2;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(30/428));
    padding:calc(100vw*(22/428)) calc(100vw*(10/428));
    }
`
const All = styled.span`
  font-size:17px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const FilterAndAdd = styled.div`
  display:flex;justify-content:flex-start; align-items:center;
`
const AddBtn = styled.div`
  width: 81px;
  height: 30px;
  border-radius: 4px;
  border: solid 2px #f0a764;
  background-color: #fe7a01;
  line-height:26px;
  font-size:13px;
  font-weight:800;transform:skew(-0.1deg);
  text-align:center;
  margin-left:15px;
  color:#fff;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(80/428));
    height:calc(100vw*(30/428));
    line-height:calc(100vw*(26/428));
    font-size:calc(100vw*(13/428));
    margin-left:calc(100vw*(15/428));
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
const RequestList = styled.ul`
  width:100%;
`
