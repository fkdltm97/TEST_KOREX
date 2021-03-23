//react
import React ,{useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";

//css
import styled from "styled-components"

export default function NoticeViewTitle() {
    return (
        <Container>
          <WrapTopTitle>
            <Title>[공지] 공지사항 제목이 길어질시는 이렇게 처리되어집니다. 두줄로 처리됩니다. 공지사항 제목이 길어질시는 이렇게 처리되어집니다. 두줄로 처리됩니다.</Title>
            <NotiDate>2020년 03월 02일</NotiDate>
          </WrapTopTitle>
        </Container>
  );
}

const Container = styled.div`
  width:640px;
  margin:0 auto;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(390/428));
      margin:0 auto;
    }
`
const WrapTopTitle = styled.div`
  width:100%;
  padding:36px 15px 27px 15px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(390/428));
      margin:0 auto;
      padding:calc(100vw*(30/428)) calc(100vw*(15/428)) calc(100vw*(17/428));
    }

`
const Title = styled.h2`
  font-size:15px;
  margin-bottom:18px;
  font-weight:800;
  line-height:1.33;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  word-break:keep-all;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
      margin-bottom:calc(100vw*(7/428));
      word-break:break-all;
    }
`
const NotiDate = styled.p`
  font-size:12px;
  color:#979797;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(12/428));
    }
`
