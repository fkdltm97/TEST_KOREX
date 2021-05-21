//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"


export default function RequestTop() {

    return (
        <Container>
          <TopInfo>
            <Div>
              <Title>전문 종목</Title>
              {/* 아파트 / 오피스텔 선택했을 경우 */}
              <Ea>- 아파트 : 단지명 시도/시군구/읍면동/리</Ea>
              <Ea>- 오피스텔 : 단지명 시도/시군구/읍면동/리</Ea>
              {/* 상가 / 사무실 선택했을 경우 */}
              {/* <Ea>- 상가,사무실</Ea> */}
            </Div>
          </TopInfo>
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
  width:100%;
`
const TopInfo = styled.div`
  width:100%;
  height:90px;
  background:#f8f8f8;
  padding-left:30px;
  display:inline-flex;
  align-items:center;
  justify-content:flex-start;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    height:calc(100vw*(90/428));
    padding-left:calc(100vw*(16/428));
  }
`
const Div = styled.div`
`
const Title = styled.h2`
  font-size:18px;
  margin-bottom:5px;
  font-weight:600;
  color:#707070;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(5/428));
  }
`
const Ea = styled.div`
  font-size:15px;
  margin-bottom:5px;
  font-weight:normal;
  transform:skew(-0.1deg);
  color:#707070;
  &:last-child{
    margin-bottom:0;
  }
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-bottom:calc(100vw*(5/428));
  }
`