//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Item from '../../../../img/main/item01.png';
import Filter from '../../../../img/member/filter.png';
import Bell from '../../../../img/member/bell.png';
import BellActive from '../../../../img/member/bell_active.png';
import Location from '../../../../img/member/loca.png';
import Set from '../../../../img/member/setting.png';
import Noimg from '../../../../img/main/main_icon3.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';

import { Mobile, PC } from "../../../../MediaQuery"

export default function Request({filter, setFilter, value, type}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }

    return (
      <Container>
          <Li>
            <ItemImg>
              <Img src={value.img}/>
            </ItemImg>
            <Infos>
              <ConditionDiv>
                <ConditionType color={type}>{value.conditiontype}</ConditionType> 상태 : <Condition>{value.condition}</Condition>
              </ConditionDiv>
              <TopBox>
                <ColorGreen>전속</ColorGreen>
                <WrapDate>
                  <StartDate>{value.startdate}</StartDate>
                  <Line>~</Line>
                  <EndDate>{value.enddate}</EndDate>
                </WrapDate>
              </TopBox>
              <Number>등록번호 : {value.number}</Number>
              <Title>{value.title}</Title>
              <Kinds>
                <Left>물건종류</Left>
                <Right>{value.kinds}</Right>
              </Kinds>
              <Kinds>
                <Left>건물명</Left>
                <Right>{value.itemname}</Right>
              </Kinds>
              <Trade>
                <Left>거래유형</Left>
                <Right>{value.trade}</Right>
              </Trade>
              <Address>
                <Left>의뢰인명</Left>
                <Right>{value.username}</Right>
              </Address>
            </Infos>
            <RightMenu>
              <Alarm>
                <AlarmCheck type="checkbox" id={"check"+value.p_id} name=""/>
                <Label for={"check"+value.p_id}/>
              </Alarm>
              <Menu>
                <Link onClick={showModal}>
                  <MenuIcon/>
                    {
                      menu ?
                      <InMenu>
                      {/*검토대기 상태일때*/}
                        <Div>
                          <Link to="/RequestReview" className="data_link"></Link>
                          <InDiv>검토</InDiv>
                        </Div>
                        <Div>
                          <Link to="/ConditionChange" className="data_link"></Link>
                          <InDiv>상태변경 내역</InDiv>
                        </Div>

                      {/*거래 준비 상태일때*/}
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>거래개시승인 요청</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>수임 취소</InDiv>
                        </Div>
                        <Div>
                          <Link to="/ConditionChange" className="data_link"></Link>
                          <InDiv>상태변경 내역</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>수정</InDiv>
                        </Div>
                        <Div>
                          <Link to="/PropertyTourSetting" className="data_link"></Link>
                          <InDiv>물건투어예약셋팅</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>삭제</InDiv>
                        </Div>
                      {/*거래 개시 상태일때*/}
  {/*
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>거래개시승인 요청</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>거래완료승인 요청</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>수임 취소</InDiv>
                        </Div>
                        <Div>
                          <Link to="/ConditionChange" className="data_link"></Link>
                          <InDiv>상태변경 내역</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>수정</InDiv>
                        </Div>
                        <Div>
                          <Link to="/PropertyTourSetting" className="data_link"></Link>
                          <InDiv>물건투어예약셋팅</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>삭제</InDiv>
                        </Div>
*/}
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
  position:relative;
  display:flex;justify-content:flex-start;align-items:flex-start;
  padding:29px 24px 29px 20px;
  border-bottom:1px solid #f7f8f8;

  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(29/428)) 0;
  }
`
const ItemImg = styled.div`
  width:106px;height:106px;border: solid 1px #e4e4e4;
  margin-right:40px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(80/428));
    height:calc(100vw*(80/428));
    margin-right:calc(100vw*(18/428));
  }
`
const Img = styled.img`
  width:100%;height:100%;border-radius:3px;
`
const Infos = styled.div`
  width:450px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(280/428));
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
const ConditionType = styled(ConditionDiv)`
  color:${({color}) => color};
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
  margin-bottom:7px;
  font-weight:600;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-bottom:calc(100vw*(3/428));
  }
`
const Title = styled.h3`
  font-size:18px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:15px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(12/428));
  }
`
const Kinds = styled.h2`
  display:flex;justify-content:space-between;align-items:flex-start;
  margin-bottom:6px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(6/428));
  }
`
const Left = styled.p`
  font-size:15px;font-weight:600;
  transform:skew(-0.1deg);
  width:100px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    width:calc(100vw*(100/428));
  }
`
const Right = styled(Left)`
  color:#979797;
  text-align:right;
  width:330px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    width:calc(100vw*(300/428));
  }
`
const Trade = styled(Kinds)`
`
const Address = styled(Kinds)`
  margin-bottom:0;
`
const RightMenu = styled.div`
    position:absolute;
    right:0;
    top:30px;
    @media ${(props) => props.theme.mobile} {
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
  width:130px;
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
const TopBox = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:170px;height:26px;border:1px solid #2b664d;
  line-height:24px;
  margin-bottom:24px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(200/428));
    height:calc(100vw*(26/428));
    line-height:calc(100vw*(26/428));
    }
`
const ColorGreen = styled.span`
  font-size:11px;
  font-weight:600;transform:skew(-0.1deg);
  color:#01684b;
  display:inline-block;margin-right:3px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(11/428));
    margin-right:calc(100vw*(3/428));
    }
`
const WrapDate = styled.div`
  display:flex;
  justify-content:flex-start;
  align-items:center;
`
const StartDate = styled.p`
  font-size:11px;
  font-weight:600;transform:skew(-0.1deg);
  color:#707070;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(11/428));
    }
`
const Line = styled(StartDate)`
`
const EndDate = styled(StartDate)`
`
