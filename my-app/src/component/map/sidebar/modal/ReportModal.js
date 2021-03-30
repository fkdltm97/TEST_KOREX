//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap-tabs';

//css
import styled from "styled-components"
import 'swiper/swiper-bundle.css';

//img
import Close from "../../../../img/main/modal_close.png";
import Check from "../../../../img/map/radio.png";
import Checked from "../../../../img/map/radio_chk.png";


export default function ReportModal({report,setReport}) {
  const [select,setSelect] = useState(false);
  const showModal =()=>{
    setSelect(!select);
  }
  if(report == false)
  return null;
    return (
        <Container>
            <Bg onClick={() => {setReport(false)}}/>
            <WrapModal>
              <CloseBtn>
                <CloseImg onClick={() => {setReport(false)}} src={Close}/>
              </CloseBtn>
              <InCont>
                <TopTitleTxt>허위매물 신고</TopTitleTxt>
                <RadioBox>
                  <Box>
                    <Radio type="radio" name="report" id="no"/>
                    <Label for="no">
                      <Span/>
                      없는 매물
                    </Label>
                  </Box>
                  <Box>
                    <Radio type="radio" name="report" id="diffrent"/>
                    <Label for="diffrent">
                      <Span/>
                      정보와 다른 매물
                    </Label>
                  </Box>
                </RadioBox>
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
  width:535px;height:470px;
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
const RadioBox = styled.div`
  width:100%;
  padding-left:30px;
  margin:35px 0;
`
const Box = styled.div`
  width:100%;
  margin-bottom:32px;
`
const Radio = styled.input`
  display:none;
  &:checked+label span{background:url(${Checked}) no-repeat; background-size:100% 100%;}
`
const Label = styled.label`
  display:inline-block;
  font-size:15px;color:#4a4a4a;font-weight:500;transform:skew(-0.1deg);
  font-family:'nbg',sans-serif;
`
const Span = styled.span`
  display:inline-block;
  width:20px;height:20px;margin-right:16px;
  background:url(${Check}) no-repeat;
  background-size:100% 100%;
  vertical-align:middle;
`
