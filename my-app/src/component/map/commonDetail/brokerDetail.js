// React
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

// Css
import styled from "styled-components"

// Img
import Profile from "../../../img/map/profile_img.png";
import Call from "../../../img/map/call.png";
import Chat from "../../../img/map/chat.png";

const BrokerDetail = ({broker, isDetial}) => {
  
    return(
        <BrokerInfo>
            <TopBox>
              <Tag>{broker.tag_1}</Tag>
              <Tag>{broker.tag_2}</Tag>
              <Tag>{broker.tag_3}</Tag>
            </TopBox>
            <MiddleBox>
              <LeftContent>
                <BrokerInfoDetail>
                  <BrokerName>{broker.name}</BrokerName>
                  <BrokerAddress>{broker.address}</BrokerAddress>
                  <SellList>
                    <List>매매 <ColorOrange>{broker.trade}</ColorOrange></List>
                    <Part/>
                    <List>전세 <ColorOrange>{broker.jeonse}</ColorOrange></List>
                    <Part/>
                    <List>월세 <ColorOrange>{broker.monthly}</ColorOrange></List>
                  </SellList>
                </BrokerInfoDetail>
              </LeftContent>
              <RightContent>
                <ItemImg src={broker.profile}/>
              </RightContent>
            </MiddleBox>
            <BottomBox>
              <ToCall>
                <Link className="data_link"/>
                <BottomImg src={Call}/>
                <BottomTxt>전화 상담</BottomTxt>
              </ToCall>
              <LongPart/>
              <ToChat>
                <Link className="data_link"/>
                <BottomImg src={Chat}/>
                <BottomTxt>채팅 상담</BottomTxt>
              </ToChat>
            </BottomBox>
          </BrokerInfo>
    )
};

export default BrokerDetail;

const BrokerInfo = styled.div`
  width:100%;padding:0 16px;
  margin-top:43px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(40/428));
    padding:0 calc(100vw*(16/428));
  }
`
const TopBox = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  flex-wrap:wrap;
  width:100%;
  margin-bottom:14px;
  padding-left:30px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(14/428));
    padding-left:calc(100vw*(20/428));
  }
`
const Tag = styled.div`
  border-radius: 15px;
  border: solid 1px #e4e4e4;
  background-color: #f8f7f7;
  height:30px;
  padding:7px 16px;
  margin-right:5px;
  font-size:15px;color:#01684b;
  font-weight:600;transform:skew(-0.1deg);
  text-align:center;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(30/428));
    padding:calc(100vw*(6/428)) calc(100vw*(10/428));
    font-size:calc(100vw*(15/428));margin-right:calc(100vw*(5/428));
  }
`
const MiddleBox = styled.div`
  padding:0 30px;
  display:flex;justify-content:space-between;align-items:center;
  @media ${(props) => props.theme.mobile} {
    padding:0 calc(100vw*(20/428));
  }
`
const LeftContent = styled.div`
`
const BrokerInfoDetail = styled.div`
`
const BrokerName = styled.div`
  font-size:25px;font-weight:800;transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:13px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(25/428));
    margin-bottom:calc(100vw*(13/428));
  }
`
const BrokerAddress = styled.div`
  display:inline-block;
  font-size:15px;color:#4a4a4a;
  font-weight:700;transform:skew(-0.1deg);
  margin-bottom:13px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-bottom:calc(100vw*(13/428));
  }
`

const ColorOrange = styled.span`
  display:inline-block;
  font-size:15px;color:#fe7a01;
  vertical-align:middle;
  margin-left:3px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-left:calc(100vw*(3/428));
  }
`
const SellList = styled.div`
  width:100%;display:flex;
  justify-content:flex-start;align-items:center;
`
const List = styled(ColorOrange)`
  color:#4a4a4a;
  margin-right:7px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(7/428));
  }
`
const Part = styled.div`
  display:inline-block;
  width:1px;height:12px;
  background:#4a4a4a;
  margin-right:7px;
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(7/428));
    height:calc(100vw*(10/428));
  }
`

const RightContent = styled.div`
  position:relative;
  width:95px;height:95px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(95/428));
    height:calc(100vw*(95/428));;
  }
`
const ItemImg = styled.img`
  width:100%;height:100%;
  border-radius:100%;
`
const BottomBox = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:100%;
  height: 84px;
  margin:60px 0 30px;
  border-radius: 20px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 3px #efefef;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(84/428));
    margin:calc(100vw*(60/428)) 0 calc(100vw*(30/428));
  }
`
const ToCall = styled.div`
  position:relative;
  display:flex;justify-content:flex-start;align-items:center;
`
const BottomImg = styled.img`
  width:20px;height:20px;
  display:inline-block;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(20/428));
    height:calc(100vw*(20/428));
  }
`
const BottomTxt = styled.p`
  font-size:18px;font-weight:600;
  transform:skew(-0.1deg);margin-left:10px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(18/428));
    margin-left:calc(100vw*(10/428));
  }
`
const ToChat = styled(ToCall)`
`
const LongPart = styled.p`
  width:1px;height:30px;background:#979797;
  margin:0 50px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(30/428));
    margin:0 calc(100vw*(20/428));
  }
`

