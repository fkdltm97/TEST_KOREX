//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import NewRequestBrokerSecond from '../../../component/member/mypage/request/NewRequestBrokerSecond';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import Bunyang from '../../../component/common/bunyang/Bunyang';
import ImgDetail from "../../../component/common/bunyang/ImgDetail";
import LiveModal from "../../../component/common/bunyang/LiveModal";
import ModalCalendar from "../../../component/common/bunyang/ModalCalendar";
import ModalCommon from "../../../component/common/modal/ModalCommon";

import CommonHeader from '../../../component/common/commonHeader';
import CommonFooter from '../../../component/common/commonFooter';


export default function Join() {
  // //이용약관
  // const [termservice, setTermService] = useState(false);
  // const openTermService = (onOff) =>{ setTermService(onOff);}

  // //개인정보처리방침
  // const [termprivacy, setTermPrivacy] = useState(false);
  // const openTermPrivacy = (onOff) =>{ setTermPrivacy(onOff);}

  // //위치기반서비스 이용약관
  // const [termlocation, setTermLocation] = useState(false);
  // const openTermLocation = (onOff) =>{ setTermLocation(onOff);}

  // //분양 모달
  // const [bunyang, setBunyang] = useState(false);
  // const openBunyang = (onOff) =>{ setBunyang(onOff);}
  // //라이브 시청 모달
  // const [live, setLive] = useState(false);
  // //분양 상세이미지 모달
  // const [detailimg, setDetailImg] = useState(false);
  // const [cal, setCal] = useState(false);
  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});


//여기 두개가 핵심이에여
  //모달 끄는 식
    const offModal = ()=>{
      let option = JSON.parse(JSON.stringify(modalOption));
      option.show = false;
      setModalOption(option);
    }


    //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
      const successModal = () =>{
        //여기가 모달 키는 거에엽
        setModalOption({
            show:true,
            setShow:offModal,
            title:"중개의뢰",
            content:{type:"text",text:`중개의뢰신청이 접수되었습니다.\n전문중개사가 의뢰검토 후 결과 알려드립니다.`,component:""},
            submit:{show:false , title:"적용" , event : ()=>{offModal(); }},
            cancle:{show:false , title:"초기화" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"확인" , event : ()=>{offModal(); }},
            confirmgreen:{show:true , title:"확인" , link:"/PropertyManagement", event : ()=>{offModal(); }}

        });
      }

      const failModal = () =>{
        //여기가 모달 키는 거에엽
        setModalOption({
            show:true,
            setShow:offModal,
            title:"중개의뢰",
            content:{type:"text",text:`등록 불가합니다.\n이미 중개 의뢰된 물건입니다.\n상기 사유에 해당하지 않는 경우,\n고객센터로 문의해주세요.`,component:""},
            submit:{show:false , title:"적용" , event : ()=>{offModal(); }},
            cancle:{show:false , title:"초기화" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"확인" , event : ()=>{offModal(); }},
            confirmgreen:{show:true , title:"확인" , event : ()=>{offModal(); }}

        });
      }
    return (
        <>
          {/* <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
          <LiveModal live={live} setLive={setLive}/>
          <ModalCalendar cal={cal} setCal={setCal}/>
          <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
          <MainHeader openBunyang={openBunyang}/> */}
          <CommonHeader/>
          <Container>
              <SubTitle title={"중개의뢰 추가"} rank={false} cursor={"default"}/>
              <NewRequestBrokerSecond successModal={successModal} failModal={failModal}/>
              <ModalCommon modalOption={modalOption}/>
          </Container>
          <CommonFooter/>
          {/* <TermService termservice={termservice} openTermService={openTermService}/>
          <TermPrivacy termprivacy={termprivacy} openTermPrivacy={openTermPrivacy}/>
          <TermLocation termlocation={termlocation} openTermLocation={openTermLocation}/>
          <MainFooter openTermService={openTermService} openTermPrivacy={openTermPrivacy} openTermLocation={openTermLocation}/> */}
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
