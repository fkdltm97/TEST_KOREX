//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//style
import styled from "styled-components"

//img
import CalIcon from "../../img/main/icon_cal.png";
import CloseIcon from "../../img/main/modal_close.png";



export default function ModalTest3({ termlocation, openTermLocation }) {

//모달창
  if(termlocation == false)
    return null;
    return (
      <Container>
        <ModalBg onClick={()=>{openTermLocation(false)}}></ModalBg>
        <ModalContent>
          <ModalClose>
            <Link onClick={()=>{openTermLocation(false)}}>
              <CloseImg src={CloseIcon}/>
            </Link>
          </ModalClose>
          <ModalTop>
            <Title>위치기반 서비스 이용약관</Title>
            <select className="term1">
              <option value="" disabled selected>이전 위치기반 서비스 약관 보기</option>
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
          <TextArea>
            이용약관이 들어가는 곳입니다.
          </TextArea>
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
  z-index: 90;
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
  z-index:100;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
}
  @media ${(props) => props.theme.tablet} {
      width:90%;
      height:calc(100vw*(500/1700));
    }

  @media ${(props) => props.theme.mobile} {
      width:90%;
      height:calc(100vw*(500/428));
      padding:0 calc(100vw*(20/428)) calc(100vw*(20/428));
    }
`
const ModalClose = styled.div`
  position:absolute;
  right:24px;top:24px;
  @media ${(props) => props.theme.mobile} {
      right:calc(100vw*(24/428));
      top:calc(100vw*(24/428));
    }

`
const CloseImg = styled.img`
  width:17px;
  height:18px;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(12/428));
      height:calc(100vw*(13/428));
    }
`
const ModalTop = styled.div`
  width:100%;
  display:flex;
  justify-content:flex-start;
  align-items:center;
  margin-top:22px;
  border-bottom:solid 1px #a3a3a3;
  padding-bottom:14px;
  @media ${(props) => props.theme.mobile} {
      justify-content:space-between;
      width:100%;
      margin-top:calc(100vw*(60/428));
      padding-bottom:calc(100vw*(14/428));
    }
`
const Title = styled.h1`
  font-size:20px;
  color:#707070;
  margin-right:36px;
  font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(13/428));
      margin-right:0;
    }
`
const TextArea = styled.div`
  width:100%;
  height:90%;
  overflow-y:scroll;
  font-size:13px;
  color:#555;
  transform:skew(-0.1deg);
    padding:10px;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(13/428));
      padding:calc(100vw*(10/428));
      margin-right:0;
    }
`