//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import NewPropertyThird from '../../../component/member/mypage/property/NewPropertyThird';
import ModalPicture from '../../../component/member/mypage/property/modal/ModalPicture';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import Bunyang from '../../../component/common/bunyang/Bunyang';
import ImgDetail from "../../../component/common/bunyang/ImgDetail";
import LiveModal from "../../../component/common/bunyang/LiveModal";
import ModalCalendar from "../../../component/common/bunyang/ModalCalendar";
import ModalCommon from "../../../component/common/modal/ModalCommon";

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
  //사진 모달창
  const [picture,setPicture] = useState(false);
    return (
        <>
          <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
          <LiveModal live={live} setLive={setLive}/>
          <ModalCalendar cal={cal} setCal={setCal}/>
          <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
          <MainHeader openBunyang={openBunyang}/>
          <Container>
            {/*개인로 로그인했을때*/}
              <SubTitle title={"물건(외부수임) 등록"} rank={false} cursor={"default"}/>
              <NewPropertyThird setPicture={setPicture}/>
              {/*<ModalCommon
                show={picture}
                setShow={setPicture}
                title={"사진업로드"}
                content={{type:"components",component:<ModalPicture/>}}
                submit={{show:false , title:"적용" , event : ()=>{setPicture(false); }}}
                cancle={{show:false , title:"확인" , event : ()=>{setPicture(false); }}}
                confirm={{show:true , title:"확인" , event : ()=>{setPicture(false); }}}
              />*/}
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
