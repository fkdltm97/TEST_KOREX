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


  return (
    <>
      <PC>
        <House house={house} openHouse={openHouse}/>
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
