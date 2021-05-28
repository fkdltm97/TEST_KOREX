//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import Preview from '../../component/AppComponent/Preview';
import ModalCommon from "../../component/common/modal/ModalCommon";
import ModalEdit from "../../component/AppComponent/modal/ModalEdit";
import ReportModal from "../../component/AppComponent/modal/ReportModal";
import ModalReject from "../../component/AppComponent/modal/ModalReject";

import CommonHeader from '../../component/common/commonHeader';
import CommonFooter from '../../component/common/commonFooter';

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

  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},submitnone:{},cancle:{},confirm:{},confirmgreennone:{},link:{},content:{}});
  const [off,setOff] = useState(false);

//여기 두개가 핵심이에여
  //모달 끄는 식
    const offModal = ()=>{
      let option = JSON.parse(JSON.stringify(modalOption));
      option.show = false;
      setModalOption(option);
    }
      const updateReserveModal = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"물건투어예약",
            content:{type:"component",text:`ddfdf`,component:<ModalEdit/>},
            submit:{show:false , title:"" , event : ()=>{offModal(); }},
            cancle:{show:false , title:"" , event : ()=>{offModal(); }},
            confirm:{show:true , title:"수정" , event : ()=>{offModal(); }}

        });
      }
      const reportModal = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"허위매물신고",
            content:{type:"component",text:`ddfdf`,component:<ReportModal off={off} setOff={(e)=>{setOff(e); offModal();}}/>},
            submit:{show:false , title:"" , event : ()=>{offModal(); }},
            cancle:{show:false , title:"" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"수정" , event : ()=>{offModal(); }}

        });
      }

      const rejectModal = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"거절 사유",
            content:{type:"component",text:`ddfdf`,component:<ModalReject off={off} setOff={(e)=>{setOff(e); offModal();}}/>},
            submit:{show:false , title:"" , event : ()=>{offModal(); }},
            cancle:{show:false , title:"" , event : ()=>{offModal(); }},
            confirmgreennone:{show:true , title:"확인" , event : ()=>{rejectModalConfirm(); }}

        });
      }
      const rejectModalConfirm = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"거절 사유",
            content:{type:"text",text:`정상적으로 처리 되었습니다.`,component:''},
            submit:{show:false , title:"" , event : ()=>{offModal(); }},
            cancle:{show:false , title:"" , event : ()=>{offModal(); }},
            confirmgreennone:{show:true , title:"확인", event : ()=>{offModal(); }}

        });
      }

      const confirmModal = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"거래개시 승인",
            content:{type:"text",text:`해당 물건을 플랫폼에\n게시하시겠습니까?\n전속기간 종료 후에는 게시 삭제되며,\n중개의뢰 계약은 자동으로 종료됩니다.`,component:''},
            submitnone:{show:true , title:"확인" , event : ()=>{offModal(); }},
            cancle:{show:true , title:"취소" , event : ()=>{offModal(); }},
            confirmgreennone:{show:false , title:"확인", event : ()=>{offModal(); }}

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
              <Preview updateReserveModal={updateReserveModal} reportModal={reportModal} rejectModal={rejectModal} confirmModal={confirmModal}/>
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
