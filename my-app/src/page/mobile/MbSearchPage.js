//react
import React ,{useState} from 'react';

//css
import styled from "styled-components"

//component
import MainHeader from '../../component/common/MainHeader';
import SubTitle from '../../component/common/SubTitle';
import MainBodyTop from '../../component/main/MainBodyTop';
import MbSearchBody from '../../component/main/mobilecomp/MbSearchBody';
import MainFooter from '../../component/common/MainFooter';
import TermService from '../../component/common/TermsOfService';
import TermPrivacy from '../../component/common/TermsOfPrivacy';
import TermLocation from '../../component/common/TermsOfLocation';

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

  return (
    <>
      <Mobile>
          <MainHeader/>
          <Container>
            <SubTitle title={"검색"} rank={false}/>
            <MainBodyTop/>
            <MbSearchBody/>
          </Container>
          <TermService termservice={termservice} openTermService={openTermService}/>
          <TermPrivacy termprivacy={termprivacy} openTermPrivacy={openTermPrivacy}/>
          <TermLocation termlocation={termlocation} openTermLocation={openTermLocation}/>
          <MainFooter openTermService={openTermService} openTermPrivacy={openTermPrivacy} openTermLocation={openTermLocation}/>
      </Mobile>
    </>
  );
}

const Container = styled.div`
    width: 100%;
    min-height:calc(100vh - 309px);
`
