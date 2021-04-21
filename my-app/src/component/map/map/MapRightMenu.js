//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import NavIcon from '../../../img/main/nav_btn.png';
import Logo from '../../../img/main/header_logo.png';
import PCLogo from '../../../img/main/pc_header_logo.png';
import Mypage from '../../../img/main/mypage_icon.png';

// components
import { Mobile, PC } from "../../../MediaQuery";
export default function MainHeader({openBunyang, rank}) {
    return (
        <Container>
          <WrapMap>
            {/*Right Tab*/}
            <RightMenu>
              <WrapMenuTop>
                <Exclusive type="checkbox" name="" id="Exclusive" defaultChecked/>
                <ExclusiveLabel for="Exclusive">전속 매물</ExclusiveLabel>
              </WrapMenuTop>
              <WrapMenuBottom>
                <RadioBox>
                  <Radio type="radio" name="menu" id="probroker" defaultChecked/>
                  <RadioLabel for="probroker">전문 중개사</RadioLabel>
                </RadioBox>
                <Part/>{/*분기 라인*/}
                <RadioBox>
                  <Radio type="radio" name="menu" id="block"/>
                  <RadioLabel for="block">단지별 실거래</RadioLabel>
                </RadioBox>
                <Part/>{/*분기 라인*/}
                <RadioBox>
                  <Radio type="radio" name="menu" id="around"/>
                  <RadioLabel for="around">주변</RadioLabel>
                </RadioBox>
              </WrapMenuBottom>
            {/*모바일에서 생기는 분양 탭 ... */}
              <Mobile>
                <Link to="/MbBunyang">
                  <Bunyang><BunyangLabel for="Exclusive">분양</BunyangLabel></Bunyang>
                </Link>
              </Mobile>
            </RightMenu>
          </WrapMap>
        </Container>
  );
}

const Container = styled.div`
`
const WrapMap = styled.div`
  position:relative;
  width:100%;
  height:100vh;
  background:darkseagreen;

`
const RightMenu = styled.div`
  position:absolute;
  top:26px;right:510px;
  width:50px;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(80/428));
    right:calc(100vw*(14/428));
    width:calc(100vw*(50/428));
  }
`
const WrapMenuTop = styled.div`
  width:100%;height:50px;
  margin-bottom:7px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(50/428));
    margin-bottom:calc(100vw*(7/428));
  }
`
const Exclusive = styled.input`
  display:none;
  &:checked+label{background:#01684b;color:#fff;}
`
const ExclusiveLabel = styled.label`
  display:inline-block;
  width:100%;height:100%;
  background:#fff;
  border-radius:10px;
  word-break:break-word;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  font-size:13px;font-weight:600;transform:skew(-0.1deg);
  color:#707070;padding:8px 12px;
  text-align:center;line-height: 1.31;
  transition:all 0.2s;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    padding:calc(100vw*(8/428)) calc(100vw*(12/428));
  }
`
const WrapMenuBottom = styled.div`
  width:100%;height:192px;
  background:#fff;border-radius:10px;
  padding:22px 5px 10px 6px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(185/428));
    padding:calc(100vw*(22/428)) calc(100vw*(5/428)) calc(100vw*(10/428)) calc(100vw*(6/428));
  }
`
const RadioBox = styled.div`
  width:100%;
`
const Radio = styled.input`
  display:none;
  &:checked+label{color:#fe7a01;}
  &:checked+label:before{position:absolute;right:0;top:-7px;width:6px;height:6px;background:#fe7a01;border-radius:100%;dislay:block;content:'';}
  @media ${(props) => props.theme.mobile} {
    &:checked+label:before{position:absolute;right:0;top:calc(100vw*(-7/428));width:calc(100vw*(6/428));height:calc(100vw*(6/428));}
  }
`
const RadioLabel = styled.label`
  position:relative;
  display:inline-block;
  width:100%;
  text-align:center;word-break:keep-all;
  font-size:13px;line-height: 1.31;
  transform:skew(-0.1deg);font-weight:600;
  color:#707070;
  transition:all 0.2s;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
  }
`
const Part = styled.div`
  width:32px;margin:15px auto 15px;
  height:1px;background:#707070;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(32/428));
    margin:calc(100vw*(15/428)) auto calc(100vw*(15/428));

  }
`
const Bunyang = styled(WrapMenuTop)`
  margin-top:Calc(100vw*(7/428));
`
const BunyangLabel = styled(ExclusiveLabel)`
  line-height:calc(100vW*(35/428));
`
