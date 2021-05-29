//react
import React ,{useState, useEffect, useRef} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import { Mobile, PC } from "../../MediaQuery";
import NavIcon from '../../img/main/nav_btn.png';
import Logo from '../../img/main/header_logo.png';
import PCLogo from '../../img/main/pc_header_logo.png';
import Mypage from '../../img/main/mypage_icon.png';

// components
import WrapMap from './map/WrapMap';
import MainWrapSideBar from './sidebar/MainWrapSideBar';
import DanjiWrapSideBar from './sidebar/DanjiWrapSideBar';

export default function MainHeader({openBunyang, rank, setReport,reserveModal,setMap, status}){
    //console.log('mainMap실행>>');
    const [pageIndex , setPageIndex] = useState(0);

    const containerRef = useRef();

    return (
      <Container>
        <PC>
          <WrapMap status={status} containerRef={containerRef}/>
        </PC>
        <Mobile>
          {
            pageIndex == 0 ?
            <WrapMap status={status}/>
            :
            null
          }
        </Mobile>
        <MainWrapSideBar containerRef={containerRef} setMap={setMap} status={status} setReport={setReport} pageIndex={pageIndex} setPageIndex={setPageIndex} reserveModal={reserveModal}/>{/*메인 사이드바 컴포넌트*/}
        {/*<DanjiWrapSideBar setMap={setMap} setReport={setReport} pageIndex={pageIndex} setPageIndex={setPageIndex}/>*/}{/*단지 사이드바 컴포넌트*/}
      </Container>
    );
}

const Container = styled.div`
    position:relative;
    width: 100%;
`
