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
import ItemTopInfo from "./ItemTopInfo";
import ItemTabList from "./ItemTabList";
import CommonList from "./CommonList";

export default function Like({setFilter,value,type}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }
  const AlarmListItem =[
  {
    a_id : 0,
    condition:"미확인",
    date:"2020.01.01",
    title:"알림케이스 명",
    id:"자이 109동",
    content:"내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다."
  },
  {
    a_id : 1,
    condition:"미확인",
    date:"2020.01.01",
    title:"알림케이스 명",
    id:"자이 109동",
    content:"내용입니다.내용입니다.내용입니다.내용입니다.내용입니다.내용입니다."
  }
  ]
    return (
        <Container>
          <WrapRequest count1={1} count2={2} count3={0} count4={0}>
            <TopTitle>내 알림</TopTitle>
            <Tabs onSelect={(index, label) => console.log(label + ' selected')} className="like_tab alarm_tab pr">
            {/*
              ** 분기처리 **
              cf.전속매물 수요 관련 화면설계 : #86_v1.2 의 1-a, #87_v1.2 의 2-a
              개인 : 전속매물 수요 I 전속매물 공급 I 공통
              기업 : 전속매물 수요 I 전속매물 공급 I 공통
              중개사 : 전속매물 수요 I 분양수요 I 공통
              전문중개사 : 전속매물 수요 I 분양 수요 I 전속매물 공급 I 공통
              분양프로젝트 팀원 : 분양 공급 I 공통

              */}
              <Tab label="전속매물 수요">
              <ItemTopInfo/>
              {
                  AlarmListItem.map((value) => {
                    return(
                      <ItemTabList value={value}/>
                    )
                  }
                )
              }
              </Tab>
{/*
              <Tab label="분양 수요" >
              <ItemTopInfo/>
              {
                  AlarmListItem.map((value) => {
                    return(
                      <ItemTabList value={value}/>
                    )
                  }
                )
              }
              </Tab>
*/} 
              <Tab label="전속매물 공급" className="count_num">
              <ItemTopInfo/>
              {
                  AlarmListItem.map((value) => {
                    return(
                      <ItemTabList value={value}/>
                    )
                  }
                )
              }
              </Tab>             
{/*
              <Tab label="분양 공급">
              <ItemTopInfo/>
              {
                  AlarmListItem.map((value) => {
                    return(
                      <ItemTabList value={value}/>
                    )
                  }
                )
              }
              </Tab>
*/}
              <Tab label="공통">
              <ItemTopInfo/>
              {
                  AlarmListItem.map((value) => {
                    return(
                      <ItemTabList value={value}/>
                    )
                  }
                )
              }
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
  position:relative;
  width:100%;
  & > div > ul > li:nth-child(1) > a::before {
    content: '${({count1})=>count1}';
    position:absolute;
    top:50%;transform:translateY(-50%);
    right:0;
    width:15px;
    height:15px;
    line-height:15px;
    display:block;
    background:#fe7a01;
    color:#fff;text-align:center;
    font-size:11px;border-radius:100%;
    @media screen and (max-width:1024px){
      width: calc(100vw*(15/428));
      height: calc(100vw*(15/428));
      line-height: calc(100vw*(15/428));
      font-size: calc(100vw*(10/428));
    }
  }
  & > div > ul > li:nth-child(2) > a::before {
    content: '${({count2})=>count2}';
    position:absolute;
    top:50%;transform:translateY(-50%);
    right:0;
    width:15px;
    height:15px;text-align:center;
    line-height:15px;
    display:block;
    background:#fe7a01;
    color:#fff;
    font-size:11px;border-radius:100%;
    @media screen and (max-width:1024px){
      width: calc(100vw*(15/428));
      height: calc(100vw*(15/428));
      line-height: calc(100vw*(15/428));
      font-size: calc(100vw*(10/428));
    }
  }
  & > div > ul > li:nth-child(3) > a::before {
    content: '${({count3})=>count3}';
    position:absolute;
    top:50%;transform:translateY(-50%);
    right:0;
    width:15px;
    height:15px;text-align:center;
    line-height:15px;
    display:block;
    background:#fe7a01;
    color:#fff;
    font-size:11px;border-radius:100%;
    @media screen and (max-width:1024px){
      width: calc(100vw*(15/428));
      height: calc(100vw*(15/428));
      line-height: calc(100vw*(15/428));
      font-size: calc(100vw*(10/428));
    }
  }
  & > div > ul > li:nth-child(4) > a::before {
    content: '${({count4})=>count4}';
    position:absolute;
    top:50%;transform:translateY(-50%);
    right:0;
    width:15px;
    height:15px;text-align:center;
    line-height:15px;
    display:block;
    background:#fe7a01;
    color:#fff;
    font-size:11px;border-radius:100%;
    @media screen and (max-width:1024px){
      width: calc(100vw*(15/428));
      height: calc(100vw*(15/428));
      line-height: calc(100vw*(15/428));
      font-size: calc(100vw*(10/428));
    }
  }
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
const AlarmSpan = styled.div`
  display:inline-block;
  width:15px;height:15px;
  border-radius:100%;font-size:12px;font-weight:600;
  transform:skew(-0.1deg);background:#fe7a01;
  text-align:center;line-height:15px;
  margin-left:5px;
`