//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//style
import styled from "styled-components";

//img
import CloseIcon from "../../../../img/main/modal_close.png";
import Check from "../../../../img/member/check.png";
import Checked from "../../../../img/member/checked.png";
import Prev from "../../../../img/member/slick_prev.png";
import Arrow from "../../../../img/member/arrow_down.png";


export default function ModalCal({vCal, setVCal,updatePageIndex}){
  if(vCal == false)
    return null;
    return (
      <Container>
        <Wraplive>
          <ModalClose>
              <Link onClick={()=>{setVCal(false);updatePageIndex(0)}}>
              <CloseImg src={CloseIcon}/>
            </Link>
          </ModalClose>
          <ModalTop>
            <Title>방문 예약</Title>
          </ModalTop>
          <Label>방문일시</Label>
          <SeletedDate>
            <Preved onClick={()=>{updatePageIndex(0)}} src={Prev}/>
            <Date>2020년 2월 16일</Date>
          </SeletedDate>
          <Label>시간</Label>
          <SelectBox>
            <Option selected disabled>시간 선택</Option>
            <Option>09:00 ~ 09:30</Option>
            <Option>10:00 ~ 10:30</Option>
            <Option>11:00 ~ 11:30</Option>
          </SelectBox>
          <NextButton>
            <Next type="button" onClick={()=>{updatePageIndex(2)}}>다음</Next>
          </NextButton>
        </Wraplive>
      </Container>
    );
}

const Container = styled.div`
  width:100%;

`
const ModalBg = styled.div`
  position:fixed;
  width:100%;height:100%;left:0;top:0;
  display:block;content:'';background:rgba(0,0,0,0.05);
  z-index:1001;
`
const Wraplive = styled.div`
  position:fixed;z-index:1002;
  width:535px;height:520px;
  background:#fff;
  border-radius:24px;
  border:1px solid #f2f2f2;
  left:50%;top:50%;transform:translate(-50%,-50%);
  padding:49px 49px 77px 63px;
  @media ${(props) => props.theme.container} {
        width:calc(100vw*(535/1436));
        height:calc(100vw*(520/1436));
    }

  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(395/428));
      height:auto;
      padding:calc(100vw*(24/428)) calc(100vw*(20/428)) calc(100vw*(50/428));
    }
`
const ModalClose = styled.div`
  width:100%;
  text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.container} {
        margin-bottom:calc(100vw*(22/1436));
    }

  @media ${(props) => props.theme.mobile} {
      margin-bottom:calc(100vw*(25/428));
    }
`
const CloseImg = styled.img`
  display:inline-block;
  width:15px;height:16px;
  @media ${(props) => props.theme.container} {
        width:calc(100vw*(15/1436));
        height:calc(100vw*(16/1436));
    }

  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(12/428));
      height:calc(100vw*(13/428));
    }
`
const ModalTop = styled.div`
  width:100%;padding-bottom:20px;
  border-bottom:1px solid #a3a3a3;
  @media ${(props) => props.theme.container} {
      padding-bottom:calc(100vw*(20/1436));
    }

  @media ${(props) => props.theme.mobile} {
      padding-bottom:calc(100vw*(15/428));
    }
`
const Title = styled.div`
  font-size:20px;
  font-weight:800;
  color:#707070;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
    }

  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
    }
`
const ModalBody = styled.div`
  width:100%;
  padding-top:11px;
  @media ${(props) => props.theme.container} {
      padding-top:calc(100vw*(11/1436));
    }

  @media ${(props) => props.theme.mobile} {
      padding-top:calc(100vw*(14/428));
    }
`
const Label = styled.label`
  margin:10px 0;
  font-size:12px;display:inline-block;font-weight:600;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(12/428));
      margin:calc(100vw*(10/428));
    }
`
const SeletedDate = styled.div`
  display:flex;justfy-content:flex-start;align-items:center;
  cursor:pointer;margin:20px 0 50px;
`
const Preved = styled.img`
  display:inline-block;
  width:27px;margin-right:23px;
`
const Date = styled.div`
  font-size: 15px;
  font-weight: 800;
  transform:skew(-0.1deg);
  text-align: left;
  color: #4a4a4a;
`
const SelectBox = styled.select`
  width:100%;height:43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  text-align-last:center;
  trnasform:skew(-0.1deg);
  text-align:center;
  appearance:none;
  background:url(${Arrow}) no-repeat 90% center; background-size:11px;
  font-size:15px;color:#707070;font-weight:600;transform:skew(-0.1deg);
`
const Option = styled.option`

`
const NextButton = styled.div`
  margin-top:30px;
  width:100%;
`
const Next = styled.button`
width:100%;
height: 66px;
margin-top:28px;
text-align:center;
color:#fff;font-size:20px;font-weight:800;transform:skew(-0.1deg);
border-radius: 11px;
transition:all 0.3s;
background:#979797;
border:3px solid #e4e4e4;
/*
액티브 됐을때
  background:#01684b;
  border:3px solid #04966d
*/
`
