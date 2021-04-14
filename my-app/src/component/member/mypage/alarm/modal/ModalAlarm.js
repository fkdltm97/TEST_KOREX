//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Filter from '../../../../../img/member/filter.png';
import Bell from '../../../../../img/member/bell.png';
import BellActive from '../../../../../img/member/bell_active.png';
import Location from '../../../../../img/member/loca.png';
import Set from '../../../../../img/member/setting.png';
import Item from '../../../../../img/main/item01.png';
import Noimg from '../../../../../img/main/main_icon3.png';
import Close from '../../../../../img/main/modal_close.png';
import Change from '../../../../../img/member/change.png';
import Marker from '../../../../../img/member/marker.png';
import ArrowDown from '../../../../../img/member/arrow_down.png';



//지도 모달
export default function ModalAlarm({ item, setItem }) {
  const AlarmItem =[
  {
    ai_id : 0,
    condition1:"사용자 의뢰",
    condition2:"검토 대기",
    startdate:"2020.01.01",
    enddate:"2020.01.01",
    number:1234567889,
    title:"충남내포신도시2차대방엘리움더센트럴",
    kind:"아파트",
    itemname:"충남내포신도시2차대방엘리움더센트럴",
    trade:"매매",
    username:"홍길동",
    type:"request"
  },
  {
    ai_id : 1,
    condition1:"외부 수임",
    condition2:"검토 대기",
    startdate:"2020.01.01",
    enddate:"2020.01.01",
    number:1234567889,
    title:"충남내포신도시2차대방엘리움더센트럴",
    kind:"아파트",
    itemname:"충남내포신도시2차대방엘리움더센트럴",
    trade:"매매",
    username:"홍길동",
    type:"out"
  }
  ]

  if(item == false)
    return null;
    return (
        <Container>
          <WrapModalItem>
            <ModalItemBg onClick={()=>{setItem(false)}}/>
            <ModalItem>
              <ItemCloseBtn>
                <Link onClick={()=>{setItem(false)}}>
                  <ItemCloseImg src={Close}/>
                </Link>
              </ItemCloseBtn>
              <ModalItemTitle>알림설정 물건</ModalItemTitle>
              <WrapAlarmList>
              {
                  AlarmItem.map((value) => {
                    const type=()=>{
                      if(value.type == "request") {
                        return "#fe7a01"
                      }else if(value.type == "cancel") {
                        return "#707070"
                      } else if(value.type == "out") {
                        return "#01684b"
                      }
                    }
                    return(
                      <AlarmList>
                        <Div>
                          <Top>
                            <Left>
                              <ItemImg src={Item}/>
                            </Left>
                            <Right>
                              <Condition>
                                <Orange color={type}>{value.condition1}</Orange> 상태 : <Condi>{value.condition2}</Condi>
                              </Condition>
                              <TopBox>
                                <ColorGreen>전속</ColorGreen>
                                <WrapDate>
                                  <StartDate>{value.startdate}</StartDate>
                                  <Line>~</Line>
                                  <EndDate>{value.enddate}</EndDate>
                                </WrapDate>
                              </TopBox>
                              <OnOff>
                                <AlarmCheck type="checkbox" id={"alarm"+value.ai_id}/>
                                <Label for={"alarm"+value.ai_id}/>
                              </OnOff>
                            </Right>
                          </Top>
                          <Bottom>
                            <Number>{value.number}</Number>
                            <Title>{value.title}</Title>
                            <WrapInfoBox>
                              <InfoBox>
                                <SubTitle>물건종류</SubTitle>
                                <Sub>{value.kind}</Sub>
                              </InfoBox>
                              <InfoBox>
                                <SubTitle>건물명</SubTitle>
                                <Sub>{value.itemname}</Sub>
                              </InfoBox>
                              <InfoBox>
                                <SubTitle>거래유형</SubTitle>
                                <Sub>{value.trade}</Sub>
                              </InfoBox>
                              <InfoBox>
                                <SubTitle>의뢰인명</SubTitle>
                                <Sub>{value.username}</Sub>
                              </InfoBox>
                            </WrapInfoBox>

                          </Bottom>
                        </Div>
                      </AlarmList>
                    )
                  }
                )
              }
            </WrapAlarmList>
            </ModalItem>
          </WrapModalItem>
        </Container>
  );
}

const Pb = styled.b`
  display:block;
  @media ${(props) => props.theme.modal} {
        display:inline;
    }
`
const Mb = styled.b`
  display:inline;
  @media ${(props) => props.theme.modal} {
        display:block;
    }
`
const Container = styled.div`
    width:100%;
`

