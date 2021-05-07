//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import PropertyManage from '../../../component/member/mypage/propertyManage/PropertyManage';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import Bunyang from '../../../component/common/bunyang/Bunyang';
import ImgDetail from "../../../component/common/bunyang/ImgDetail";
import LiveModal from "../../../component/common/bunyang/LiveModal";
import ModalCalendar from "../../../component/common/bunyang/ModalCalendar";
import ModalCommon from '../../../component/common/modal/ModalCommon';
import ModalMap from '../../../component/member/mypage/propertyManage/modal/ModalMap';
import ModalSelect from '../../../component/member/mypage/propertyManage/modal/ModalSelect';
import ModalEdit from '../../../component/member/mypage/propertyManage/modal/ModalEdit';
import ModalAllEdit from '../../../component/member/mypage/propertyManage/modal/ModalAllEdit';
import ModalEditResult from '../../../component/member/mypage/propertyManage/modal/ModalEditResult';

//server
import serverController from '../../../server/serverController';

import {useSelector} from 'react-redux';

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

  //필터 모달창
  const [filter,setFilter] = useState(false);
  //물건예약수정 모달창
  const [reserve,setReserve] = useState(false);
  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreennone:{},content:{}});

  // (전체 버튼 누르면 나오는) 리스트 셀렉트
  const [select, setSelect] = useState(false);
  console.log(select);
  
  //사용자 투어예약접수리스트 가져오기.
  const login_userinfo = useSelector(data => data.login_user);
  const [reservationItemlist,setReservationItemlist] = useState([]);//reservationItemlist 예약아이템리스트 page에서 선언하고, 여기서 사용한다. 초기화하고 건내준다.
  const [prdidvalue,setPrdidvalue] = useState('');

  useEffect(async () => {
    console.log('=>>>>propertyYTOurtmnangae페이지 최초 실행시점때만 실행, 접수리스트 데이터 조회:');
    if(login_userinfo.is_login){
      let body_info = {
        memid : login_userinfo.memid,
        company_id : login_userinfo.company_id,
        user_type : login_userinfo.user_type,
        isexculsive: login_userinfo.isexculsive
      };
      console.log('JSONBODY INFO TEST:',JSON.stringify(body_info));

      let res= await serverController.connectFetchController('/api/broker/brokerproduct_reservationList','POST',JSON.stringify(body_info));

      if(res){
        console.log('res result ...>:::',res);

        var reservation_data=res.result_data;
        setReservationItemlist(reservation_data);
      }
    }
    
  },[]);

  useEffect(async () => {
    console.log('=>>>>>propertyTourmanage페이지의 reservationImtelist state변수값 변화감지 변화시에만 실행되는 형태',reservationItemlist,prdidvalue);

  },[reservationItemlist,prdidvalue]);

  //여기 두개가 핵심이에여
  //모달 끄는 식
  const offModal = ()=>{
    let option = JSON.parse(JSON.stringify(modalOption));
    option.show = false;
    setModalOption(option);
  }


  //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
    const cancleModal = (tr_id) =>{
      //여기가 모달 키는 거에엽
      setModalOption({
          show:true,
          setShow:offModal,
          title:"예약 해제",
          content:{type:"text",text:`예약을 해제하시겠습니까?\n해제 시, 예약자에게 알림이 전송됩니다.`,component:""},
          submit:{show:true , title:"확인" , event : async ()=>{
            offModal();confirmModal();

            console.log('what tr_id::',tr_id);

            let body_info={
              tr_id_val : tr_id
            };
            let res=await serverController.connectFetchController('/api/broker/brokerproduct_reservation_release','POST',JSON.stringify(body_info));

            if(res){
              console.log('ress_>>>>>>:',res);
            }
          }},
          cancle:{show:true , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }}
      });
    }
//예약해제 완료되었습니다 모달
    const confirmModal = () =>{
      //여기가 모달 키는 거에엽
      setModalOption({
          show:true,
          setShow:offModal,
          title:"예약 해제",
          content:{type:"text",text:`예약해제가 완료되었습니다.`,component:""},
          submit:{show:false , title:"확인" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }},
          confirmgreennone:{show:true , title:"확인" , event : ()=>{offModal(); }}
      });
    }

    const mapModal = () =>{
      setModalOption({
          show:true,
          setShow:offModal,
          title:"건물 위치",
          content:{type:"component",text:` 완료되었습니다.`,component:<ModalMap/>},
          submit:{show:false , title:"확인" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }},
      });
    }
    const selectModal = () =>{
      setModalOption({
          show:true,
          setShow:offModal,
          title:"물건투어예약접수 관리",
          content:{type:"component",text:``,component:<ModalSelect setPrdidvalue={setPrdidvalue} setReservationItemlist={setReservationItemlist} select={select} setSelect={(e)=>{setSelect(e); offModal();}}/>},
          submit:{show:false , title:"확인" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }},
      });
    }

    const editModal = () =>{
      setModalOption({
          show:true,
          setShow:offModal,
          title:"물건투어예약접수 수정",
          content:{type:"component",text:``,component:<ModalEdit/>},
          submit:{show:false , title:"확인" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:true , title:"확인" , event : ()=>{offModal(); editResultModal();}}
      });
    }
    const editAllModal = () =>{
      setModalOption({
          show:true,
          setShow:offModal,
          title:"물건투어예약접수 일괄 수정",
          content:{type:"component",text:``,component:<ModalAllEdit/>},
          submit:{show:false , title:"확인" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:true , title:"확인" , event : ()=>{offModal(); editResultModal();}}
      });
    }
    //예약수정 얼럿창
    const editResultModal = () =>{
      setModalOption({
          show:true,
          setShow:offModal,
          title:"물건투어예약접수",
          content:{type:"component",text:``,component:<ModalEditResult/>},
          submit:{show:true , title:"확인" , event : ()=>{offModal(); }},
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
            <SubTitle title={"소속명"} arrow={"　▼"} path={"/Team"} cursor={"pointer"}/> 
            <PropertyManage prdidvalue={prdidvalue} reservationItemlist={reservationItemlist} cancleModal={cancleModal} confirmModal={confirmModal} select={select} setSelect={setSelect}
            mapModal={mapModal} selectModal={selectModal} editModal={editModal} editAllModal={editAllModal} editResultModal={editResultModal}/>
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
    min-height:calc(100vh - 289px);
    @media ${(props) => props.theme.mobile} {
        min-height:calc(100vh - calc(100vw*(334/428)));
      }
`
