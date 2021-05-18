//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import 'swiper/swiper-bundle.css';

//img
import Arrow from "../../../img/map/filter_next.png";
import ArrowDown from "../../../img/map/filter_down_arrow.png";
import Detail from "../../../img/map/detail_img.png";
import Trade from "../../../img/map/trade.png";
import Report from "../../../img/map/report.png";
import ChangeM from "../../../img/map/change_m.png";
import Change from "../../../img/member/change.png";
import Call from "../../../img/map/call.png";
import Chat from "../../../img/map/chat.png";
import Exit from "../../../img/main/exit.png";
import Checked from "../../../img/map/checked.png";
import Check from "../../../img/main/heart.png";
import Profile from "../../../img/map/profile_img.png";
import Like from '../../../img/member/like.png';
import Smile from '../../../img/member/smile.png';
import OrangeStar from '../../../img/member/star_orange.png';
import GreenStar from '../../../img/member/star_green.png';
import WhiteStar from '../../../img/member/star_white.png';
import View from '../../../img/main/icon_view.png';

// components
import { Mobile, PC } from "../../../MediaQuery";
import SideSubTitle from "./subtitle/SideSubTitle";
import BrokerTabContent from "./tabcontent/BrokerTabContent";
import SideBarBrokerDetailCont from "./SideBarBrokerDetailCont";
import BrokerSorting from "./BrokerSorting";
import ItemTabContent from "./tabcontent/ItemTabContent";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { isCompositeComponent } from 'react-dom/test-utils';

SwiperCore.use([Navigation, Pagination]);

const ItemListItem =[
{
  item_id : 0,
  path:"/",
  startDate:"20.00.00",
  endDate: "20.00.00",
  kind:"아파트파트파트파틒",
  detail:"자이 109동",
  price:"전세 12억 5,000",
  floor:"층수",
  Area:"공급면적",
  expenses:"관리비",
  desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
},
{
  item_id : 1,
  path:"/",
  startDate:"20.00.00",
  endDate: "20.00.00",
  kind:"아파트",
  detail:"자이 109동",
  price:"전세 12억 5,000",
  floor:"층수",
  Area:"공급면적",
  expenses:"관리비",
  desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
},
{
  item_id : 2,
  path:"/",
  startDate:"20.00.00",
  endDate: "20.00.00",
  kind:"아파트",
  detail:"자이 109동",
  price:"전세 12억 5,000",
  floor:"층수",
  Area:"공급면적",
  expenses:"관리비",
  desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
},
{
  item_id : 3,
  path:"/",
  startDate:"20.00.00",
  endDate: "20.00.00",
  kind:"아파트",
  detail:"자이 109동",
  price:"전세 12억 5,000",
  floor:"층수",
  Area:"공급면적",
  expenses:"관리비",
  desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
},
{
  item_id : 4,
  path:"/",
  startDate:"20.00.00",
  endDate: "20.00.00",
  kind:"아파트",
  detail:"자이 109동",
  price:"전세 12억 5,000",
  floor:"층수",
  Area:"공급면적",
  expenses:"관리비",
  desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
},
{
  item_id : 5,
  path:"/",
  startDate:"20.00.00",
  endDate: "20.00.00",
  kind:"아파트",
  detail:"자이 109동",
  price:"전세 12억 5,000",
  floor:"층수",
  Area:"공급면적",
  expenses:"관리비",
  desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
},
{
  item_id : 6,
  path:"/",
  startDate:"20.00.00",
  endDate: "20.00.00",
  kind:"아파트",
  detail:"자이 109동",
  price:"전세 12억 5,000",
  floor:"층수",
  Area:"공급면적",
  expenses:"관리비",
  desc:"매물특징 칸입니다. 작은설명작은설명작은설명작은설명"
}
]


