//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

//style
import styled from "styled-components"

//img
import ItemImg from "../../../img/main/item01.png";
import SwipImg from "../../../img/main/swip_img.png";
import Homepage from "../../../img/main/go_home.png";
import Exit from "../../../img/main/exit.png";
import Heart from "../../../img/main/heart.png";
import Call from "../../../img/main/call.png";
import Live from "../../../img/main/live.png";
import Chat from "../../../img/main/chat.png";
import BackBtn from '../../../img/notice/back_btn.png';
import CloseIcon from "../../../img/main/modal_close.png";
import Check from "../../../img/member/check.png";
import Checked from "../../../img/member/checked.png";
import CloseBtn from '../../../img/main/w_close_btn.png';

SwiperCore.use([Navigation]);
export default function HouseList({updatePageIndex,setLive,setDetailImg}){

  const [active,setActive] = useState(false);


    return (
      <Container>
      {/*housetop*/}
        <ModalTop>
          <Back onClick={() => {updatePageIndex(0)}}>
            <ImgBack src={BackBtn}/>
          </Back>
          <Title>분양상세</Title>
        </ModalTop>
        <WrapDetail>
          <LeftDetail>
            <SwiperBennerWrap className="house_swiper">
              <Swiper
                spaceBetween={5}
                slidesPerView={1}
                loop={true}
                autoplay={false}
                navigation={{ clickable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <Link onClick={() => {setDetailImg(true)}}>
                    <Img src={SwipImg} alt="img"/>
                  </Link>
                </SwiperSlide>
                <SwiperSlide>
                  <Link onClick={() => {setDetailImg(true)}}>
                    <Img src={SwipImg} alt="img"/>
                  </Link>
                </SwiperSlide>
              </Swiper>
            </SwiperBennerWrap>
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
                <Link onClick={() => {setLive(true)}} className="data_link"></Link>
                <IconImg src={Live}/>
                <Txt>Live 시청예약</Txt>
              </Button>
            </LeftButtons>
          </LeftDetail>
          {/*RightDetail*/}
            <RightDetail>
              <RightTop>
                <TopTitle>충남내포신도시2차대방엘리움더센트럴<Number>2D0000324</Number></TopTitle>
                <Option>충청남도 / 아파트 / 민간분양</Option>
                <Address>충청남도 홍성군 홍북읍 신경리 947번지</Address>
                <LikeBtn>
                  <Like type="checkbox" name="" id="Like1"></Like>
                  <Label for="Like1" className="check_label"></Label>
                </LikeBtn>
              </RightTop>
              <RightBottom>
                <Desc>
                  <DTitle>분양세대</DTitle>
                  <DescInfo>831세대</DescInfo>
                </Desc>
                <Desc>
                  <DTitle>분양면적</DTitle>
                  <DescInfo>103㎡ ~ 114㎡</DescInfo>
                </Desc>
                <Desc>
                  <DTitle>전용면적</DTitle>
                  <DescInfo>77㎡ ~ 85㎡</DescInfo>
                </Desc>
                <Desc>
                  <DTitle>분양가격</DTitle>
                  <DescInfo>35,599 ~ 44,049 만원</DescInfo>
                </Desc>
                <Desc>
                  <DTitle>전용면적</DTitle>
                  <DescInfo>77㎡ ~ 85㎡</DescInfo>
                </Desc>
                <Desc>
                  <DTitle>모델하우스 주소</DTitle>
                  <DescInfo>서울특별시 강남구 서초동 길동아파트 103 103호</DescInfo>
                </Desc>
                <Desc>
                  <DTitle>중개보수</DTitle>
                  <DescInfo>-</DescInfo>
                </Desc>
                <Desc>
                  <DTitle>Live 방송일시</DTitle>
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
  position:relative;
  width:100%;
  margin-bottom:22px;
  @media ${(props) => props.theme.container} {
      margin-bottom:calc(100vw*(22/1436));
    }
`
const Title = styled.h2`
  font-size:20px;color:#707070;
  padding-left:38.5px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
    }
`
const Back = styled.div`
  position:absolute;
  left:11px;
  top:62%;transform:translateY(-50%);
  z-index:2;
  cursor:pointer;
`
const ImgBack = styled.img`
  width:9px;
`
const WrapDetail = styled.div`
  width:100%;
  display:flex;justify-content:flex-start;
  border-top:1px solid #a3a3a3;
  padding-top:10px;

`
const LeftDetail = styled.div`
  width:470px;
  @media ${(props) => props.theme.container} {
      width:45%;
    }

`
const SwiperBennerWrap = styled.div`
  width:100%;
`
const Img = styled.img`
  width:100%;
`
const HashTag = styled.div`
  width:100%;
  margin-top:15px;
  display:flex;justify-content:center;
  align-items:center;

`
const Tag = styled.div`
  padding: 3px 16px;
  height:30px;
  line-height:22px;
  margin-right:10px;
  font-size:15px;color:#707070;font-weight:800;
  transform:skew(-0.1deg);
  border:1px solid #e4e4e4;border-radius:15px;
  background:#f8f7f7;
  &:last-child{margin-right:0;}
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(15/1436));
    }

`
const LeftButtons = styled(HashTag)`
  margin-top:20px;

`
const Button = styled.div`
  position:relative;
  text-align:center;
  padding:12px 0 10px;
  width:60px;
  height:55px;
  border:1px solid #e4e4e4;
  margin-right:11px;
  &:last-child{margin-right:0;}

`
const IconImg = styled.img`
  display:block;
  width:20px;height:20px;
  margin:0 auto;
  @media ${(props) => props.theme.container} {
      width:calc(100vw*(20/1436));
      height:calc(100vw*(20/1436));
    }

`
const Txt = styled.p`
  font-size:9px;
  font-weight:normal;
  width:100%;
  margin-top:1px;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      margin-top:calc(100vw*(2/1436));
    }


