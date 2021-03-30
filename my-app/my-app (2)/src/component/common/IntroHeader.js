//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"

//img
import TopLogo from '../../img/main/top_logo.png';
import Icon1 from '../../img/main/main_icon1.png';
import Icon2 from '../../img/main/main_icon2.png';
import Icon3 from '../../img/main/main_icon3.png';
import Icon4 from '../../img/main/main_icon4.png';
import Icon5 from '../../img/main/main_icon5.png';


export default function MainHeader() {
    return (
        <Container>
            <TopImg>
              <Link to="/Main">
                <Images src={TopLogo}/>
              </Link>
            </TopImg>
        </Container>
  );
}

const Container = styled.div`
    position:relative;
    width: 100%;
`
const TopImg = styled.div`
    width: 100%;
    text-align:center;
    padding-top:40px;
`
const Images = styled.img`
  width: 188px;
  height: 50px;
  @media ${(props) => props.theme.tablet} {
        width:calc(100vw*(188/1700));
        height:calc(100vw*(50/1700));
    }

  @media ${(props) => props.theme.mobile} {
        width:calc(100vw*(130/414));
        height:auto;
    }

`

// 이 방법도 있음 !! !
// const ColorOrange = styled(ColorGreen)`
//   color:#fe7a01;
//
// `
