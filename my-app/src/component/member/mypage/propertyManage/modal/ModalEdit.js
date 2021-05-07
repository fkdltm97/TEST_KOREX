//react
import React ,{Component ,useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Slider from "react-slick";

//css
import styled from "styled-components"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



//img
import ArrowDown from '../../../../../img/member/arrow_down.png';

import DatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";


export default function ModalMapReserve({ reserve, setReserve }) {
  //시간 셀렉트박스
  const [timeSelect,setTimeSelect] = useState(false);
  const showSelect = ()=>{
    setTimeSelect(!timeSelect);
  }
  const [activeIndex,setActiveIndex] = useState(0);  //slick slider setting

  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 30), 16)
  );

  const [Interval, setInterval] = useState(30); //간격 값 저장


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  if(reserve == false)
    return null;
    return (
        <Container>
          <WrapModalMap>
              <WrapTourDate>
                <TourTitle>투어일시</TourTitle>
                  <Slider {...settings} className="about">
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 0} onClick={()=>{setActiveIndex(0)}}>
                            <Day>금</Day>
                            <DateDay>22</DateDay>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 1} onClick={()=>{setActiveIndex(1)}}>
                            <Day>토</Day>
                            <DateDay>23</DateDay>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 2} onClick={()=>{setActiveIndex(2)}}>
                            <Day>일</Day>
                            <DateDay>24</DateDay>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 3} onClick={()=>{setActiveIndex(3)}}>
                            <Day>월</Day>
                            <DateDay>25</DateDay>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 4} onClick={()=>{setActiveIndex(4)}}>
                            <Day>화</Day>
                            <DateDay>26</DateDay>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 5} onClick={()=>{setActiveIndex(5)}}>
                            <Day>수</Day>
                            <DateDay>27</DateDay>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                  </Slider>
                </WrapTourDate>
                <FilterBox>
                  <FilterSelectSort>
                    <FilterSelectSortList>
                      <InOption disabled>시간을 선택해주세요.</InOption>
                      <InOption>오전 1T(09:00 ~ 12:00)</InOption>
                      <InOption>오전 1T(09:00 ~ 12:00)</InOption>
                      <InOption>오전 1T(09:00 ~ 12:00)</InOption>
                    </FilterSelectSortList>
                  </FilterSelectSort>
                </FilterBox>
                <FilterBox>
                  <FilterSelectSort>
                    {/* <FilterSelectShort>
                      <InOption disabled selected>시</InOption>
                      <InOption>10</InOption>
                      <InOption>11</InOption>
                      <InOption>12</InOption>
                    </FilterSelectShort>
                    <FilterSelectShort>
                      <InOption disabled selected>분</InOption>
                      <InOption>10</InOption>
                      <InOption>11</InOption>
                      <InOption>12</InOption>
                    </FilterSelectShort> */}

              <Time>
                  <DatePicker className="date_time"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={Interval} //간격 설정
                    timeCaption="Time"
                    dateFormat="h:mm aa" // 시간 타입(보여주는)
                    minTime={setHours(setMinutes(new Date(), 0), 0)} //시작 시간 세팅
                    maxTime={setHours(setMinutes(new Date(), 0), 23)} // 종료 시간 세팅
                  />
             </Time>
             <Time>
                  <DatePicker className="date_time"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={Interval} //간격 설정
                    timeCaption="Time"
                    dateFormat="h:mm aa" // 시간 타입(보여주는)
                    minTime={setHours(setMinutes(new Date(), 0), 0)} //시작 시간 세팅
                    maxTime={setHours(setMinutes(new Date(), 0), 23)} // 종료 시간 세팅
                  />
              </Time> 


                  </FilterSelectSort>
                </FilterBox>
          </WrapModalMap>
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
    width:100%;
`

const WrapModalMap = styled.div`
  width:100%;
`
const ModalMapBg = styled.div`
  width:100%;height:100%;
  position:fixed;left:0;top:0;
  background:rgba(0,0,0,0.2);
  display:block;content:'';
  z-index:2;
