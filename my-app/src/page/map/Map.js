//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MapHeader from '../../component/map/MapHeader';
import MainMap from '../../component/map/MainMap';
import ReportModal from '../../component/map/sidebar/modal/ReportModal';
import ModalMap from '../../component/map/sidebar/modal/ModalMap';
import ModalEdit from '../../component/map/sidebar/modal/ModalEdit';
import FilterCloseAndReset from '../../component/map/map/FilterCloseAndReset';
import MainFooter from '../../component/common/MainFooter';
import TermService from '../../component/common/TermsOfService';
import TermPrivacy from '../../component/common/TermsOfPrivacy';
import TermLocation from '../../component/common/TermsOfLocation';
import Bunyang from '../../component/common/bunyang/Bunyang';
import ImgDetail from "../../component/common/bunyang/ImgDetail";
import LiveModal from "../../component/common/bunyang/LiveModal";
import ModalCalendar from "../../component/common/bunyang/ModalCalendar";
import ModalCommon from '../../component/common/modal/ModalCommon';

//server process
import serverController from '../../server/serverController';

export default function NoticeDetail({status}) {
  console.log('==>>page>map.js요소 갱신 랜더링처리:',status);

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
  const [dangimap_data,setDangimap_data] = useState({});

  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},confirmgreennone:{},content:{}});
  
  
  //여기 두개가 핵심이에여
  //모달 끄는 식
  const offModal = ()=>{
    let option = JSON.parse(JSON.stringify(modalOption));
    option.show = false;
    setModalOption(option);
  }
  
  //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
  const reserveModal = () =>{
    //여기가 모달 키는 거에엽
    setModalOption({
        show:true,
        setShow:offModal,
        title:"물건투어 예약",
        content:{type:"components",text:``,component:<ModalEdit/>},
        submit:{show:false , title:"적용" , event : ()=>{offModal(); }},
        cancle:{show:false , title:"초기화" , event : ()=>{offModal(); }},
        confirm:{show:true , title:"확인" , event : ()=>{offModal(); }}
    });
  }

  return (
    <>
      <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
      <LiveModal live={live} setLive={setLive}/>
      <ModalCalendar cal={cal} setCal={setCal}/>
      <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
      <MapHeader  openBunyang={openBunyang}/>
      <Container>
          <ModalMap dangimap_data={dangimap_data} map={map} setMap={setMap}/>
          <ReportModal report={report} setReport={setReport}/>
          <MainMap setReport={setReport} setDangimap_data={setDangimap_data} setMap={setMap} status={status}  reserveModal={reserveModal}/>
          <ModalCommon modalOption={modalOption}/>
      </Container>
    </>
  );
}

const Container = styled.div`
    width: 100%;
    height:calc(100vh - 80px);
    @media ${(props) => props.theme.mobile} {
      height:calc(100vh - (100vw*(64/428)));
    }
`
