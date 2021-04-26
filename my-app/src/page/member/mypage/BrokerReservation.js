//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import ModalMap from '../../../component/member/mypage/visit/ModalMap';
import ModalFilter from '../../../component/member/mypage/visit/ModalFilter';
import ModalVisitor from '../../../component/member/mypage/visit/ModalVisitor';
import ModalCal from '../../../component/member/mypage/visit/ModalCalendar';
import BrokerVisit from '../../../component/member/mypage/visit/BrokerVisit';
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

  const [rank,setRank] = useState(false);
  //지도 모달창
  const [map,setMap] = useState(false);
  //필터 모달창
  const [filter,setFilter] = useState(false);
  //동반고객 모달창
  const [visit,setVisit] = useState(false);
  //방문예약 수정모달창
  const [vCal,setVCal] = useState(false);
  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});


//여기 두개가 핵심이에여 넵!
  //모달 끄는 식
    const offModal = ()=>{
      let option = JSON.parse(JSON.stringify(modalOption));
      option.show = false;
      setModalOption(option);
    }


    //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
      const updateModal = () =>{
        //여기가 모달 키는 거에엽
        setModalOption({
            show:true,
            setShow:offModal,
            title:"필터",
            content:{type:"components",text:`Testsetsetsetsetestse`,component:<ModalFilter/>},
            submit:{show:true , title:"적용" , event : ()=>{offModal(); }},
            cancle:{show:true , title:"초기화" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"확인" , event : ()=>{offModal(); }}
        });
      }

    //만약에 다른걸 키고 싶으면 아래 함수 호출하시면됩니다.
      const updateMapModal = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"중개업소 위치",
            content:{type:"component",text:``,component:<ModalMap/>},
            submit:{show:false , title:"" , event : ()=>{offModal(); }},
            cancle:{show:false , title:"" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"" , event : ()=>{offModal(); }}
        });
      }

      const visitorModal = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"동반고객 보기",
            content:{type:"component",text:``,component:<ModalVisitor/>},
            submit:{show:false , title:"" , event : ()=>{offModal(); }},
            cancle:{show:false , title:"" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"수정" , event : ()=>{offModal(); }}

        });
      }
      const calModal = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"방문예약",
            content:{type:"component",text:``,component:<ModalCalendar/>},
            submit:{show:false , title:"" , event : ()=>{offModal(); }},
            cancle:{show:false , title:"" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"수정" , event : ()=>{offModal(); }}

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
            <SubTitle title={"소속명"} arrow={"　▼"} rank={false} path={"/Team"} cursor={"pointer"}/>
            <BrokerVisit calModal={calModal} visitorModal={visitorModal} updateModal={updateModal} updateMapModal={updateMapModal} setMap={setMap} setFilter={setFilter} setVisit={setVisit} setVCal={setVCal}/>
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
