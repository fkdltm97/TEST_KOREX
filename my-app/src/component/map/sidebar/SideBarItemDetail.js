//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap-tabs';

//css
import styled from "styled-components"
import 'swiper/swiper-bundle.css';

//img
import NavIcon from '../../../img/main/nav_btn.png';
import Logo from '../../../img/main/header_logo.png';
import PCLogo from '../../../img/main/pc_header_logo.png';
import Mypage from '../../../img/main/mypage_icon.png';
import Item from "../../../img/map/map_item.png";
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

// components
import { Mobile, PC } from "../../../MediaQuery";
import SideSubTitle from "./subtitle/SideSubTitle";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);
export default function SideItemDetail({openHouse, rank}) {

    return (
        <Container>
          <SideSubTitle title={"물건 상세"}/>{/*상단 타이틀은 subtitle폴더에 컴포넌트로 뺐습니다*/}
          <TopDetailImg>
              <SwiperBennerWrap className="detail_swiper">
                  <Swiper
                    slidesPerView={1}
                    loop={true}
                    autoplay={true}
                    navigation={{ clickable: true }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                  <SwiperSlide>
                    <DetailImg>
                      <Img src={Detail}/>
                    </DetailImg>
                  </SwiperSlide>
                  <SwiperSlide>
                    <DetailImg>
                      <Img src={Detail}/>
                    </DetailImg>
                  </SwiperSlide>
                </Swiper>
            </SwiperBennerWrap>
          </TopDetailImg>
        {/*물건투어예약 , 실거래, 허위매물 신고 버튼*/}
          <TopButtons>
            <Button>
              <Link className="data_link"/>
              <IconImg src={Exit}/>
              <ButtonTitle>물건투어예약</ButtonTitle>
            </Button>
            <Button>
              <Link className="data_link"/>
              <IconImg src={Trade}/>
              <ButtonTitle>실거래</ButtonTitle>
            </Button>
            <Button>
              <Link className="data_link"/>
              <IconImg src={Report}/>
              <ButtonTitle>허위매물신고</ButtonTitle>
            </Button>
          </TopButtons>

          <TopMainInfoBox>
            <LikeBox>
              <CheckBox type="checkbox" name="" id="Like"/>
              <CheckLabel for="Like"/>
            </LikeBox>
            <Number>등록번호 1234567889</Number>
            <ExclusiveBox>
              <Green>전속</Green>
              <WrapDate>
                <StartDate>20.00.00</StartDate>
                <Line>~</Line>
                <EndDate>20.00.00</EndDate>
              </WrapDate>
            </ExclusiveBox>
            <ItemInfo>
              <Name>
                <Kind>아파트</Kind>
                <Address>자이 109동</Address>
              </Name>
              <Price>전세 12억 5,000</Price>
              <Desc>매물특징 칸입니다. 작은 설명 칸입니다.</Desc>
            </ItemInfo>
          </TopMainInfoBox>
        </Container>
  );
}

const Container = styled.div `
  width:100%;
`
const TopDetailImg = styled.div`
  width:100%;
`
const SwiperBennerWrap = styled.div`
  width:100%;
`
const DetailImg = styled.div`
  width:100%;
  height:493px;
`
const Img = styled.img`
  width:100%;
`
const TopButtons = styled.div`
  width:100%;
  margin:18px auto;
  display:flex;justify-content:center;align-items:center;
`
const Button = styled.div`
  position:relative;
  display:flex;justify-content:center;align-items:center;
  border:1px solid #e4e4e4;
  text-align:center;
  padding:17.5px 12.5px;
  margin-right:5px;
  &:last-child{margin-right:0;}
`
const IconImg = styled.img`
  display:inline-block;
  width:20px;height:20px;
  margin-right:6px;
`
const ButtonTitle = styled.p`
  font-size:13px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
`

const TopMainInfoBox = styled.div`
  position:relative;
  width:450px;
  margin:0 auto;
  border-top:1px solid #f2f2f2;
  padding:15px 20px 20px;
`
const LikeBox = styled.div`
  position:absolute;
  right:20px;top:15px;
`
const CheckBox = styled.input`
  display:none;
  &:checked+label{background:url(${Checked}) no-repeat center center;background-size:26px 25px;}
`
const CheckLabel = styled.label`
  display:inline-block;
  width:40px;height:40px;
  border-radius: 3px;
  border: solid 1px #d0d0d0;
  background:url(${Check}) no-repeat center center;background-size:26px 25px;
`
const Number = styled.p`
  font-size:12px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
`
const ExclusiveBox = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:170px;
  height:25px;
  padding: 6px 15px;
  border: solid 1px #2b664d;
`
const Green = styled.div`
  font-size:12px;color:#2b664d;
  font-weight:600;transform:skew(-0.1deg);
`
const WrapDate = styled.div`
  margin-left:8px;
`
const StartDate = styled(Green)`
  color:#707070;
`
const Line = styled(StartDate)`
`
const EndDate = styled(StartDate)`
`
const ItemInfo = styled.div`
`
const Name = styled.div`
`
const Kind = styled(StartDate)`
`
const Address = styled.div`
  font-size:21px;font-weight:800;
  transform:skew(-0.1deg);
  color:#2b664d;margin-left:5px;
  margin-bottom:6px;
`
const Price = styled.div`
font-size:26px;font-weight:800;
transform:skew(-0.1deg);
color:#4a4a4a;margin-left:5px;
`
const Desc = styled.div`
  border-top:1px solid #f2f2f2;
  padding-top:22px;
  font-size:15px;color:#707070;font-weight:600;
  transform:skew(-0.1deg);
`
