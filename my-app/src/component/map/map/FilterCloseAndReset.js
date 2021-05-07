//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

//img
import ChangeGreen from '../../../img/map/change_green.png';
import FilterClose from '../../../img/map/filter_close.png';
import FilterDown from '../../../img/map/filter_down_arrow.png';

// components
import { Mobile, PC } from "../../../MediaQuery";

// redux
import { MapFilterRedux } from '../../../store/actionCreators';
import { useSelector } from 'react-redux';

export default function MapFilter({setOpen}) {

  const mapFilterRedux = useSelector(state=>{ return state.mapFilter});
  let uiData = JSON.parse(JSON.stringify(mapFilterRedux.filterUI));
  const data = JSON.parse(JSON.stringify(mapFilterRedux.filterArr));

  const onClickReset = () => {
    uiData.prd_sel_type=[1, 0, 0];
    uiData.priceRangeValue=[0, 100];
    uiData.manaRangeValue=[0, 75];
    uiData.areaRangeValue=[0, 100];
    uiData.jeonseRangeValue=[0, 30];
    uiData.monthlyRangeValue=[0, 18];
    uiData.manaStatus=0;
    uiData.floor=0;
    uiData.use=0;
    uiData.roomApart=0;
    uiData.bath=0;
    uiData.danji=0;
    uiData.purpose=0;
    uiData.roomOfficetel=[1, 0, 0, 0, 0, 0];
    uiData.double=0;
    uiData.parkOfficetel=0;
    uiData.pet=0;
    uiData.parkStore=0;
    uiData.toilet=0;

    // Redux -- 
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

    MapFilterRedux.updateFilterUI({filterUI:uiData});
    MapFilterRedux.updateFilterArr({filterArr:data});
  }



  return (
    <Container>
      <CloseAndReset>
        <Arrow src={FilterDown} onClick={()=>{setOpen(false)}}/>
        <WrapReset onClick={() => {onClickReset()}}>
          <Reset src={ChangeGreen}/>
          <ResetTitle>초기화</ResetTitle>
        </WrapReset>
      </CloseAndReset>
    </Container>
  );
}

const Container = styled.div`
`
const CloseAndReset = styled.div`
  width:100%;
  padding:10px 17px 15px;
  border-top:1px solid #f2f2f2;
  display:flex;justify-content:space-between;align-items:center;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(12/428)) calc(100vw*(22/428)) calc(100vw*(15/428));
  }
`
const Arrow = styled.img`
  cursor:pointer;
  display:inline-block;width:16px;
  transform:rotate(180deg);
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(13/428));
  }
`
const WrapReset = styled.div`
  display:flex;justify-content:flex-end;align-items:center;
  cursor:pointer;
`
const Reset = styled.img`
  width:20px;
  vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(13/428));
  }
`
const ResetTitle = styled.span`
  font-size:15px;
  color:#01684b;font-weight:800;transform:skew(-0.1deg);
  margin-left:5px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    margin-left:calc(100vw*(10/428));
  }
`
