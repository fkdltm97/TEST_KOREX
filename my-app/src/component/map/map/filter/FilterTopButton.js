//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"


//img
import NavIcon from '../../../../img/main/nav_btn.png';
import Logo from '../../../../img/main/header_logo.png';
import PCLogo from '../../../../img/main/pc_header_logo.png';
import Mypage from '../../../../img/main/mypage_icon.png';
import FilterClose from '../../../../img/map/filter_close.png';
import FilterDown from '../../../../img/map/filter_down_arrow.png';

// components
import { Mobile, PC } from "../../../../MediaQuery";
export default function MapFilter({openHouse, rank}) {
const [activeIndex,setActiveIndex] = useState(0);

    return (
        <Container>
          <WrapFilterButton>
            <Box>
              <SubTitle>거래유형</SubTitle>
              <WrapButtons>
                <Button active={activeIndex == 0 } onClick={()=>{setActiveIndex(0)}}>매매</Button>
                <Button active={activeIndex == 1 } onClick={()=>{setActiveIndex(1)}}>전세</Button>
                <Button active={activeIndex == 2 } onClick={()=>{setActiveIndex(2)}}>월세</Button>
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
`
const Box = styled.div`
  width:100%;
`
const SubTitle = styled.h5`
  font-size:12px;
  color:#4a4a4a;transform:skew(-0.1deg);
  margin-bottom:13px;
`
const WrapButtons = styled.div`
  width:100%;
  display:flex;justify-content:flex-start;align-items:center;
`
const Button = styled.span`
  display:inline-block;
  width: 106px;
  height: 35px;
  line-height:35px;
  text-align:center;
  border-radius: 3px;
  font-size:14px;font-weight:500;transform:skew(-0.1deg);
  margin-right:5px;
  cursor:pointer;transition:all 0.2s;
  &:last-child{margin-right:0;}
  border:${({active}) => active ? "solid 2px #009053" : "solid 1px #e4e4e4"};
  background:${({active}) => active ? "#2b664d" : "#f8f7f7"};
  color:${({active}) => active ? "#fff" : "#4a4a4a"};
  font-weight:${({active}) => active ? 800 : 500};
`
