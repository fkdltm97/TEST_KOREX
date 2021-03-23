//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//selectbox
import AsyncSelect from 'react-select/async';
import { term1Option } from './data';

//style
import styled from "styled-components"

//img
import CalIcon from "../../img/main/icon_cal.png";
import CloseIcon from "../../img/main/modal_close.png";



export default function ModalTest({ couponModal, openCouponModal }) {

//모달창
  if(couponModal == false)
    return null;
    return (
      <Container>
        <ModalBg onClick={()=>{openCouponModal(false)}}></ModalBg>
        <ModalContent>
          <ModalClose>
            <Link onClick={()=>{openCouponModal(false)}}>
              <CloseImg src={CloseIcon}/>
            </Link>
          </ModalClose>
          <ModalTop>
            <Title>이용약관</Title>
            <select className="term1">
              <option value="" disabled selected>이전 서비스 이용약관 보기</option>
              <option value="1">2020년 1월 2일</option>
              <option value="2">2020년 3월 2일</option>
            </select>
          {/*
            <PrevTerms>
              <Txt>이전 서비스 이용약관 보기</Txt>
              <CalImg src={CalIcon}/>
            </PrevTerms>
            */}
          </ModalTop>
        </ModalContent>

      </Container>
    );
}

const Container = styled.div`
  width:100%;
`

const ModalBg = styled.div`
  position: fixed; top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 999;
  background:rgba(0,0,0,0.05);

`
const ModalContent = styled.div`
  position:fixed;
  width:1146px;
  height:752px;
  background:#fff;
  left:50%;top:50%;transform:translate(-50%,-50%);
  border-radius:24px;
  padding: 26.1px 46.7px 65.8px 95.8px;
  overflow-y:scroll;
  z-index:1000;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
}



`
const ModalClose = styled.div`
  position:absolute;
  right:24px;top:24px;

`
const CloseImg = styled.img`
  width:17px;
  height:18px;
`
const ModalTop = styled.div`
  width:100%;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  margin-top:22px;
  border-bottom:solid 1px #a3a3a3;
  padding-bottom:14px;
`
const Title = styled.h1`
  font-size:20px;
  color:#707070;
  margin-right:36px;
`
const PrevTerms = styled.div`
  width:234px;height:35px;
  border-radius:4px;
  border:1px solid #e4e4e4;
  display:flex;justify-content:center;align-items:center;
`

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width:'5em',height:'5em',
};
const groupBadgeStyles = {
  width:'100%',height:'100%',
  backgroundColor: '#EBECF0',
  borderRadius: '2em',
  color: '#172B4D',
  display: 'inline-block',
  fontSize: 12,
  fontWeight: 'normal',
  padding: '0.16666666666667em 0.5em',
  textAlign: 'center',
};

const Txt = styled.h4`
  font-size:15px;
  margin-right:15px;
  color:#a3a3a3;
`
const CalImg = styled.img`
  width:18px;
`
