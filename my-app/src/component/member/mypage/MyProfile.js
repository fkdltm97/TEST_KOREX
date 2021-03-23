//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Img from '../../../img/member/no_profile.png';
import Louder from '../../../img/member/louder.png';
import Checking from '../../../img/member/checking.png';
import RightArrow from '../../../img/notice/right_arrow.png';
import Plus from '../../../img/member/plus.png';

export default function JoinInput() {

    return (
        <Container>
          <WrapProfile>
            <ProfileTop>
              <ProfileImg>
                <Profile src={Img}/>
                <File type="file" name="" id="file"/>
                <Label for="file"/>
              </ProfileImg>
              <ProfileName>
                <Input type="text" name="" value="이름을 설정해주세요." disabled/>
              </ProfileName>
            </ProfileTop>

            <ProfileMiddle>
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
            </ProfileMiddle>

            <ProfileBottom>
              <Ul>
                <Li>
                  <Link className="data_link"></Link>
                  <LinkTxt>관심물건</LinkTxt>
                  <Arrow src={RightArrow}/>
                </Li>
                <Li>
                  <Link to="/Reservation" className="data_link"></Link>
                  <LinkTxt>내 물건 투어 예약</LinkTxt>
                  <Arrow src={RightArrow}/>
                </Li>
                <Li>
                  <Link className="data_link"></Link>
                  <LinkTxt>내 중개 의뢰</LinkTxt>
                  <Arrow src={RightArrow}/>
                </Li>
                <Li>
                  <Link className="data_link"></Link>
                  <LinkTxt>내 알림</LinkTxt>
                  <Arrow src={RightArrow}/>
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
    padding:40px 0 250px;
    @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(370/428));
      padding:calc(100vw*(40/428)) 0 calc(100vw*(150/428));
      }
`
const WrapProfile = styled.div`
  width:100%;
`
const ProfileTop = styled.div`
  width:100%;
  display:flex;justify-content:flex-start;align-items:center;
  padding-left:60px;
  @media ${(props) => props.theme.mobile} {
    padding-left:calc(100vw*(30/428));
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
    width:calc(100vw*(95/428));
    height:calc(100vw*(95/428));
    margin-right:calc(100vw*(24/428));
    }
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
    }
`
const Profile = styled.img`
  width:100%;height:100%;
`
const ProfileName = styled.div`
  display:inline-block;
  width:295px;height:43px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(200/428));
    height:calc(100vw*(43/428));
    }

`
const Input = styled.input`
  width:100%;height:100%;
  color:#4a4a4a;
  padding-left:28px;
  font-size:15px;
  background:transparent;
  font-weight:800;transform:skew(-0.1deg);
  &::placeholder{color:#979797;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(20/428));
    }
`
const ProfileMiddle = styled.div`
  width:100%;
  border-top:6px solid #f2f2f2;
  border-bottom:6px solid #f2f2f2;
  padding:40px 80px 40px 60px;
  margin-top:30px;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(40/428));
    margin-top:calc(100vw*(30/428));
    }
`
const FlexBox = styled.div`
  display:flex;width:100%;
  justify-content:space-between;align-items:center;
  margin-bottom:25px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(25/428));
    }
`
const Left = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
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
  display:felx;justify-content:space-between;align-items:center;
  padding:36px 40px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(30/428)) calc(100vw*(40/428));
    }
`
const LinkTxt = styled.p`
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const Arrow = styled.img`
  width:8px;vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(8/428));
    }
`
