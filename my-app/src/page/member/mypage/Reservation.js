//react
import React ,{useState, useEffect, useRef} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import Reservation from '../../../component/member/mypage/reservation/MyReservation';
import ModalMap from '../../../component/member/mypage/reservation/ModalMap';
import ModalReserve from '../../../component/member/mypage/reservation/ModalReserve';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import Bunyang from '../../../component/common/bunyang/Bunyang';
import ImgDetail from "../../../component/common/bunyang/ImgDetail";
import LiveModal from "../../../component/common/bunyang/LiveModal";
import ModalCalendar from "../../../component/common/bunyang/ModalCalendar";
import ModalCommon from '../../../component/common/modal/ModalCommon';
import ModalFilterComponent from '../../../component/member/mypage/reservation/ModalFilterComponent';

import CommonHeader from '../../../component/common/commonHeader';
import CommonFooter from '../../../component/common/commonFooter';

export default function Join() {
  //이용약관
  // const [termservice, setTermService] = useState(false);
  // const openTermService = (onOff) =>{ setTermService(onOff);}

  //개인정보처리방침
  // const [termprivacy, setTermPrivacy] = useState(false);
  // const openTermPrivacy = (onOff) =>{ setTermPrivacy(onOff);}

  //위치기반서비스 이용약관
  // const [termlocation, setTermLocation] = useState(false);
  // const openTermLocation = (onOff) =>{ setTermLocation(onOff);}

  //분양 모달
  // const [bunyang, setBunyang] = useState(false);
  // const openBunyang = (onOff) =>{ setBunyang(onOff);}
  //라이브 시청 모달
  // const [live, setLive] = useState(false);
  //분양 상세이미지 모달
  // const [detailimg, setDetailImg] = useState(false);
  // const [cal, setCal] = useState(false);

  //지도 모달창
  const [map,setMap] = useState(false);
  //필터 모달창
  const [filter,setFilter] = useState(false);
  //물건예약수정 모달창
  const [reserve,setReserve] = useState(false);

  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submitnone:{},cancle:{},confirm:{},confirmgreennone:{},content:{}});
  const [sortChecked, setSortChecked] = useState([1, 0, 0]);
  const [condiChecked, setCondiChecked] = useState([1, 0, 0, 0, 0]);
  const sortRef = useRef();
  const condiRef = useRef();
  
    //여기 두개가 핵심이에여
    //모달 끄는 식
    const offModal = ()=>{
      let option = JSON.parse(JSON.stringify(modalOption));
      option.show = false;
      setModalOption(option);
    }

    // 모달창을 다시 열어도 선택한 옵션을 계속 유지시킵니다. 
    const onChangeSort = (e) => {
      let newChecked = [0, 0, 0];
      newChecked[e.target.value] = 1;
      setSortChecked([...newChecked]);
    }

    const onChangeCondi = (e) => {
      let newChecked = [0, 0, 0, 0, 0];
      newChecked[e.target.value] = 1;
      setCondiChecked([...newChecked]);
    }

    // 모달창을 닫고 선택한 옵션들을 초기화합니다.
    const onClickReset = () => {
      offModal();
      setSortChecked([1, 0, 0]);
      setCondiChecked([1, 0, 0, 0, 0]);
    }


    // 적용버튼을 눌렀을때 서버에서 새로운 리스트를 불러온다.
    const onClickSubmit = () => {
      // 선택한 정렬기준과 상태입니다.
      console.log(sortRef.current.value); // 0, 1, 2
      console.log(condiRef.current.value); // 0, 1, 2, 3, 4
      offModal();
    }

    //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
    const updateModal = () =>{
      //여기가 모달 키는 거에엽
      setModalOption({
          show:true,
          setShow:offModal,
          title:"필터",
          content:{type:"components",text:`Testsetsetsetsetestse`,component:<ModalFilterComponent condiRef={condiRef} sortRef={sortRef} onChangeSort={onChangeSort} onChangeCondi={onChangeCondi} sortChecked={sortChecked} condiChecked={condiChecked}/>},
          submitnone:{show:true , title:"적용" , event : ()=> onClickSubmit()},
          cancle:{show:true , title:"초기화" , event : ()=> onClickReset()},
          confirmgreennone:{show:false , title:"확인" , event : ()=>{offModal();}}
      });
    }

    //만약에 다른걸 키고 싶으면 아래 함수 호출하시면됩니다.
    const updateMapModal = () =>{
      setModalOption({
          show:true,
          setShow:offModal,
          title:"건물위치",
          content:{type:"component",text:`ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ`,component:<ModalMap/>},
          submitnone:{show:false , title:"" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"" , event : ()=>{offModal(); }},
          confirmgreennone:{show:false , title:"" , event : ()=>{offModal(); }}
      });
    }

    const updateReserveModal = () =>{
      setModalOption({
          show:true,
          setShow:offModal,
          title:"투어예약 수정",
          content:{type:"component",text:`ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ`,component:<ModalReserve/>},
          submitnone:{show:false , title:"" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"" , event : ()=>{offModal(); }},
          confirmgreennone:{show:true , title:"수정" , event : ()=>{offModal(); }}

      });
    }

    return (
        <>
          {/*
            <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
            <LiveModal live={live} setLive={setLive}/>
            <ModalCalendar cal={cal} setCal={setCal}/>
            <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
            <MainHeader openBunyang={openBunyang}/>
          */}

          <CommonHeader />
          <Container>
            {/*개인로 로그인했을때*/}
            <SubTitle title={"개인"} rank={false} cursor={"default"}/>
            {/*기업으로 로그인했을때*/}
            {/*<SubTitle title={"소속명　"} arrow={"▼"} path={"/Team"} rank={true}/> cursor={"pointer"}*/}
            {/*중개사로 로그인했을때*/}
            {/*<SubTitle title={"럭키공인중개사　"} arrow={"▼"} path={"/Team"} rank={true}/> cursor={"pointer"}*/}
            <Reservation updateModal={updateModal} updateMapModal={updateMapModal} updateReserveModal={updateReserveModal} setMap={setMap} setFilter={setFilter} setReserve={setReserve}/>
            <ModalCommon modalOption={modalOption}/>
          </Container>
          <CommonFooter />
          {/*
            <TermService termservice={termservice} openTermService={openTermService}/>
            <TermPrivacy termprivacy={termprivacy} openTermPrivacy={openTermPrivacy}/>
            <TermLocation termlocation={termlocation} openTermLocation={openTermLocation}/>
            <MainFooter openTermService={openTermService} openTermPrivacy={openTermPrivacy} openTermLocation={openTermLocation}/>
          */}
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
