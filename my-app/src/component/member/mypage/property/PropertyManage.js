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
import PropertyList from "./PropertyList";

export default function Request({setFilter,updateModal,value,type}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }
  /*data map*/
  const PropertyListItem =[
    {
      p_id : 0,
      img:Item,
      date:"21.00.00 - 21.00.00",
      conditiontype:"사용자 의뢰",
      condition:"검토대기",
      startdate:"2021.00.00",
      enddate:"2021.00.00",
      number:"2D0000324",
      title:"충남내포신도시2차대방엘리움더센트럴",
      kinds:"아파트",
      itemname:"충남내포신도시2차대방엘리움더센트럴",
      trade:"매매",
      username:"홍길동"
    },
    {
      p_id : 1,
      img:Item,
      date:"21.00.00 - 21.00.00",
      conditiontype:"외부 수임",
      condition:"검토대기",
      startdate:"2021.00.00",
      enddate:"2021.00.00",
      number:"2D0000324",
      title:"충남내포신도시2차대방엘리움더센트럴",
      kinds:"아파트",
      itemname:"충남내포신도시2차대방엘리움더센트럴",
      trade:"매매",
      username:"홍길동"
    }
]

    return (
        <Container>
          <WrapRequest>
            <TopTitle>물건관리</TopTitle>
            <TopInfo>
              <All>총 <GreenColor>2</GreenColor> 건</All>
              <FilterAndAdd>
                <SearchBox>
                  <InputSearch type="search" placeholder="건물,의뢰인 검색"/>
                  <SearchButton type="button"/>
                </SearchBox>
                <FilterImg onClick={()=>{setFilter(true);updateModal();}} src={Filter} alt="filter"/>
                <Link to="/AddProperty">
                  <AddBtn>추가</AddBtn>
                </Link>
              </FilterAndAdd>
            </TopInfo>
            <WrapPropertyList>
            {
            PropertyListItem.map((value) => {

              const type=()=>{
                if(value.conditiontype == "사용자 의뢰") { //검토대기
                  return "#fe7a01"
                }else if(value.conditiontype == "외부 수임") {//거래준비
                  return "#01684b"
                }
              }

              return(
                <PropertyList setFilter={setFilter} type={type} value={value}/>
              )
            })
          }

        </WrapPropertyList>
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
  display:flex;justify-content:flex-end; align-items:center;
`
const SearchBox = styled.div`
  display:flex;justify-content:flex-end;align-items:center;
  width: 300px;
  height: 43px;border-radius: 4px;
  margin-right:17px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(158/428));
    height:calc(100vw*(43/428));
    margin-right:calc(100vw*(13/428));
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
    font-size:calc(100vw*(15/428));
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
  width:18px;cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
  }
`
const WrapPropertyList = styled.ul`
  width:100%;
`
