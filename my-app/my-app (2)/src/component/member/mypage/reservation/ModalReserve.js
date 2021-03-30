//react
import React ,{Component ,useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Slider from "react-slick";

//css
import styled from "styled-components"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



//img
import Filter from '../../../../img/member/filter.png';
import Bell from '../../../../img/member/bell.png';
import BellActive from '../../../../img/member/bell_active.png';
import Location from '../../../../img/member/loca.png';
import Set from '../../../../img/member/setting.png';
import Item from '../../../../img/main/item01.png';
import Noimg from '../../../../img/main/main_icon3.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';



export default function ModalMapReserve({ reserve, setReserve }) {
  //시간 셀렉트박스
  const [timeSelect,setTimeSelect] = useState(false);
  const showSelect = ()=>{
    setTimeSelect(!timeSelect);
  }
  const [activeIndex,setActiveIndex] = useState(0);  //slick slider setting

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
            <ModalMapBg onClick={()=>{setReserve(false)}}/>
            <ModalMap>
              <MapCloseBtn>
                <Link onClick={()=>{setReserve(false)}}>
                  <MapCloseImg src={Close}/>
                </Link>
              </MapCloseBtn>
              <ModalMapTitle>물건투어예약</ModalMapTitle>
              <WrapTourDate>
                <TourTitle>투어일시</TourTitle>
                  <Slider {...settings} className="about">
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 0} onClick={()=>{setActiveIndex(0)}}>
                            <Day>금</Day>
                            <Date>22</Date>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 1} onClick={()=>{setActiveIndex(1)}}>
                            <Day>토</Day>
                            <Date>23</Date>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 2} onClick={()=>{setActiveIndex(2)}}>
                            <Day>일</Day>
                            <Date>24</Date>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 3} onClick={()=>{setActiveIndex(3)}}>
                            <Day>월</Day>
                            <Date>25</Date>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 4} onClick={()=>{setActiveIndex(4)}}>
                            <Day>화</Day>
                            <Date>26</Date>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                    <SlickSlide className="slide__one">
                      <Link>
                        <WrapDateItem>
                          <DateItem active={activeIndex == 5} onClick={()=>{setActiveIndex(5)}}>
                            <Day>수</Day>
                            <Date>27</Date>
                          </DateItem>
                        </WrapDateItem>
                      </Link>
                    </SlickSlide>
                  </Slider>
                </WrapTourDate>
              <WrapTourTimeSelect>
                <TourTimeSelect>
                  <Link onClick={showSelect}>
                    <Option>시간을 선택해주세요.</Option>{/*이부분에 선택한 항목이 나와야 할 것 같습니다..*/}
                    {
                      timeSelect ?
                      <TourSelectList>
                        <InOption>오전 1T(09:00 ~ 12:00)</InOption>
                        <InOption>오전 1T(09:00 ~ 12:00)</InOption>
                        <InOption>오전 1T(09:00 ~ 12:00)</InOption>
                      </TourSelectList>
                      :
                      null
                    }

                  </Link>
                </TourTimeSelect>
              </WrapTourTimeSelect>
            {/*수정버튼*/}
              <ReserveButton>
                <EditButton type="submit" name="">수정</EditButton>
              </ReserveButton>
            </ModalMap>
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
  width:535px;height:520px;border-radius:24px;
  border:1px solid #f2f2f2;
  background:#fff;
  padding:49px 50px 60px 50px;
  z-index:3;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(395/428));
    height:calc(100vw*(458/428));
    padding:calc(100vw*(33/428)) calc(100vw*(15/428));
  }
`
const MapCloseBtn = styled.div`
  width:100%;text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(22/428));
  }
`
const MapCloseImg = styled.img`
  display:inline-block;width:15px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(12/428));
  }
`
const ModalMapTitle = styled.h3`
  font-size:20px;font-weight:800;color:#707070;
  transform:skew(-0.1deg);
  padding-bottom:20px;
  border-bottom:1px solid #707070;
  @media ${(props) => props.theme.mobile} {
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
  @media ${(props) => props.theme.mobile} {
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
  @media ${(props) => props.theme.mobile} {
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
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(9/428));
    margin-bottom:calc(100vw*(5/428));
  }
`
const Date = styled(Day)`
  color:#4a4a4a;
  margin-bottom:0;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
  }
`
const WrapTourTimeSelect = styled.div`
  position:Relative;
  width:100%;
`
const TourSelectList = styled.div`
  width:100%;
  height:80px;
  overflow-y:scroll;
  z-index:99;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(80/428));
  }
`
const TourTimeSelect= styled.div`
position:Absolute;
top:50px;
width:100%;
text-align:center;
font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
border-radius:4px;border:1px solid #a3a3a3;
background:#fff url(${ArrowDown}) no-repeat 400px 16px; background-size:100% 100% 13px 8px;
z-index:9999;
@media ${(props) => props.theme.mobile} {
  top:calc(100vw*(50/428));
  font-size:calc(100vw*(14/428));
  background:#fff url(${ArrowDown}) no-repeat calc(100vw*(320/428)) calc(100vw*(16/428)); background-size:100% 100% calc(100vw*(13/428)) calc(100vw*(8/428));
}
`
const Option = styled.div`
  padding:12px 0;
  text-align:center;
  cursor:pointer;
  transition:all 0.3s;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(12/428)) 0;
  }

`
const InOption = styled(Option)`
  padding:8px 0;
  background:#fff;
  &:hover{background:#f8f7f7;}
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(8/428)) 0;
  }
`
const ReserveButton = styled.div`
  position:relative;
  width:100%;
`
const EditButton = styled.button`
  position:absolute;
  top:160px;left:50%;transform:translateX(-50%) skew(-0.1deg);
  width:100%;height:66x;line-height:60px;
  border-radius: 11px;
  border:solid 3px #e4e4e4;
  background: #979797;
  color:#fff;font-size:20px;font-weight:800;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(160/428));
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
  }
`
