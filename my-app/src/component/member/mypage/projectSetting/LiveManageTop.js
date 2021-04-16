//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Check from '../../../../img/map/radio.png';
import Checked from '../../../../img/map/radio_chk.png';
import ArrowDown from '../../../../img/member/arrow_down.png';

import { Mobile, PC } from "../../../../MediaQuery"

//component
import LiveManageList from "./LiveManageList";

export default function Live({value,type}) {

return (
    <Container>
        <WrapLive>
          <TopInfo>
            <CheckBox>
              <InputCheck type="check" id="all"/>
              <CheckLabel>
                <Span/>
                전체선택
              </CheckLabel>
            </CheckBox>
            <Invite>초대</Invite>
          </TopInfo>
      </WrapLive>
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
const WrapLive = styled.div`
  width:100%;
`
const TopInfo = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding:16px 40px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(22/428)) calc(100vw*(10/428));
    }
`
const CheckBox = styled.div`
  display:flex;justify-content:space-between;align-items:center;
`
const InputCheck = styled.input`
  display:none;
  &:checked+label span{background:url(${Checked}) no-repeat;background-size:100% 100%;}
`
const CheckLabel = styled.label`
  display:inline-block;
  font-size:15px;font-weight:600;transform:skew(-0.1deg);
  color:#4a4a4a;
  font-family:'NanumSquare', sans-serif;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const Span = styled.span`
  display:inline-block;
  width:20px;height:20px;
  background:url(${Check}) no-repeat;background-size:100% 100%;
  margin-right:10px;
  vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    height:calc(100vw*(20/428));
    margin-right:calc(100vw*(10/428));
  }
`
const Invite = styled.div`
  width: 80px;
  height: 32px;
  line-height:30px;
  font-size:13px;text-align:center;
  font-weight:600;color:#01684b;transform:skew(-0.1deg);
  border-radius: 4px;
  border: solid 2px #01684b;
  background-color: #ffffff;
`
