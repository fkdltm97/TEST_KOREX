//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

export default function EmailChange({updatePageIndex,phoneModal}) {
    return (
        <Container>
            <ProfileTop>
              <WrapInputBox>
                <Box>
                  <Label>휴대전화</Label>
                  <InputBox type="text" value="01012345678"/>
                </Box>
                <Box>
                  <Label>변경 휴대전화</Label>
                  <InputBox type="text" value="01012345678"/>
                  <InputBoxMt type="text" placeholder="휴대번호를 '-'를 빼고 입력하여주세요."/>
                  <ErrorMsg>휴대전화 인증번호가 일치하지 않습니다.</ErrorMsg>
                </Box>
              </WrapInputBox>
            </ProfileTop>
          {/*버튼*/}
            <Button>
              <Link to="/MyProfileSetting">
                <CancleBtn type="submit" name="">취소</CancleBtn>
              </Link>
              <ChangeBtn type="submit" name="" onClick={() =>{phoneModal();}}>변경</ChangeBtn>
            </Button>
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
const ProfileTop = styled.div`
  width:100%;
  display:flex;justify-content:flex-start;align-items:center;
  padding-bottom:42px;
  @media ${(props) => props.theme.mobile} {
    justify-content:center;
    }
`
const WrapInputBox = styled.div`
  width:100%;
`
const Box = styled.div`
  width:100%;position:relative;
  margin-bottom:54px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(30/428));
    }
`
const Label = styled.label`
  display:inline-block;
  font-size:12px;font-weight:600;transform:skew(-0.1deg);
  padding-left:7px;margin-bottom:10px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    padding-left:calc(100vw*(7/428));
    margin-bottom:calc(100vw*(10/428));
    }
`
const InputBox = styled.input`
  width:100%;height:43px;
  border-radius: 4px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  text-align:center;
  transform:skew(-0.1deg);
  font-size:15px;
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    height:calc(100vw*(43/428));
    }
`
const InputBoxMt = styled(InputBox)`
  margin-top:6px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(6/428));
  }
`
const Button = styled.div`
  width: 408px;
  display:flex;justify-content:space-between;align-items:center;
  margin:50px auto 0;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    margin:calc(100vw*(50/428)) auto;
    }
`
const CancleBtn = styled.button`
  width:200px;
  height: 66px;
  line-height:60px;
  text-align:center;
  color:#fff;
  font-size:20px;transform:skew(-0.1deg);
  font-weight:800;
  border-radius: 11px;
  transition:all 0.3s;
  background:#979797;
  border:3px solid #e4e4e4;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(180/428));
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
    }
`
const ChangeBtn = styled(CancleBtn)`
  background:#01684b;
  border: 3px solid #04966d;
`
const ErrorMsg = styled.p`
  position:Absolute;
  left:50%;width:100%;
  bottom:-30px;
  font-size:12px; color:red;
  font-weight:600;transform:skew(-0.1deg) translateX(-50%);
  margin-top:20px;
  text-align:center;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-top:calc(100vw*(10/428));
    bottom:calc(100vw*(-30/428));
    }
`