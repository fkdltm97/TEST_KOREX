//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"


//img
import NavIcon from '../../../img/main/nav_btn.png';
import Logo from '../../../img/main/header_logo.png';
import PCLogo from '../../../img/main/pc_header_logo.png';
import Mypage from '../../../img/main/mypage_icon.png';
import FilterClose from '../../../img/map/filter_close.png';
import FilterDown from '../../../img/map/filter_down_arrow.png';

// components
import { Mobile, PC } from "../../../MediaQuery";

//redux
import { MapFilterRedux } from '../../../store/actionCreators';
import { useSelector } from 'react-redux';

export default function MapFilter({openBunyang, rank}) {

  const mapFilterRedux = useSelector(state=>{ return state.mapFilter});
  let uiData = JSON.parse(JSON.stringify(mapFilterRedux.filterUI));
  let filterArr = JSON.parse(JSON.stringify(mapFilterRedux.filterArr));

  const onClickTrade = (e) => {
    const text = e.target.dataset.text;
    const num = e.target.dataset.num;
    let count = 0;
    if(e.target.checked){
      filterArr.prd_sel_type.push(text);
      uiData.prd_sel_type[num] = 1;      
    }else{
      uiData.prd_sel_type.map(item => {if(item){count++}})
      if(count == 1){
        e.preventDefault();
        return;
      }
      uiData.prd_sel_type[num] = 0;
      filterArr.prd_sel_type = filterArr.prd_sel_type.filter(item => item != text);
    }

    MapFilterRedux.updateFilterArr({filterArr:filterArr});
    MapFilterRedux.updateFilterUI({filterUI:uiData});
  }


  
  return (
    <Container>
      <WrapFilterButton>
        <Box>
          <SubTitle>거래유형</SubTitle>
          <WrapButtons>
            <Button checked={uiData.prd_sel_type[0]} onClick={(e) => {onClickTrade(e)}} data-text="매매" data-num="0" className={["trade", "changeBtn"]} type="checkbox" id="trade1"/>
            <Label for="trade1">매매</Label>
            <Button checked={uiData.prd_sel_type[1]} onClick={(e) => {onClickTrade(e)}} data-text="전세" data-num="1" className={["trade", "changeBtn"]} type="checkbox" id="trade2"/>
            <Label for="trade2">전세</Label>
            <Button checked={uiData.prd_sel_type[2]} onClick={(e) => {onClickTrade(e)}} data-text="월세" data-num="2" className={["trade", "changeBtn"]} type="checkbox" id="trade3"/>
            <Label for="trade3">월세</Label>
          </WrapButtons>
        </Box>
      </WrapFilterButton>
    </Container>
  );
}

const Container = styled.div`
`
const WrapFilterButton = styled.div`
  width:100%;
  padding:22px 17px;
  border-top:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(22/428)) calc(100vw*(33/428));
  }
`
const Box = styled.div`
  width:100%;
`
const SubTitle = styled.h5`
  font-size:12px;
  color:#4a4a4a;transform:skew(-0.1deg);
  margin-bottom:13px;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(12/428));
    margin-bottom:calc(100vw*(13/428));
    font-weight:600;
  }
`
const WrapButtons = styled.div`
  width:100%;
  display:flex;justify-content:flex-start;align-items:center;
`
const Button = styled.input`
  display:none;
  &:last-child{margin-right:0;}
  &:checked+label{border:solid 2px #009053;background:#2b664d;color:#fff;font-weight:800;}
`
const Label = styled.label`
  display:inline-block;
  width: 106px;
  height: 35px;
  line-height:35px;
  text-align:center;
  border-radius: 3px;
  font-size:14px;font-weight:500;transform:skew(-0.1deg);
  margin-right:5px;
  border:solid 1px #e4e4e4;
  background:#f8f7f7;color:#4a4a4a;
  font-weight:500;
  cursor:pointer;transition:all 0.15s;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(106/428));
    height:calc(100vw*(35/428));
    line-height:calc(100vw*(35/428));
    font-size:calc(100vw*(14/428));
    margin-right:calc(100vW*(5/428));
  }
`
