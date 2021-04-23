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
import MapRightMenu from "./MapRightMenu";
import WrapMapFilter from "./WrapMapFilter";
import KakaoMap from './KakaoMap';

// redux
import { MapRight } from '../../../store/actionCreators';
import { useSelector } from 'react-redux';

const { kakao } = window;

export default function WrapMap({openBunyang, rank, open, setOpen}) {

  return (
      <Container>
        <KakaoMap />
        <MapRightMenu />
        <WrapMapFilter setOpen={setOpen}/>
      </Container>
  );

}

const Container = styled.div`
  position:relative;
  width:100%;
  height:100vh;
`

