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
    return (
        <Container>
          <ModalSelect>
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
            <SortRecent>
              <RecentList>
                <Link onClick={showMenu}>
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
                </Link>
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
`
const SearchIcon = styled.div`
  width:30px;height:30px;text-align:center;
  margin-right:32px;cursor:pointer;
`
const SearchImage = styled.img`
  width:19px;height:18px;
  vertical-align: -webkit-baseline-middle;
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
  transform:skew(-0.1deg);font-weight:600;
  appearance:none;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(13/1436));
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
`
const RecentImg = styled.img`
  width:19px;height:19px;vertical-align: -webkit-baseline-middle;

`
const Span = styled.span`
  font-size:13px;color:#707070;
  text-align:center;cursor:pointer;
  font-weight:600;transform:skew(-0.1deg);

`
const RecentSubdepth = styled.ul`
  position:absolute;top:0;left:30px;
  margin-top:5px;
  border-radius:8px;border:1px solid #707070;
  background:#fff;
  width:70px;
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
`