`
const RightDetail = styled.div`
  position:relative;
  width:525px;
  margin-left:10px;
  height:416px;
  background:#f8f7f7;
  padding:29px;
  @media ${(props) => props.theme.container} {
      width:55%;
      height:calc(100vw*(420/1436));
    }

`
const RightTop = styled.div`
  width:100%;
  padding-bottom:20px;
  border-bottom:1px solid #d0d0d0;
  @media ${(props) => props.theme.container} {
      width:100%;
      padding-bottom:calc(100vw*(20/1436));
    }

`
const TopTitle = styled.h2`
  font-size:18px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:5px;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(18/1436));
    }

`
const Number = styled.span`
  font-size:14px;color:#979797;
  font-weight:800;transform:skew(-0.1deg);
  display:inline-block;
  margin-left:10px;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(14/1436));
    }
`
const Option = styled.p`
  font-size:14px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  margin-bottom:5px;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(14/1436));
    }

`
const Address = styled(Option)`
  color:#707070;
  margin-bottom:0;
`
const LikeBtn = styled.div`
  position:Absolute;
  right:20px;top:20px;

`
const Like = styled.input`
  display:none;
`
const Label = styled.label`
  display:inline-block;
  width:29px;height:29px;
  border:1px solid #d0d0d0;border-radius:3px;
  background:#fff url(${Heart}) no-repeat center center;
  background-size:17px 17px;

`
const RightBottom = styled.div`
  width:100%;
  padding-top:20px;

`
const Desc = styled.div`
  display:flex;justify-content:space-between;
  margin-bottom:12px;

`
const DTitle = styled.p`
  width:170px;
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      width:calc(100vw*(170/1436));
      font-size:calc(100vw*(15/1436));
    }

`
const DescInfo = styled(DTitle)`
  width:auto;
  color:#707070;
  text-align:right;
  word-break:keep-all;
