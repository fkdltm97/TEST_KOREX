//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import NewPropertySecond from '../../../component/member/mypage/property/NewPropertySecond';
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
  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});


  //여기 두개가 핵심이에여
    //모달 끄는 식
      const offModal = ()=>{
        let option = JSON.parse(JSON.stringify(modalOption));
        option.show = false;
        setModalOption(option);
      }
  
  
      //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
        const nextModal = () =>{
          //여기가 모달 키는 거에엽
          setModalOption({
              show:true,
              setShow:offModal,
              title:"중개의뢰",
              content:{type:"text",text:`의뢰내용 확실하게 작성하셨나요?\n전문중개사가 의뢰 를 수락하게 되면,\n내용 수정은 전문중개사에게 요청해야 가능합니다.\n중개의뢰를 신청하시겠습니까?`,component:""},
              submit:{show:true , title:"확인" , link:"/AddPropertyThird", event : ()=>{offModal(); }},
              cancle:{show:true , title:"취소" , event : ()=>{offModal(); }},
              confirm:{show:false , title:"확인" , event : ()=>{offModal(); }}
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
              <SubTitle title={"물건(외부수임) 등록"} rank={false} cursor={"default"}/>
              <NewPropertySecond nextModal={nextModal}/>
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
