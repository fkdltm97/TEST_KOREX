//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import JoinTab from '../../../component/member/join/broker/JoinTab';
import JoinTopTxt from '../../../component/member/join/broker/JoinTopTxt';
import JoinPwd from '../../../component/member/join/broker/JoinPwd';
import JoinCheck from '../../../component/member/join/broker/JoinCheck';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import House from '../../../component/common/house/House';
import ImgDetail from "../../../component/common/house/ImgDetail";
import LiveModal from "../../../component/common/house/LiveModal";
import ModalCalendar from "../../../component/common/house/ModalCalendar";

export default function JoinAgree() {
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
  const [house, setHouse] = useState(false);
  const openHouse = (onOff) =>{ setHouse(onOff);}
  //라이브 시청 모달
  const [live, setLive] = useState(false);
  //분양 상세이미지 모달
  const [detailimg, setDetailImg] = useState(false);
  const [cal, setCal] = useState(false);

  /*비밀번호 규정 show, hide*/
  const [pwdShow,setPwdShow] = useState(false);
  /*비밀번호 validate*/
  const [pwd,setPwd] = useState("");/*기본값*/
  const [pwdConfirm,setPwdConfirm] = useState("");/*기본값*/
  const [active,setActive] = useState(false);

    console.log(pwd);
    // console.log(pwdConfirm);

    const checkVaildate = () =>{
      return pwd.length > 7
      && pwdConfirm.length > 7
      && pwd == pwdConfirm
     }

    useEffect(()=>{
      if(checkVaildate())
         setActive(true);
      else
          setActive(false);
    },)

    return (
        <>
          <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
          <LiveModal live={live} setLive={setLive}/>
          <ModalCalendar cal={cal} setCal={setCal}/>
          <House house={house} openHouse={openHouse} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
          <MainHeader openHouse={openHouse}/>
          <Container>
              <SubTitle title={"회원가입"}/>
              <JoinTab/>
              <JoinTopTxt/>
              <JoinPwd
                pwd={pwd}
                pwdShow={pwdShow}
                setPwdShow={setPwdShow}
                setPwd={setPwd}
                setPwdConfirm={setPwdConfirm}
              />
              <JoinCheck
                pwd={pwd}
                setPwd={setPwd}
                active={active}
                setActive={setActive}
                pwdConfirm={pwdConfirm}
                setPwdConfirm={setPwdConfirm}
              />
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
`