const WrapModalItem = styled.div`
  width:100%;
`
const ModalItemBg = styled.div`
  width:100%;height:100%;
  position:fixed;left:0;top:0;
  background:rgba(0,0,0,0.2);
  display:block;content:'';
  z-index:3;
`
const ModalItem = styled.div`
  position:fixed;
  left:50%;top:50%;transform:translate(-50%,-50%);
  width:535px;border-radius:24px;height:520px;
  border:1px solid #f2f2f2;
  background:#fff;
  padding:49px 50px 60px 50px;
  z-index:3;
  @media ${(props) => props.theme.modal} {
    width:90%;
    height:calc(100vw*(450/428));
    padding:calc(100vw*(33/428)) calc(100vw*(15/428));
  }
`
const ItemCloseBtn = styled.div`
  width:100%;text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(22/428));
  }
`
const ItemCloseImg = styled.img`
  display:inline-block;width:15px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(12/428));
  }
`
const ModalItemTitle = styled.h3`
  font-size:20px;font-weight:800;color:#707070;
  transform:skew(-0.1deg);
  padding-bottom:20px;
  border-bottom:1px solid #707070;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(15/428));
    padding-bottom:calc(100vw*(15/428));
  }

`
const WrapAlarmList= styled.div`
  width:100%;
  height:330px;overflow-y:scroll;
  @media ${(props) => props.theme.modal} {
    height:calc(100vw*(300/428));
  }
`
const AlarmList = styled.div`
  width:100%;
`
const Div = styled.div`
  width:100%;
  padding:25px 12px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.modal} {
    padding:calc(100vw*(25/428)) calc(100vw*(12/428));
  }

`
const Top = styled.div`
position:relative;
  display:flex;justify-content:flex-start;align-items:center;
`
const Left = styled.div`
  width:80px;height:80px;
  margin-right:18px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(80/428));
    height:calc(100vw*(80/428));
    margin-right:calc(100vw*(15/428));
  }
`
const ItemImg = styled.img`
  width:100%;height:100%;
  border-radius:4px;
  object-fit:cover;
`
const Right = styled.div`
`
const Condition = styled.div`
  margin-bottom:7px;color:#707070;
  font-size:13px;font-weight:600;transform:skew(-0.1deg);
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(13/428));
    margin-bottom:calc(100vw*(7/428));
  }
`
const Orange = styled.span`
  font-size:13px;font-weight:600;transform:skew(-0.1deg);
  color:${({color}) => color};
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(13/428));
  }
`
const Condi = styled(Orange)`
  color:#979797;
`

const TopBox = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:170px;height:26px;border:1px solid #2b664d;
  line-height:24px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(170/428));
    height:calc(100vw*(26/428));
    line-height:calc(100vw*(24/428));
    }
`
const ColorGreen = styled.span`
  font-size:11px;
  font-weight:600;transform:skew(-0.1deg);
  color:#01684b;
  display:inline-block;margin-right:3px;
  @media ${(props) => props.theme.modal} {
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
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(11/428));
    }
`
const Line = styled(StartDate)`
`
const EndDate = styled(StartDate)`
`
const OnOff = styled.div`
  position:absolute;
  right:0;top:0;
  margin-bottom:6px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:0;
    margin-right:calc(100vw*(5/428));
  }
`
const AlarmCheck = styled.input`
  display:none;
  &:checked + label{background:url(${BellActive}) no-repeat center center; background-size:20px 20px}
  @media ${(props) => props.theme.modal} {
    &:checked + label{background:url(${BellActive}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428))}
  }
`
const Label = styled.label`
  display:inline-block;
  width:36px;height:36px;
  border-radius:5px;
  border:1px solid #969696;
  background:url(${Bell}) no-repeat center center; background-size:20px 20px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(31/428));
    height:calc(100vw*(31/428));
    background:url(${Bell}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428));
  }
`
const Bottom = styled.div`
  width:100%;
  margin-top:15px;
  @media ${(props) => props.theme.modal} {
    margin-top:calc(100vw*(15/428));
    }
`
const Number = styled.div`
  font-size: 12px;
  font-weight: normal;
  text-align: left;
  color: #979797;transform:skew(-0.1deg);
  margin-bottom:6px;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(12/428));
    margin-bottom:calc(100vW*(6/428));
    }
`
const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  text-align: left;
  color: #4a4a4a;transform:skew(-0.1deg);
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(15/428));
    }
`
const WrapInfoBox = styled.div`
  margin-top:13px;
  @media ${(props) => props.theme.modal} {
    margin-top:calc(100vw*(13/428));
    }
`
const InfoBox = styled.div`
  width:100%;
  display:flex;justify-content:space-between;align-items:flex-start;
  margin-bottom:6px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(6/428));
    }
`
const SubTitle = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #4a4a4a;transform:skew(-0.1deg);
  width:100px;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(14/428));
    width:calc(100vw*(100/428));
    }
`
const Sub = styled(SubTitle)`
  color:#979797;
  width:460px;
  text-align:right;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(260/428));
    }

`
