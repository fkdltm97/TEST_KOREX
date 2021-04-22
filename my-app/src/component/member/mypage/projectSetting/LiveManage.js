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
import IconSearch from '../../../../img/main/icon_search.png';

import { Mobile, PC } from "../../../../MediaQuery"

//component
import LiveManageTop from "./LiveManageTop";
import LiveManageList from "./LiveManageList";

export default function Live({setFilter,value,type,updateModal}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }
  /*data map*/
  const BroadcastList =[
    {
      broad_id : 0,
      date:"21/03/09",
      time:"오후 3:00",
      days:"오늘",
      type:"today"
    }
]

/*data map*/
const LiveManageListItem =[
  {
    m_id : 0,
    number:"2D0000324",
    username:"홍길동",
    mail:"Hong@gmail.com"
  },
  {
    m_id : 1,
    number:"2D0000324",
    username:"홍길순",
    mail:"Hong@gmail.com"
  },
]
    return (
        <Container>
          <WrapLive>
            <TopTitle>Live 시청예약접수 관리</TopTitle>
            {
            BroadcastList.map((value) => {

              const type=()=>{
                if(value.type == "today") { //오늘
                  return "#fe7a01"
                }else if(value.type == "days") {//~일후
                  return "#01684b"
                }else if(value.type == "end") {//만료
                  return "#979797"
                }
              }

              return(
                <Broadcast>
                  방송 {value.date} {value.time} <Color color={type}>{value.days}</Color>
                </Broadcast>
              )
            })
          }

            <TopInfo>
              <All>총 <GreenColor>3</GreenColor> 건</All>
              <FilterAndAdd>
                <SearchBox>
                  <InputSearch type="search" placeholder="예약자 검색"/>
                  <SearchButton type="button"/>
                </SearchBox>
                <FilterImg src={Filter} onClick={()=>{setFilter(true);updateModal();}} alt="filter"/>
              </FilterAndAdd>
            </TopInfo>
            <WrapPropertyList>

              <LiveManageTop/>{/*방송 만료상태일때 LiveManageTop 사라져야함*/}
              {
              LiveManageListItem.map((value) => {

                return(
                  <LiveManageList setFilter={setFilter} value={value}/>
                )
              })
            }

        </WrapPropertyList>
      </WrapLive>
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
const WrapLive = styled.div`
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
const Broadcast = styled.div`
  width:100%;
  margin:60px 0 20px;
  padding-left:70px;
  font-size: 15px;
  font-weight: 600;transform:skew(-0.1deg);
  text-align: left;
  color: #4a4a4a;
  @media ${(props) => props.theme.mobile} {
    padding-left:calc(100vw*(16/428));
    margin:calc(100vw*(27/428)) 0 calc(100vw*(14/428));
    font-size:calc(100vw*(15/428));
  }
`
const Color = styled.span`
  display:inline-block;vertical-align:middle;
  color:${({color}) => color};
  font-weight:800;
`

const TopInfo = styled.div`
  display:flex;justify-content:space-between;align-items:center;
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
const WrapPropertyList = styled.ul`
  width:100%;
`
