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
import IconRecent from "../../../../img/main/icon_view.png";

import { Mobile, PC } from "../../../../MediaQuery"

//component
import RequestListPage from "./RequestList";

export default function Request({setFilter,value,type}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showMenu =()=>{
    setMenu(!menu);
  }

  // 이 부분만 추가/수정하면 됩니다.
  const listData = [
    ["물건종류", "물건종류1", "물건종류2", "물건종류3"],
    ["거래유형", "거래유형1", "거래유형2", "거래유형3"],
    ["가격", "가격1", "가격2", "가격3"],
    ["면적", "면적1", "면적2", "면적3"],
  ]


  const onChangeList = (e, index) => {
    // 0 - 물건종류
    // 1 - 거대유형
    // 2 - 가격
    // 3 - 면적
    // console.log(index);

    // 선택 항목
    // console.log(e.target.value);
  }

  const commonList = (array) => {
    return(<>{
      // listData의 자식요소에 접근
      array.map((item, index) => {
        return(
        <ItemList onChange={e => onChangeList(e, index)} key={index}>
          {
            item.map((itemChild, indexChild) => {
              // listData의 자식요소의 자식요소에 접근
              if(indexChild == 0){return(<ItemSubList key={indexChild} selected disabled>{itemChild}</ItemSubList>)}
              return(<ItemSubList key={indexChild}>{itemChild}</ItemSubList>);
            })
          }
        </ItemList>
        )
      })
    }</>)
  }
  
  // 이부분 이상합니다!!!!!
    return (
        <Container>
          <ModalSelect>
              {/* 수정코드입니다. */}
              {commonList(listData)}
              {/* -- 원래 코드입니다. */}
              {/*
                <ItemList>
                  <ItemSubList selected disabled>물건종류</ItemSubList>
                  <ItemSubList>물건종류1</ItemSubList>
                  <ItemSubList>물건종류2</ItemSubList>
                  <ItemSubList>물건종류3</ItemSubList>
                </ItemList>
                <ItemList>
                  <ItemSubList selected disabled>거래유형</ItemSubList>
                  <ItemSubList>거래유형1</ItemSubList>
                  <ItemSubList>거래유형2</ItemSubList>
                  <ItemSubList>거래유형3</ItemSubList>
                </ItemList>
                <ItemList>
                  <ItemSubList selected disabled>가격</ItemSubList>
                  <ItemSubList>가격1</ItemSubList>
                  <ItemSubList>가격2</ItemSubList>
                  <ItemSubList>가격3</ItemSubList>
                </ItemList>
                <ItemList>
                  <ItemSubList selected disabled>면적</ItemSubList>
                  <ItemSubList>면적1</ItemSubList>
                  <ItemSubList>면적2</ItemSubList>
                  <ItemSubList>면적3</ItemSubList>
                </ItemList>
              */}
            
            <SortRecent> 
              <RecentList>
                <div class="linkToDiv" onClick={showMenu}>
                  <Span><RecentImg src={IconRecent}/></Span>
                {
                  menu ?
                  <RecentSubdepth>
                    <ReceentSubList>최신순</ReceentSubList>
                    <ReceentSubList>과거순</ReceentSubList>
                  </RecentSubdepth>
                  :
                  null
                }
                </div>
              </RecentList>
            </SortRecent>
          </ModalSelect>
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
const ModalSelect = styled.div`
  width:100%;
  margin-top:40px;
  display:flex;justify-content:center;align-items:flex-start;
  @media ${(props) => props.theme.mobile} {
      margin-top:calc(100vw*(28/428));
    }
`


const ItemList = styled.select`
  width:81px;
  border-radius:4px;border:1px solid #979797;
  padding:6px 0;
  margin-right:5px;
  background:#fff;
  text-align:center;
  text-align-last:center;
  position:relative;
  z-index:2;
  font-size:13px;
  transform:skew(-0.1deg);font-weight:600;
  appearance:none;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(80/428));
      padding:calc(100vw*(6/428));
      margin-right:calc(100vw*(5/428));
      font-size:calc(100vw*(13/428));
    }

`
const ItemSubList = styled.option`
`
const SortRecent = styled.div`

`
const RecentList = styled.ul`
  position:relative;
  width:30px;height:30px;padding:0;
  margin-left:30px;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(30/428));height:calc(100vw*(30/428));
      margin-left:calc(100vw*(30/428));
    }
`
const RecentImg = styled.img`
  width:19px;height:19px;vertical-align: -webkit-baseline-middle;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(19/428));height:calc(100vw*(19/428));
    }

`
const Span = styled.span`
  font-size:13px;color:#707070;
  text-align:center;cursor:pointer;
  font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(13/428));
    }

`
const RecentSubdepth = styled.ul`
  position:absolute;top:0;left:30px;
  margin-top:5px;
  border-radius:8px;border:1px solid #707070;
  background:#fff;
  width:70px;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(70/428));
      margin-top:calc(100vw*(5/428));
      top:calc(100vw*(25/428));left:calc(100vw*(-40/428));
    }
`
const ReceentSubList = styled.li`
  font-size:13px;color:#707070;
  text-align:center;
  font-weight:600;transform:skew(-0.1deg);
  cursor:pointer;
  padding:4px 0;
  border-radius:8px;
  transition:all 0.3s;
  &:hover{background:#f8f7f7;}
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(13/428));
      padding:calc(100vw*(4/428)) 0;
    }
`
