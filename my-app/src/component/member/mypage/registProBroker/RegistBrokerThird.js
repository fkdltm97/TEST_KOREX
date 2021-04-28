//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img

import Check from '../../../../img/map/radio.png';
import Checked from '../../../../img/map/radio_chk.png';
import Search from '../../../../img/map/search.png';
import Close from '../../../../img/main/modal_close.png';
import AddFileImg from "../../../../img/member/add_file.png";
import Delete from "../../../../img/member/delete_icon.png";

import { Mobile, PC } from "../../../../MediaQuery";

import MapApi from './MapApi.js';

export default function RegistSecond({submitModal,confirmModal}) {

const [image, setImage] = useState("");
const [image2, setImage2] = useState("");
const onFileChange = (e) => {
    const {
        target : {files},
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) =>{
        const {currentTarget : { result }} = finishedEvent;
        setImage(result);
    }
}
const onFileChange2 = (e) => {
    const {
        target : {files},
    } = e;
    const theFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(theFile);
    reader.onloadend = (finishedEvent) =>{
        const {currentTarget : { result }} = finishedEvent;
        setImage2(result);
    }
}
    return (
        <Container>
          <WrapMember>
            <TopTitle>전문 종목 선택</TopTitle>
            <Wrap>
              <TopInfo>
                <Line>
                  <Left>중개업소등록번호 : </Left>
                  <Right>OOO</Right>
                </Line>
                <Line>
                  <Left>중개업소명 : </Left>
                  <Right>OOO</Right>
                </Line>
                <Line>
                  <Left>중개업소주소 : </Left>
                  <Right>OOO</Right>
                </Line>
                <Line>
                  <Left>대표자명 : </Left>
                  <Right>OOO</Right>
                </Line>
              </TopInfo>
              <MiddleInfo>
                <SubTitle>전문 종목 <Green>3</Green>건</SubTitle>
                <Box>
                  <Kind>1. 아파트</Kind>
                  <Address>OOO OOO OOO</Address>
                </Box>
                <Box>
                  <Kind>2. 오피스텔</Kind>
                  <Address>OOO OOO OOO OOO</Address>
                </Box>
                <Box>
                  <Kind>3. 상가</Kind>
                </Box>
              </MiddleInfo>
              <BottomInfo>

              위와 같이 전문중개업소를 신청합니다.<br/>
              전문중개업소로 선정될 시, 관련 법령을 준수하고 부동산 정보 서비스의 선진화 공정한
              거래질서를 위하여 신의성실의 원칙을 지키겠습니다.

              </BottomInfo>
              <Button>
                  <Submit type="submit" onClick={()=>{submitModal();}}>제출</Submit>
              </Button>
          </Wrap>
      </WrapMember>
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
    width:680px;
    margin:0 auto;
    padding:24px 0 250px;
    @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(380/428));
      padding:calc(100vw*(30/428)) 0 calc(100vw*(150/428));
      }
`
const WrapMember = styled.div`
  width:100%;
`
const Wrap = styled.div`
  width:408px;
  padding-top:66px;
  margin:0 auto;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(360/428));
      padding-top:calc(100vw*(60/428));
    }
`

const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(16/428));
    }
`
const TopInfo = styled.div`
  width:100%;
  margin-bottom:15px;
  padding-bottom:15px;
  border-bottom:1px solid #e4e4e4;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(15/428));
    padding-bottom:calc(100vw*(15/428));
    }
`
const Line = styled.div`
  width:100%;
  display:flex;justify-content:flex-start;align-items:center;
  margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(6/428));
    }
`
const Left = styled.p`
   font-size: 15px;
  font-weight: 800;
  line-height:1.33;
  text-align: left;
  color: #4a4a4a;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    }
`
const Right = styled(Left)`
`
const MiddleInfo = styled(TopInfo)`
  padding:20px 0;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(20/428)) 0;
    }
`
const SubTitle = styled.h2`
  font-size:16px;font-weight:800;
  transform:skew(-0.1deg);color:#4a4a4a;
  margin-bottom:10px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(16/428));
    margin-bottom:calc(100vw*(10/428));
    }
`
const Green = styled(SubTitle)`
  color:#2b664d;display:inline-block;
`
const Box = styled.div`
  margin-bottom:20px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(10/428));
    }
`
const Kind = styled(Left)`
  width:100%;
`
const Address = styled(Kind)`
`
const BottomInfo = styled.div`
  font-size:15px;font-weight:800;
  color:#4a4a4a;transform:skew(-0.1deg);
  line-height:1.33;word-break:keep-all;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    }

`
const Button = styled.div`
    width:100%;position:relative;
    margin-top:85px;
    @media ${(props) => props.theme.mobile} {
        margin-top:calc(100vw*(85/428));
    }
`
const Submit = styled.button`
    width:100%;height:66px;
    line-height:60px;
    border-radius: 11px;
    font-weight: 800;
    font-style: 800;font-size:20px;
    text-align: center;
    color: #ffffff;
    transform:skew(-0.1deg);
    border: solid 3px #429370;
    background-color: #2b664d;
    @media ${(props) => props.theme.mobile} {
        height:calc(100vw*(60/428));
        line-height:calc(100vw*(54/428));
        font-size:calc(100v*(15/428));
    }
`

