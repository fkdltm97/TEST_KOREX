//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap-tabs';

//css
import styled from "styled-components"
import 'swiper/swiper-bundle.css';

//img
import Arrow from "../../../../img/map/filter_next.png";
import Detail from "../../../../img/map/detail_img.png";
import Trade from "../../../../img/map/trade.png";
import Report from "../../../../img/map/report.png";
import Change from "../../../../img/member/change.png";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';


// components
import { Mobile, PC } from "../../../../MediaQuery";

SwiperCore.use([Navigation, Pagination]);
// export default function SideItemDetail({openBunyang, rank, updatePageIndex,historyInfo,setMap}) {
export default function SideItemDetail({area, isArea, areaIndex, setAreaIndex, isWidth}) {

    return (
        <Container>
            <DanjiWidthList>
              <SwiperBennerWrap className="danji_swiper">
 
                      {
                        isArea&&
                        <Swiper
                          slidesPerView={6}
                          loop={false}
                          autoplay={true}
                          onSlideChange={() => console.log('slide change')}
                          onSwiper={(swiper) => console.log(swiper)}>
                          {
                            area.map((value, index) => {
                              return(
                                <SwiperSlide key={index}>
                                  <Width active={areaIndex == value.w_id} onClick={()=>{setAreaIndex(value.w_id)}}>{isWidth?`${value.width}m²`:`${value.widthPyeong}평`}</Width>
                                  <Line active={areaIndex == value.w_id} onClick={()=>{setAreaIndex(value.w_id)}}/>
                                </SwiperSlide>
                              )
                            })
                          }
                        </Swiper>
                      }
              </SwiperBennerWrap>
            </DanjiWidthList>
        </Container>
  );
}

const Container = styled.div `
  width:100%;
`
const DanjiWidthList = styled.div`
  width:100%;
  margin-top:35px;
  padding:0 22px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(35/428));
    padding:0 calc(100vw*(20/428));
  }
`
const SwiperBennerWrap = styled.div`
`
const Width = styled.p`
  position:Relative;
  font-size:14px;font-weight:600;color:#707070;
  padding-bottom:22px;
  transform:skew(-0.1deg);
  cursor:pointer;
  text-align:center;
  transition:all 0.3s;
  color:${({active}) => active ? "#01684b" : "#707070"};
  font-weight:${({active}) => active ? 800 : 600};
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-bottom:0 calc(100vw*(22/428));
  }
`
const Line = styled.p`
  position:absolute;
  width:100%;
  height:3px;
  bottom:0;left:50%;transform:translateX(-50%);
  display:block;content:'';background:#01684b;
  transition:all 0.2s;
  opacity:${({active}) => active ? 1 : 0};
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(3/428));
  }
`
