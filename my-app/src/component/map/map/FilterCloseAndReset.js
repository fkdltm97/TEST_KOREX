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

// Init
import initFilter from '../initFilter';

export default function MapFilter({setOpen}) {

  const onClickReset = () => {
    MapFilterRedux.updateFilterRest(initFilter);
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
