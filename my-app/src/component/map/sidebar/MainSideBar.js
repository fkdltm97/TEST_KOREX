//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import {Tabs, Tab} from 'react-bootstrap-tabs';

//css
import styled from "styled-components"
import NavIcon from '../../../img/main/nav_btn.png';
import Logo from '../../../img/main/header_logo.png';
import PCLogo from '../../../img/main/pc_header_logo.png';
import Mypage from '../../../img/main/mypage_icon.png';
import Item from "../../../img/map/map_item.png";
import FilterDown from "../../../img/map/filter_down_arrow.png";
import FilterNext from "../../../img/map/filter_next.png";
import FilterClose from "../../../img/map/filter_close.png";
import Checked from "../../../img/map/checked.png";
import Check from "../../../img/main/heart.png";

// components
import { Mobile, PC } from "../../../MediaQuery";
import ItemTabContent from "./tabcontent/ItemTabContent";
import BrokerTabContent from "./tabcontent/BrokerTabContent";


const ItemListItem =[
{
  item_id : 0,
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


export default function MainHeader({updatePageIndex,historyInfo,setHistoryInfo,setReport}) {
    const [activeIndex,setActiveIndex] = useState(0);
    return (
        <Container>
          <WrapTab className="Tabs">
            <WrapTabBtn>
              <Span className="tab ApartTab" active={activeIndex == 0} onClick={()=>{setActiveIndex(0);setHistoryInfo(e => {e.prevTab = true; return JSON.parse(JSON.stringify(e));});}}>아파트 303</Span>
              <Part/>
              <Span2 className="tab ApartTab" active={activeIndex == 1} onClick={()=>{setActiveIndex(1);setHistoryInfo(e => {e.prevTab = false; return JSON.parse(JSON.stringify(e));});}}>전문중개사 <Orange active={activeIndex == 1} onClick={()=>{setActiveIndex(1);}}>37</Orange></Span2>
            </WrapTabBtn>
            {
              historyInfo.prevTab ?
                <ItemTabContent updatePageIndex={updatePageIndex} setReport={setReport} itemList={ItemListItem} setHistoryInfo={setHistoryInfo} index={0}/>
                :
                <BrokerTabContent updatePageIndex={updatePageIndex} setHistoryInfo={setHistoryInfo}/>
             }
          </WrapTab>

        </Container>
  );
}


/*
{/*전문매물(초록색) 버튼이 활성화 됐을때}
    // <Tabs onSelect={(index, label) => console.log(label + ' selected')} className="Tabs">
{/*아파트 탭}
      <Tab label="아파트 303" className="tab ApartTab">
    {/*tabcontent 폴더에 컴포넌트로 따로 빼놓았습니다.}
        <ItemTabContent updatePageIndex={updatePageIndex} itemList={ItemListItem}/>
      </Tab>

{/*전문중개사 탭}
      <Tab label="전문중개사 37" className="tab ProTab">
        {/*tabcontent 폴더에 컴포넌트로 따로 빼놓았습니다.}
        <BrokerTabContent updatePageIndex={updatePageIndex}/>
      </Tab>
    </Tabs>

*/
const Container = styled.div `
  padding:0 22px;
`
const WrapMainSide = styled.section`
`
const WrapTab = styled.div`

`
const WrapTabBtn = styled.div`
  display:flex;justify-content:center;align-items:center;
`
const Span = styled.span`
  display:inline-block;
  font-size:18px;font-weight:800;
  transform:skew(-0.1deg);
  color:${({active}) => active ? "#01684b" : "#707070"};
  cursor:pointer;
`
const Span2 = styled.span`
  display:inline-block;
  font-size:18px;font-weight:800;
  transform:skew(-0.1deg);
  color:${({active}) => active ? "#4a4a4a" : "#070707"};
  cursor:pointer;
`
const Orange = styled.span`
  color:${({active}) => active ? "#FF7B01" : "#070707"};
`
const Part = styled.span`
  display:inline-block;width:1px;height:16px;
  background:#707070;margin:0 14px;
`
const TabContent = styled.div`
  position:relative;
  display:flex;justify-content:flex-start;align-items:center;
  padding:25px 27px 0 27px;margin-top:17px;
  margin-bottom:17px;
  border-top:1px solid #f2f2f2;
`
const LeftContent = styled.div`
  margin-right:31px;
`
const TopBox = styled.div`
  display:flex;justify-content:center;align-items:center;
  width:163px;height:26px;border:1px solid #2b664d;
  line-height:24px;
`
const ColorGreen = styled.span`
  font-size:11px;
  font-weight:800;transform:skew(-0.1deg);
  color:#01684b;
  display:inline-block;margin-right:3px;
`
const WrapDate = styled.div`
  display:flex;
  justify-content:flex-start;
  align-items:center;
`
const StartDate = styled.p`
  font-size:11px;
  font-weight:800;transform:skew(-0.1deg);
  color:#707070;
`
const Line = styled(StartDate)`
`
const EndDate = styled(StartDate)`
`
const ItemInfo = styled.div`
  margin-top:8px;
`
const Name = styled.div`
  margin-bottom:3px;
`
const Kind = styled.p`
  display:inline-block;
  font-size:15px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
`
const ColorOrange = styled.span`
  display:inline-block;
  font-size:15px;color:#fe7a01;
  vertical-align:middle;
  margin:0 3px;
  font-weight:600;transform:skew(-0.1deg);
`
const Detail = styled(Kind)`
`
const Price = styled.h3`
  font-size:20px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
`
const Option = styled.div`
  margin:6.5px 0;
  display:flex;justify-content:flex-start;align-items:center;
`
const Floor = styled.p`
  font-size:15px;color:#707070;
  font-weight:600;transform:skew(-0.1deg);
  margin-right:5px;
`
const Area = styled(Floor)`
`
const Expenses = styled(Floor)`
  margin-right:0;
`
const Desc = styled(Expenses)`
  width:196px;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
`
const RightContent = styled.div`
  position:relative;
  width:158px;height:158px;
`
const ItemImg = styled.img`
  width:100%;height:100%;
`
