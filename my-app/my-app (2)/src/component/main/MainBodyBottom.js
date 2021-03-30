//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';


//css
import styled from "styled-components"
import 'swiper/swiper-bundle.css';

//Img
import MainTopImg from '../../img/main/main_top.png';
import IconSearch from '../../img/main/icon_search.png';
import SwiperImg from '../../img/main/img01.png'
import PCLogo from '../../img/main/pc_header_logo.png';

SwiperCore.use([Navigation, Pagination]);
export default function MainBody() {
    return (
        <Container>
          <MainBodyBottom>
              <SwiperBennerWrap className="main_swiper">
                  <Swiper
                    spaceBetween={5}
                    slidesPerView={1}
                    loop={true}
                    autoplay={true}
                    navigation
                    pagination={{ clickable: true }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                  <SwiperSlide>
                    <ItemWrap>
                      <Img src={SwiperImg} alt="img"/>
                      <Wraptxt>
                        <Txt>우리의</Txt>
                        <Txt><Orange>사랑</Orange>은</Txt>
                        <Txt><Green>전속</Green>입니다.</Txt>
                        <LogoImg src={PCLogo}/>
                      </Wraptxt>
                    </ItemWrap>
                  </SwiperSlide>
                  <SwiperSlide>
                    <ItemWrap>
                      <Img src={SwiperImg} alt="img"/>
                      <Wraptxt>
                        <Txt>우리의</Txt>
                        <Txt><Orange>사랑</Orange>은</Txt>
                        <Txt><Orange>전속</Orange>입니다.</Txt>
                        <LogoImg src={PCLogo}/>
                      </Wraptxt>
                    </ItemWrap>
                  </SwiperSlide>
                </Swiper>
            </SwiperBennerWrap>
          </MainBodyBottom>
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
  width:935px;
  margin:0 auto 0;
  backround:beige;
  padding-bottom:203px;
  @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(360/428));
        padding-bottom:0;
    }
`
const MainBodyBottom = styled.div`
  width:100%;
`
const SwiperBennerWrap = styled.div`
  width:100%;
`
const ItemWrap = styled.div`
  width:800px;
  margin:0 auto;
  padding: 0 35px;
  box-sizing:border-box;
  border-radius:9px;
  @media ${(props) => props.theme.mobile} {
      width:100%;
      padding:calc(100vw*(20/428));
    }
`
const Img = styled.img`
  width:100%;
  @media ${(props) => props.theme.mobile} {
    width:100%;
    height: calc(100vw*(220/428));
    object-fit: cover;
    border-radius: 10px;
    }
`
const Wraptxt = styled.div`
  position:absolute;
  left:192px;
  top:50%;transform:translateY(-50%);
  @media ${(props) => props.theme.mobile} {
        display:none;
    }
`
const Txt = styled.p`
  font-size:33px;
  color:#4a4a4a;
  font-weight:800;
  transform:skew(-0.1deg);
`
const Orange = styled(Txt)`
  display:inline-block;
  color:#fe7a01;
`
const Green = styled(Txt)`
  display:inline-block;
  color:#01684b;
`
const LogoImg = styled.img`
  display:inline-block;
  width:153px;
  margin-top:13px;
`
