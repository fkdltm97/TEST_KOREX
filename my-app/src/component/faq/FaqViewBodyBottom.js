//react
import React ,{useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";

//css
import styled from "styled-components"

export default function FaqBodyBottom() {
    return (
        <Container>
          <WrapBody>
            <Answer>A</Answer>
            <Txt>
              제1장 총칙<br/>
              <br/>
              제1조 (목적)<br/>
              본 약관은 (주)Korex(이하 “회사”라 함)이 “Korex” 브랜드를 사용하여
              구현되는 단말기(PC, 모바일, 태블릿 PC등의 각종 유무선 장치를
              포함)와 상관없이
              모바일 어플리케이션 등 회사가 운영하는 플랫폼(이하 “직방 플랫폼
              ”이라 함)을 통해 제공하는 일체의 서비스(이하 “서비스”라 함)의
              이용과 관련하여 회사와 이용자 사이의 법률관계 및 기타 필요한
              사항을 규정함을 목적으로 합니다. 직방 서비스라 함은 회사가 제공
              하는 “Korex” 브랜드를 사용하는 서비스를 말합니다.
              회원 또는 비회원으로서 직방 서비스를 이용하시는
              여러분은 본 약관 및 관련 운영정책을 확인 또는 동의하게 되므로,
              조금만 시간을내서 주의 깊게 살펴봐 주시기 바랍니다.
            </Txt>
          </WrapBody>
        </Container>
  );
}

const Container = styled.div`
  width:640px;
  margin:0 auto;
  padding-bottom:100px;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(390/428));
      margin:0 auto;
      padding-bottom: calc(100vw*(100/428));
    }
`
const WrapBody = styled.div`
  width:100%;
  padding:23px 30px;
  background:#f8f7f7;border-radius:16px;
  @media ${(props) => props.theme.mobile} {
      width:100%;
      padding: calc(100vw*(20/428));
    }
`
const Answer = styled.h2`
  font-size:88px;
  margin-bottom:20px;
  color:#a3a3a3;
  font-weight:900;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(58/428));
      margin-bottom:calc(100vw*(20/428));
    }
`
const Txt = styled.div`
  font-size:14px;color:#4a4a4a;
  line-height:1.5;
  letter-spacing:-0.43px;
  transform:skew(-0.1deg);
  word-break:keep-all;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(13/428));
      letter-spacing:normal;
    }
`
