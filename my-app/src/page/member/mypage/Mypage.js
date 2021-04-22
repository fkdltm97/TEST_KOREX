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
      console.log('subtitle 연필 수정버튼 클릭시에 실행발발, 임의 페이지 수정요소 형태로 발생, 1->2 저장중상태로 처리');
      setEditChk(2);
      return setValueChk(2);
  }
  const editOffButtonBox = () =>{
      console.log('subtitle 저장버튼 클릭시에 실행발발,임의 페이지 저장요소 형태,저장버튼을 눌렀을때!!!,다시 2->1 조회상태로 처리.');
      setEditChk(1);
      return setValueChk(1);
  }

  //저장버튼 클릭시 변경
  const [valueChk,setValueChk] = useState(1);
  const profileeditCheck = () =>{
      setEditChk(1); //1 : 조회상태, 2:저장중
      return setValueChk(1);
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
             <MyProfile profileedit={valueChk}/>
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
