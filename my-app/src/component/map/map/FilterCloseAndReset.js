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
import FilterTopButton from "./filter/FilterTopButton";
import ApartFilter from "./filter/ApartFilter";


export default function MapFilter() {

    return (
        <Container>
          <CloseAndReset>
            <Arrow src={FilterDown}/>
            <WrapReset>
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
`
const Arrow = styled.img`
  cursor:pointer;
  display:inline-block;width:16px;
  transform:rotate(180deg);
`
const WrapReset = styled.div`
  display:flex;justify-content:flex-end;align-items:center;
`
const Reset = styled.img`
  width:20px;
  vertical-align:middle;
`
const ResetTitle = styled.span`
  font-size:15px;
  color:#01684b;font-weight:800;transform:skew(-0.1deg);
  margin-left:5px;
`
