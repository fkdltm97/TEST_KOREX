//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MapHeader from '../../component/map/MapHeader';
import MainMap from '../../component/map/MainMap';
import ReportModal from '../../component/map/sidebar/modal/ReportModal';
import ModalMap from '../../component/map/sidebar/modal/ModalMap';
import FilterCloseAndReset from '../../component/map/map/FilterCloseAndReset';
import MainFooter from '../../component/common/MainFooter';
import TermService from '../../component/common/TermsOfService';
import TermPrivacy from '../../component/common/TermsOfPrivacy';
import TermLocation from '../../component/common/TermsOfLocation';
import Bunyang from '../../component/common/bunyang/Bunyang';
import ImgDetail from "../../component/common/bunyang/ImgDetail";
import LiveModal from "../../component/common/bunyang/LiveModal";
import ModalCalendar from "../../component/common/bunyang/ModalCalendar";

export default function NoticeDetail() {
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
  const [bunyang, setBunyang] = useState(false);
  const openBunyang = (onOff) =>{ setBunyang(onOff);}
  //라이브 시청 모달
  const [live, setLive] = useState(false);
  //분양 상세이미지 모달
  const [detailimg, setDetailImg] = useState(false);
  const [cal, setCal] = useState(false);

  //신고모달
  const [report,setReport] = useState(false);
  //단지위치 모달
  const [map,setMap] = useState(false);
  
  //물건예약 수정 모달

    return (
        <>
          <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
          <LiveModal live={live} setLive={setLive}/>
          <ModalCalendar cal={cal} setCal={setCal}/>
          <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
          <MapHeader openBunyang={openBunyang}/>
          <Container>
              <ModalMap map={map} setMap={setMap}/>
              <ReportModal report={report} setReport={setReport}/>
              <MainMap setReport={setReport} setMap={setMap}/>
          </Container>
        </>
  );
}

const Container = styled.div`
    width: 100%;
    height:calc(100vh - 106px);
    @media ${(props) => props.theme.mobile} {
      height:calc(100vh - (100vw*(64/428)));
    }
`
