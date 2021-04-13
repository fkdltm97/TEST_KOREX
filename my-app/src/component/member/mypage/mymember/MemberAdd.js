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
import Add from '../../../../img/member/add_Btn.png';

import { Mobile, PC } from "../../../../MediaQuery";
import MemberList from "./MemberList";

export default function Member({}) {
  const [phone,setPhone] = useState("");/*기본값*/
  const [active,setActive] = useState(false);

  const phoneChange = (e) =>{ setPhone(e.target.value); }

  const checkVaildate = () =>{
    return phone.length > 9
   }

  useEffect(()=>{
    if(checkVaildate())
       setActive(true);
    else
        setActive(false);
  },)

    return (
        <Container>
          <WrapMember>
            <TopTitle>팀원 추가</TopTitle>
            <WrapAdd>
              <InputTitle>휴대폰번호</InputTitle>
              <InputInvite>
                <Input type="email" name="" placeholder="휴대번호를 ’-‘를 빼고 입력하여주세요." onChange={phoneChange}/>
                <Delete src={Close} alt="delete"/>
              </InputInvite>
              <InputInvite>
                <Input type="email" name="" placeholder="휴대번호를 ’-‘를 빼고 입력하여주세요." onChange={phoneChange}/>
                <Delete src={Close} alt="delete"/>
              </InputInvite>
              <AddBtn/>
              <InviteButton>
                <Invite type="submit" active={active} onClick={() => {alert('정상적으로 초대 되었습니다.');}}>초대</Invite>
              </InviteButton>
            </WrapAdd>
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
const WrapAdd = styled.div`
  width:410px; margin:60px auto 0;
  display:flex;justify-content:flex-start;
  align-items:flex-start;flex-wrap:wrap;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    margin:calc(100vw*(40/428)) auto 0;
    }
`
const InputTitle = styled.label`
  display:inline-block;
  font-size:12px;
  padding-left:7px;
  margin-bottom:10px;
  font-weight:600;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(12/428));
      padding-left:calc(100vw*(7/428));
      margin-bottom:calc(100vw*(9/428));
    }
`
const InputInvite = styled.div`
  position:relative;
  width:100%;
  margin-bottom:10px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(8/428));
    &:last-child{margin-bottom:0;}
    }
`
const Input = styled.input`
  width:370px;height:43px;
  border-radius:4px;text-align:center;
  border:1px solid #e4e4e4;
  font-size:15px;color:#707070;font-weight:600;transform:skew(-0.1deg);
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(350/428));
    height:calc(100vw*(43/428));
    font-size:calc(100vw*(15/428));
    }
`
const Delete = styled.img`
  display:inline-block;position:absolute;right:0;
  top:50%;transform:translateY(-50%);
  cursor:pointer;
  width:15px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(15/428));
    }
`
const AddBtn = styled.div`
  cursor:pointer;
  width:43px;height:43px;
  border-radius:4px;border:1px solid #707070;
  background:#f8f7f7 url(${Add}) no-repeat center center;background-size:19px 19px;
  margin:50px auto 60px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(43/428));
    height:calc(100vw*(43/428));
    margin:calc(100vw*(43/428)) auto;
    background:#f8f7f7 url(${Add}) no-repeat center center;background-size:calc(100vw*(19/428)) calc(100vw*(19/428));
    }
`
const InviteButton = styled.div`
  width:100%;
`
const Invite = styled.button`
  width: 100%;
  height: 66px;
  line-height:60px;
  border-radius: 11px;
  transition:all 0.3s;
  color:#fff;
  font-size:20px;font-weight:800;transform:skew(-0.1deg);
  background:${({active}) => active ? "#01684b" : "#979797"};
  border:${({active}) => active ? "3px solid #04966d" : "3px solid #e4e4e4"};
  @media ${(props) => props.theme.mobile} {
    width:100%;
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
  }
`
