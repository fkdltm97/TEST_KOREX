//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import NavIcon from '../../../img/main/nav_btn.png';
import Logo from '../../../img/main/header_logo.png';
import PCLogo from '../../../img/main/pc_header_logo.png';
import Mypage from '../../../img/main/mypage_icon.png';
import plus from '../../../img/map/plus.png';
import minus from '../../../img/map/minus.png';

// components
import { Mobile, PC } from "../../../MediaQuery";

// redux
import { MapRight } from '../../../store/actionCreators';
import { useSelector } from 'react-redux';

export default function MainHeader({openBunyang, rank }) {

    const [isFilter, setIsFilter] = useState(true);
    const [isMapStyle, setIsMapStyle] = useState(false);
    const mapRightRedux = useSelector(state=>{ return state.mapRight});
    
    // Init Status
    useEffect(() => {
      MapRight.updateExclusive({  isExclusive: {is:true} });
      MapRight.updateProbroker({  isProbroker: {is:true} });
      MapRight.updateBlock({  isBlock: {is:false} });
    }, [])

    // Exclusive Click
    const onClickExclusive = () => {
      const buildType = document.querySelectorAll(".buildType");
      const exclusiveCk = document.querySelector("#Exclusive");
      if(!exclusiveCk.checked){
        setIsFilter(true);
        buildType[1].classList.remove("select");
        MapRight.updateBlock({  isBlock: {is:false} });
        MapRight.updateExclusive({  isExclusive: {is:true} });
      }else{
        setIsFilter(false);
        MapRight.updateExclusive({  isExclusive: {is:false} });
      }
    };

    // Build Click
    const onClickBuildType = (e) => {
      const exclusiveCk = document.querySelector("#Exclusive");
      const aroundAlert = document.querySelector(".aroundAlert");
      if(e.target.classList.contains("select")){
        e.target.classList.remove("select");
        initSelectBuild();
        return;
      }
      initSelectBuild();
      
      e.target.classList.add("select");
      
      if(e.target.id == "probrokerBuild"){
        MapRight.updateProbroker({  isProbroker: {is:true} });
      }

      if(e.target.id == "blockBuild"){
        MapRight.updateExclusive({  isExclusive: {is:false} });
        MapRight.updateBlock({  isBlock: {is:true} });
        exclusiveCk.checked = false;
      }

      if(e.target.id == "aroundBuild"){
        aroundAlert.classList.remove("hidden");
      }

    }

    // Build Init
    const initSelectBuild = () => {
      const  buildType = document.querySelectorAll(".buildType");
      const aroundAlert = document.querySelector(".aroundAlert");
      const mapAlert = document.querySelector(".mapAlert");
      const distanceEnd = document.querySelector(".distanceEnd");
      aroundAlert.classList.add("hidden");
      mapAlert.classList.add("hidden");
      setIsMapStyle(false);
      for(let i = 0 ; i < buildType.length ; i++){
        buildType[i].classList.remove("select");
      }
      distanceEnd.classList.add("hidden");
      MapRight.updateProbroker({  isProbroker: {is:false} });
      MapRight.updateBlock({  isBlock: {is:false} });
      MapRight.updateAround({  around: { is:"" } });
      MapRight.updateDistance({  isDistance: {is:false} });
    }

    // Around  Item Click
    const onClickAroundEls = (e) => {
      const aroundAlert = document.querySelector(".aroundAlert");
      switch (e.target.innerText){
        case "지하철":
          MapRight.updateAround({  around: {is:"SW8"} });
          break;
        case "유치원":
          MapRight.updateAround({  around: {is:"PS3"} });
          break;
        case "학교":
          MapRight.updateAround({  around: {is:"SC4"} });
          break;
        case "은행":
          MapRight.updateAround({  around: {is:"BK9"} });
          break;
        case "관공서":
          MapRight.updateAround({  around: {is:"PO3"} });
          break;
        default:
          MapRight.updateAround({  around: {is:""} });
          break;
      }
      aroundAlert.classList.add("hidden");
    }

    //  Map Styles Click
    const onClickMap = () => {
      let isBool = !isMapStyle;
      setIsMapStyle(isBool);
      const mapAlert = document.querySelector(".mapAlert");
      const aroundAlert = document.querySelector(".aroundAlert");
      const distanceEnd = document.querySelector(".distanceEnd");
      distanceEnd.classList.add("hidden");
      MapRight.updateDistance({  isDistance: {is:false} });
      aroundAlert.classList.add("hidden");
      if(isBool){
        mapAlert.classList.remove("hidden");
      }else{
        mapAlert.classList.add("hidden");
      }
    }

    // Map Styles Item Click
    const onClickMapEls = (e) => {
      const mapAlert = document.querySelector(".mapAlert");
      switch (e.target.innerText){
        case "일반":
          MapRight.updateMapStyle({  mapStyle: "roadmap" });
          break;
        case "지적":
          MapRight.updateMapStyle({  mapStyle: "district" });
          break;
        case "위성":
          MapRight.updateMapStyle({  mapStyle: "hybrid" });
          break;
        case "거리뷰":
          MapRight.updateMapStyle({  mapStyle: "roadView" });
          break;
        default:
          MapRight.updateMapStyle({  mapStyle: "roadmap" });
          break;
      }
      mapAlert.classList.add("hidden");
      setIsMapStyle(false);
    }

    // Zoom In
    const onClikZoomIn = () => {
      let newCount = mapRightRedux.isZoomIn;
      newCount++;
      MapRight.updateZoomIn({  isZoomIn: newCount });
    }

    // Zoom Out
    const onClikZoomOut = () => {
      let newCount = mapRightRedux.isZoomOut;
      newCount++;
      MapRight.updateZoomOut({  isZoomOut: newCount });
    }

    // Current Location Click
    const onclickCurrent = () => {
      const currentBtn = document.querySelector(".currentBtn");
      if(mapRightRedux.isCurrnet.is){
        MapRight.updateCurrent({  isCurrnet: {is: !mapRightRedux.isCurrnet.is } });
        currentBtn.classList.remove("select");
        return;
      }

      if( window.confirm("내 위치 조회 허용?") ){
        currentBtn.classList.add("select");
        MapRight.updateCurrent({  isCurrnet: {is: !mapRightRedux.isCurrnet.is } });
      }else{
        return;
      }
    }

    const onClickDistance = () => {
      const mapAlert = document.querySelector(".mapAlert");
      const distance = document.querySelector(".distance");
      const distanceEnd = document.querySelector(".distanceEnd");
      const aroundAlert = document.querySelector(".aroundAlert");
      let isBool = false;
      setIsMapStyle(isBool);
      distanceEnd.classList.toggle("hidden");

      if(!distanceEnd.classList.contains("hidden")){
        distance.classList.add("select");
      }else{
        distance.classList.remove("select");
      }

      mapAlert.classList.add("hidden");
      aroundAlert.classList.add("hidden");
      MapRight.updateAround({  around: { is:"" } });
      MapRight.updateDistance({  isDistance: {is:!mapRightRedux.isDistance.is} });
    }

    return (
        <Container>
          <WrapMap>
            {/*Right Tab*/}
            <RightMenu isFilter={isFilter}>
              <WrapMenuTop>
                <Exclusive type="checkbox" name="" id="Exclusive" defaultChecked/>
                <ExclusiveLabel className="changeBtn" for="Exclusive" onClick={() => { onClickExclusive() }} >전속 매물</ExclusiveLabel>
              </WrapMenuTop>
              <WrapMenuBottom>
                <RadioBox>
                  <RadioSpan id="probrokerBuild" className={["buildType", "select", "changeBtn"]} onClick={(e)=>{onClickBuildType(e)}} >전문 중개사</RadioSpan>
                </RadioBox>
                <Part/>{/*분기 라인*/}
                <RadioBox>
                  <RadioSpan id="blockBuild" className={["buildType", "changeBtn"]} onClick={(e)=>{onClickBuildType(e)}}>단지별 실거래</RadioSpan>
                </RadioBox>
                <Part/>{/*분기 라인*/}
                <RadioBox>
                  <RadioSpan id="aroundBuild" className="buildType" onClick={(e)=>{onClickBuildType(e)}}>주변</RadioSpan>
                </RadioBox>

                <RadioAlert className={["aroundAlert", "hidden"]} >
                  <RadioBox>
                    <RadioSpan className="aroundEl" onClick={(e) => {onClickAroundEls(e)}}>지하철</RadioSpan>
                  </RadioBox>
                  <Part/>
                  <RadioBox>
                    <RadioSpan className="aroundEl" onClick={(e) => {onClickAroundEls(e)}}>유치원</RadioSpan>
                  </RadioBox>
                  <Part/>
                  <RadioBox>
                    <RadioSpan className="aroundEl" onClick={(e) => {onClickAroundEls(e)}}>학교</RadioSpan>
                  </RadioBox>
                  <Part/>
                  <RadioBox>
                    <RadioSpan className="aroundEl" onClick={(e) => {onClickAroundEls(e)}}>은행</RadioSpan>
                  </RadioBox>
                  <Part/>
                  <RadioBox>
                    <RadioSpan className="aroundEl" onClick={(e) => {onClickAroundEls(e)}}>관공서</RadioSpan>
                  </RadioBox>
                </RadioAlert>

              </WrapMenuBottom>

              <WrapMenuBottom>
                <RadioBox>
                  <RadioSpan onClick={() => {onClickMap()}} >지도 유형</RadioSpan>
                </RadioBox>
                <RadioAlertMap className={["mapAlert", "hidden"]}>
                  <RadioBox>
                    <RadioSpan className="noRv" onClick={(e) => {onClickMapEls(e)}}>일반</RadioSpan>
                  </RadioBox>
                  <Part/>{/*분기 라인*/}
                  <RadioBox>
                    <RadioSpan className="noRv" onClick={(e) => {onClickMapEls(e)}}>지적</RadioSpan>
                  </RadioBox>
                  <Part/>{/*분기 라인*/}
                  <RadioBox>
                    <RadioSpan className="noRv" onClick={(e) => {onClickMapEls(e)}}>위성</RadioSpan>
                  </RadioBox>
                  <Part/>{/*분기 라인*/}
                  <RadioBox>
                    <RadioSpan onClick={(e) => {onClickMapEls(e)}}>거리뷰</RadioSpan>
                  </RadioBox>
                </RadioAlertMap>

                <Part/>{/*분기 라인*/}
                <RadioBox>
                  <RadioSpan className="distance" onClick={() => {onClickDistance()} }>거리 재기</RadioSpan> 
                </RadioBox>
                <CurrentEnd className={["distanceEnd", "hidden"]} >
                  거리<br />
                  측정
                </CurrentEnd>
                
                <Part/>{/*분기 라인*/}
                <RadioBox>
                  <RadioSpan className="currentBtn" onClick={() => onclickCurrent() }>내위치</RadioSpan>
                </RadioBox>



              </WrapMenuBottom>

              <MapControl>
                <PlusBtn src={plus} alt="확대 버튼" onClick={()=>{onClikZoomIn()}}/>
                <Part/>{/*분기 라인*/}
                <MinusBtn src={minus} alt="축소 버튼" onClick={()=>{onClikZoomOut()}}/>
              </MapControl>
              

            {/*모바일에서 생기는 분양 탭 ... */}
              <Mobile>
                <Link to="/MbBunyang">
                  <Bunyang><BunyangLabel for="Exclusive">분양</BunyangLabel></Bunyang>
                </Link>
              </Mobile>
            </RightMenu>
          </WrapMap>
        </Container>
    );
}


