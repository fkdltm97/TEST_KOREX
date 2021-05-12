//react
import React ,{useState, useEffect} from 'react';
import {Link, useHistory} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import ModalFilter from '../../../component/member/mypage/property/modal/ModalFilter';
import PropertyManage from '../../../component/member/mypage/property/PropertyManage';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import Bunyang from '../../../component/common/bunyang/Bunyang';
import ImgDetail from "../../../component/common/bunyang/ImgDetail";
import LiveModal from "../../../component/common/bunyang/LiveModal";
import ModalCalendar from "../../../component/common/bunyang/ModalCalendar";

//server process
import serverController from '../../../../src/server/serverController';
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

  const [rank,setRank] = useState(false);

  //필터 모달
  const [filter, setFilter] = useState(false);
  
  const history = useHistory();
  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submitnone:{},cancle:{},confirm:{},confirmgreen:{},content:{}});


  //여기 두개가 핵심이에여
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
              submitnone:{show:true , title:"적용" , event : ()=>{offModal(); }},
              cancle:{show:true , title:"초기화" , event : ()=>{offModal(); }},
              confirm:{show:false , title:"확인" , event : ()=>{offModal(); }}
          });
        }
  
  // 이 부분 오류나서 주석처리해놨습니다!
  // useEffect( async () => {
  //   let body_info={};
  //   console.log('propertymanagement 페이지 실행>>>>>>>>>>>>>>>>>>>>',serverController);
  //   let user_info= await serverController.connectFetchController('/api/auth/islogin','GET');
  //   console.log('user is login query>>:',user_info);
    
  //   if(user_info.login_session){

  //   }else{
  //     console.log('==========로그인안되어있음 :',history);
  //     history.push('/');
  //   }
  // },[]);

    return (
        <>
          {/* <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
          <LiveModal live={live} setLive={setLive}/>
          <ModalCalendar cal={cal} setCal={setCal}/>
          <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
          <MainHeader openBunyang={openBunyang}/> */}
          <CommonHeader />
          <Container>
            <SubTitle title={"소속명"} arrow={"　▼"} rank={false} path={"/Team"} cursor={"pointer"}/>
            <PropertyManage setFilter={setFilter} updateModal={updateModal}/>
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
