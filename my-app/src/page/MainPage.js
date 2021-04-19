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
import ModalCalendar from "../component/common/house/ModalCalendar";

//css
import styled from "styled-components"

import { Mobile, PC } from "../MediaQuery"

//added redux actions go
import { useSelector} from 'react-redux';
import { MyActions , UserActions, tempRegisterUserdataActions } from '../store/actionCreators';

export default function MainPage() {

  const my = useSelector(data => data.my);
  const users = useSelector(data => data.user);
  const tempregisteruserdata = useSelector(data => data.temp_register_userdata);

  console.log('메인페이지 mainpage page element실행==================');
  console.log('data.my globe info refer:',my);
  console.log('data.users globe info refer:',users);
  console.log('data.temp_register_userdata refer info:',tempregisteruserdata, tempRegisterUserdataActions);

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
  const [cal, setCal] = useState(false);

  return (
    <>
      <PC>
        <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
        <LiveModal live={live} setLive={setLive}/>
        <ModalCalendar cal={cal} setCal={setCal}/>
        <House house={house} openHouse={openHouse} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
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