const Container = styled.div`
`
const WrapMap = styled.div`
  position:relative;
  // width:100%;
  // height:100vh;
  // background:darkseagreen;
  // background:transparent;
`
const RightMenu = styled.div`
  position:absolute;
  top:26px;right:420px;
  width:50px;

  @media ${(props) => props.theme.mobile} {
    ${({isFilter})=>{
      return isFilter?
      `
      top:calc(100vw*(80/428));
      `
      :
      `
      top:calc(100vw*(15/428));
      `
    }}
    right:calc(100vw*(14/428));
    width:calc(100vw*(50/428));
  }
`
const WrapMenuTop = styled.div`
  width:100%;height:50px;
  margin-bottom:7px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(45/428));
    margin-bottom:calc(100vw*(7/428));
  }
`
const Exclusive = styled.input`
  display:none;
  &:checked+label{background:#01684b;color:#fff;}
`
const ExclusiveLabel = styled.label`
  display:inline-block;
  width:100%;height:100%;
  background:#fff;
  border-radius:10px;
  word-break:break-word;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  font-size:13px;font-weight:600;transform:skew(-0.1deg);
  color:#707070;padding:8px 12px;
  text-align:center;line-height: 1.31;
  transition:all 0.2s;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
    padding:calc(100vw*(6/428)) calc(100vw*(12/428));
  }
`
const WrapMenuBottom = styled.div`
  position:relative;
  width:100%;height:192px;
  background:#fff;border-radius:10px;
  padding:22px 5px 10px 6px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  margin-bottom:20px;
  
  & > .hidden {
    opacity:0;
    pointer-events: none;
  }

  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(160/428));
    padding:calc(100vw*(22/428)) calc(100vw*(5/428)) calc(100vw*(10/428)) calc(100vw*(6/428));
    margin-bottom:calc(100vw*(10/428));
  }
`
const MapControl = styled.div`
  width:100%;height:120px;
  background:#fff;border-radius:10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  margin-bottom:20px;
  display:flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(85/428));
    padding:calc(100vw*(6/428)) calc(100vw*(5/428)) calc(100vw*(10/428)) calc(100vw*(6/428));
    margin-bottom:calc(100vw*(10/428));
  }
`

