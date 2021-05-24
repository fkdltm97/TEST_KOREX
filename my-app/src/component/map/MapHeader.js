//react
import React, { useState, useMemo, useRef } from "react";
import {Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Select from "react-select";

//css
import styled from "styled-components"
import NavIcon from '../../img/main/nav_btn.png';
import Logo from '../../img/main/header_logo.png';
import PCLogo from '../../img/main/pc_header_logo.png';
import Mypage from '../../img/main/mypage_icon.png';
import Arrow from '../../img/map/arrow_down.png';
import Search from '../../img/map/search.png';
import Close from '../../img/main/modal_close.png';

// components
import { Mobile, PC } from "../../MediaQuery";

// redux
import { MapFilterRedux } from '../../store/actionCreators';
// Init
import initFilter from './initFilter';

//범용 주소 검색 api
import AddressSearchApi from '../common/addressSearchApi';

export default function MainHeader({openBunyang, rank}) {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState("apart");

  const [addressApi,setAddressApi] = useState(false);
  const [search_address,setSearch_address] = useState('');

    /*const onClickSearch = () => {
      MapFilterRedux.updateFilterRest(initFilter);
      switch (selectRef.current.value){
        case "아파트":
          history.push(`/map/apart`);
          break;
        case "오피스텔":
          history.push(`/map/officetel`);
          break;
        case "상가":
          history.push(`/map/store`);
          break;
        case "사무실":
          history.push(`/map/office`);
          break;
        default:
          history.push(`/map/apart`);
      }
      setAddressApi(true);
    }*/
  const onClickSearch = () => {
    MapFilterRedux.updateFilterRest(initFilter);
    history.push(`/map/${currentTab}`);
  }

  const headerLogo = (isPc) => {
    return(
      <HederLogo>
        <Link to="/">
          <LogoImg src={isPc?PCLogo:Logo}/>
        </Link>
        <HeaderSearch>
          <SearchSelect onChange={(e) => setCurrentTab(e.target.value)} >
            <Option value={"apart"}>아파트</Option>
            <Option value={"officetel"}>오피스텔</Option>
            <Option value={"store"}>상가</Option>
            <Option value={"office"}>사무실</Option>
          </SearchSelect>
          <Line/>
          <SearchInput type="search" name=""/>
          <SearchBtn type="submit" onClick={() => onClickSearch() } name=""/>
        </HeaderSearch>
      </HederLogo>
    )
  }

  return (
    <Container>
      <WrapHeader>
        <PC>
          {/* -- 수정코드입니다. */}
          {headerLogo(true)}
          {/* -- 원래 코드입니다. */}
          {/*
            <HederLogo>
                <Link to="/">
                  <LogoImg src={PCLogo}/>
                </Link>
                <HeaderSearch>
                  <SearchSelect onChange={(e) => setCurrentTab(e.target.value)}>
                    <Option value={"apart"}>아파트</Option>
                    <Option value={"officetel"}>오피스텔</Option>
                    <Option value={"store"}>상가</Option>
                    <Option value={"office"}>사무실</Option>
                  </SearchSelect>
                  <Line/>
                  <SearchInput type="search" name=""/>
                  <SearchBtn type="submit" onClick={() => onClickSearch() } name=""/>
                </HeaderSearch>
            </HederLogo>
            {
              addressApi ?
              <AddressApi>
                 <CloseImg src={Close} onClick={() => setAddressApi(false)}/>
                 <AddressSearchApi setSearch_address={setSearch_address} setAddressApi={setAddressApi}/>
              </AddressApi>
              :
              null
            }
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
                  <HeaderSearch>
                    <SearchSelect>
                      <Option>아파트</Option>
                      <Option>오피스텔</Option>
                      <Option>상가</Option>
                      <Option>사무실</Option>
                    </SearchSelect>
                    <Line/>
                    <SearchInput type="search" name=""/>
                    <SearchBtn type="submit" name=""/>
                  </HeaderSearch>
              </HederLogo>
              <HeaderRight>
                <Link to="/Mypage">
                  <MyImg src={Mypage}/>
          */}

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
          {/* -- 수정코드입니다. */}
          {headerLogo(false)}
          {/* -- 원래 코드입니다. */}
          {/*
            <HederLogo>
                <Link to="/">
                  <LogoImg src={Logo}/>
                </Link>
                <HeaderSearch>
                  <SearchSelect onChange={(e) => setCurrentTab(e.target.value)}>
                    <Option value={"apart"}>아파트</Option>
                    <Option value={"officetel"}>오피스텔</Option>
                    <Option value={"store"}>상가</Option>
                    <Option value={"office"}>사무실</Option>
                  </SearchSelect> 
                  <Line/>
                  <SearchInput type="search" name=""/>
                  <SearchBtn type="submit" onClick={() => onClickSearch() } name=""/>
                </HeaderSearch>
            </HederLogo>
          */}

          <HeaderRight>
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
    height:80px;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.08);

    @media ${(props) => props.theme.mobile} {
          width:100%;
          height:calc(100vw*(64/428));
          z-index:3;
      }
`
const AddressApi = styled.div`
  position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);
  width:450px;height:auto;z-index:2;
  border:1px solid #eee;
  background:#fff;
  padding:70px 10px 0;
`
const CloseImg = styled.img`
  position:Absolute;top:20px;right:10px;
  width:18px;
  cursor:pointer;
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
          justify-content:flex-end;

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
const HeaderSearch = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  width:438px;height:40px;
  margin-left:30px;
  border-radius:9px;
  padding:0 15px 0 20px;
  background:#f8f7f7;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(263/428));
      height:calc(100vw*(40/428));
      margin-left:calc(100vw*(9/428));
      padding:0 calc(100vw*(12/428));
    }
`
const SearchSelect = styled.select`
  width:110px;height:100%;
  appearance:none;color:#ff7b01;font-size:17px;font-weight:800;transform:skew(-0.1deg);
  background:url(${Arrow}) no-repeat 90% center; background-size:16px 10px;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(85/428));
      font-size:calc(100vw*(13/428));
      padding-left:calc(100vw*(5/428));
      background:url(${Arrow}) no-repeat right center;
      background-size:calc(100vw*(8/428)) calc(100vw*(5/428));

    }
`
const Option = styled.option`
  background:#f8f7f7;
`
const SearchInput = styled.input`
  position:relative;
  background:none;
  width:70%;padding-left:10px;
  height:100%;font-size:16px;color:#4a4a4a;font-weight:700;
  transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
      padding-left:calc(100vw*(10/428));
      font-size:calc(100vw*(13/428));
      font-weight:800;
    }
`
const Line = styled.span`
  display:block;
  width:1px;height:19px;background:#707070;
  margin-left:20px;
  @media ${(props) => props.theme.mobile} {
      width:1px;height:calc(100vw*(15/428));
      margin-left:calc(100vw*(10/428));
    }
`

const SearchBtn = styled.button`
  width:30px;height:30px;
  background:url(${Search}) no-repeat center center;background-size:19px 18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(28/428));
    height:calc(100vw*(28/428));
    background-size:calc(100vw*(17/428)) calc(100vw*(16/428));
    }
`
