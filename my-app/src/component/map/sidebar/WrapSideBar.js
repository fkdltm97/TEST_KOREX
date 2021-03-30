//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import NavIcon from '../../../img/main/nav_btn.png';
import Logo from '../../../img/main/header_logo.png';
import PCLogo from '../../../img/main/pc_header_logo.png';
import Mypage from '../../../img/main/mypage_icon.png';
import MainSideBar from './MainSideBar';
import SideBarItemDetail from './SideBarItemDetail';
// components
import { Mobile, PC } from "../../../MediaQuery";
export default function MainHeader({openHouse, rank}) {
    return (
        <Container>
          {/*<MainSideBar/>*/}
          <SideBarItemDetail/>
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
