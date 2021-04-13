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

import { Mobile, PC } from "../../../../MediaQuery";
import MemberList from "./MemberList";

export default function Member({}) {

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
            <TopTitle>팀원 관리</TopTitle>
            <TopInfo>
              <All>총 <GreenColor>3</GreenColor> 건</All>
              <Link>
                <AddMember>추가</AddMember>
              </Link>
            </TopInfo>
            {
            MemberListItem.map((value) => {
              return(
                <MemberList value={value}/>
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
const All = styled.span`
  font-size:17px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const GreenColor = styled(All)`
  color:#01684b;
`
const AddMember = styled.div`
  width:80px;height:30px;
  border-radius:4px;border:2px solid #2b664d;
  line-height:26px;
  font-size:13px;color:#2b664d;
  font-weight:600;transform:skew(-0.1deg);
  text-align:center;
`
