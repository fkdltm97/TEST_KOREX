//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

//style
import styled from "styled-components"

//img
import SwipImg from "../../../../img/main/swip_img.png";
import Homepage from "../../../../img/main/go_home.png";
import Exit from "../../../../img/main/exit.png";
import Call from "../../../../img/main/call.png";
import Live from "../../../../img/main/live.png";
import Chat from "../../../../img/main/chat.png";
import Heart from "../../../../img/main/heart.png";
import HeartCheck from "../../../../img/main/heart_check.png";
import BackBtn from '../../../../img/notice/back_btn.png';

SwiperCore.use([]);
export default function HouseDetail({setLive, setDetailImg}){
    return (
      <Container>
        <WrapDetail>
          <LeftDetail>
            <HouseImg>
              <Link onClick={()=>{setDetailImg(true)}}>
                <Img src={SwipImg}/>
              </Link>
            </HouseImg>
            {/*hastags*/}
            <HashTag>
              <Tag>#hashtag</Tag>
              <Tag>#hashtag</Tag>
              <Tag>#hashtag</Tag>
            </HashTag>
            {/*홈페이지,예약등*/}
            <LeftButtons>
              <Button>
                <Link className="data_link"></Link>
                <IconImg src={Homepage}/>
                <Txt>홈페이지</Txt>
              </Button>
              <Button>
                <Link className="data_link"></Link>
                <IconImg src={Exit}/>
                <Txt>방문예약</Txt>
              </Button>
              <Button>
                <Link onClick={()=>{setLive(true)}} className="data_link"></Link>
                <IconImg src={Live}/>
                <Txt>Live 시청예약</Txt>
              </Button>
            </LeftButtons>
          </LeftDetail>
        {/*RightDetail*/}
          <RightDetail>
            <RightTop>
              <Number>2D0000324</Number>
              <TopTitle>충남내포신도시2차대방엘리움더센트럴</TopTitle>
              <Option>충청남도 / 아파트 / 민간분양</Option>
              <Address>충청남도 홍성군 홍북읍 신경리 947번지</Address>
              <LikeBtn>
                <Like type="checkbox" name="" id="Like1"></Like>
                <Label for="Like1" className="check_label"></Label>
              </LikeBtn>
            </RightTop>
            <RightBottom>
              <Desc>
                <Title>분양세대</Title>
                <DescInfo>831세대</DescInfo>
              </Desc>
              <Desc>
                <Title>분양면적</Title>
                <DescInfo>103㎡ ~ 114㎡</DescInfo>
              </Desc>
              <Desc>
                <Title>전용면적</Title>
                <DescInfo>77㎡ ~ 85㎡</DescInfo>
              </Desc>
              <Desc>
                <Title>분양가격</Title>
                <DescInfo>35,599 ~ 44,049 만원</DescInfo>
              </Desc>
              <Desc>
                <Title>전용면적</Title>
                <DescInfo>77㎡ ~ 85㎡</DescInfo>
              </Desc>
              <Desc>
                <Title>모델하우스 주소</Title>
                <DescInfo>서울특별시 강남구 서초동 길동아파트 103 103호</DescInfo>
              </Desc>
              <Desc>
                <Title>중개보수</Title>
                <DescInfo>-</DescInfo>
              </Desc>
              <Desc>
                <Title>Live 방송일시</Title>
                <DescInfo>2021.01.01   00:00</DescInfo>
              </Desc>
            </RightBottom>
          </RightDetail>
        </WrapDetail>
      {/*전화상담 ,채팅상담*/}
          <Wrap>
            <BottomButton>
              <Link className="data_link"></Link>
              <BottomImg src={Call}/>
              <BottomTxt>전화상담</BottomTxt>
            </BottomButton>
            <Line/>
            <BottomButton>
              <Link className="data_link"></Link>
              <BottomImg src={Chat}/>
              <BottomTxt>채팅상담</BottomTxt>
            </BottomButton>
          </Wrap>
      </Container>
    );
}

