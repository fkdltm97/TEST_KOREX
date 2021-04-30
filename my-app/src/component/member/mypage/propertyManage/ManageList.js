//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img

import Bell from '../../../../img/member/bell.png';
import BellActive from '../../../../img/member/bell_active.png';
import Set from '../../../../img/member/setting.png';
import Check from '../../../../img/map/radio.png';
import Checked from '../../../../img/map/radio_chk.png';

import { Mobile, PC } from "../../../../MediaQuery"

export default function Request({cancleModal,confirmModal,mapModal,value, type,select,setSelect,editModal,editResultModal}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }

    return (
      <Container>
          <Li opacity={type}>
            <Infos>
              <WrapLeft>
                {
                  select ?
                  <WrapRight>
                    <CheckBox>
                      <InputCheckEa type="checkbox" name="tour" id={"ea"+value.Manage_id}/>
                      <CheckLabelEa for={"ea"+value.Manage_id}/>
                    </CheckBox>
                  </WrapRight>
                  :
                  null
                }
                <ItemImg>
                  <Img src={value.img}/>
                </ItemImg>
              </WrapLeft>
              <InBox>
                <ConditionDiv>
                  상태 : <Condition>{value.condition} <Number>{value.number}</Number></Condition>
                </ConditionDiv>
                <Line>
                  <Left>예약자명</Left>
                  <Right>{value.name}</Right>
                </Line>
                <Line>
                  <Left>휴대폰번호</Left>
                  <RightOg>
                    <Call href={"tel:"+value.phone}>{value.phone}</Call>
                  </RightOg>
                </Line>
                <Line>
                  <Left>건물명</Left>
                  <RightCursor onClick={()=>{mapModal();}}>{value.address}</RightCursor>
                </Line>
                <Line>
                  <Left>거래유형</Left>
                  <Right>{value.trade}</Right>
                </Line>
                <Line>
                  <Left>거래금액</Left>
                  <Right>{value.price}</Right>
                </Line>
              </InBox>
            </Infos>
            <RightMenu>
              <Alarm>
                <AlarmCheck type="checkbox" id={"check"+value.Manage_id} name=""/>
                <Label for={"check"+value.Manage_id}/>
              </Alarm>
              <Menu>
                <Link onClick={showModal}>
                  <MenuIcon/>
                    {
                      menu ?
                      <InMenu>
                      {/*검토대기 상태일때*/}
                        <Div>
                          <Link onClick={()=>{cancleModal();}} className="data_link"></Link>
                          <InDiv>예약 해제</InDiv>
                        </Div>
                        <Div>
                          <Link onClick={()=>{editModal();}} className="data_link"></Link>
                          <InDiv>수정</InDiv>
                        </Div>
                      </InMenu>
                      :
                      null
                    }
                </Link>
              </Menu>
            </RightMenu>
          </Li>
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
const RequestList = styled.ul`
  width:100%;
`
const Li = styled.li`
  width:100%;
  display:flex;justify-content:flex-start;align-items:center;
  position:relative;
  padding:29px 24px 29px 20px;
  border-bottom:1px solid #f7f8f8;
  opacity:${({opacity}) => opacity};
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(29/428)) 0;
    align-items:center;
  }
`
const WrapLeft = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  margin-right:40px;
  @media ${(props) => props.theme.mobile} {
    margin-right:0;
  }
`
const ItemImg = styled.div`
  width:106px;height:106px;border: solid 1px #e4e4e4;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(80/428));height:calc(100vw*(80/428));
  }
`
const Img = styled.img`
  width:100%;height:100%;border-radius:3px;
`
const Infos = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:100%;margin: 0 auto;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    justify-content:space-between;
  }
`
const Date = styled.div`
  display:block;
  font-size:15px;
  font-weight:800;color:#4a4a4a;
  transform:skew(-0.1deg);
  margin-bottom:7px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-bottom:calc(100vw*(3/428));
  }
`
const ConditionDiv = styled(Date)`
  display:inline-block;
  color:#979797;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    margin-bottom:calc(100vw*(5/428));
  }
`
const Condition = styled(ConditionDiv)`
  margin-bottom:0;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    margin-bottom:0;
  }
`
const Number = styled.p`
  font-size:14px;color:#979797;
  transform:skew(-0.1deg);
  display:inline-block;
  margin-left:5px;
  font-weight:600;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-left:calc(100vw*(5/428));
  }
`
const Line = styled.h2`
  display:flex;justify-content:space-between;align-items:flex-start;
  margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
  }
`
const Left = styled.p`
  font-size:15px;font-weight:600;
  transform:skew(-0.1deg);color:#4a4a4a;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
    }
`

const Right = styled(Left)`
  color:#979797;
  text-align:right;
  width:330px;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(190/428));
    }
`
const RightOg = styled(Right)`
  color:#fe7a01;
  text-decoration:underline;
`
const RightCursor = styled(Right)`
  cursor:pointer;
`
const Call = styled.a`
`
const WrapRight = styled.div`
  margin-right:20px;
  @media ${(props) => props.theme.modal} {
      margin-right:calc(100vw*(10/428));
    }
`
const CheckBox = styled.div`
`
const InputCheckEa = styled.input`
  display:none;
  &:checked+label{background:url(${Checked}) no-repeat;background-size:100% 100%}
`
const CheckLabelEa = styled.label`
  display:inline-block;
  width:20px;height:20px;
  background:url(${Check}) no-repeat;background-size:100% 100%;
  @media ${(props) => props.theme.modal} {
      width:calc(100vw*(20/428));
      height:calc(100vw*(20/428));
    }
`
const RightMenu = styled.div`
    position:absolute;
    right:0;
    top:20px;
    @media ${(props) => props.theme.mobile} {
      top:calc(100vw*(10/428));
      transform:none;
      display:flex;justify-content:flex-start;
    }
`
const Alarm = styled.div`
  margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:0;
    margin-right:calc(100vw*(5/428));
  }

`
const AlarmCheck = styled.input`
  display:none;
  &:checked + label{background:url(${BellActive}) no-repeat center center; background-size:20px 20px}
  @media ${(props) => props.theme.mobile} {
    &:checked + label{background:url(${BellActive}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428))}
  }
`
const Label = styled.label`
  display:inline-block;
  width:36px;height:36px;
  border-radius:5px;
  border:1px solid #e4e4e4;
  background:url(${Bell}) no-repeat center center; background-size:20px 20px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(31/428));
    height:calc(100vw*(31/428));
    background:url(${Bell}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428));
  }
`
const Menu = styled(Alarm)`
  margin-bottom:0;
  @media ${(props) => props.theme.mobile} {
    margin-right:0;
  }
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
const Bg = styled.div`
  position:fixed;width:100%;height:100%;
  background:rgba(0,0,0,0.2);left:0;top:0;
`
const InMenu = styled.ul`
  position:absolute;
  top:46px;left:44px;
  width:112px;
  border:1px solid #707070;
  border-radius:8px;
  background:#fff;
  z-index:2;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(35/428));
    left:calc(100vw*(-30/428));
    width:calc(100vw*(100/428));
  }

`
const Div = styled.li`
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
const InBox = styled.div`

`