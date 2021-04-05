//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

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
export default function SideItemDetail({openHouse, rank, updatePageIndex,historyInfo,setMap}) {
  const TableList =[
  {
    t_id : 0,
    date:"92m²",
    trade:"매매",
    price:"18억,2000",
    floor:"7층"
  },
  {
    t_id : 1,
    date:"92m²",
    trade:"매매",
    price:"18억,2000",
    floor:"7층"
  },
  {
    t_id : 2,
    date:"92m²",
    trade:"전세",
    price:"18억,2000",
    floor:"7층"
  },
  {
    t_id : 3,
    date:"92m²",
    trade:"월세",
    price:"18억,2000",
    floor:"7층"
  }
]
  const [activeIndex,setActiveIndex] = useState(0);
    return (
        <Container>
            <DanjiWidthList>
              <TopInfo>
                <TextLine>
                  <Title>공급/전용면적</Title>
                  <Data>60/52.89m²</Data>
                </TextLine>
                <TextLine>
                  <Title>해당타입세대수</Title>
                  <Data>2/1개</Data>
                </TextLine>
              </TopInfo>
              <WrapPriceList>
                <PriceListTop>
                  <Title>실거래가</Title>
                  <TabBtn>
                    <Tab active={activeIndex == 0 } onClick={()=>{setActiveIndex(0)}}>전세</Tab>
                    <Part/>
                    <Tab active={activeIndex == 1 } onClick={()=>{setActiveIndex(1)}}>매매</Tab>
                    <Part/>
                    <Tab active={activeIndex == 2 } onClick={()=>{setActiveIndex(2)}}>전월세</Tab>
                  </TabBtn>
                </PriceListTop>
                <PriceList>
                  <DivTitle>
                    <Div>계약일</Div>
                    <Div>거래유형</Div>
                    <Div>거래금액</Div>
                    <Div>층수</Div>
                  </DivTitle>
          {
              TableList.map((value) => {
                return(
                  <DivCont>
                    <Divv>{value.date}</Divv>
                    <Divv>{value.trade}</Divv>
                    <Divv>{value.price}</Divv>
                    <Divv>{value.floor}</Divv>
                  </DivCont>
                )
              })
            }

                </PriceList>
              </WrapPriceList>
            </DanjiWidthList>
        </Container>
  );
}

const Container = styled.div `
  width:100%;
`
const DanjiWidthList = styled.div`
  width:100%;
  margin-top:43px;
`
const TopInfo = styled.div`
  padding-left:22px;
  width:100%;
`
const TextLine = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:100%;
  margin:35px 0;
  &:last-child{margin-bottom:0}
`
const Title = styled.p`
  font-size:15px;font-weight:600;
  transform:skew(-0.1deg);color:#898989;
`
const Data = styled(Title)`
  color:#4a4a4a;
  margin-left:17px;
`
const WrapPriceList = styled.div`
  width:100%;
  margin-top:25px;padding-top:25px;
  border-top:1px solid #f2f2f2;
`
const PriceListTop = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  margin-bottom:25px;
  padding:0 22px;
`
const TabBtn = styled.div`
  display:flex;justify-content:space-between;align-items:center;
`
const Tab = styled.div`
  font-size:15px;font-weight:600;
  transform:skew(-0.1deg);
  cursor:pointer;
  transition:all 0.3s;
  color:${({active}) => active ? "#01684b" : "#707070"};
  font-weight:${({active}) => active ? 800 : 600};
`
const Part = styled.p`
  display:inline-block;
  width:1px;height:16px;
  margin:0 14px;
  vertical-align:middle;
  background:#707070;
`
const PriceList = styled.table`
  width:100%;
  table-layout:fixed;
`
const DivTitle = styled.div`
  display:flex;justify-content:space-around;align-items:center;
  text-align:center;
  padding:17px 0 18px;
  background:#f8f7f7;
`
const Div = styled.div`
  text-align:center;
  font-size:15px;color:#898989;
  font-weight:600;transform:skew(-0.1deg);
`
const DivCont = styled(DivTitle)`
  background:transparent;
  &:nth-child(2) div{color:#fe7a01;}
`
const Divv = styled(Div)`
  color:#4a4a4a;
`
