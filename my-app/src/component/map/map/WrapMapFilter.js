//react
import React ,{useState, useEffect, useRef} from 'react';
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
  let uiData = JSON.parse(JSON.stringify(mapFilterRedux.filterUI));
  const filterWrap = document.querySelector("#filterWrap");
  let preventBubbling = false;

  const filterListRef = useRef();
  const downArrowRef = useRef();

  const padding=()=>{
    if(open == true) {
      return "calc(100vw*(6/428)) calc(100vw*(10/428)) calc(100vw*(80/428))"
    }else{
      return "calc(100vw*(6/428)) calc(100vw*(10/428)) 0"
    }
  }

  useEffect(() => {
    if(open){
      filterListRef.current.classList.remove("hidden");
      downArrowRef.current.classList.add("hidden");
    }else{
      filterListRef.current.classList.add("hidden");
      downArrowRef.current.classList.remove("hidden");
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
  const priceRangeText = () => 
  {
    if(uiData.prd_sel_type[0] == 0){return;}
    if(uiData.priceRangeValue[0] == 0 && uiData.priceRangeValue[1] == 100){return};
    const data = mapFilterRedux.filterArr.priceRange;
    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("priceWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="priceRange" className="changeBtn" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 관리비 
  const manaRangeText = () => {
    if(uiData.manaRangeValue[0] == 0 && uiData.manaRangeValue[1] == 75){return};
    const data = mapFilterRedux.filterArr.manaRange;
    return(
      <SlickSlide className="slide__one"  onClick={()=>scrollToClick("manaWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="manaRange" className="changeBtn" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 면적 (공급면적)
  const areaRangeText = () => {
    if(uiData.areaRangeValue[0] == 0 && uiData.areaRangeValue[1] == 100){return};
    const data = mapFilterRedux.filterArr.areaRange;
    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("areaWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="areaRange" className="changeBtn" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 보증금(전세금)
  const jeonseRangeText = () => {
    if(uiData.prd_sel_type[1] == 0 && uiData.prd_sel_type[2] == 0 ){return;}
    if(uiData.jeonseRangeValue[0] == 0 && uiData.jeonseRangeValue[1] == 30){return};
    const data = mapFilterRedux.filterArr.jeonseRange;
    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("jeonseWrap")} >
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="jeonseRange" className="changeBtn" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  // 월세 
  const monthlyRangeText = () => {
    if(uiData.prd_sel_type[2] == 0){return;}
    if(uiData.monthlyRangeValue[0] == 0 && uiData.monthlyRangeValue[1] == 18){return};
    const data = mapFilterRedux.filterArr.monthlyRange;
    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick("monthlyWrap")}>
        <Link>
          <FliterEa>
            {data}
            <CloseFilter data-type="monthlyRange" className="changeBtn" onClick={(e) => {onClickClose(e)}}/>
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
  
  // 방구조
  const roomText = () => {
    const data = mapFilterRedux.filterArr.room;
    if(data[0]=="전체"){
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
            <CloseFilter data-type="room" className="changeBtn" onClick={(e) => {onClickClose(e)}}/>
          </FliterEa>
        </Link>
      </SlickSlide>
    )
  }

  /// 필터 생성
  const filterText = (bool, text, dataType, scroll) => {
    if(!bool){
      return;
  }

    return(
      <SlickSlide className="slide__one" onClick={()=>scrollToClick(scroll)}>
        <Link>
          <FliterEa>
            {text}
            <CloseFilter data-type={dataType} className="changeBtn" onClick={(e) => {onClickClose(e)}}/>
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
    const type = e.target.dataset.type;
    // if(type == "option"){
    //   const option = document.querySelectorAll(`input[name='option']`);
    //   for(let i = 0 ; i < option.length ; i++){
    //     option[i].checked = false;
    //   }
    //   data.life_facilites = [];
    // }
    if(type == "use"){
      data.use = "전체";
      uiData.use = 0;
    }
    else if(type == "floor"){
      data.floor = "전체";
      uiData.floor = 0;
    }
    else if(type == "purpose"){
      data.purpose = "전체";
      uiData.purpose = 0;
    }
    else if(type == "room"){
      data.room = ["전체"];
      uiData.roomOfficetel=[1, 0, 0, 0, 0, 0];
    }
    else if(type == "double"){
      data.double = "전체";
      uiData.double=0;
    }
    else if(type == "pet"){
      data.pet = "전체";
      uiData.pet=0;
    }
    else if(type == "parkBtn"){
      uiData.parkOfficetel=0;
    }
    else if(type == "parkBtnStore"){
      uiData.parkStore=0;
    }
    else if(type == "toiletBtn"){
      uiData.toilet=0;
    }
    else if(type == "roomApart"){
      data.roomApart = "전체";
      uiData.roomApart=0;
    }
    else if(type == "bath"){
      data.bath = "전체";
      uiData.bath=0;
    }
    else if(type == "danji"){
      data.danji = "전체";
      uiData.danji = 0;
    }
    else if(type == "priceRange"){
      data.priceRange = "전체";
      uiData.priceRangeValue=[0,100];
    }
    else if(type == "manaRange"){
      data.manaRange = "전체";
      uiData.manaRangeValue=[0,75];
    }
    else if(type == "manaBtn"){
      uiData.manaStatus=0;
    }
    else if(type == "areaRange"){
      data.areaRange = "전체";
      uiData.areaRangeValue = [0, 100];
    }
    else if(type == "jeonseRange"){
      data.jeonseRange = "전체";
      uiData.jeonseRangeValue=[0,30];
    }
    else if(type == "monthlyRange"){
      data.monthlyRange = "전체";
      uiData.monthlyRangeValue=[0,18];
    }
    MapFilterRedux.updateFilterUI({filterUI:uiData});
    MapFilterRedux.updateFilterArr({filterArr:data});
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

            {filterText(Number(uiData.floor), mapFilterRedux.filterArr.floor, "floor", "floorWrap")}
            {filterText(uiData.manaStatus, "관리비없음", "manaBtn", "manaWrap")}
            

            {/* 아파트 */}
            {filterText(Number(uiData.roomApart), mapFilterRedux.filterArr.roomApart, "roomApart", "roomApartWrap")}
            {filterText(uiData.bath, mapFilterRedux.filterArr.bath, "bath", "toiletWrap")}

            {/* 오피스텔 */}
            {filterText(uiData.purpose, mapFilterRedux.filterArr.purpose, "purpose", "purposeWrap")}
            {roomText()}
            {filterText(uiData.double, mapFilterRedux.filterArr.double, "double", "doubleWrap")}
            {filterText(uiData.parkOfficetel, "주차가능", "parkBtn", "parkWrap")}
            {filterText(uiData.pet, mapFilterRedux.filterArr.pet, "pet", "petWrap")}


            {/* 상가/사무실 */}
            {filterText(uiData.parkStore, "주차가능", "parkBtnStore", "parkStoreWrap")}
            {filterText(uiData.toilet, "전용화장실", "toiletBtn", "toiletWrap")}

            {/* 공통 */}
            {/* {optionText()} */}
            {filterText(uiData.use, mapFilterRedux.filterArr.use, "use", "useWrap")}
            
            {/* 아파트 */}
            {filterText(Number(uiData.danji), mapFilterRedux.filterArr.danji, "danji", "danjiWrap")}
          </Slider>

          </SliderWrap>
           
          <FilterList ref={filterListRef} className={["filterList", "hidden"]}>
              <FilterTopButton/>
              {/*<ApartFilter/>*/}
              {/*<OfficetelFilter/>*/}
              <StoreAndOfficeFilter status={status} open={openDetail} setOpen={setOpenDetail}/>
              <FilterCloseAndReset setOpen={setOpen}/>
            </FilterList>
        
          <FilterDownArrow ref={downArrowRef} className="downArrow" onClick={() => {setOpen(true)}}>
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
