//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap-tabs';

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


export default function SideItemDetail({historyInfo,updatePageIndex,setHistoryInfo}) {

    return (
        <Container>
          <SideSubTitle title={"럭키 공인중개사"} updatePageIndex={updatePageIndex} historyInfo={historyInfo}/>
          <SideBarBrokerDetailCont setHistoryInfo={setHistoryInfo}/>
          <BrokerSorting/>
          <ItemTabContent updatePageIndex={updatePageIndex} itemList={ItemListItem} setHistoryInfo={setHistoryInfo} index={2}/>
        </Container>
  );
}

const Container = styled.div `
  width:100%;
`
