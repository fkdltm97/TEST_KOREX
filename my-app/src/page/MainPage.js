//react
import React ,{useState} from 'react';

//component
import MainHeader from '../component/common/MainHeader';
import MainBody from '../component/main/MainBody';
import MainFooter from '../component/common/MainFooter';
import TermService from '../component/common/TermsOfService';
import TermPrivacy from '../component/common/TermsOfPrivacy';
import TermLocation from '../component/common/TermsOfLocation';
import House from '../component/common/house/House';
import ImgDetail from "../component/common/house/ImgDetail";
import LiveModal from "../component/common/house/LiveModal";
//css
import styled from "styled-components"

import { Mobile, PC } from "../MediaQuery"

export default function MainPage() {
  //이용약관
  const [termservice, setTermService] = useState(false);
  const openTermService = (onOff) =>{ setTermService(onOff);}

  //개인정보처리방침
  const [termprivacy, setTermPrivacy] = useState(false);
  const openTermPrivacy = (onOff) =>{ setTermPrivacy(onOff);}

  //위치기반서비스 이용약관
  const [termlocation, setTermLocation] = useState(false);
  const openTermLocation = (onOff) =>{ setTermLocation(onOff);}

  //분양 모달
  const [house, setHouse] = useState(false);
  const openHouse = (onOff) =>{ setHouse(onOff);}
  //라이브 시청 모달
  const [live, setLive] = useState(false);
  //분양 상세이미지 모달
  const [detailimg, setDetailImg] = useState(false);


  return (
    <>
      <PC>
        <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
        <LiveModal live={live} setLive={setLive}/>
        <House house={house} openHouse={openHouse} setLive={setLive} setDetailImg={setDetailImg}/>
        <MainHeader openHouse={openHouse}/>
        <MainBody/>
        <TermService termservice={termservice} openTermService={openTermService}/>
        <TermPrivacy termprivacy={termprivacy} openTermPrivacy={openTermPrivacy}/>
        <TermLocation termlocation={termlocation} openTermLocation={openTermLocation}/>
        <MainFooter openTermService={openTermService} openTermPrivacy={openTermPrivacy} openTermLocation={openTermLocation}/>
      </PC>
      <Mobile>
        <MainHeader/>
        <MainBody/>
        <TermService termservice={termservice} openTermService={openTermService}/>
        <TermPrivacy termprivacy={termprivacy} openTermPrivacy={openTermPrivacy}/>
        <TermLocation termlocation={termlocation} openTermLocation={openTermLocation}/>
        <MainFooter openTermService={openTermService} openTermPrivacy={openTermPrivacy} openTermLocation={openTermLocation}/>
      </Mobile>
    </>
  );
}
