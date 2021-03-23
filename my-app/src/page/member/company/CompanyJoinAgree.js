//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import JoinTab from '../../../component/member/join/company/JoinTab';
import JoinPwd from '../../../component/member/join/company/JoinPwd';
import JoinCheck from '../../../component/member/join/company/JoinCheck';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import House from '../../../component/common/house/House';


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
          <House house={house} openHouse={openHouse}/>
          <MainHeader openHouse={openHouse}/>
          <Container>
              <SubTitle title={"회원가입"}/>
              <JoinTab/>
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
