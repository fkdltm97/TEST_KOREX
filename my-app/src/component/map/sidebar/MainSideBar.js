//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

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
import View from "../../../img/main/icon_view.png";
import OpenList from "../../../img/map/toggle_list.png";

// components
import { Mobile, PC } from "../../../MediaQuery";
import ItemTabContent from "./tabcontent/ItemTabContent";
import BrokerTabContent from "./tabcontent/BrokerTabContent";
import OnlyMaemul from "./topmenu/OnlyMaemul";
import OnlyBroker from "./topmenu/OnlyBroker";
import OnlyDanji from "./topmenu/OnlyDanji";
import DanjiTabContent from './tabcontent/DanjiTabContent'

// redux
import { useSelector } from 'react-redux';

export default function MainHeader({updatePageIndex,historyInfo,setHistoryInfo,setReport,updown,setUpDown, status}) {
    const [activeIndex,setActiveIndex] = useState(0);
    const [tapStatus, setTapStatus] = useState(0);
    const [isInit, setIsInit] = useState(true);
    const mapRightRedux = useSelector(state=>{ return state.mapRight});
    const [typeStatus, setTypeStatus] = useState("");

    // Init
    useEffect(() => {
      setActiveIndex(0);
      setTapStatus(0)
      setHistoryInfo(e => {e.prevTab = 0; return JSON.parse(JSON.stringify(e));});
      setIsInit(false);
    }, [])

    useEffect(() => {
      switch (status){
        case "apart":
          setTypeStatus("아파트");
          break;
        case "officetel":
          setTypeStatus("오피스텔");
          break;
        case "store":
          setTypeStatus("상가");
          break;
        case "office":
          setTypeStatus("사무실");
          break;
        default :
          setTypeStatus("");
          break;
      }
    }, [status])

    // 분기처리  
    useEffect(() => {
      // 전속매물, 전문중개사 
      if(mapRightRedux.isExclusive.is && mapRightRedux.isProbroker.is){
        setTapStatus(3)
        if(isInit){return;}
      } // 존속매물
      else if(mapRightRedux.isExclusive.is){
        setActiveIndex(0);
        setHistoryInfo(e => {e.prevTab = 0; return JSON.parse(JSON.stringify(e));});
        setTapStatus(0);
      } // 전문중개사
      else if(mapRightRedux.isProbroker.is){
        setActiveIndex(1);
        setHistoryInfo(e => {e.prevTab = 1; return JSON.parse(JSON.stringify(e));});
        setTapStatus(1)
      } // 단지별 실거재
      else if(mapRightRedux.isBlock.is){
        setHistoryInfo(e => {e.prevTab = 2; return JSON.parse(JSON.stringify(e));});
        setTapStatus(2)
      }// 석택 x
      else{
        setHistoryInfo(e => {e.prevTab = 4; return JSON.parse(JSON.stringify(e));});
        setTapStatus(4)
      }
    }, [mapRightRedux])

    // 상단 제목
    // **api length 가져오기 
    const tapReturn = () => {
      if(tapStatus == 3){
        // 전문중개사 버튼 눌려있을때 -> 탭으로 아파트 ㅣ 전문중개사
        return(
          <WrapTabBtn>
            <Mobile>{/*모바일 open List Btn*/}
              <OpenListImg onClick={() => {setUpDown(!updown)}}/>
            </Mobile>
            <Span className="tab ApartTab" active={activeIndex == 0} onClick={()=>{setActiveIndex(0);setHistoryInfo(e => {e.prevTab = 0; return JSON.parse(JSON.stringify(e));});}}>{typeStatus}303</Span>
            <Part/>
            <Span2 className="tab ApartTab" active={activeIndex == 1} onClick={()=>{setActiveIndex(1);setHistoryInfo(e => {e.prevTab = 1; return JSON.parse(JSON.stringify(e));});}}>전문중개사 <Orange active={activeIndex == 1} onClick={()=>{setActiveIndex(1);}}>37</Orange></Span2>
          </WrapTabBtn>
        )
      }else if(tapStatus == 0){
        // 전문중개사 꺼졌을때 ( 전속매물 버튼만 active돼있을때...)
        return(
          <OnlyMaemul typeStatus={typeStatus}  updown={updown} setHistoryInfo={setHistoryInfo} setUpDown={setUpDown}/>
        )
      }else if(tapStatus == 1){
        // 전속매물 꺼졌을때 ( 전문중개사만 active돼있을때...)
        return(
          <OnlyBroker updown={updown} setHistoryInfo={setHistoryInfo} setUpDown={setUpDown}/>
        )
      }else if(tapStatus == 2){
        // 단지별 실서래만
        return(
          <OnlyDanji updown={updown} setHistoryInfo={setHistoryInfo} setUpDown={setUpDown}/>
        )
      }else{
        return(<></>)
      }
    }

    // 컨텐츠
    const contentReturn = () => {
      // 전속매물
      if(historyInfo.prevTab == 0){
        return(
          <ItemTabContent updatePageIndex={updatePageIndex} setReport={setReport} setHistoryInfo={setHistoryInfo} index={0}/>
        )
      } // 전문 중개사
      else if(historyInfo.prevTab == 1){
        return(
          <BrokerTabContent updatePageIndex={updatePageIndex} setHistoryInfo={setHistoryInfo}/>
        )
      } // 단지별 실거래
      else if(historyInfo.prevTab == 2){
        return(
          <DanjiTabContent updatePageIndex={updatePageIndex} setHistoryInfo={setHistoryInfo}/>
        )
      } // x 
      else if(historyInfo.prevTab == 4){
        return(<></>)
      }
    }


    return (
        <Container>
          <WrapTab className="Tabs">
          {tapReturn()}          
          {contentReturn()}
          </WrapTab>
          {/**/}
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
  padding:0 10px;
  @media ${(props) => props.theme.mobile} {
    padding:0 calc(100vw*(22/428));
  }
`
const WrapMainSide = styled.section`
`
const WrapTab = styled.div`
@media ${(props) => props.theme.mobile} {
  padding-top:calc(100vw*(22/428));
}
`

const WrapTabBtn = styled.div`
  position:relative;
  display:flex;justify-content:center;align-items:center;
`
const OpenListImg = styled.div`
  position:absolute;
  cursor:pointer;left:calc(100vw*(10/428));top:50%;transform:translateY(-50%);
  width:calc(100vw*(30/428));
  height:calc(100vw*(30/428));
  background:url(${OpenList}) no-repeat center center;background-size:calc(100vw*(12/428)) calc(100vw*(30/428));
`
const Span = styled.span`
  display:inline-block;
  font-size:18px;font-weight:800;
  transform:skew(-0.1deg);
  color:${({active}) => active ? "#01684b" : "#707070"};
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const Span2 = styled.span`
  display:inline-block;
  font-size:18px;font-weight:800;
  transform:skew(-0.1deg);
  color:${({active}) => active ? "#4a4a4a" : "#070707"};
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const Orange = styled.span`
  color:${({active}) => active ? "#FF7B01" : "#070707"};
`

const WrapNonTab = styled.div`
  width:100%;padding:0 25px;
  display:flex;justify-content:space-between;align-items:center;

`
const NonTab = styled.p`
font-size:18px;font-weight:800;
transform:skew(-0.1deg);
color:#4a4a4a;
`
const ViewBtn = styled.div`
  position:relative;
`
const Img = styled.img`
  display:inline-block;
  width:19px;
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

const Green = styled.span`
 font-size:18px;font-weight:800;
 transform:skew(-0.1deg);
 color:#01684b;
 @media ${(props) => props.theme.mobile} {
   font-size:calc(100vw*(15/428));
 }
`
const OrangeColor = styled(Green)`
  color:#FF7B01;
`
const Part = styled.span`
  display:inline-block;width:1px;height:16px;
  background:#707070;margin:0 14px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(15/428));
  }
`
const TabContent = styled.div`
  position:relative;
  display:flex;justify-content:flex-start;align-items:center;
  padding:25px 27px 0 27px;margin-top:17px;
  margin-bottom:17px;
  border-top:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(15/428));
  }
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
const area = styled(Floor)`
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