export default function BrokerSortingh() {
  const [select,setSelect] = useState(false);
  const filterText = ["최신등록순", "높은가격순", "낮은가격순", "넓은면적순", "좁은면적순", "가나다순"];
  
  const showModal =()=>{
    setSelect(!select);
  }

  // 물건 종류
  const onChangeSort = (e) => {
    // console.log(e.target.value)
  }

  // 거래유형
  const onChangeType = (e) => {
    // console.log(e.target.value)
  }

  // 필터 리스트 El
  const filterEl = (text, index) => {
    return(
      <Div onClick={() => onClickFilterPc(index)}>
        <Link className="data_link"></Link>
        <InDiv>{text}</InDiv>
      </Div>
    )
  }

  // PC 필터 선택
  const onClickFilterPc = (index) => {
    // console.log(index);
  }

  // 모바일 필터 선택
  const onChangeFilterMb = (e) => {
    // console.log(e.target.value);
  }

  
  return (
        <Container>
            <Wrap>
              <WrapSelect>
                <Select onChange={e => onChangeSort(e)}>
                  <Option selected disabled>전체 - 물건종류</Option>
                  <Option>아파트</Option>
                  <Option>오피스텔</Option>
                  <Option>상가</Option>
                  <Option>사무실</Option>
                </Select>
                <Select onChange={e => onChangeType(e)}>
                  <Option selected disabled>전체 - 거래유형</Option>
                  <Option>매매</Option>
                  <Option>전세</Option>
                  <Option>월세</Option>
                </Select>
              </WrapSelect>
            <PC>
              <Sorting>
                <Link onClick={() => setSelect(!select)}>
                <Img src={View}/>
                  {
                    select ?
                    <InMenu>
                      {/* -- 수정코드입니다. */}
                      {
                        filterText.map((item, index) => {
                          return(
                            <>
                              {filterEl(item, index)}
                            </>
                          )
                        })
                      }
                      {/* -- 원래 코드입니다. */}
                      {/*
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>최신등록순</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>높은가격순</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>낮은가격순</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>넓은면적순</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>좁은면적순</InDiv>
                        </Div>
                        <Div>
                          <Link className="data_link"></Link>
                          <InDiv>가나다순</InDiv>
                        </Div>
                      */}
                    </InMenu>
                    :
                    null

                  }

                  </Link>
              </Sorting>
          </PC>
          <Mobile>
            {/*
              mobile일때는 select박스로 나올수 있도록 변경...
              -> 옵션 선택 시 배경과 선택한 텍스트가 겹치는 현상이 있습니다.
            */}
            <SortingMb>
              <SelectMb onChange={e => onChangeFilterMb(e)}>
                {/* -- 수정코드입니다. */}
                <Option selected disabled></Option>
                {
                  filterText.map((item, index) => {
                    return(<Option key={index}>{item}</Option>)
                  })
                }

                {/* -- 원래 코드입니다. */}
                {/*
                  <Option selected disabled></Option>
                  <Option>최신등록순</Option>
                  <Option>높은가격순</Option>
                  <Option>낮은가격순</Option>
                  <Option>넓은면적순</Option>
                  <Option>좁은면적순</Option>
                  <Option>가나다순</Option>
                */}
              </SelectMb>
            </SortingMb>
          </Mobile>
            </Wrap>
        </Container>
  );
}

const Container = styled.div `
  width:100%;
`
const Wrap = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  width:100%;
  padding:0 44px;
`
const WrapSelect = styled.div`

`
const Select = styled.select`
  width:120px;
  height:27px;border:1px solid #979797;
  border-radius:4px;
  font-size:13px;font-weight:600;transform:skew(-0.1deg);
  padding-left:5px;margin-right:15px;
  background:url(${ArrowDown}) no-repeat 100px center; background-size:10px;
  appearance:none;
  &:last-child{margin-right:0;}
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(120/428));
    height:calc(100vw*(27/428));
    margin-right:calc(100vw*(15/428));
    padding-left:calc(100vw*(5/428));
    font-size:calc(100vw*(13/428));
    background:url(${ArrowDown}) no-repeat 90% center; background-size:calc(100vw*(10/428));
  }
`
const Option = styled.option`
`
const Sorting = styled.div`
  position:relative;
`
const Img = styled.img`
  width:14px;cursor:pointer;
`
const Menu = styled.div`
  margin-bottom:0;
  @media ${(props) => props.theme.mobile} {
    margin-right:0;
  }
`
const MenuIcon = styled.div`
  width:36px;height:36px;
  border-radius:5px;
  border:1px solid #e4e4e4;
  background:url(${Set}) no-repeat center center; background-size:20px 20px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(31/428));
    height:calc(100vw*(31/428));
    background:url(${Set}) no-repeat center center; background-size:calc(100vw*(20/428)) calc(100vw*(20/428));
  }
`
const Bg = styled.div`
  position:fixed;width:100%;height:100%;
  background:rgba(0,0,0,0.2);left:0;top:0;
`
const InMenu = styled.ul`
  position:absolute;
  top:20px;left:-80px;
  width:112px;
  border:1px solid #707070;
  border-radius:8px;
  background:#fff;
  z-index:3;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(35/428));
    left:calc(100vw*(-30/428));
    width:calc(100vw*(100/428));
  }

`
const Div = styled.li`
  font-size:13px;
  transform:skew(-0.1deg);
  border-radius:8px;
  padding:4px 0 4px 17px;
  transition:all 0.3s;
  &:hover{background:#f8f7f7;}
  &:first-child{padding-top:8px;}
  &:last-child{padding-bottom:8px;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    padding:calc(100vw*(4/428)) 0 calc(100vw*(4/428)) calc(100vw*(12/428));
    &:first-child{padding-top:calc(100vw*(8/428));}
    &:last-child{padding-bottom:calc(100vw*(8/428));}
  }
`
const InDiv = styled.div`
  width:100%;height:100%;
`
const SortingMb = styled.div`
`
const SelectMb = styled.select`
  width:calc(100vw*(30/428));
  height:calc(100vw*(30/428));
  background:url(${View}) no-repeat center center; background-size:calc(100vw*(16/428));
  appearance:none;
`
