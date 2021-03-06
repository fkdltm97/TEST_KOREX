//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img

import Profile from '../../../../img/member/no_profile.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';
import Set from '../../../../img/member/setting.png';

import { Mobile, PC } from "../../../../MediaQuery"

export default function Member({value}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }

    return (
        <Container>
            <MemberList>
              <ProfileImg>
                <Img src={value.src} alt="프로필이미지"/>
              </ProfileImg>
              <MemberInfo>
                <Name>{value.name}</Name>
                <Grade>{value.grade}</Grade>
                <Phone>{value.phone}</Phone>
                <RegiDate>{value.regidate}</RegiDate>
              </MemberInfo>
              <MemberSetting onClick={()=> {setMenu(!menu)}}>
                  <Setting src={Set} alt="setting"/>
                  {
                    menu ?
                    <InMenu>
                      <Div>
                        <Link to="/MyMemberEdit" className="data_link"/>
                        <InDiv>수정</InDiv>
                      </Div>
                      <Div>
                        <div className="data_link linkToDiv"/>
                        <InDiv>삭제</InDiv>
                      </Div>
                    </InMenu>
                    :
                    null
                  }
              </MemberSetting>
            </MemberList>
  </Container>
  );
}
const Container = styled.div`
`
const MemberList = styled.div`
  width:100%;position:relative;
  display:flex;justify-content:flex-start;align-items:center;
  padding:38px 57px;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(20/428)) 0 calc(100vw*(34/428)) calc(100vw*(30/428));
  }
`
const ProfileImg = styled.div`
  width:95px;height:95px;
  border:5px solid #979797;
  margin-right:65px;border-radius:100%;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(70/428));
    height:calc(100vw*(70/428));
    margin-right:calc(100vw*(30/428));
  }
`
const Img = styled.img`
  width:100%;height:100%;
  border-radius:100%;
`
const MemberInfo = styled.div`
`
const Name = styled.h4`
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:10px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(7/428));
  }
`
const Grade = styled.p`
  font-size:15px; color:#979797;
  font-weight:600;transform:skew(-0.1deg);
  margin-bottom:5px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(5/428));
  }
`
const Phone = styled(Grade)`
  color:#fe7a01;
`
const RegiDate = styled(Grade)`
  margin-bottom:0;
`
const MemberSetting = styled.div`
  position:absolute;
  display:flex;align-items:center;justify-content:center;
  width:36px;height:36px;right:57px;
  top:38px;text-align:center;border:1px solid #979797;
  border-radius:5px;cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(31/428));
    height:calc(100vw*(31/428));
    top:calc(100vw*(22/428));
    right:calc(100vw*(22/428));
  }
`
const Setting = styled.img`
  display:inline-block;width:20px;height:20px;
  vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
    height:calc(100vw*(18/428));
  }
`

const InMenu = styled.ul`
  position:absolute;
  top:0;left:44px;
  width:60px;
  border:1px solid #707070;
  border-radius:8px;
  background:#fff;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(35/428));
    left:calc(100vw*(0/428));
    width:calc(100vw*(60/428));
  }

`
const Div = styled.li`
  position:relative;
  font-size:13px;
  transform:skew(-0.1deg);
  border-radius:8px;
  padding:4px 0 4px 0px;
  transition:all 0.3s;
  &:hover{background:#f8f7f7;}
  &:first-child{padding-top:8px;}
  &:last-child{padding-bottom:8px;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    padding:calc(100vw*(4/428)) 0 calc(100vw*(4/428)) calc(100vw*(0/428));
    &:first-child{padding-top:calc(100vw*(8/428));}
    &:last-child{padding-bottom:calc(100vw*(8/428));}
  }
`
const InDiv = styled.div`
  width:100%;height:100%;
`
