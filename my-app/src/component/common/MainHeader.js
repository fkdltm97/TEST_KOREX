//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import NavIcon from '../../img/main/nav_btn.png';
import Logo from '../../img/main/header_logo.png';
import PCLogo from '../../img/main/pc_header_logo.png';
import Mypage from '../../img/main/mypage_icon.png';

// components
import { Mobile, PC } from "../../MediaQuery";
export default function MainHeader({openBunyang, rank}) {

    return (
        <Container>
          <WrapHeader>
          <PC>
            <HederLogo>
                <Link to="/">
                  <LogoImg src={PCLogo}/>
                </Link>
            </HederLogo>
            <HeaderRight>
              <Link onClick={()=>{openBunyang(true)}}>
                <Bunyang>분양</Bunyang>
              </Link>
              <Link to="/Mypage">
                <MyImg src={Mypage}/>
              </Link>
            </HeaderRight>
            </PC>
            <Mobile>
              <HederLogo>
                  <Link to="/">
                    <LogoImg src={Logo}/>
                  </Link>
              </HederLogo>
              <HeaderRight>
                  {
                    rank ?
                    <Link to="/MbBunyang">
                      <BunyangColor>분양</BunyangColor>
                    </Link>
                    :
                    <Link to="/MbBunyang">
                      <Bunyang>분양</Bunyang>
                    </Link>
                  }
                <Link to="/Mypage">
                  <MyImg src={Mypage}/>
                </Link>
              </HeaderRight>
            </Mobile>
          </WrapHeader>
        </Container>
  );
}

const Container = styled.header`
    position:relative;
    width: 100%;
    height:80px;
    z-index:2;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);

    @media ${(props) => props.theme.mobile} {
          z-index:3;
          width:100%;
          height:calc(100vw*(64/428));
      }
`
const WrapHeader = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width: 1436px;
    margin:0 auto;
    padding-top:20px;
    @media ${(props) => props.theme.container} {
          width:90%;
      }

    @media ${(props) => props.theme.mobile} {
          width:calc(100vw*(360/428));
          padding-top:calc(100vw*(13/428));
      }
`

const HederLogo = styled.div`
  display:flex;
  justify-content:flex-start;
  align-items:center;
  margin-left:5px;
    @media ${(props) => props.theme.container} {
        margin-left:calc(100vw*(5/1436));
      }
    @media ${(props) => props.theme.mobile} {
        margin-left:calc(100vw*(5/428));
      }
`
const Logodesc = styled.p`
    font-size:14px;
    margin-left:60px;
    color:#898989;
    font-weight:900;
    transform:skew(-0.1deg);
    @media ${(props) => props.theme.container} {
          margin-left:calc(100vw*(60/1436));
      }
    @media ${(props) => props.theme.mobile} {
          display:none;
      }
`

const HeaderRight = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:145px;
    @media ${(props) => props.theme.container} {
        width:calc(100vw*(145/1436));
      }
    @media ${(props) => props.theme.mobile} {
          width:calc(100vw*(100/428));
          height:calc(100vw*(38/428));
      }
`
const LogoImg = styled.img`
    width:108px;
    @media ${(props) => props.theme.container} {
        width:calc(100vw*(108/1436));
      }
    @media ${(props) => props.theme.mobile} {
          width:calc(100vw*(38/428));
          height:calc(100vw*(38/428));
      }
`
const Bunyang = styled.p`
    display:inline-block;
    font-size:15px;
    color:#979797;
    height:40px;
    line-height:40px;
    font-weight: 600;
    transform: skew(-0.1deg);
    @media ${(props) => props.theme.container} {
        height:calc(100vw*(40/1436));
        line-height:calc(100vw*(40/1436));
      }
    @media ${(props) => props.theme.mobile} {
          font-size:calc(100vw*(15/428));
          height:calc(100vw*(29/428));
          line-height:calc(100vw*(29/428));
      }
`
const BunyangColor = styled(Bunyang)`
  color:#fe7a01;
`
const MyImg = styled.img`
    width:40px;
    height:40px;
    @media ${(props) => props.theme.container} {
        width:calc(100vw*(40/1436));
        height:calc(100vw*(40/1436));
      }
    @media ${(props) => props.theme.mobile} {
          width:calc(100vw*(29/428));
          height:calc(100vw*(29/428));
      }
`
