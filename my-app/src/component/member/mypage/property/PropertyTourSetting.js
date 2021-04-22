//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img

import Profile from '../../../../img/member/no_profile.png';
import Check from '../../../../img/map/radio.png';
import Checked from '../../../../img/map/radio_chk.png';

import { Mobile, PC } from "../../../../MediaQuery";
import PropertyTourSettingList from "./PropertyTourSettingList";

export default function Member({}) {
  const [onOff,setOnOff] = useState(true);

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }

  /*data map*/
  const MemberListItem =[
    {
      m_id : 0,
      src:Profile,
      path:"/MyMemberAdd",
      name:"홍길동",
      grade:"관리자",
      phone:"01012345689",
      regidate:"2020.01.01"
    },
    {
      m_id : 1,
      src:Profile,
      path:"/MyMemberAdd",
      name:"홍길순",
      grade:"팀원",
      phone:"01012345689",
      regidate:"2020.01.01"
    },
    {
      m_id : 2,
      src:Profile,
      path:"/MyMemberAdd",
      name:"홍길자",
      grade:"팀원",
      phone:"01012345689",
      regidate:"2020.01.01"
    }
]

    return (
        <Container>
          <WrapMember>
            <TopTitle>물건투어 예약셋팅</TopTitle>
            <TopInfo>
              <All>
                <AddBtn>+ 일반</AddBtn>
                <AddBtnSpecial>+ 특별</AddBtnSpecial>
              </All>
              <CheckBox>
                <InputCheck type="checkbox" id="off"/>
                <CheckLabel for="off" onClick={()=>{setOnOff(!onOff)}}>
                  <Span/>
                  비활성화
                </CheckLabel>
              </CheckBox>
            </TopInfo>
            {
            MemberListItem.map((value) => {
              return(
                <PropertyTourSettingList value={value}/>
                  )
                }
              )
            }
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
const WrapMember = styled.div`
  width:100%;
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
const TopInfo = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding:16px 40px;
  margin-top:40px;
  border-top:1px solid #f2f2f2;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(30/428));
    padding:calc(100vw*(22/428)) calc(100vw*(18/428));
    }
`
const All = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
`
const AddBtn = styled.div`
  width:80px;height:32px;
  line-height:28px;cursor:pointer;
  border:2px solid #f0a764;
  background:#fe7a01;
  color:#fff;border-radius:4px;
  font-size:13px;font-weight:800;transform:skew(-0.1deg);
  text-align:center;margin-right:10px;
`
const AddBtnSpecial = styled(AddBtn)`
  border:2px solid #429370;
  background:#01684b;
  margin-right:0;
`
const CheckBox = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
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
