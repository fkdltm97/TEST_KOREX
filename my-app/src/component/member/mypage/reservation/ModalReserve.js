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

//server process
import serverController from '../../../../server/serverController';

export default function ModalReserve({setReservationId, except_datelist, result_usedatalist, reserve,setReserve, sendInfo_local}) {
  //시간 셀렉트박스
  const [timeSelect,setTimeSelect] = useState(false);
  const [selectDay,setSelectDay] = useState(null);
  const [timeList,setTimeList] = useState([]);
  const [tourid,setTourid] = useState('');
  const [tourtype,setTourtype] = useState('');

  const showSelect = ()=>{setTimeSelect(!timeSelect);}
 
  const [activeIndex,setActiveIndex] = useState(0);  //slick slider setting

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };

  console.log('=>>>>modalReserver모달 예약모달창 실행>>:',except_datelist,result_usedatalist);
  //console.log(except_datelist);
  //console.log(result_usedatalist);
  
  const change_dateEvent = async (date,setTimes,tour_id,tour_type) => {
    console.log('클릭한 선택 날짜, 선택 index값',date,setTimes, activeIndex, tour_id, tour_type);

    setSelectDay(date);
    //setTimeList(setTimes.split(','));
    setTourid(tour_id);
    setTourtype(tour_type);

    //change_dateEvent 클릭한 날짜에 대한 tour_id값구해서 그 아이디에 대해서 쿼리진행한다. 해당하는 투어디테일리스트 가져온다.
    let body_info={
      tour_id_val : tour_id
    };
    let res= await serverController.connectFetchController('/api/broker/brokerProduct_tourid_tourdetailList','POST',JSON.stringify(body_info));
    console.log('server request result:',res);

    var tdDetail_list=[];
    for(var ss=0; ss<res['result_data'].length; ss++){
      let result_data_item=res['result_data'][ss];
      tdDetail_list[ss] ={};
      tdDetail_list[ss]['td_text'] = result_data_item['td_text'];
    
      var tdDetail_starttime_val; var tdDetail_endtime_val;
      if(tdDetail_list[ss]['td_text'] == '오전 1T' || tdDetail_list[ss]['td_text']=='오전1T'){
         tdDetail_starttime_val = '9:00am';
         tdDetail_endtime_val = '12:00pm';
      }else if(tdDetail_list[ss]['td_text'] == '오후 1T' || tdDetail_list[ss]['td_text'] == '오후1T'){
        tdDetail_starttime_val = '12:00pm';
        tdDetail_endtime_val = '15:00pm';
      }else if(tdDetail_list[ss]['td_text'] == '오후 2T' || tdDetail_list[ss]['td_text'] == '오후2T'){
        tdDetail_starttime_val = '15:00pm';
        tdDetail_endtime_val = '18:00pm';
      }
      tdDetail_list[ss]['tour_id'] = result_data_item['tour_id'];
      tdDetail_list[ss]['td_id'] = result_data_item['td_id'];//몇번 timeDetail인지.
      tdDetail_list[ss]['td_starttime'] = tdDetail_starttime_val;
      tdDetail_list[ss]['td_endtime'] = tdDetail_endtime_val;
    }
    console.log('==>>>>tdDetail_list:',tdDetail_list);
    setTimeList(tdDetail_list);
  }
  if(reserve == false)
    return null;
    return (
        <Container>
          <WrapModalMap>
              <WrapTourDate>
                <TourTitle>투어일시</TourTitle>
                  <Slider {...settings} className="about">
                    {
                      result_usedatalist.map((value , index) => {
                       // console.log('=>>>>>result_useitemList:',value,index);

                        return(
                          <SlickSlide className="slide__one">
                            <Link>
                              <WrapDateItem>
                                <DateItem active={activeIndex == index} onClick={() => { change_dateEvent(value['date'],value['setTimes'],value['tour_id'],value['tour_type']); setActiveIndex(index)}}>
                                    <Day>{value['date_yoil']}({value['tour_type']=='1'?'일반':'특별'})</Day>
                                    <Date>{value['date_day']}</Date>
                                </DateItem>
                              </WrapDateItem>
                            </Link>
                          </SlickSlide>
                        )
                        
                      })
                    }
                    {/*<SlickSlide className="slide__one">
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
                    </SlickSlide>*/}

                  </Slider>
                </WrapTourDate>
                <FilterBox>
                  <FilterSelectSort>
                    <FilterSelectSortList id='select_setTimes' onChange={(e)=>{ 
                      console.log('=>>>시간대선택변화 중요데이터 지정여부>>');
                      console.log('>>>selectaday(선택날짜):',selectDay);
                      console.log('>>>timelist(선택시간대들):',timeList);
                      console.log('>>>>tourid, tourtype:',tourid,tourtype);

                      setReservationId({selectDate:selectDay,selectTime:e.target.value, selectTourid:tourid, selectTourtype: tourtype}); //reserationId state변수객체가 바로 갱신되지 않은 상태에서 서버에 insert가해질 가능성 빈도수 꽤 있음.50%
                      sendInfo_local(selectDay,e.target.value,tourid,tourtype);//선택날짜,선택시간대,투어아이디,투어타입 등 전송한다.직접전송.
                      setTimeSelect(e.target.value);
                    }}>
                      <InOption selected disabled>시간을 선택해주세요.</InOption>
                      {
                        timeList.map((value)=>{
                          console.log('value hmm:',value);
                          return  <InOption value={value}>{value}</InOption>
                        })
                      }
                    </FilterSelectSortList>
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
const Date = styled(Day)`
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

`
const FilterSelectCondition = styled(FilterSelectSort)`
  z-index:99;
`
const FilterSelectSortList = styled.select`
  width:100%;
  height:43px;
  text-align-last:center;
  font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
  border-radius:4px;border:1px solid #a3a3a3;
  background:#fff;
  appearance:none;
  background:url(${ArrowDown}) no-repeat 400px center;background-size:11px;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(14/428));
    height:calc(100vw*(43/428));
    background:url(${ArrowDown}) no-repeat 90% center;background-size:calc(100vw*(11/428));
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
