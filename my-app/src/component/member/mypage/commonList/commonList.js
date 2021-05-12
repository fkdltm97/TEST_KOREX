

//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components";

//img
import RightArrow from '../../../../img/notice/right_arrow.png';

const CommonList = ({array}) => {

    if(!array){return(<></>)}
    
    return(
        <>
            {
              array.map((item, index) => {
                return(
                  <Li key={index}>
                    <Link to={`/${item.link}`} className="data_link"></Link>
                    <LinkTxt>{item.title}</LinkTxt>
                    <Arrow src={RightArrow}/>
                  </Li>
                )
              })
            }
        </> 
    )
};

export default CommonList;

const Li = styled.li`
  position:relative;
  width:100%;
  display:felx;justify-content:space-between;align-items:center;flex-wrap:wrap;
  padding:36px 40px;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(30/428)) calc(100vw*(20/428)) calc(100vw*(30/428)) calc(100vw*(30/428));
    }
`

const LinkTxt = styled.p`
  font-size:15px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`

const Arrow = styled.img`
  width:8px;vertical-align:middle;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(8/428));
    }
`