//react
import React ,{useState, useEffect} from 'react';
import { Link, useHistory } from "react-router-dom";

//css
import styled from "styled-components"

export default function FaqViewTitle() {
    return (
        <Container>
          <WrapTopTitle>
            <Question>Q</Question>
            <Title>[공지] 공지사항 제목이 길어질시는 이렇게 처리되어집니다. 두줄로 처리됩니다. 두줄로 처리됩니다.</Title>
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
  display:flex;justify-content:flex-start;align-items:center;
  padding:36px 30px 13px 30px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(390/428));
      margin:0 auto;
      padding:calc(100vw*(30/428)) calc(100vw*(10/428)) calc(100vw*(20/428));
    }

`
const Question = styled.h2`
  font-size:88px;
  color:#a3a3a3;
  font-weight:900;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(58/428));
    }
`
const Title = styled.h2`
  font-size:15px;
  margin-left:10px;
  font-weight:800;
  line-height:1.33;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  word-break:keep-all;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
      margin-left:calc(100vw*(10/428));
    }
`
