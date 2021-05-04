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

export default function WrapMap({openBunyang, rank, open, setOpen, status}) {

  const mapRightRedux = useSelector(state=>{ return state.mapRight});


  useEffect(() => {
    const filterWrap = document.querySelector("#filterWrap");
    if(mapRightRedux.isExclusive.is){
      filterWrap.classList.remove("hidden");
    }else{
      filterWrap.classList.add("hidden");
    }
  }, [mapRightRedux.isExclusive.is])

  return (
      <Container>
        <KakaoMap />
        <MapRightMenu />
        <div id="filterWrap">
          <WrapMapFilter setOpen={setOpen} status={status} />
        </div>
      </Container>
  );

}

const Container = styled.div`
  & > .hidden{
    display:none;
  }

  position:relative;
  width:100%;
  height:100vh;
`

