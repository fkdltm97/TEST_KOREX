//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import NavIcon from '../../../img/main/nav_btn.png';
import Logo from '../../../img/main/header_logo.png';
import PCLogo from '../../../img/main/pc_header_logo.png';
import Mypage from '../../../img/main/mypage_icon.png';

// components
import { Mobile, PC } from "../../../MediaQuery";
import DanjiSideBar from './DanjiSideBar';
import SideBarItemDetail from './SideBarItemDetail';
import SideBarDanjiDetail from './SideBarDanjiDetail';

export default function WrapSideBar({setReport,setMap}) {
  //사이드 내 페이지 이동
  const [pageIndex , setPageIndex] = useState(0);
  const [historyInfo , setHistoryInfo] = useState({pageIndex:1,prevTab:"",prevIndex:[]});

  const pageLoader = () =>{
    switch (pageIndex) {
      case 0: return <DanjiSideBar updatePageIndex={updatePageIndex} historyInfo={historyInfo} setHistoryInfo={setHistoryInfo}/>;
      case 1: return <SideBarItemDetail updatePageIndex={updatePageIndex} historyInfo={historyInfo} setHistoryInfo={setHistoryInfo} setReport={setReport}/>; //물건 상세페이지
      case 2: return <SideBarDanjiDetail updatePageIndex={updatePageIndex} historyInfo={historyInfo} setHistoryInfo={setHistoryInfo} setMap={setMap}/>;//전문중개사 상세페이지
      default :return <DanjiSideBar updatePageIndex={updatePageIndex} setHistoryInfo={setHistoryInfo}/>;
    }
  }
  const updatePageIndex = (index) =>{
    if(index < 0)
      setPageIndex(0);
    else if(index == 1)
      setPageIndex(1);
      else if(index == 2)
        setPageIndex(2);
    else
      setPageIndex(index);
  }
    return (
        <Container>
        {
          pageLoader()
        }
        </Container>
  );
}

const Container = styled.div`
  position:fixed;
  right:0;
  top:106px;
  width:495px;height:100vh;
  padding-bottom:120px;
  overflow-y:scroll;
  content:'';
  background:#fff;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {display: none;}
`
