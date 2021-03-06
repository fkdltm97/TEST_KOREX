//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component

import SubTitle from '../../../component/common/SubTitle';
import ModalVisitFilter from '../../../component/member/mypage/projectSetting/modal/ModalVisitFilter';
import ModalVisitor from '../../../component/member/mypage/projectSetting/modal/ModalVisitor';
import ModalVisitCancle from '../../../component/member/mypage/projectSetting/modal/ModalVisitCancle';
import VisitManage from '../../../component/member/mypage/projectSetting/VisitManage';

import ModalCommon from '../../../component/common/modal/ModalCommon';


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

  //필터 모달창
  const [filter,setFilter] = useState(false);
  //동반고객 모달창
  const [visit,setVisit] = useState(false);
  //방문예약 취소모달창
  const [cancle,setCancle] = useState(false);
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
            content:{type:"components",text:`Testsetsetsetsetestse`,component:<ModalVisitFilter/>},
            submit:{show:true , title:"적용" , event : ()=>{offModal(); }},
            cancle:{show:true , title:"초기화" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"확인" , event : ()=>{offModal(); }}
        });
      }

    //만약에 다른걸 키고 싶으면 아래 함수 호출하시면됩니다.
      const visitorModal = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"동반고객 보기",
            content:{type:"component",text:`ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ`,component:<ModalVisitor/>},
            submit:{show:false , title:"" , event : ()=>{offModal(); }},
            cancle:{show:false , title:"" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"" , event : ()=>{offModal(); }}
        });
      }

      const cancleModal = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"투어예약 수정",
            content:{type:"component",text:`ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ`,component:<ModalVisitCancle/>},
            submit:{show:true , title:"확인" , event : ()=>{offModal(); alert("취소되었습니다.");}},
            cancle:{show:true , title:"취소" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"수정" , event : ()=>{offModal(); }}

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
              <SubTitle title={"소속명"} arrow={"　▼"} path={"/Team"} cursor={"pointer"}/>
              <VisitManage updateModal={updateModal} visitorModal={visitorModal} cancleModal={cancleModal} setVisit={setVisit} setFilter={setFilter} setCancle={setCancle}/>
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
