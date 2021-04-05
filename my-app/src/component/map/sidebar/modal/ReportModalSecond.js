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


export default function ReportModalSecond({report,setReport,updatePageIndex}) {

  const [name,setName] = useState("");/*기본값*/
  const [phone,setPhone] = useState("");/*기본값*/
  const [active,setActive] = useState(false);

  const nameChange = (e) =>{ setName(e.target.value); }
  const phoneChange = (e) =>{ setPhone(e.target.value); }

  const checkVaildate = () =>{
    return name.length > 0 && phone.length > 9
   }

   useEffect(()=>{
     if(checkVaildate())
         setActive(true);
     else
         setActive(false);
   },)

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
                <Desc>KOREX는 허위매물 근절을 위하여 최선의 노력을 기울이고 있습니다.<br/>
                내용 확인을 위해 KOREX검증 담당자가 직접 연락드리겠습니다. </Desc>
                <WrapInputBox>
                  <Box>
                    <Label>이름</Label>
                    <Input type="text" name="" placeholder="이름을 입력하여주세요." onChange={nameChange}/>
                  </Box>
                  <Box>
                    <Label>휴대전화</Label>
                    <Input type="text" name="" placeholder="휴대번호를 ’-‘를 빼고 입력하여주세요." onChange={phoneChange}/>
                  </Box>
                  <Button type="submit" name="" active={active} onClick={() => {updatePageIndex(2)}}>인증번호 발송</Button>
                </WrapInputBox>
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
  width:535px;height:538px;
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
  margin-top:18px;
  font-size: 12px;
  margin-bottom:15px;
  font-weight: normal;
  text-align: center;
  font-family:'nbg',sans-serif;
  color: #4a4a4a;transform:skew(-0.1deg);
`
const WrapInputBox = styled.div`
  width:100%;
  margin-bottom:14px;
`

const Box = styled.div`
  width:100%;
  margin-bottom:14px;
`
const Label = styled.div`
  font-size: 12px;
  margin-bottom:10px;
  color: #4a4a4a;
  font-family:'nbg',sans-serif;
`
const Input = styled.input`
  width:100%;height: 43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;text-align:center;
  font-size:15px;font-weight:600;transform:skew(-0.1deg);
  &::placeholder{color:#979797;font-weight:500;font-size:15px;}
`
const Button = styled.button`
  width:100%;
  height: 66px;
  margin-top:28px;
  text-align:center;
  color:#fff;font-size:20px;font-weight:800;transform:skew(-0.1deg);
  border-radius: 11px;
  transition:all 0.3s;
  background:${({active}) => active ? "#01684b" : "#979797"};
  border:${({active}) => active ? "3px solid #04966d" : "3px solid #e4e4e4"};
`
