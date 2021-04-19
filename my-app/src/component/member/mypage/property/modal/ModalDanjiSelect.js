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
            <ModalBg onClick={() => {setModalDanji(false)}}/>
            <Modal>
              <FilterCloseBtn>
                <Link onClick={() => {setModalDanji(false)}}>
                  <FilterCloseImg src={Close}/>
                </Link>
              </FilterCloseBtn>
              <TopInfo>
                <Title>중개의뢰 가능한 단지 선택</Title>
              </TopInfo>
              <Body>
                <SearchTitle>반포자이</SearchTitle>
                <SearchResultAddress>
                서울 서초구 반포동 20-43<br/>
                도로명) 서울시 서초구 신반포로 270
                </SearchResultAddress>
              </Body>
              <Question>선택하시겠습니까?</Question>
              <Buttons>
                <CancelBtn type="button" onClick={() => {setModalDanji(false)}}>취소</CancelBtn>
                <Link>
                  <ConfirmBtn type="button" onClick={()=>{setModalDanji(false);setSelectInfo(true);setModalDanji(false);}}>확인</ConfirmBtn>
                </Link>
              </Buttons>
            </Modal>
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
`
const ModalBg = styled.div`
  width:100%;height:100%;
  position:fixed;left:0;top:0;
  background:rgba(0,0,0,0.2);
  display:block;content:'';
  z-index:3;
`
const Modal = styled.div`
  position:absolute;
  left:50%;top:50%;transform:translate(-50%,-50%);
  width:535px;border-radius:24px;
  border:1px solid #f2f2f2;
  background:#fff;
  padding:49px 50px 60px 50px;
  z-index:3;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(395/428));
    padding:calc(100vw*(33/428)) calc(100vw*(15/428));
  }
`
const FilterCloseBtn = styled.div`
  width:100%;text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(22/428));
  }
`
const FilterCloseImg = styled.img`
  display:inline-block;width:15px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(12/428));
  }
`
const TopInfo = styled.div`

`
const Title = styled.h3`
font-size:20px;font-weight:600;transform:skew(-0.1deg);
padding-bottom:22px;border-bottom:1px solid #a3a3a3;
`
const Body = styled.div`
  padding:44px 0;
  text-align:center;
  background:#fbfbfb;
`
const SearchTitle = styled.p`
  font-size: 15px;
  line-height: 1.2;
  font-weight:500;
  font-family:'nbg',sans-serif;
  color: #4a4a4a;transform:skeW(-0.1deg);
`
const SearchResultAddress = styled(SearchTitle)`
`
const Question = styled(SearchTitle)`
  margin-top:30px;
  text-align:center;
`
const Buttons = styled.div`
  width:100%;
  margin-top:55px;
  display:flex;justify-content:center;align-items:center;
`
const CancelBtn = styled.button`
  width:200px;height:66px;
  border: solid 3px #e4e4e4;
  background-color: #979797;
  text-align:center;
  color:#fff;font-size:20px;font-weight:800;
  transform:skew(-0.1deg);
  margin-right:8px;
  border-radius: 11px;
`
const ConfirmBtn = styled(CancelBtn)`
  border: solid 3px #04966d;
  background-color: #01684b;
  margin-right:0;
`
