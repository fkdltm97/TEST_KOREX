//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import NavIcon from '../../img/main/nav_btn.png';
import Logo from '../../img/main/header_logo.png';
import PCLogo from '../../img/main/pc_header_logo.png';
import Mypage from '../../img/main/mypage_icon.png';

// components
import WrapMap from './map/WrapMap';
import MainWrapSideBar from './sidebar/MainWrapSideBar';
import DanjiWrapSideBar from './sidebar/DanjiWrapSideBar';

export default function MainHeader({openHouse, rank, setReport,setMap}) {
    return (
        <Container>
          <WrapMap/>{/*지도 컴포넌트*/}
          {/*<MainWrapSideBar setReport={setReport}/>{/*메인 사이드바 컴포넌트*/}
          <DanjiWrapSideBar setMap={setMap} setReport={setReport}/>{/*단지 사이드바 컴포넌트*/}
        </Container>
  );
}

const Container = styled.div`
    position:relative;
    width: 100%;
`
