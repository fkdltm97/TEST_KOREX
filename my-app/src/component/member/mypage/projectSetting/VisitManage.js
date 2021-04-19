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
import IconSearch from '../../../../img/main/icon_search.png';

import { Mobile, PC } from "../../../../MediaQuery"

import VisitManageList from "./VisitManageList";

export default function Reserve({setFilter,setVisit,setCancle,value, type, type2}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }
  /*data map*/
  const VisitListItem =[
    {
      v_id : 0,
      src:Item,
      path:"/",
      condition:"오늘",
      number:"1234567889",
      project:"프로젝트명",
      address:"충남내포신도시2차대방엘리움더센트럴",
      locaImg:Location,
      date:"2020.01.01 (월)",
      time:"오전1T (09:00-12:00)",
      visitor:2,
      type:"today"
    },
    {
      v_id : 1,
      src:Item,
      path:"/",
      condition:"2일후",
      number:"1234567889",
      project:"프로젝트명",
      address:"충남내포신도시2차대방엘리움더센트럴",
      locaImg:Location,
      date:"2020.01.01 (월)",
      time:"오전1T (09:00-12:00)",
      visitor:2,
      type:"days"
    },
    {
      v_id : 2,
      src:Item,
      path:"/",
      condition:"예약취소",
      number:"1234567889",
      project:"프로젝트명",
      address:"충남내포신도시2차대방엘리움더센트럴",
      locaImg:Location,
      date:"2020.01.01 (월)",
      time:"오전1T (09:00-12:00)",
      visitor:2,
      type:"cancel"
    }
]

    return (
        <Container>
          <WrapReserve>
            <TopTitle>방문예약접수 관리</TopTitle>
            <TopInfo>
              <All>총 <GreenColor>3</GreenColor> 건</All>
              <FilterAndAdd>
                <SearchBox>
                  <InputSearch type="search" placeholder="예약자 검색"/>
                  <SearchButton type="button"/>
                </SearchBox>
                <FilterImg src={Filter} onClick={()=>{setFilter(true)}} alt="filter"/>
              </FilterAndAdd>
            </TopInfo>
            <ReserveList>
            {
            VisitListItem.map((value) => {

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
                }
              }

              return(
                <VisitManageList setFilter={setFilter} setVisit={setVisit} setCancle={setCancle} value={value} type={type} type2={type2}/>
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
  margin-top:42px;
  padding:16px 70px;
  border-top:1px solid #f2f2f2;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    justify-content:flex-start;
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
  width:70%;
  display:flex;justify-content:flex-start; align-items:center;
  @media ${(props) => props.theme.mobile} {
    width:87%;
    }
`
const SearchBox = styled.div`
  display:flex;justify-content:flex-end;align-items:center;
  width: 335px;
  height: 43px;border-radius: 4px;
  margin-right:32px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(245/428));
    height:calc(100vw*(43/428));
    margin-right:calc(100vw*(13/428));
    margin-left:calc(100vw*(30/428));
  }
`
const InputSearch = styled.input`
  width:87%;
  height:100%;
  background:transparent;
  font-size: 15px;transform:skew(-0.1deg);
  font-weight: 600;
  text-align: center;
  color: #707070;
  &::placeholder{color:#979797;font-weight:normal;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
  }
`
const SearchButton = styled.button`
  width:43px;height:43px;
  background:url(${IconSearch}) no-repeat center center;background-size:17px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(43/428));
    height:calc(100vw*(43/428));
    background:url(${IconSearch}) no-repeat center center;background-size:calc(100vw*(17/428));
  }
`
const GreenColor = styled(All)`
  color:#01684b;
`
const FilterImg = styled.img`
  display:inline-block;
  width:18px;cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
  }
`
const ReserveList = styled.ul`
  width:100%;
`