`
const ModalMap = styled.div`
  position:absolute;
  left:50%;top:50%;transform:translate(-50%,-50%);
  width:535px;border-radius:24px;
  border:1px solid #f2f2f2;
  background:#fff;
  padding:49px 50px 60px 50px;
  z-index:3;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(395/428));
    padding:calc(100vw*(33/428)) calc(100vw*(15/428));
  }
`
const MapCloseBtn = styled.div`
  width:100%;text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(22/428));
  }
`
const MapCloseImg = styled.img`
  display:inline-block;width:15px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(12/428));
  }
`
const ModalMapTitle = styled.h3`
  font-size:20px;font-weight:800;color:#707070;
  transform:skew(-0.1deg);
  padding-bottom:20px;
  border-bottom:1px solid #707070;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(15/428));
    padding-bottom:calc(100vw*(15/428));
  }
`
const WrapTourDate = styled.div`
  width:100%;
`
const TourTitle = styled.div`
  margin:12px 0 8px;
  font-size:12px;color:#4a4a4a;
  font-family:'nbg',sans-serif;
  @media ${(props) => props.theme.modal} {
    margin:calc(100vw*(14/428)) calc(100vw*(9/428));
    font-size:calc(100vw*(12/428));
  }
`
const SwiperBennerWrap = styled.div`
  width:100%;
`

const SlickSlide = styled.div`

  `
const WrapDateItem = styled.div`
`
const DateItem = styled.div`
  width:59px;height:59px;
  border-radius:4px;border:1px solid #e4e4e4;
  text-align:center;
  padding:10px 0;
  border:${({active}) => active ? "1px solid #707070" : "1px solid #e4e4e4"};
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(53/428));
    height:calc(100vw*(53/428));
    padding:calc(100vw*(10/428)) 0;
  }


`
const Day = styled.h4`
  font-size:12px;
  font-weight:800;transform:skew(-0.1deg);
  color:#979797;
  margin-bottom:5px;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(9/428));
    margin-bottom:calc(100vw*(5/428));
  }
`
const DateDay = styled(Day)`
  color:#4a4a4a;
  margin-bottom:0;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(14/428));
  }
`
const FilterBox = styled.div`
  position:relative;
  width:100%;
  margin:40px 0;
  @media ${(props) => props.theme.modal} {
    margin:calc(100vw*(40/428)) 0;
  }
`
const FilterLabel = styled.label`
  display:inline-block;
  font-size:12px;color:#4a4a4a;
  transform:skew(-0.1deg);
  font-family:'nbg', sans-serif;
  margin-bottom:9px;
  padding-left:3px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(9/428));
    font-size:calc(100vw*(12/428));
    padding-left:calc(100vw*(3/428));
  }
`
const FilterSelectSort = styled.div`
  width:100%;
  display:flex;justify-content:space-between;align-items:center;
`
const Time = styled.div`
  width:210px;height:43px;position:relative;z-index:2;
  text-align:center;font-size:15px;transform:skew(-0.1deg);
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(170/428));
    font-size:calc(100vw*(15/428));
    height:calc(100vw*(43/428));
  }
`
const FilterSelectSortList = styled.select`
  width:100%;
  height:43px;
  text-align-last:center;
  font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
  border-radius:4px;border:1px solid #e4e4e4;
  background:#fff;
  appearance:none;
  background:url(${ArrowDown}) no-repeat 90% center;background-size:11px;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(14/428));
    height:calc(100vw*(43/428));
    background:url(${ArrowDown}) no-repeat 90% center;background-size:calc(100vw*(11/428));
  }
`
const FilterSelectShort = styled(FilterSelectSortList)`
  width:210px;
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(170/428));
  }
`
const Option = styled.option`
  font-family:'nbg',sans-serif;

`
const InOption = styled(Option)`
  padding:8px 0;
  background:#fff;
  &:hover{background:#f8f7f7;}
  @media ${(props) => props.theme.modal} {
    padding:calc(100vw*(8/428)) 0;
  }
`
