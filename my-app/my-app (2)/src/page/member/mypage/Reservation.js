//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import Reservation from '../../../component/member/mypage/reservation/MyReservation';
import ModalMap from '../../../component/member/mypage/reservation/ModalMap';
import ModalFilter from '../../../component/member/mypage/reservation/ModalFilter';
import ModalReserve from '../../../component/member/mypage/reservation/ModalReserve';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import House from '../../../component/common/house/House';



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
  const [house, setHouse] = useState(false);
  const openHouse = (onOff) =>{ setHouse(onOff);}

  //지도 모달창
  const [map,setMap] = useState(false);
  //필터 모달창
  const [filter,setFilter] = useState(false);
  //물건예약수정 모달창
  const [reserve,setReserve] = useState(false);
    return (
        <>
          <House house={house} openHouse={openHouse}/>
          <MainHeader openHouse={openHouse}/>
          <Container>
            {/*개인로 로그인했을때*/}
              <SubTitle title={"개인"} rank={true} cursor={"default"}/>
            {/*기업으로 로그인했을때*/}
              {/*<SubTitle title={"소속명　∨"} path={""}rank={true}/>*/}
            {/*중개사로 로그인했을때*/}
              {/*<SubTitle title={"럭키공인중개사　∨"} rank={true}/>*/}
              <ModalMap map={map} setMap={setMap}/>
              <ModalFilter filter={filter} setFilter={setFilter}/>
              <ModalReserve reserve={reserve} setReserve={setReserve}/>
              <Reservation map={map} setMap={setMap} setFilter={setFilter} setReserve={setReserve}/>
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
