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

export default function MapFilter() {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
  };

  const [open,setOpen] = useState(false);

  const padding=()=>{
    if(open == true) {
      return "calc(100vw*(6/428)) calc(100vw*(10/428)) calc(100vw*(80/428))"
    }else{
      return "calc(100vw*(6/428)) calc(100vw*(10/428)) 0"
    }
  }


  // redux에서 변수를 뽑아와서 필터적용 시키기

    return (
        <Container>
        <WrapFilter padding={padding}>
          <SliderWrap>
            <Slider {...settings} className="filter_slick">
                <SlickSlide className="slide__one">
                  <Link>
                    <FliterEa>
                      Filter_1
                      <CloseFilter/>
                    </FliterEa>
                  </Link>
                </SlickSlide>
                <SlickSlide className="slide__one">
                  <Link>
                    <FliterEa>
                      Filter_1
                      <CloseFilter/>
                    </FliterEa>
                  </Link>
                </SlickSlide>
                <SlickSlide className="slide__one">
                  <Link>
                    <FliterEa>
                      Filter_1
                      <CloseFilter/>
                    </FliterEa>
                  </Link>
                </SlickSlide>
                <SlickSlide className="slide__one">
                  <Link>
                    <FliterEa>
                      Filter_1
                      <CloseFilter/>
                    </FliterEa>
                  </Link>
                </SlickSlide>
              </Slider>
            </SliderWrap>
            { open ?
              <>
                <FilterTopButton/>
                {/*<ApartFilter/>*/}
                {/*<OfficetelFilter/>*/}
                <StoreAndOfficeFilter/>
                <FilterCloseAndReset setOpen={setOpen}/>
              </>
              :
              <FilterDownArrow onClick={() => {setOpen(true)}}>
                 <Link>
                   <ImgDiv>
                     <DownImg src={FilterDown}/>
                   </ImgDiv>
                 </Link>
              </FilterDownArrow>
            }

         </WrapFilter>

        </Container>
  );
}

const Container = styled.div`
`
const WrapFilter = styled.div`
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
  margin-right:8px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(30/428));
    font-size:calc(100vw*(14/428));
  }
`
const CloseFilter = styled.div`
  display:inline-block;
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
