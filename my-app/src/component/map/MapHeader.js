//react
import React, { useMemo } from "react";
import {Link} from "react-router-dom";
import Select from "react-select";

//css
import styled from "styled-components"
import NavIcon from '../../img/main/nav_btn.png';
import Logo from '../../img/main/header_logo.png';
import PCLogo from '../../img/main/pc_header_logo.png';
import Mypage from '../../img/main/mypage_icon.png';
import Arrow from '../../img/map/arrow_down.png';
import Search from '../../img/map/search.png';

// components
import { Mobile, PC } from "../../MediaQuery";


export default function MainHeader({openHouse, rank}) {
  const options = useMemo(
           () => [
               { value: "아파트", label: "아파트"},
              { value: "오피스텔", label: "오피스텔" },
              { value: "상가", label: "상가" },
              { value: "사무실", label: "사무실" },
              { value: "전문중개사", label: "전문중개사" }
            ],
           []
        );
    return (
        <Container>
          <WrapHeader>
          <PC>
            <HederLogo>
                <Link to="/">
                  <LogoImg src={PCLogo}/>
                </Link>
                <HeaderSearch>
                  <SearchSelect>
                    <Option>아파트</Option>
                    <Option>오피스텔</Option>
                    <Option>상가</Option>
                    <Option>사무실</Option>
                  </SearchSelect>
                  <SearchInput type="search" name=""/>
                  <SearchBtn type="submit" name=""/>
                </HeaderSearch>
            </HederLogo>
            <HeaderRight>
              <Link onClick={()=>{openHouse(true)}}>
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
                  <HeaderSearch>
                    <SearchSelect>
                      <Option>아파트</Option>
                      <Option>오피스텔</Option>
                      <Option>상가</Option>
                      <Option>사무실</Option>
                    </SearchSelect>
                    <SearchInput type="search" name=""/>
                    <SearchBtn type="submit" name=""/>
                  </HeaderSearch>
              </HederLogo>
              <HeaderRight>
                  {
                    rank ?
                    <Link to="/MbHouse">
                      <BunyangColor>분양</BunyangColor>
                    </Link>
                    :
                    <Link to="/MbHouse">
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
    z-index:2;
    width: 100%;
    height:106px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);

    @media ${(props) => props.theme.mobile} {
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
    padding-top:28px;
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
    justify-content:flex-start;
    align-items:center;
`
const LogoImg = styled.img`
    width:151px;
    @media ${(props) => props.theme.container} {
        width:calc(100vw*(151/1436));
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
    margin-right:70px;
    height:40px;
    line-height:40px;
    font-weight: 600;
    transform: skew(-0.1deg);
    @media ${(props) => props.theme.container} {
        margin-right:calc(100vw*(84/1436));
        height:calc(100vw*(40/1436));
        line-height:calc(100vw*(40/1436));
      }
    @media ${(props) => props.theme.mobile} {
          font-size:calc(100vw*(15/428));
          margin-right:calc(100vw*(37/428));
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
const HeaderSearch = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:438px;height:48px;
  margin-left:30px;
  border-radius:9px;
  padding:0 15px 0 20px;
  background:#f8f7f7;
`
const SearchSelect = styled.select`
  width:110px;height:100%;
  padding-left:20px;
  appearance:none;color:#ff7b01;font-size:17px;font-weight:800;transform:skew(-0.1deg);
  background:url(${Arrow}) no-repeat 90% center; background-size:16px 10px;
`
const Option = styled.option`
  background:#f8f7f7;
`
const SearchInput = styled.input`
  poisition:relative;
  background:none;
  width:70%;padding-left:22px;
  height:100%;font-size:16px;color:#4a4a4a;font-weight:700;
  transform:skew(-0.1deg);
  &::before{position:absolute;left:0;top:50%;transform:translateY(-50%);width:1px;height:19px;background:#707070;}
`
const SearchBtn = styled.button`
  width:30px;height:30px;
  background:url(${Search}) no-repeat center center;background-size:19px 18px;
`
