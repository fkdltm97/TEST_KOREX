//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"
import MainTopImg from '../../img/main/main_top.png';

export default function MainBody() {
    return (
        <Container>
          <MainTop>
            <MainTopTxt>부동산 전속매물 플랫폼</MainTopTxt>
          </MainTop>
        </Container>
  );
}


const Container = styled.div`
    width:565px;
    margin:0 auto 0;
    padding-top:100px;
    @media ${(props) => props.theme.container} {
        width:calc(100vw*(565/1436));
        padding-top:calc(100vw*(100/428));
      }
    @media ${(props) => props.theme.mobile} {
          width:calc(100vw*(360/428));
      }
`
const MainTop = styled.div`
    width:100%;
    text-align:center;
`

const MainTopTxt = styled.p`
    font-size:40px;
    color:#fe7a01;
    text-align:center;
    @media ${(props) => props.theme.container} {
        font-size:calc(100vw*(51/1436));
      }
    @media ${(props) => props.theme.mobile} {
        font-size:calc(100vw*(35/428));
      }
`
