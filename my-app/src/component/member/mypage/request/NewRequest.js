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
import SearchApartOfficetel from "./SearchApartOfficetel";
import SearchStoreOffice from "./SearchStoreOffice";
import SearchApartOfficetelSelectInfo from "./SearchApartOfficetelSelectInfo";

export default function Request({setFilter,value,type}) {

  

  const [activeIndex,setActiveIndex] = useState(-1);
  const [openApart, setOpenApart] = useState(false);
  const [openStore, setOpenStore] = useState(false);
  const [selectInfo,setSelectInfo] = useState(false);
  

  console.log('newRequest콤포넌트 요소 실행,상태변화?:',activeIndex,openApart,openStore,selectInfo);


    return (
        <Container>
          <WrapRequest>
            <TopTitle>내 물건 주소</TopTitle>
            <TopInfo>
              <MainTab>
                <Tab>
                  <Link>
                    <TabBtn active={activeIndex == 0} onClick={()=>{setActiveIndex(0);setOpenApart(true);setOpenStore(false)}}>아파트<Part/></TabBtn>
                  </Link>
                </Tab>
                <Tab>
                  <Link>
                    <TabBtn active={activeIndex == 1} onClick={()=>{setActiveIndex(1);setOpenApart(true);setOpenStore(false)}}>오피스텔<Part/></TabBtn>
                  </Link>
                </Tab>
                <Tab>
                  <Link>
                    <TabBtn active={activeIndex == 2} onClick={()=>{setActiveIndex(2);setOpenStore(true);setOpenApart(false)}} >상가<Part/></TabBtn>
                  </Link>
                </Tab>
                <Tab>
                  <Link>
                    <TabBtn active={activeIndex == 3} onClick={()=>{setActiveIndex(3);setOpenStore(true);setOpenApart(false)}}>사무실</TabBtn>
                  </Link>
                </Tab>
              </MainTab>
            </TopInfo>
          {/*중개의뢰 가능한 단지 선택 모달*/}
              {
                openApart ?
                <SearchApartOfficetel selectInfo={selectInfo} setSelectInfo={setSelectInfo}/>
                :
                null
              }
              {
                openStore ?
                <SearchStoreOffice activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                :
                null
              }
              {/*동, 호수 선택 컴포넌트 아파트,오피스텔*/}
              {
                (openApart==true && selectInfo==true) ?
                <SearchApartOfficetelSelectInfo activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
                :
                null

              }


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
  padding:0 40px 24px;
  margin-top:50px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(30/428));
    padding:calc(100vw*(22/428)) calc(100vw*(10/428));
    }
`
const MainTab = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  @media ${(props) => props.theme.mobile} {

    }
`
const Tab = styled.div`
  margin-right:19px;
  &:last-child{
    margin-right:0;
  }
  @media ${(props) => props.theme.mobile} {
      margin-right:calc(100vw*(10/428));
      &:last-child{
        margin-right:0;
      }
    }
`

const TabBtn = styled.div`
  font-size:20px;
  color:${({active}) => active ? "#FE7A01" : "#979797"};
  font-weight:${({active}) => active ? "800" : "normal"};
  transform:skew(-0.1deg);

  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(16/428));
    }
`
const Part = styled.span`
  display:inline-block;
  width:1px;
  height:21px;
  background:#979797;
  margin-left:14.5px;
  vertical-align:middle;

  @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(19/428));
      margin-left:calc(100vw*(12/428));
      vertical-align:bottom;
    }
`
