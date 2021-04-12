//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img

import Profile from '../../../../img/member/no_profile.png';
import Plus from '../../../../img/member/plus.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';
import Set from '../../../../img/member/setting.png';

import { Mobile, PC } from "../../../../MediaQuery";
import MemberList from "./MemberList";

export default function Member({}) {

    return (
        <Container>
          <WrapMember>
            <TopTitle>팀원 수정</TopTitle>
            <WrapEdit>
              <ProfileImg>
                <Img src={Profile}/>
                <File type="file" name="" id="file"/>
                <Label for="file"/>
              </ProfileImg>
              <WrapInput>
                <InputTxt type="text" value="홍길동"/>
                <InputTxt type="text" value="01012345678"/>
                <Select>
                  <Option>관리자</Option>
                  <Option>팀원</Option>
                </Select>
              </WrapInput>
            </WrapEdit>
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
const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(16/428));
    }
`
const WrapMember = styled.div`
  width:100%;

`
const WrapEdit = styled.div`
  width:430px; margin:60px auto 0;
  display:flex;justify-content:flex-start;
  align-items:flex-start;
`
const ProfileImg = styled.div`
  position:relative;
  width:95px;height:95px;
  border:5px solid #979797;
  border-radius:100%;
  margin-right:24px;
`
const Img = styled.img`
  display:inline-block;
  width:100%;height:100%;
`
const File = styled.input`
  display:none;
`
const Label = styled.label`
  display:inline-block;
  width:27px;height:27px;
  position:absolute;right:0;bottom:0;
  background:url(${Plus}) no-repeat;background-size:100% 100%;
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(27/428));
    height:calc(100vw*(27/428));
    right:calc(100vw*(-5/428));
    bottom:calc(100vw*(-5/428));
    }
`
const WrapInput = styled.div`
  width:295px;
  margin-top:25px;
`
const InputTxt = styled.input`
  width:100%;height:43px;
  border-radius:4px;border:1px solid #a3a3a3;
  text-align:center;font-size:15px;font-weight:600;
  transform:skew(-0.1deg);
  margin-bottom:13px;
`
const Select = styled.select`
  width:100%;height:43px;
  border-radius:4px;border:1px solid #a3a3a3;
  text-align-last:center;
  font-size:15px;font-weight:600;
  transform:skew(-0.1deg);
  appearance:none;
  background:url(${ArrowDown}) no-repeat 250px center;background-size:10px;
`
const Option = styled.option`
  font-family:'nbg',sans-serif;
`
