//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

//img
import View from '../../../../img/main/icon_view.png';
import Item from "../../../../img/map/map_item.png";
import Check from "../../../../img/main/heart.png";
import HeartCheck from "../../../../img/main/heart_check.png";
import Set from '../../../../img/member/setting.png';

import { Mobile, PC } from "../../../../MediaQuery"

export default function ItemTabList({}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }
    return (
        <Container>
          <TopInfo>
            <All>총 <GreenColor>4</GreenColor> 건</All>
            <FilterAndAdd>
              <Link onClick={showModal}>
                <FilterImg src={View} alt="filter"/>
                {
                  menu ?
                  <InMenu>
                    <Div>
                      <Link className="data_link"></Link>
                      <InDiv>최신알림순</InDiv>
                    </Div>
                    <Div>
                      <Link className="data_link"></Link>
                      <InDiv>과거알림순</InDiv>
                    </Div>
                  </InMenu>
                  :
                  null
                }
              </Link>
            </FilterAndAdd>
          </TopInfo>
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
    @media ${(props) => props.theme.mobile} {
      width:100%;
      }
`
const WrapRequest = styled.div`
  width:100%;
`
const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:40px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(16/428));
    }
`
const TopInfo = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding:16px 40px;
  border-bottom:1px solid #f2f2f2;
margin-top:calc(100vw*(18/428))
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(40/428));
    padding:0 calc(100vw*(34/428)) calc(100vw*(22/428));
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
const FilterImg = styled.img`
  display:inline-block;
  width:18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
  }
`

const FilterAndAdd = styled.div`
  position:relative;
  display:flex;justify-content:flex-start; align-items:center;
`
const ListUl = styled.div`
  width:100%;
  height:563px;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    height:calc(100vw*(536/428));
    }
`
const TabContent = styled.div`
  position:relative;
  width:100%;
  padding:30px 0;margin-top:17px;
  margin:0 auto 17px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    padding:0 calc(100vw*(16/428)) calc(100vw*(18/428)) calc(100vw*(26/428));
    margin-bottom:calc(100vw*(18/428));
    margin-top:calc(100vw*(18/428));
    }
`
const Condition = styled.div`
  font-size:15px;color:#707070;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:15px;
`
const Orange = styled. span`
  font-size:15px;color:#fe7a01;
  font-weight:800;transform:skew(-0.1deg);
  vertical-align:middle;
`
const WrapAlarmInfo = styled.div`
  width:550px;
  padding-left:50px;

`
const FlexBox = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  flex-wrap:wrap;margin-bottom:6px;
`
const Left = styled.p`
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
`
const Right = styled(Left)`
  color:#979797;
`
const RightWd100 = styled(Right)`
  width:100%;
  margin-top:6px;
`
const RightMenu = styled.div`
  position:absolute;right:30px;top:30px;
`
const InMenu = styled.ul`
  position:absolute;
  width:112px;
  top:0;left:44px;
  border:1px solid #707070;
  border-radius:8px;
  background:#fff;
  z-index:3;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(20/428));
    left:calc(100vw*(-50/428));
  }
`

const InMenu2 = styled.ul`
  position:absolute;
  width:160px;
  top:0;left:44px;
  border:1px solid #707070;
  border-radius:8px;
  background:#fff;
  z-index:3;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(20/428));
    left:calc(100vw*(-50/428));
  }
`
const Div = styled.li`
  position:relative;
  font-size:13px;
  transform:skew(-0.1deg);
  border-radius:8px;
  padding:4px 0 4px 17px;
  transition:all 0.3s;
  &:hover{background:#f8f7f7;}
  &:first-child{padding-top:8px;}
  &:last-child{padding-bottom:8px;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    padding:calc(100vw*(4/428)) 0 calc(100vw*(4/428)) calc(100vw*(12/428));
    &:first-child{padding-top:calc(100vw*(8/428));}
    &:last-child{padding-bottom:calc(100vw*(8/428));}
  }
`
const InDiv = styled.div`
  width:100%;height:100%;
`
const Alarm = styled.div`
  margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:0;
    margin-right:calc(100vw*(5/428));
  }

`
const Menu = styled(Alarm)`
  margin-bottom:0;
  @media ${(props) => props.theme.mobile} {
    margin-right:0;
  }
`
const MenuIn = styled(Menu)`

`
const MenuIcon = styled.div`
  width:36px;height:36px;
  border-radius:5px;
  border:1px solid #e4e4e4;
  background:url(${Set}) no-repeat center center; background-size:20px 20px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(31/428));
    height:calc(100vw*(31/428));
    background:url(${Set}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428));
  }
`
