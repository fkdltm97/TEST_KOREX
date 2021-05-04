//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Slider from "react-slick";

//css
import styled from "styled-components"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

//img
import NavIcon from '../../../img/main/nav_btn.png';
import Logo from '../../../img/main/header_logo.png';
import PCLogo from '../../../img/main/pc_header_logo.png';
import Mypage from '../../../img/main/mypage_icon.png';
import FilterClose from '../../../img/map/filter_close.png';
import FilterDown from '../../../img/map/filter_down_arrow.png';

// components
import { Mobile, PC } from "../../../MediaQuery";
import FilterTopButton from "./FilterTopButton";
import ApartFilter from "./filter/ApartFilter";
import OfficetelFilter from "./filter/OfficetelFilter";
import StoreAndOfficeFilter from "./filter/StoreAndOfficeFilter";
import FilterCloseAndReset from "./FilterCloseAndReset";

// redux
import { MapFilterRedux } from '../../../store/actionCreators';
import { useSelector } from 'react-redux';

export default function MapFilter({status}) {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1,
    centeredSlides:false,
  };
  const [open,setOpen] = useState(false);
  const [openDetail,setOpenDetail] = useState(false);
  const mapFilterRedux = useSelector(state=>{ return state.mapFilter});
  const [isApart, setIsApart] = useState(false);
  const [isOfficetel, setIsOfficetel] = useState(false);
  const [isStore, setIsStore] = useState(false);
  const filterWrap = document.querySelector("#filterWrap");
  let preventBubbling = false;

  // 필터 redux 초기화
  useEffect(() => {
    let filterData = JSON.parse(localStorage.getItem("filterData"));
    if(filterData){
      MapFilterRedux.updateFilterArr({  filterArr: filterData });
      return;
    }
    const data = JSON.parse(JSON.stringify(mapFilterRedux.filterArr));
    data.prd_sel_type=["매매"];
    data.switchArr = [];
    data.life_facilites = [];
    data.floor = "전체";
    data.use = "전체";
    data.purpose = "전체";
    data.room = ["전체"];
    data.double = "전체";
    data.pet = "전체";
    data.roomApart = "전체";
    data.bath = "전체";
    data.danji = "전체";
    data.priceRange = "전체";
    data.manaRange = "전체";
    data.areaRange = "전체";
    data.jeonseRange = "전체";
    data.monthlyRange = "전체";
    MapFilterRedux.updateFilterArr({  filterArr: data });
  }, [])

  const padding=()=>{
    if(open == true) {
      return "calc(100vw*(6/428)) calc(100vw*(10/428)) calc(100vw*(80/428))"
    }else{
      return "calc(100vw*(6/428)) calc(100vw*(10/428)) 0"
    }
  }

  useEffect(() => {
    const filterList = document.querySelector(".filterList");
    const downArrow = document.querySelector(".downArrow");
    if(open){
      filterList.classList.remove("hidden");
      downArrow.classList.add("hidden");
    }else{
      filterList.classList.add("hidden");
      downArrow.classList.remove("hidden");
    }
  }, [open])

  // 거래유형 텍스트 
  const typeText = () => {
    const data = mapFilterRedux.filterArr;
    let text = data.prd_sel_type[0];
    for(let i = 1 ; i < data.prd_sel_type.length ; i++){
      text = text + ", " + data.prd_sel_type[i]
    }
    return <>{text}</>
  }

  // 매매
  const priceRangeText = () => {
    const data = mapFilterRedux.filterArr.priceRange;
    if(data=="전체"){
      return;
    }
    return(
      <SlickSlide className="slide__one"  onClick={()=>scrollToClick("priceWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="priceRange" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 관리비 
  const manaRangeText = () => {
    const data = mapFilterRedux.filterArr.manaRange;
    if(data=="전체"){
      return;
    }
    return(
      <SlickSlide className="slide__one"  onClick={()=>scrollToClick("manaWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="manaRange" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 면적 (공급면적)
  const areaRangeText = () => {
    const data = mapFilterRedux.filterArr.areaRange;
    if(data=="전체"){
      return;
    }
    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("areaWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="areaRange" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 보증금(전세금)
  const jeonseRangeText = () => {
    const data = mapFilterRedux.filterArr.jeonseRange;
    if(data=="전체"){
      return;
    }
    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("jeonseWrap")} >
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="jeonseRange" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 월세 
  const monthlyRangeText = () => {
    const data = mapFilterRedux.filterArr.monthlyRange;
    if(data=="전체"){
      return;
    }
    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("monthlyWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="monthlyRange" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 옵션
  const optionText = () => {
    const data = mapFilterRedux.filterArr.life_facilites;
    let text = "";
    if(data.length == 0){return;}
    text =  data[0];
    for(let i = 1 ; i < data.length ; i++){
      text = text + ", " + data[i]
    }
    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("optionWrap")}>
      <Link>
        <FliterEa>
          {text}
          <CloseFilter data-type="option" onClick={(e) => {onClickClose(e)}}/>
        </FliterEa>
      </Link>
    </SlickSlide>
    )
  }

  // 사용승일일
  const useText = () => {
    const data = mapFilterRedux.filterArr.use;

    if(data=="전체"){
      return;
    }

    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("useWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="use" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 층수
  const floorText = () => {
    const data = mapFilterRedux.filterArr.floor;
    if(data=="전체"){
      return;
    }

    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("floorWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="floor" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }
  
  // 용도
  const purposeText = () => {
    const data = mapFilterRedux.filterArr.purpose;
    console.log(isOfficetel);
    if(data=="전체" || !isOfficetel){
      return;
    }

    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("purposeWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="purpose" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }
  
  // 방구조
  const roomText = () => {
    const data = mapFilterRedux.filterArr.room;
    if(data[0]=="전체" || !isOfficetel){
      return;
    }

    let text = "";
    text = data[0];
    for(let i = 1 ; i < data.length ; i++){
      text = text + ", " + data[i]
    }

    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("roomWrap")}>
        <Link>
          <FliterEa>
            {text}
            <CloseFilter data-type="room" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 복층 여부
  const doubleText = () => {
    const data = mapFilterRedux.filterArr.double;
    if(data=="전체" || !isOfficetel){
      return;
    }

    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("doubleWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="double" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 반려동물
  const petText = () => {
    const data = mapFilterRedux.filterArr.pet;
    if(data=="전체" || !isOfficetel){
      return;
    }

    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("petWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="pet" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 방수
  const roomApartText = () => {
    const data = mapFilterRedux.filterArr.roomApart;
    if(data=="전체" || !isApart){
      return;
    }

    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("roomWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="roomApart" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 욕실
  const bathText = () => {
    const data = mapFilterRedux.filterArr.bath;
    if(data=="전체"){
      return;
    }

    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("toiletWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="bath" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 아파트 총세대수
  const danjiText = () => {
    const data = mapFilterRedux.filterArr.danji;
    if(data=="전체" || !isApart){
      return;
    }

    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("danjiWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="danji" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 필터 삭제
  const onClickClose = (e) => {
    preventBubbling = true;
    setTimeout(() => {
      preventBubbling = false;
    }, 300)
    const data = mapFilterRedux.filterArr;
    const text = e.target.dataset.text;
    const type = e.target.dataset.type;
    if(type == "switch"){
      data.switchArr = data.switchArr.filter(item => item != text);
      document.querySelector(`input[data-text='${text}']`).checked = false;
    }
    else if(type == "option"){
      const option = document.querySelectorAll(`input[name='option']`);
      for(let i = 0 ; i < option.length ; i++){
        option[i].checked = false;
      }
      data.life_facilites = [];
    }
    else if(type == "use"){
      data.use = "전체";
      const use = document.querySelectorAll(`input[name='use']`);
      use[0].checked = true;
    }
    else if(type == "floor"){
      data.floor = "전체";
      const floor = document.querySelectorAll(`input[name='floor']`);
      floor[0].checked = true;
    }
    else if(type == "purpose"){
      data.purpose = "전체";
      const purpose = document.querySelectorAll(`input[name='purpose']`);
      purpose[0].checked = true;
    }
    else if(type == "room"){
      data.room = ["전체"];
      const room = document.querySelectorAll(`input[name='room']`);
      for(let i = 0 ; i < room.length ; i++){
        room[i].checked = false;
      }
      room[0].checked = true;
    }
    else if(type == "double"){
      data.double = "전체";
      const double = document.querySelectorAll(`input[name='double']`);
      double[0].checked = true;
    }
    else if(type == "pet"){
      data.pet = "전체";
      const pet = document.querySelectorAll(`input[name='pet']`);
      pet[0].checked = true;
    }
    else if(type == "roomApart"){
      data.roomApart = "전체";
      const roomApart = document.querySelectorAll(`input[name='roomApart']`);
      roomApart[0].checked = true;
    }
    else if(type == "bath"){
      data.bath = "전체";
      const bath = document.querySelectorAll(`input[name='bath']`);
      bath[0].checked = true;
    }
    else if(type == "danji"){
      data.danji = "전체";
      const danji = document.querySelectorAll(`input[name='danji']`);
      danji[0].checked = true;
    }
    else if(type == "priceRange"){
      data.priceRange = "전체";
      data.priceRangeValue = [0, 100];
    }
    else if(type == "manaRange"){
      data.manaRange = "전체";
      data.manaRangeValue = [0, 75];
    }
    else if(type == "areaRange"){
      data.areaRange = "전체";
      data.areaRangeValue = [0, 100];
    }
    else if(type == "jeonseRange"){
      data.jeonseRange = "전체";
      data.jeonseRangeValue = [0, 30];
    }
    else if(type == "monthlyRange"){
      data.monthlyRange = "전체";
      data.monthlyRangeValue = [0, 18];
    }
    localStorage.setItem( "filterData", JSON.stringify(data) );
    MapFilterRedux.updateFilterArr({  filterArr: data });
  }

  // 클릭 시 스크롤 이동
  const scrollToClick = (id) => {
    if(preventBubbling){ return; }
    const value = document.querySelector(`#${id}`);
    const optionList = document.querySelector(".optionList");
    setOpenDetail(true);
    optionList.classList.remove("hidden");
    setTimeout(() => {
      filterWrap.scrollTop = value.getBoundingClientRect().y-100;
    }, 100)
  }
  
  useEffect(() => {
    // const [isApart, setIsApart] = useState(false);
    // const [isOfficetel, setIsOfficetel] = useState(false);
    // const [isStore, setIsStore] = useState(false);
    setIsApart(false);
    setIsOfficetel(false);
    setIsStore(false);
    if(status == "apart"){
      setIsApart(true);
    }else if(status == "officetel"){
      setIsOfficetel(true);
    }else{
      setIsStore(true);
    }
  }, [status]);

    return (
        <Container>
        <WrapFilter padding={padding} id="filterWrap">
          <SliderWrap>
           <Slider {...settings} className="filter_slick">
            {/* 거래 유형 */}
            <SlickSlide className="slide__one">
              <Link>
                <FliterEa>
                  {typeText()}
                </FliterEa>
              </Link>
            </SlickSlide>

            {/* 공통 */}
            {priceRangeText()}
            {jeonseRangeText()}
            {monthlyRangeText()}
            {manaRangeText()}
            {areaRangeText()}
            {floorText()}
            
            {
              mapFilterRedux.filterArr.switchArr.length !== 0 &&
              mapFilterRedux.filterArr.switchArr.map((item, index) => {
                let el = ""
                if(item == "전용화장실"){
                  el="toiletWrap";
                }else if(item == "관리비없음"){
                  el="manaWrap";
                }else{
                  el="parkWrap";
                }
                return(
                  <SlickSlide key={index} className="slide__one" onClick={()=>scrollToClick(el)}>
                    <Link>
                      <FliterEa>
                        {item}
                        <CloseFilter data-type="switch" data-text={item} onClick={(e) => {onClickClose(e)}}/>
                      </FliterEa>
                    </Link>
                  </SlickSlide>
                )
              })
            }


            {roomApartText()}
            {danjiText()}
            {bathText()}

            
            
            

            {purposeText()}
            {roomText()}
            {doubleText()}
            {petText()}



            {/* 공통 */}
            {optionText()}
            {useText()}
          </Slider>

          </SliderWrap>
           
          <FilterList className={["filterList", "hidden"]}>
              <FilterTopButton/>
              {/*<ApartFilter/>*/}
              {/* <OfficetelFilter/> */}
              <StoreAndOfficeFilter status={status} open={openDetail} setOpen={setOpenDetail}/>
              <FilterCloseAndReset setOpen={setOpen}/>
            </FilterList>
        
          <FilterDownArrow className="downArrow" onClick={() => {setOpen(true)}}>
                <Link>
                  <ImgDiv>
                    <DownImg src={FilterDown}/>
                  </ImgDiv>
                </Link>
            </FilterDownArrow>
         </WrapFilter>
        </Container>
  );
}

const Container = styled.div`
`
const None = styled.div`
  display:none;
`
const FilterList = styled.div`
`
const WrapFilter = styled.div`
  & > .hidden {
    display:none;
  }

  position:absolute;
  width: 390px;
  height: auto;
  max-height:85vh;
  padding:15px 20px 0;
  border-radius: 17px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  left:22px;top:26px;
  overflow-y:scroll;
  overflow-x:hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {display: none;}
  @media ${(props) => props.theme.mobile} {
    position:absolute;
    top:0;
    width:100%;
    padding:${({padding}) => padding};
    z-index:3;
    left:0;
    height:auto;
    max-height:100vh;
    border-radius:0;
    box-shadow:none;
    overflow-y:scroll;
  }
`
const SlickSlide = styled.div`
`
const SliderWrap = styled.div`
width:100%;
margin-bottom:16px;
@media ${(props) => props.theme.mobile} {
  margin-bottom:calc(100vw*(8/428));
  padding:0 calc(100vw*(20/428));
}
`
const FliterEa = styled.p`
  position:relative;
  height:30px;
  padding: 6px 10px;
  border-radius: 15px;
  border: solid 1px #e4e4e4;
  background-color: #f8f7f7;
  font-size: 14px;
  font-weight: 800;transform:skew(-0.1deg);
  text-align: center;
  color: #01684b;
  // margin-right:8px;
  text-overflow: ellipsis;
    margin-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    width: 120px;
  // display:inline-block;
  
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(30/428));
    font-size:calc(100vw*(14/428));
    width:auto;
  }
`
const CloseFilter = styled.div`
  display:inline-block;
  position:absolute;right:5px;top:50%;transform:translateY(-50%);
  width:8px;height:8px;
  background:url(${FilterClose}) no-repeat;background-size:100% 100%;
  vertical-align:middle;
  margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(8/428));
    height:calc(100vw*(8/428));
    margin-left:calc(100vw*(5/428));
  }
`
const FilterDownArrow = styled.div`
  width:100%;
`
const ImgDiv = styled.div`
  width:100%;
  text-align:center;
`
const DownImg = styled.img`
  display:inline-block;
  width:16px;
`
