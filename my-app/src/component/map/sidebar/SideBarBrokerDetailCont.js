//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import 'swiper/swiper-bundle.css';

//img
import Arrow from "../../../img/map/filter_next.png";
import Detail from "../../../img/map/detail_img.png";
import Trade from "../../../img/map/trade.png";
import Report from "../../../img/map/report.png";
import ChangeM from "../../../img/map/change_m.png";
import Change from "../../../img/member/change.png";
import Call from "../../../img/map/call.png";
import Chat from "../../../img/map/chat.png";
import Exit from "../../../img/main/exit.png";
import Checked from "../../../img/map/checked.png";
import Check from "../../../img/main/heart.png";
import Profile from "../../../img/map/profile_img.png";
import Like from '../../../img/member/like.png';
import Smile from '../../../img/member/smile.png';
import OrangeStar from '../../../img/member/star_orange.png';
import GreenStar from '../../../img/member/star_green.png';
import WhiteStar from '../../../img/member/star_white.png';

// components
import { Mobile, PC } from "../../../MediaQuery";
import SideSubTitle from "./subtitle/SideSubTitle";
import BrokerTabContent from "./tabcontent/BrokerTabContent";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);
export default function SideBarBrokerDetailCont({historyInfo,updatePageIndex,setHistoryInfo}) {

    return (
        <Container>
          <TopContent>
            <ProfileDetail>
                <TopBox>
                  <Tag>아파트·현대아이리스</Tag>
                  <Tag>상가</Tag>
                  <Tag>사무실</Tag>
                </TopBox>
                <BottomBox>
                  <LeftContent>
                    <ItemInfo>
                      <Name>홍길동</Name>
                      <Address>강남구 논현동 104-5</Address>
                      <SellList>
                        <List>매매<ColorOrange>2</ColorOrange></List>
                        <Part/>
                        <List>전세 <ColorOrange>7</ColorOrange></List>
                        <Part/>
                        <List>월세 <ColorOrange>9</ColorOrange></List>
                      </SellList>
                    </ItemInfo>
                  </LeftContent>
                  <RightContent>
                    <ItemImg src={Profile}/>
                  </RightContent>
                </BottomBox>
            </ProfileDetail>
            <InfoDetail>
              <FlexBox>
                <Left>
                  <Icon src={Like} alt="icon"/>
                  <SubTitle>전문성</SubTitle>
                </Left>
                <RightStar>
                  <Star src={OrangeStar}/>
                  <Star src={OrangeStar}/>
                  <Star src={OrangeStar}/>
                  <Star src={OrangeStar}/>
                  <Star src={OrangeStar}/>
                </RightStar>
                </FlexBox>
                <FlexBox>
                  <Left>
                    <Icon src={Smile} alt="icon"/>
                    <SubTitle>중개매너</SubTitle>
                  </Left>
                  <RightStar>
                    <Star src={GreenStar}/>
                    <Star src={GreenStar}/>
                    <Star src={GreenStar}/>
                    <Star src={GreenStar}/>
                    <Star src={WhiteStar}/>
                  </RightStar>
              </FlexBox>
            </InfoDetail>
            <CallBox>
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
            </CallBox>
          </TopContent>

        </Container>
  );
}

const Container = styled.div `
  width:100%;
`
const TopContent = styled.div`
  position:relative;
  padding:25px 0;
  margin-bottom:17px;
  border-bottom:8px solid #e4e4e4;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    padding:calc(100vw*(25/428)) 0;
  }
`
const ProfileDetail = styled.div`
  position:relative;
  width:100%;
  padding:0 40px;
  margin-bottom:24px;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    padding:0 calc(100vw*(30/428));
    margin-bottom:calc(100vw*(20/428));
  }
`
const TopBox = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  flex-wrap:wrap;
  width:100%;
  margin-bottom:14px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(15/428));
  }
`
const Tag = styled.div`
  border-radius: 15px;
  border: solid 1px #e4e4e4;
  background-color: #f8f7f7;
  height:30px;
  padding:7px 16px;
  margin-right:5px;
  font-size:13px;color:#01684b;
  font-weight:600;transform:skew(-0.1deg);
  text-align:center;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(30/428));
    padding:calc(100vw*(6/428)) calc(100vw*(10/428));
    margin-right:calc(100vw*(5/428));
    font-size:calc(100vw*(15/428));
  }
`
const BottomBox = styled.div`
  display:flex;justify-content:space-between;align-items:center;
`
const LeftContent = styled.div`
`
const ItemInfo = styled.div`
`
const Name = styled.div`
  font-size:22px;font-weight:800;transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:13px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(25/428));
    margin-bottom:calc(100vw*(13/428));
  }
`
const Address = styled.div`
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

const InfoDetail = styled.div`
  width:100%;
  padding:22px 0;
  background:#fbfbfb;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(20/428)) 0;
  }
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
const RightContent = styled.div`
  position:relative;
  width:80px;height:80px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(95/428));
    height:calc(100vw*(95/428));
  }
`
const ItemImg = styled.img`
  width:100%;height:100%;
  border-radius:100%;
`

const FlexBox = styled.div`
  display:flex;width:100%;background:#fbfbfb;
  justify-content:center;align-items:center;
  margin-bottom:25px;
  &:nth-child(3){margin-top:60px;}
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(25/428));
    &:nth-child(3){margin-top:calc(100vw*(40/428));}
    }
`
const Left = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:100px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(100/428));
    }
`
const Star = styled.img`
  display:inline-block;
  width:16px;
  margin-right:9px;
  &:last-child{margin-right:0;}
  vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(16/428));
    margin-right:calc(100vw*(9/428));
    }
`

const RightStar = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:184px;
  margin-left:40px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(184/428));
    }
`
const CallBox = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:465px;
  height: 84px;
  padding:0 16px;
  margin:16px auto 0;
  border-radius: 20px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  border: solid 3px #efefef;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(398/428));
    height:calc(100vw*(84/428));
    padding:0;
    margin:calc(100vw*(14/428)) auto 0;
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
  font-size:18px;font-weight:800;
  transform:skew(-0.1deg);margin-left:10px;
  color:#4a4a4a;
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
    margin:0 calc(100vw*(40/428));
  }
`
