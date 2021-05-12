//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
//css
import styled from "styled-components"

//img
import Img from '../../../../img/member/no_profile.png';
import RightArrow from '../../../../img/notice/right_arrow.png';
import Plus from '../../../../img/member/plus.png';
import Marker from '../../../../img/member/mark.png';

//component
import CommonList from '../commonList/commonList'

export default function JoinInput({logoutModal,secessionModal}) {
  
  const listData = [
    {title: "이메일 변경", link:"EmailChange"},
    {title: "휴대폰번호 변경", link:"PhoneChange"},
    {title: "비밀번호 변경", link:"PasswordChange"},
  ]

  
  return (
        <Container>
          <WrapProfile>
            <ProfileBottom>
              <Ul>
                {/* -- 수정코드입니다. */}
                <CommonList array={listData}/>
                {/* -- 원래 코드입니다. */}
                {/*
                  <Li>
                    <Link to="/EmailChange" className="data_link"/>
                    <LinkTxt>이메일 변경</LinkTxt>
                    <Arrow src={RightArrow}/>
                  </Li>
                  <Li>
                    <Link to="PhoneChange" className="data_link"/>
                    <LinkTxt>휴대폰번호 변경</LinkTxt>
                    <Arrow src={RightArrow}/>
                  </Li>
                  <Li>
                    <Link to="PasswordChange" className="data_link"/>
                    <LinkTxt>비밀번호 변경</LinkTxt>
                    <Arrow src={RightArrow}/>
                  </Li>
                */}
                <Li>
                  <div className="linkToDiv data_link" onClick={()=>{logoutModal();}}/>
                  <LinkTxt>로그아웃</LinkTxt>
                </Li>
                <Li>
                  <div className="linkToDiv data_link" onClick={()=>{secessionModal();}}/>
                  <LinkTxtGray>회원탈퇴</LinkTxtGray>
                </Li>
              </Ul>
            </ProfileBottom>
          </WrapProfile>
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
    padding:0 0 250px;
    @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(370/428));
      padding:0 0 calc(100vw*(150/428));
      }
`
const WrapProfile = styled.div`
  width:100%;
`
const MypageTxt = styled.h2`
  font-size:20px;font-weight:600;transform:skew(-0.1deg);
  padding-left:30px;color:#707070;
  margin-bottom:35px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(20/428));
    margin-bottom:calc(100vw*(35/428));
    }
`
const ProfileTop = styled.div`
  width:100%;position:relative;
  display:flex;justify-content:flex-start;align-items:center;
  padding-left:100px;
  @media ${(props) => props.theme.mobile} {
    padding-left:0;
    justify-content:center;
    }
`
const ProfileImg = styled.div`
  position:relative;
  width:95px;height:95px;
  border-radius:100%;
  border:5px solid #979797;
  display:inline-block;
  margin-right:24px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(72/428));
    height:calc(100vw*(72/428));
    margin-right:calc(100vw*(24/428));
    }
`
const MySetting = styled.button`
position:absolute;right:0;top:50%;
width: 75px;
height: 30px;line-height:30px;color:#4a4a4a;
font-size:13px;font-weight:600;transform:skew(-0.1deg) translateY(-50%);
border-radius: 3px;
border: solid 1px #4a4a4a;
background-color: #ffffff;
@media ${(props) => props.theme.mobile} {
    width:calc(100vw*(75/428));
    height:calc(100vw*(30/428));
    font-size:calc(100vw*(13/428));
    line-height:calc(100vw*(30/428));
  }
`
const File = styled.input`
  display: none;
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
const Profile = styled.img`
  width:100%;height:100%;
`
const ProfileName = styled.div`
  display:inline-block;
  width:295px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(250/428));
    }

`
const Input = styled.input`
  width:100%;height:43px;
  color:#4a4a4a;
  padding-left:28px;
  font-size:15px;
  background:transparent;
  font-weight:800;transform:skew(-0.1deg);
  &::placeholder{color:#4a4a4a;font-weight:600;transform:skew(-0.1deg);}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    height:calc(100vw*(43/428));
    padding-left:calc(100vw*(20/428));
    }
`
const InputBorder = styled(Input)`
  border:1px solid #e4e4e4;
  border-radius:5px;
`
const ProfileMiddle = styled.div`
  width:100%;
  border-top:6px solid #f2f2f2;
  border-bottom:6px solid #f2f2f2;
  padding:40px 0;
  margin-top:30px;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(40/428)) 0;
    margin-top:calc(100vw*(30/428));
    }
`
const FlexBox = styled.div`
  display:flex;width:100%;
  justify-content:center;align-items:center;
  margin-bottom:25px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(25/428));
    }
`
const Left = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  margin-right:88px;
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
  margin:0 12px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(1/428));
    height:calc(100vw*(16/428));
    margin:0 calc(100vw*(12/428));
    }
`
const ProfileBottom = styled.div`
  width:100%;
`
const Ul = styled.ul`
  width:100%;
`
const Li = styled.li`
  position:relative;
  width:100%;
  display:felx;justify-content:space-between;align-items:center;flex-wrap:wrap;
  padding:36px 40px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(30/428)) calc(100vw*(20/428)) calc(100vw*(30/428)) calc(100vw*(30/428));
    }
`
const LiPJ = styled.div`
width:100%;
position:relative;
display:flex;justify-content:space-between;align-items:center;
`
const SubDepth = styled.ul`
  width:100%;
  padding:25px 0 0 15px;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(15/428)) 0 0 calc(100vw*(15/428));
    }
`
const LinkTxt = styled.p`
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const LinkTxtGray = styled(LinkTxt)`
  color:#979797;
`
const Arrow = styled.img`
  width:8px;vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(8/428));
    }
`
