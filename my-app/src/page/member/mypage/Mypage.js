//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import MyProfile from '../../../component/member/mypage/MyProfile';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import Bunyang from '../../../component/common/bunyang/Bunyang';
import ImgDetail from "../../../component/common/bunyang/ImgDetail";
import LiveModal from "../../../component/common/bunyang/LiveModal";
import ModalCalendar from "../../../component/common/bunyang/ModalCalendar";
import ModalCommon from '../../../component/common/modal/ModalCommon';

export default function Join() {
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

  //수정버튼 클릭시 저장버튼 변경
  const [editCheck,setEditChk] = useState(1);//기본값 1(EDIT버튼)
  const editButtonBox = () =>{
      setEditChk(2);
      return setValueChk(2);
  }
  const editOffButtonBox = () =>{
      setEditChk(1);
      return setValueChk(1);
  }

  //저장버튼 클릭시 변경
  const [valueChk,setValueChk] = useState(1);
  const profileeditCheck = () =>{
      setEditChk(1);
      return setValueChk(1);
  }

  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});


  //여기 두개가 핵심이에여
    //모달 끄는 식
      const offModal = ()=>{
        let option = JSON.parse(JSON.stringify(modalOption));
        option.show = false;
        setModalOption(option);
      }
  
  
      //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
        const proBrokerModal = () =>{
          //여기가 모달 키는 거에엽
          setModalOption({
              show:true,
              setShow:offModal,
              title:"물건 등록하기",
              content:{type:"text",text:`전문중개사로 승인된 중개업소만\n물건 등록이 가능합니다.\n전문중개사 신청은\n관리자 권한만 할 수 있습니다.`,component:""},
              submit:{show:false , title:"적용" , event : ()=>{offModal(); }},
              cancle:{show:false , title:"초기화" , event : ()=>{offModal(); }},
              confirm:{show:false , title:"확인" , event : ()=>{offModal(); }},
              confirmgreen:{show:true , title:"확인" , link:"", event : ()=>{offModal(); }}

          });
        }

    return (
        <>
          <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
          <LiveModal live={live} setLive={setLive}/>
          <ModalCalendar cal={cal} setCal={setCal}/>
          <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
          <MainHeader openBunyang={openBunyang}/>
          <Container>
            {/*개인로 로그인했을때*/}
              {/*<SubTitle title={"개인"} cursor={"default"} edit={editCheck} editButtonBox={editButtonBox} editOffButtonBox={editOffButtonBox} profileeditCheck={profileeditCheck}/>*/}
            {/*기업,중개사,분양대항사으로 로그인했을때*/}
             <SubTitle title={"소속명"} arrow={"　▼"}path={"/Team"} edit={editCheck} editButtonBox={editButtonBox} editOffButtonBox={editOffButtonBox} profileeditCheck={profileeditCheck}/>
             <MyProfile profileedit={valueChk} proBrokerModal={proBrokerModal}/>
             <ModalCommon modalOption={modalOption}/>
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
    min-height:calc(100vh - 309px);
    @media ${(props) => props.theme.mobile} {
        min-height:calc(100vh - calc(100vw*(420/428)));
      }
`