`

const Wrap = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:365px;
  height:60px;
  margin:34px auto 0;
  border-radius:34px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  @media ${(props) => props.theme.container} {
      width:calc(100vw*(365/1436));
      height:calc(100vw*(60/1436));
      margin:calc(100vw*(20/1436)) auto 0;
    }

`
const BottomButton = styled.div`
  position:relative;
  display:flex;justfy-content:center;align-items:center;
`
const BottomImg = styled.img`
  display:inline-block;
  width:17px;
  margin-right:5px;

`
const BottomTxt = styled.p`
  display:inline-block;
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(14/1436));
    }

`
const Line = styled.div`
  width:1px;
  height:35px;background:#e4e4e4;
  margin:0 35px;

`
const WrapModal = styled.div`
  position:fixed;
  width:100%;height:100%;
  z-index:2;left:0;top:0;
`
const ModalBg = styled.div`
  position:fixed;
  width:100%;height:100%;left:0;top:0;
  display:block;content:'';background:rgba(0,0,0,0.05);
  z-index:2;
`
const Wraplive = styled.div`
  position:absolute;z-index:3;
  width:535px;height:520px;
  background:#fff;
  border-radius:24px;
  border:1px solid #f2f2f2;
  left:50%;top:50%;transform:translate(-50%,-50%);
  padding:49px 49px 77px 63px;
  @media ${(props) => props.theme.container} {
        width:calc(100vw*(535/1436));
        height:calc(100vw*(520/1436));
    }

  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(395/428));
      height:auto;
      padding:calc(100vw*(24/428)) calc(100vw*(20/428)) calc(100vw*(50/428));
    }
`
const ModalClose = styled.div`
  width:100%;
  text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.container} {
        margin-bottom:calc(100vw*(22/1436));
    }

  @media ${(props) => props.theme.mobile} {
      margin-bottom:calc(100vw*(25/428));
    }
`
const CloseImg = styled.img`
  display:inline-block;
  width:15px;height:16px;
  @media ${(props) => props.theme.container} {
        width:calc(100vw*(15/1436));
        height:calc(100vw*(16/1436));
    }

  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(12/428));
      height:calc(100vw*(13/428));
    }
`
const LiveModalTop = styled.div`
  width:100%;padding-bottom:20px;
  border-bottom:1px solid #a3a3a3;
  @media ${(props) => props.theme.container} {
      padding-bottom:calc(100vw*(20/1436));
    }

  @media ${(props) => props.theme.mobile} {
      padding-bottom:calc(100vw*(15/428));
    }
`
const LiveTitle = styled.div`
  font-size:20px;
  font-weight:800;
  color:#707070;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(20/1436));
    }

  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
    }
`
const ModalBody = styled.div`
  width:100%;
  padding-top:11px;
  @media ${(props) => props.theme.container} {
      padding-top:calc(100vw*(11/1436));
    }

  @media ${(props) => props.theme.mobile} {
      padding-top:calc(100vw*(14/428));
    }
`
const Box = styled.div`
  width:100%;
  margin-bottom:14px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.container} {
      margin-bottom:calc(100vw*(14/1436));
    }

  @media ${(props) => props.theme.mobile} {
      margin-bottom:calc(100vw*(15/428));
    }
`
const BoxTitle = styled.p`
  font-size:12px;color:#4a4a4a;
  margin-bottom:9px;
  padding-left:7px;
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(12/1436));
      margin-bottom:calc(100vw*(9/1436));
      padding-left:calc(100vw*(7/1436));
    }

  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(12/428));
      margin-bottom:calc(100vw*(9/428));
      padding-left:calc(100vw*(7/428));
    }
`
const InputText = styled.input`
  font-size:15px;color:#979797;
  transform:skew(-0.1deg);
  text-align:center;
  width:100%;
  height:43px;
  line-height:43px;
  border:1px solid #e4e4e4;
  &::placeholder{font-size:15px;color:#979797;}
  @media ${(props) => props.theme.container} {
      font-size:calc(100vw*(15/1436));
      height:calc(100vw*(43/1436));
      line-height:calc(100vw*(43/1436));
      &::placeholder{font-size:calc(100vw*(15/1436));}
    }

  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(14/428));
      height:calc(100vw*(43/428));
      line-height:calc(100vw*(43/428));
      &::placeholder{font-size:calc(100vw*(14/428));}
    }
`
const Checkbox = styled.div`
  margin:30px 0;
  text-align:center;
  @media ${(props) => props.theme.container} {
      margin:calc(100vw*(30/1436)) 0;
    }
  @media ${(props) => props.theme.mobile} {
      margin:calc(100vw*(25/428)) 0;
    }

`
const CheckInput = styled.input`
  display:none;
  &:checked + .check_label .chk_on_off{width:16px;height:16px;background:url(${Checked}) no-repeat;background-size:100% 100%;}
  @media ${(props) => props.theme.container} {
    &:checked + .check_label .chk_on_off{width:calc(100vw*(16/1436));height:calc(100vw*(16/1436));background:url(${Checked}) no-repeat;background-size:100% 100%;}
    }
  @media ${(props) => props.theme.mobile} {
    &:checked + .check_label .chk_on_off{width:calc(100vw*(16/428));height:calc(100vw*(16/428));background:url(${Checked}) no-repeat;background-size:100% 100%;}
    }
`
const LiveLabel = styled.label`
  font-size:12px;
  transform:skew(-0.1deg);
  font-weight:bold;color:#4a4a4a;
  @media ${(props) => props.theme.container} {
    font-size:calc(100vw*(12/1436));
  }
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    }

`
const Span = styled.span`
  display:inline-block;
  margin-right:12px;
  width:16px;height:16px;
  background:url(${Check}) no-repeat;
  background-size:100% 100%;
  vertical-align:middle;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.container} {
    margin-right:calc(100vw*(12/1436));
    width:calc(100vw*(16/1436));height:calc(100vw*(16/1436));
  }
  @media ${(props) => props.theme.mobile} {
    margin-right:calc(100vw*(12/428));
    width:calc(100vw*(16/428));height:calc(100vw*(16/428));
  }
`
const ViewTerm = styled.p`
  display:inline-block;
  font-size:12px;
  color:#a0a0a0;
  font-weight:600;
  transform:skew(-0.1deg);
  vertical-align:text-bottom;
  margin-left:20px;
  @media ${(props) => props.theme.container} {
    font-size:calc(100vw*(12/1436));
    margin-left:calc(100vw*(20/1436));
  }
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-left:calc(100vw*(12/428));
  }
`
const ModalBtn = styled.div`
    width:100%;
`
const Confirm = styled.div`
    width:100%;text-align:center;
    background:#979797;
    border:3px solid #e4e4e4;
    border-radius:11px;
    height:66px;
    line-height:60px;
    color:#fff;
    font-size:20px;font-weight:600;
    @media ${(props) => props.theme.container} {
      height:calc(100vw*(66/1436));
      line-height:calc(100vw*(60/1436));
      font-size:calc(100vw*(20/1436));
    }
    @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(60/428));
      line-height:calc(100vw*(54/428));
      font-size:calc(100vw*(15/428));
    }
`

