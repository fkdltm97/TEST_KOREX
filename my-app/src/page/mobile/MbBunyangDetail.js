//react
import React ,{useState} from 'react';

//css
import styled from "styled-components"

//component
import MainHeader from '../../component/common/MainHeader';
import SubTitle from '../../component/common/SubTitle';
import MbBunyangView from '../../component/common/bunyang/mobilecomp/MbBunyangView';
import LiveModal from '../../component/common/bunyang/LiveModal';
import ModalCalendar from "../../component/common/bunyang/ModalCalendar";
import ImgDetail from '../../component/common/bunyang/ImgDetail';
import MainFooter from '../../component/common/MainFooter';
import TermService from '../../component/common/TermsOfService';
import TermPrivacy from '../../component/common/TermsOfPrivacy';
import TermLocation from '../../component/common/TermsOfLocation';

import { Mobile, PC } from "../../MediaQuery"

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

  //라이브 시청 모달
  const [live, setLive] = useState(false);
  //분양 상세이미지 모달
  const [detailimg, setDetailImg] = useState(false);
  const [cal, setCal] = useState(false);
  return (
    <>
          <MainHeader rank={true}/>
          <Container>
            <SubTitle title={"분양상세"} rank={false}/>
            <LiveModal live={live} setLive={setLive}/>
            <ModalCalendar cal={cal} setCal={setCal}/>
            <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
            <MbBunyangView setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
          </Container>
          <TermService termservice={termservice} openTermService={openTermService}/>
          <TermPrivacy termprivacy={termprivacy} openTermPrivacy={openTermPrivacy}/>
          <TermLocation termlocation={termlocation} openTermLocation={openTermLocation}/>
          <MainFooter openTermService={openTermService} openTermPrivacy={openTermPrivacy} openTermLocation={openTermLocation}/>
    </>
  );
}

const Container = styled.div`
    width: 100%;
    min-height:calc(100vh - calc(100vw*(420/428)));
    padding-bottom:calc(100vw*(100/428));
`
