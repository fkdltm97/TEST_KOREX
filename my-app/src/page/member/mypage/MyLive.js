//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import MyLive from '../../../component/member/mypage/mylive/MyLive';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import Bunyang from '../../../component/common/bunyang/Bunyang';
import ImgDetail from "../../../component/common/bunyang/ImgDetail";
import LiveModal from "../../../component/common/bunyang/LiveModal";
import ModalCalendar from "../../../component/common/bunyang/ModalCalendar";
import ModalCommon from '../../../component/common/modal/ModalCommon';
import ModalFilterComponent from '../../../component/member/mypage/mylive/ModalFilterComponent';

import CommonHeader from '../../../component/common/commonHeader';
import CommonFooter from '../../../component/common/commonFooter';

export default function Join() {
  //이용약관
  // const [termservice, setTermService] = useState(false);
  // const openTermService = (onOff) =>{ setTermService(onOff);}

  //개인정보처리방침
  // const [termprivacy, setTermPrivacy] = useState(false);
  // const openTermPrivacy = (onOff) =>{ setTermPrivacy(onOff);}

  //위치기반서비스 이용약관
  // const [termlocation, setTermLocation] = useState(false);
  // const openTermLocation = (onOff) =>{ setTermLocation(onOff);}

  //분양 모달
  // const [bunyang, setBunyang] = useState(false);
  // const openBunyang = (onOff) =>{ setBunyang(onOff);}
  //라이브 시청 모달
  // const [live, setLive] = useState(false);
  //분양 상세이미지 모달
  // const [detailimg, setDetailImg] = useState(false);
  // const [cal, setCal] = useState(false);

  //지도 모달창
  const [map,setMap] = useState(false);
  //필터 모달창
  const [filter,setFilter] = useState(false);
  //물건예약수정 모달창
  const [reserve,setReserve] = useState(false);
  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submitnone:{},cancle:{},confirm:{},confirmgreen:{},content:{}});
  const [sort, setSort] = useState(0); // 정렬 기준
  const [condi, setCondi] = useState(0); // 상태

  //여기 두개가 핵심이에여 넵!
  //모달 끄는 식
  const offModal = ()=>{
    let option = JSON.parse(JSON.stringify(modalOption));
    option.show = false;
    setModalOption(option);
  }
  // 초기화 버튼 클릭
  const onClickReset = () => {
    offModal();
    setSort(0);
    setCondi(0);
  }

  //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
  const updateModal = () =>{
    //여기가 모달 키는 거에엽
    setModalOption({
        show:true,
        setShow:offModal,
        title:"필터",
        content:{type:"components",text:`Testsetsetsetsetestse`,component:<ModalFilterComponent sort={sort} condi={condi} setSort={setSort} setCondi={setCondi}/>},
        submitnone:{show:true , title:"적용" , event : ()=>{offModal(); }},
        cancle:{show:true , title:"초기화" , event : ()=>{ onClickReset(); }},
        confirm:{show:false , title:"확인" , event : ()=>{offModal(); }}
    });
  }

  return (
    <>
      {/*
        <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
        <LiveModal live={live} setLive={setLive}/>
        <ModalCalendar cal={cal} setCal={setCal}/>
        <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
        <MainHeader openBunyang={openBunyang}/>
      */}
      <CommonHeader />
      <Container>
          <SubTitle title={"소속명"} arrow={"　▼"} path={"/Team"} cursor={"pointer"}/>
          <ModalCommon modalOption={modalOption}/>
          <MyLive updateModal={updateModal}/>
      </Container>
      <CommonFooter />
      {/*
        <TermService termservice={termservice} openTermService={openTermService}/>
        <TermPrivacy termprivacy={termprivacy} openTermPrivacy={openTermPrivacy}/>
        <TermLocation termlocation={termlocation} openTermLocation={openTermLocation}/>
        <MainFooter openTermService={openTermService} openTermPrivacy={openTermPrivacy} openTermLocation={openTermLocation}/>
      */}
    </>
  );
}

const Container = styled.div`
    width: 100%;
    min-height:calc(100vh - 289px);
    @media ${(props) => props.theme.mobile} {
        min-height:calc(100vh - calc(100vw*(334/428)));
      }
`