const RadioBox = styled.div`
  width:100%;
  & > .select {
    color:#fe7a01;
    position:relative;
  }

  & > .select::after {
    content:"";
    width:6px;
    height:6px;
    background:#fe7a01;
    position:absolute;
    right:0px;
    top:-10px;
    border-radius:50%;
  }
`

const CurrentEnd = styled.div`
  position:absolute;
  top:70px;
  right:65px;
  width: 50px;
  height: 80px;
  background:#fff;
  border-radius:10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  font-size:13px;line-height: 1.31;
  font-weight:600;
  display:flex;
  align-items: center;
  justify-content: center;
  cursor:pointer;
  transition:500ms;
`

const Radio = styled.input`
  display:none;
  &:checked+label{color:#fe7a01;}
  &:checked+label:before{position:absolute;right:0;top:-7px;width:6px;height:6px;background:#fe7a01;border-radius:100%;display:block;content:'';}
  @media ${(props) => props.theme.mobile} {
    &:checked+label:before{position:absolute;right:0;top:calc(100vw*(-7/428));width:calc(100vw*(6/428));height:calc(100vw*(6/428));}
  }
`

const RadioAlert = styled.div`
  position:absolute;
  width: 50px;
  height: 260px;
  background:#fff;
  border-radius:10px;
  right:65px;
  bottom:-195px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  padding:22px 5px 10px 6px;
  transition:200ms;
`

const RadioAlertMap = styled.div`
  position:absolute;
  width: 50px;
  height: 210px;
  background:#fff;
  border-radius:10px;
  right:65px;
  top:0;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
  padding:22px 5px 10px 6px;
  transition:200ms;
`

const RadioSpan = styled.span`
  position:relative;
  display:inline-block;
  width:100%;
  text-align:center;word-break:keep-all;
  font-size:13px;line-height: 1.31;
  transform:skew(-0.1deg);font-weight:600;
  color:#707070;
  transition:all 0.2s;
  cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(13/428));
  }
`

const Part = styled.div`
  width:32px;margin:15px auto 15px;
  height:1px;background:#707070;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(32/428));
    margin:calc(100vw*(10/428)) auto;
  }
`
const Bunyang = styled(WrapMenuTop)`
  margin-top:Calc(100vw*(7/428));
`
const BunyangLabel = styled(ExclusiveLabel)`
  line-height:calc(100vW*(35/428));
`

const PlusBtn = styled.img`
  padding:10px;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(5/428));
    width:calc(100vw*(25/428));
  }
`

const MinusBtn = styled.img`
  padding:10px;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(5/428));
    width:calc(100vw*(25/428));
  }
`

