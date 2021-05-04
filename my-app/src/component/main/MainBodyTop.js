//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//components
import PcSearchMain from "./PcSearchMain";
import MobileSearchMain from "./MobileSearchMain";

//css
import styled from "styled-components"
import MainTopImg from '../../img/main/main_top.png';
import IconSearch from '../../img/main/icon_search.png';
import SearchIcon1 from '../../img/main/search_icon1.png';
import SearchIcon2 from '../../img/main/search_icon2.png';
import SearchIcon3 from '../../img/main/search_icon3.png';
import CloseBtnImg from '../../img/main/close_btn.png';

import { Mobile, PC } from "../../MediaQuery"

export default function MainBody({}) {
    const [activeIndex,setActiveIndex] = useState(0);
    const [activeText, setActiveText] = useState("apart");

    const onClickTab = (e) => {
      const text = e.target.dataset.text;
      const num = e.target.dataset.num;
      setActiveIndex(num)
      setActiveText(text)
    }

    return (
        <Container>
          <MainBodyTop>
            <MainTab>
              <Tab>
                <TabBtn active={activeIndex == 0} data-num="0" data-text="apart"  onClick={(e)=>{ onClickTab(e) }}>아파트<Part></Part></TabBtn>
              </Tab>
              <Tab>
                <TabBtn active={activeIndex == 1} data-num="1" data-text="officetel" onClick={(e)=>{ onClickTab(e) }}>오피스텔<Part></Part></TabBtn>
              </Tab>
              <Tab>
                <TabBtn active={activeIndex == 2} data-num="2" data-text="store" onClick={(e)=>{ onClickTab(e) }} >상가<Part></Part></TabBtn>
              </Tab>
              <Tab>
                <TabBtn active={activeIndex == 3} data-num="3" data-text="office" onClick={(e)=>{ onClickTab(e) }}>사무실<Part></Part></TabBtn>
              </Tab>
              <Tab>
                <TabBtnOn>전문중개사</TabBtnOn>
              </Tab>
            </MainTab>
        {/* PC 검색 */}
          <PC>
            <PcSearchMain activeText={activeText}/>
          </PC>
        {/*Mobile 검색*/}
          <Mobile>
            <MobileSearchMain/>
          </Mobile>
          </MainBodyTop>
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
    width:510px;
    margin:80px auto 0;

    @media ${(props) => props.theme.mobile} {
          width:calc(100vw*(360/428));
          margin:calc(100vw*(36/428)) auto 0;
      }
`
const MainBodyTop = styled.div`
  width:100%;

`
const MainTab = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  margin-bottom:24px;
  @media ${(props) => props.theme.mobile} {
      margin-bottom:calc(100vw*(24/428));
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
const TabBtnOn = styled.div`
  font-size:20px;
  color:#FE7A01;
  font-weight:800;
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
