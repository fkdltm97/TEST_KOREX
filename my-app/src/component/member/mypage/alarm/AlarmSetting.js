//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap-tabs';

//css
import styled from "styled-components"

//img
import Filter from '../../../../img/member/filter.png';
import Bell from '../../../../img/member/bell.png';
import BellActive from '../../../../img/member/bell_active.png';
import Location from '../../../../img/member/loca.png';
import Set from '../../../../img/member/setting.png';
import Item from '../../../../img/main/item01.png';
import Noimg from '../../../../img/main/main_icon3.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';

import { Mobile, PC } from "../../../../MediaQuery";
import JunsokSetting from "./JunsokSetting";
import CommonSetting from "./CommonSetting";

export default function Like({setFilter,value,type}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }
    return (
        <Container>
          <WrapRequest>
            <TopTitle>내 알림 설정</TopTitle>
            <Tabs onSelect={(index, label) => console.log(label + ' selected')} className="like_tab alarm_tab">
            {/*
              ** 분기처리 **
              개인 : 전속매물 공급 I 공통
              기업 : 전속매물 공급 I 공통
              중개사 : 분양수요 I 공통
              전문중개사 : 분양수요 I 전속매물 공급 I 공통
              분양프로젝트 팀원 : 분양공급 I 공통

              */}
              <Tab label="전속매물 공급">
                <JunsokSetting/>
              </Tab>
              <Tab label="공통">
                <CommonSetting/>
              </Tab>
          </Tabs>

      </WrapRequest>
  </Container>
  );
}

const Pb = styled.b`
  display:block;
  @media ${(props) => props.theme.mobile} {
        display:inline;
    }
`
const Mb = styled.b`
  display:inline;
  @media ${(props) => props.theme.mobile} {
        display:block;
    }
`
const Container = styled.div`
    width:890px;
    margin:0 auto;
    padding:24px 0 250px;
    @media ${(props) => props.theme.mobile} {
      width:100%;
      padding:calc(100vw*(18/428)) 0 calc(100vw*(50/428));
      }
`
const WrapRequest = styled.div`
  width:100%;
`
const TopTitle = styled.h2`
  width:680px;margin:0 auto;
  font-size:20px;color:#707070;
  margin-bottom:40px;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);

  @media ${(props) => props.theme.mobile} {
    width:100%;
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(36/428));
    margin-bottom:calc(100vw*(24/428));
    }
`
