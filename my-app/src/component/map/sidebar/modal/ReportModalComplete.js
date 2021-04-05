//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import 'swiper/swiper-bundle.css';

//img
import Close from "../../../../img/main/modal_close.png";
import Check from "../../../../img/map/radio.png";
import Checked from "../../../../img/map/radio_chk.png";


export default function ReportModalComplete({report,setReport,updatePageIndex}) {

  if(report == false)
  return null;
    return (
        <Container>
            <WrapModal>
              <CloseBtn>
                <CloseImg onClick={() => {setReport(false);updatePageIndex(0)}} src={Close}/>
              </CloseBtn>
              <InCont>
                <TopTitleTxt>허위매물 신고</TopTitleTxt>
                <Desc>허위매물 신고가 접수되었습니다.</Desc>
                <Button type="submit" name="" onClick={() => {setReport(false);updatePageIndex(0)}}>확인</Button>
              </InCont>
            </WrapModal>
        </Container>
  );
}

const Container = styled.div `
  width:100%;
`
const Bg = styled.div `
  position:fixed;
  width:100%;
  height:100%;left:0;top:0;
  background:rgba(0,0,0,0.2);
  display:block;
  z-index:3;
`
const WrapModal = styled.div`
  position:fixed;
  width:535px;height:auto;
  left:50%;top:50%;transform:translate(-50%,-50%);
  border-radius: 24px;
  border: solid 1px #f2f2f2;
  padding: 49px 0 59px;
  background:#fff;
  z-index:4;
`
const CloseBtn= styled.div`
  width:100%;
  text-align:right;
  margin-bottom:22px;
  padding-right:60px;
`
const CloseImg = styled.img`
  display:inline-block;
  width:15px;
`
const InCont = styled.div`
  padding:0 60px;
`
const TopTitleTxt = styled.h3`
  font-size:20px;font-weight:600;
  transform:skew(-0.1deg);color:#707070;
  padding-bottom:21px;border-bottom:1px solid #a3a3a3;
`
const Desc = styled.p`
  font-size: 15px;
  padding:80px 0 60px;
  text-align:center;
  color: #4a4a4a;transform:skew(-0.1deg);
`
const Button = styled.button`
  width:100%;
  height: 66px;
  margin-top:60px;
  text-align:center;
  color:#fff;font-size:20px;font-weight:800;transform:skew(-0.1deg);
  border-radius: 11px;
  transition:all 0.3s;
  background:#01684b;
  border:3px solid #04966d;
`
