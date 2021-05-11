//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Louder from '../../../../img/member/louder.png';
import Checking from '../../../../img/member/checking.png';

//components
import CommonFlexBox from "./commonFlexBox";

export default function PersonalAndCompany() {
  console.log('p...personsal and company함수 실행...')
    return ( 
      <Container>
          {/* -- 수정 코드입니다. */}
          <CommonFlexBox icon={Louder} subTitle={"중개의뢰"} price={2} jeonse={0} monthly={0} />
          <CommonFlexBox icon={Checking} subTitle={"거래완료"} price={1} jeonse={0} monthly={0} />
          {/* -- 원래 코드입니다. */}
          {/*
            <FlexBox>
              <Left>
                <Icon src={Louder} alt="icon"/>
                <SubTitle>중개의뢰</SubTitle>
              </Left>
              <Right>
                <TxtHave>매매2</TxtHave>
                <Part/>
                <Txt>전세0</Txt>
                <Part/>
                <Txt>월세0</Txt>
              </Right>
            </FlexBox>
            <FlexBox>
              <Left>
                <Icon src={Checking} alt="icon"/>
                <SubTitle>거래완료</SubTitle>
              </Left>
              <Right>
                <TxtHave>매매1</TxtHave>
                <Part/>
                <Txt>전세0</Txt>
                <Part/>
                <Txt>월세0</Txt>
              </Right>
            </FlexBox>
          */}
      </Container>
  );
}

const Container = styled.div`
    width:100%;
`
const FlexBox = styled.div`
  display:flex;width:100%;
  justify-content:flex-start;align-items:center;
  padding-left:160px;
  margin-bottom:25px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(25/428));
    padding-left:calc(100vw*(25/428));
    }
`
const Left = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  margin-right:88px;
  width:100px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(50/428));
    width:calc(100vw*(100/428));
    }
`
const Icon = styled.img`
  display:inline-block;
  width:20px;margin-right:12px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    margin-right:calc(100vw*(12/428));
    }
`
const SubTitle = styled.p`
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const Right = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:184px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(184/428));
    }
`
const Txt = styled.p`
  font-size:15px;color:#4a4a4a;
  color:#979797;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const TxtHave = styled(Txt)`
  color:#4a4a4a;
`
const Part = styled.p`
  width:1px;height:16px;
  background:#979797;vertical-align:middle;
  margin:0 18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(1/428));
    height:calc(100vw*(16/428));
    margin:0 calc(100vw*(16/428));
    }
`
