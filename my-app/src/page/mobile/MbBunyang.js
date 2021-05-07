//react
import React ,{useState} from 'react';

//css
import styled from "styled-components"

//component
import MainHeader from '../../component/common/MainHeader';
import SubTitle from '../../component/common/SubTitle';
import MbBunyangList from '../../component/common/bunyang/mobilecomp/MbBunyangList';
import MainFooter from '../../component/common/MainFooter';
import TermService from '../../component/common/TermsOfService';
import TermPrivacy from '../../component/common/TermsOfPrivacy';
import TermLocation from '../../component/common/TermsOfLocation';
import ModalCommon from '../../component/common/modal/ModalCommon';
import ModalFilter from '../../component/common/modal/ModalFilter';
import { Mobile, PC } from "../../MediaQuery"

export default function MainPage() {
  //이용약관
  const [termservice, setTermService] = useState(false);
  const openTermService = (onOff) =>{ setTermService(onOff);}

  //개인정보처리방침
  const [termprivacy, setTermPrivacy] = useState(false);
  const openTermPrivacy = (onOff) =>{ setTermPrivacy(onOff);}

  //위치기반서비스 이용약관
  const [termlocation, setTermLocation] = useState(false);
  const openTermLocation = (onOff) =>{ setTermLocation(onOff);}

  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});


  //여기 두개가 핵심이에여
    //모달 끄는 식
      const offModal = ()=>{
        let option = JSON.parse(JSON.stringify(modalOption));
        option.show = false;
        setModalOption(option);
      }
  
  
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
  


  return (
    <>
          <MainHeader rank={true}/>
          <Container>
            <SubTitle title={"분양"} rank={false}/>
            <MbBunyangList updateModal={updateModal}/>
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
    min-height:calc(100vh - calc(100vw*(334/428)));
    padding-bottom:calc(100vw*(100/428));

`
