//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Filter from '../../../../../img/member/filter.png';
import Bell from '../../../../../img/member/bell.png';
import BellActive from '../../../../../img/member/bell_active.png';
import Location from '../../../../../img/member/loca.png';
import Set from '../../../../../img/member/setting.png';
import Item from '../../../../../img/main/item01.png';
import Noimg from '../../../../../img/main/main_icon3.png';
import Close from '../../../../../img/main/modal_close.png';
import Change from '../../../../../img/member/change.png';
import Marker from '../../../../../img/member/marker.png';
import ArrowDown from '../../../../../img/member/arrow_down.png';

//필터 모달
export default function ModalDanjiSelect({modalDanji,setModalDanji,setSelectInfo}) {
    return (
        <Container>
          <WrapModal>
              <Body>
                <SearchTitle>반포자이</SearchTitle>
                <SearchResultAddress>
                서울 서초구 반포동 20-43<br/>
                도로명) 서울시 서초구 신반포로 270
                </SearchResultAddress>
              </Body>
              <Question>선택하시겠습니까?</Question>
          </WrapModal>
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

`
const WrapModal = styled.div`
  width:100%;
  margin-bottom:40px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(40/428));
  }
`
const Body = styled.div`
  padding:44px 0;
  text-align:center;
  background:#fbfbfb;
  @media ${(props) => props.theme.modal} {
    padding:calc(100vw*(30/428)) 0;
  }
`
const SearchTitle = styled.p`
  font-size: 15px;
  line-height: 1.2;
  font-weight:500;
  font-family:'nbg',sans-serif;
  color: #4a4a4a;transform:skeW(-0.1deg);
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(14/428));
    line-height:1.33;
  }
`
const SearchResultAddress = styled(SearchTitle)`
`
const Question = styled(SearchTitle)`
  margin-top:30px;
  text-align:center;
  @media ${(props) => props.theme.modal} {
    margin-top:calc(100vw*(20/428));
  }
`