const SwiperBg = styled.div`
  position:fixed;
  width:100%;
  z-index:900;
  height:100%;left:0;top:0;display:block;content:'';
  background:rgba(0,0,0,0.05);z-index:-1;
`
const SwiperCloseImg = styled.div`
  position:absolute;
  top:44px;right:42px;
  width:25px;
  z-index:3;
  @media ${(props) => props.theme.container} {
        width:calc(100vw*(29/1436));
    }
  @media ${(props) => props.theme.mobile} {
      z-index:3;
      top:calc(100vw*(-30/428));
      right:calc(100vw*(20/428));
      width:calc(100vw*(18/428));
    }
`
const SwipeClose = styled.img`
  width:100%;
`
const SwiperWrap = styled.div`
  position:fixed;
  left:50%;top:50%;transform:translate(-50%,-50%);
  width:100%;
  height:100%;
  z-index:1000;
  background:rgba(255,255,255,0.7);
  @media ${(props) => props.theme.container} {
      width:calc(100vw*(1100/1436));
    }
  @media ${(props) => props.theme.mobile} {
      width:100%;
    }
`
const Imgbox = styled.div`
  width:100%;
  padding:0 40px;
  @media ${(props) => props.theme.container} {
      padding:0 calc(100vw*(40/1436));
    }
  @media ${(props) => props.theme.mobile} {
      width:100%;
      padding:0;
    }
`
const SwipeImg = styled.img`
  width:100%;
  height:700px;
  @media ${(props) => props.theme.container} {
      height:calc(100vw*(800/1436));
    }
  @media ${(props) => props.theme.mobile} {
      height:auto;
    }
`
