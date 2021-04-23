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

  const [exclusiveArr, setExclusiveArr] = useState([]);
  const [probrokerArr, setProbrokerArr] = useState([]);
  const [blockArr, setBlockArr] = useState([]);

  const [isExclusive, setIsExclusive] = useState(true);
  const [isProbroker, setIsProbroker] = useState(true);
  const [isBlock, setIsBlock] = useState(false);


  const  buildType = document.querySelectorAll(".buildType");
  const exclusiveCk = document.querySelector("#Exclusive");

  // Exclusive Click
  const onClickExclusive = () => {
    const buildType = document.querySelectorAll(".buildType");
    const exclusiveCk = document.querySelector("#Exclusive");
    if(!exclusiveCk.checked){
      setIsExclusive(true);
      buildType[1].classList.remove("select");
      setIsBlock(false);
    }else{
      setIsExclusive(false);
    }
  };

  // Build Click
  const onClickBuildType = (e) => {
    if(e.target.classList.contains("select")){
      e.target.classList.remove("select");
      initSelectBuild();
      return;
    }
    initSelectBuild();
    
    // Select Interaction
    e.target.classList.add("select");
    if(e.target.id == "probrokerBuild"){
      setIsProbroker(true);
    }

    if(e.target.id == "blockBuild"){
      setIsExclusive(false);
      setIsBlock(true);
      exclusiveCk.checked = false;
    }
  }

  // Build Init
  const initSelectBuild = () => {
    for(let i = 0 ; i < buildType.length ; i++){
      buildType[i].classList.remove("select");
    }
    setIsProbroker(false);
    setIsBlock(false);
  }


  const onClikZoomIn = () => {
    console.log("onClikZoomIn");
  }

  const onClikZoomOut = () => {
    console.log("onClikZoomOut");
  }

  useEffect(() => {
    
    setExclusiveArr(
      [ 
        new kakao.maps.LatLng(37.499590, 127.026374),
        new kakao.maps.LatLng(37.499427, 127.027947),
        new kakao.maps.LatLng(37.498553, 127.028824),
        new kakao.maps.LatLng(37.497625, 127.029358),
        new kakao.maps.LatLng(37.496463, 127.026755),
        new kakao.maps.LatLng(37.496292, 127.025873),
        new kakao.maps.LatLng(37.497545, 127.025466),             
        new kakao.maps.LatLng(37.494424, 127.012703)                
      ]
    );

    setProbrokerArr([
      new kakao.maps.LatLng(37.497535461505684, 127.02948149502778),
      new kakao.maps.LatLng(37.49671536281186, 127.03020491448352),
      new kakao.maps.LatLng(37.496201943633714, 127.02959405469642),
      new kakao.maps.LatLng(37.49640072567703, 127.02726459882308),
      new kakao.maps.LatLng(37.49640098874988, 127.02609983175294),
      new kakao.maps.LatLng(37.49932849491523, 127.02935780247945),
      new kakao.maps.LatLng(37.49996818951873, 127.02943721562295)
    ])

    setBlockArr([
      new kakao.maps.LatLng(37.49966168796031, 127.03007039430118),
      new kakao.maps.LatLng(37.499463762912974, 127.0288828824399),
      new kakao.maps.LatLng(37.49896834100913, 127.02833986892401),
      new kakao.maps.LatLng(37.49893267508434, 127.02673400572665),
      new kakao.maps.LatLng(37.49872543597439, 127.02676785815386),
      new kakao.maps.LatLng(37.49813096097184, 127.02591949495914),
      new kakao.maps.LatLng(37.497680616783086, 127.02518427952202)
    ])


  }, [])

  return (
      <Container>
        <KakaoMap exclusiveArr={exclusiveArr} probrokerArr={probrokerArr} blockArr={blockArr} isExclusive={isExclusive} isProbroker={isProbroker} isBlock={isBlock} />
        <MapRightMenu onClickExclusive={onClickExclusive} onClickBuildType={onClickBuildType} onClikZoomIn={onClikZoomIn} onClikZoomOut={onClikZoomOut}/>
        <WrapMapFilter setOpen={setOpen}/>
      </Container>
  );

}

const Container = styled.div`
  position:relative;
  width:100%;
  height:100vh;
`

