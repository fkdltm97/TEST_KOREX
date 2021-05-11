//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

//img
import View from '../../../../img/main/icon_view.png';

const CommonFilter = (props) => {

    //... 눌렀을때(메뉴)
    const [menu,setMenu] = useState(false);
    const showModal =()=>{
        setMenu(!menu);
    }

    return(
        <FilterAndAdd>
            <div onClick={showModal} className="linkToDiv">
            <FilterImg src={View} alt="filter"/>
            {
                menu ?
                <InMenu>
                    <Div>
                        <div className={["data_link", "linkToDiv"]}></div>
                        <InDiv>최신등록순</InDiv>
                    </Div>
                    <Div>
                        <div className={["data_link", "linkToDiv"]}></div>
                        <InDiv>높은가격순</InDiv>
                    </Div>
                    <Div>
                        <div className={["data_link", "linkToDiv"]}></div>
                        <InDiv>낮은가격순</InDiv>
                    </Div>
                    <Div>
                        <div className={["data_link", "linkToDiv"]}></div>
                        <InDiv>넓은면적순</InDiv>
                    </Div>
                    <Div>
                        <div className={["data_link", "linkToDiv"]}></div>
                        <InDiv>좁은면적순</InDiv>
                    </Div>
                    <Div>
                        <div className={["data_link", "linkToDiv"]}></div>
                        <InDiv>가나다순</InDiv>
                    </Div>
                </InMenu>
                :
                null
            }
            </div>
        </FilterAndAdd>
    )
};

export default CommonFilter;

const FilterAndAdd = styled.div`
  position:relative;
  display:flex;justify-content:flex-start; align-items:center;
`
const FilterImg = styled.img`
  display:inline-block;
  width:18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
  }
`
const InMenu = styled.ul`
  position:absolute;
  top:20px;left:0;
  width:112px;
  border:1px solid #707070;
  border-radius:8px;
  background:#fff;
  z-index:3;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(35/428));
    left:calc(100vw*(-10/428));
    width:calc(100vw*(80/428));
  }
`
const Div = styled.li`
  position:relative;
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