const Container = styled.div`
  width:100%;

`
const ModalTop = styled.div`
  width:100%;
  margin-bottom:22px;
  display:flex;
  justify-content:flex-start;
  align-items:center;
`
const BackImg = styled.img`
  width:10px;
  text-align:center;
  vertical-align:middle;
`
const ModalTitle = styled.div`
  font-size:20px;
  color:#707070;font-weight:800;
  margin-left:20px;

`
const WrapDetail = styled.div`
  width:100%;
  display:block;
`
const LeftDetail = styled.div`
  width:100%;
`
const HouseImg = styled.div`
  width:100%;
`
const Img = styled.img`
  width:100%;
`
const HashTag = styled.div`
  width:100%;
  margin-top:calc(100vw*(20/428));
  display:flex;justify-content:center;flex-wrap:wrap;
  align-items:center;
`
const Tag = styled.div`
  padding: calc(100vw*(3/428)) calc(100vw*(16/428));
  height:calc(100vw*(30/428));
  line-height:calc(100vw*(22/428));
  margin-right:calc(100vw*(10/428));
  font-size:calc(100vw*(15/428));color:#707070;font-weight:800;
  transform:skew(-0.1deg);
  border:1px solid #e4e4e4;border-radius:15px;
  background:#f8f7f7;
  margin-bottom:calc(100vw*(5/428));
  &:last-child{margin-right:0;}
`
const LeftButtons = styled(HashTag)`
  margin-top:calc(100vw*(20/428));
`
const Button = styled.div`
  position:relative;
  text-align:center;
  padding:calc(100vw*(15/428)) 0;
  width:calc(100vw*(69/428));
  height:calc(100vw*(64/428));
  margin-right:calc(100vw*(11/428));
  border:1px solid #e4e4e4;
  border-radius:3px;
  &:last-child{margin-right:0;}
`
const IconImg = styled.img`
  display:block;
  width:calc(100vw*(20/428));height:calc(100vw*(20/428));
  margin:0 auto;
`
const Txt = styled.p`
  font-size:calc(100vw*(9/428));
  font-weight:600;transform:skew(-0.1deg);
  margin-top:calc(100vw*(5/428));color:#707070;
`
const RightDetail = styled.div`
  position:relative;
  width:calc(100vw*(392/428));
  margin:calc(100vw*(20/428)) auto 0;
  height:auto;
  background:#f8f7f7;
  padding:calc(100vw*(20/428));
`
const RightTop = styled.div`
  width:100%;
  padding-bottom:calc(100vw*(24/428));
  border-bottom:1px solid #d0d0d0;
`
const TopTitle = styled.h2`
  font-size:calc(100vw*(15/428));color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:calc(100vw*(8/428));
`
const Number = styled.span`
  font-size:calc(100vw*(14/428));color:#979797;
  font-weight:800;transform:skew(-0.1deg);
  display:block;
  margin-bottom:calc(100vw*(8/428));
`
const Option = styled.p`
  font-size:calc(100vw*(14/428));color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:calc(100vw*(5/428));
`
const Address = styled(Option)`
  color:#707070;
  margin-bottom:0;
`
const LikeBtn = styled.div`
  position:Absolute;
  right:calc(100vw*(14/428));top:calc(100vw*(14/428));
`
const Like = styled.input`
  display:none;
  &:checked + .check_label{width:calc(100vw*(29/428));height:calc(100vw*(29/428));background:url(${HeartCheck}) no-repeat center center;background-size:calc(100vw*(17/428)) calc(100vw*(17/428));}\
`
const Label = styled.label`
  display:inline-block;
  width:calc(100vw*(29/428));height:calc(100vw*(29/428));
  border:1px solid #d0d0d0;border-radius:3px;
  background:#fff url(${Heart}) no-repeat center center;
  background-size:calc(100vw*(17/428)) calc(100vw*(17/428));
`
const RightBottom = styled.div`
  width:100%;
  padding-top:calc(100vw*(24/428));
`
const Desc = styled.div`
  display:flex;justify-content:space-between;
  margin-bottom:calc(100vw*(10/428));
`
const Title = styled.p`
  width:calc(100vw*(170/428));
  font-size:calc(100vw*(14/428));color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
`
const DescInfo = styled(Title)`
  width:auto;
  color:#707070;
  text-align:right;
  word-break:keep-all;
`

const Wrap = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:calc(100vw*(300/428));
  height:calc(100vw*(50/428));
  margin:calc(100vw*(30/428)) auto 0;
  border-radius:34px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
`
const BottomButton = styled.div`
  position:relative;
`
const BottomImg = styled.img`
  display:inline-block;
  width:calc(100vw*(17/428));
  margin-right:calc(100vw*(7/428));
`
const BottomTxt = styled.p`
  display:inline-block;
  font-size:calc(100vw*(15/428));color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
`
const Line = styled.div`
  width:1px;
  height:calc(100vw*(35/428));background:#e4e4e4;
  margin:0 calc(100vw*(35/428));
`
