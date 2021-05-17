//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

//css
import styled from "styled-components"
import IconSearch from '../../img/main/icon_search.png';
//components
import MbSearch from './mobilecomp/MbSearchBody';

export default function MobileSearch({currentTab}) {

  
  return (
    <Container>
        <WrapMainSearch>
            <MainSearch>
              <SearchInput type="text" name="" placeholder="지역,지하철,대학교,물건명 검색"/>
              {/* <Link to="/Map/:text"> */}
              <Link to={`/Map/${currentTab}`}>
                <SearchBtn type="submit" name=""/>
              </Link>
            </MainSearch>
        </WrapMainSearch>
    </Container>
  );
}
const Container = styled.div`
`
const WrapMainSearch = styled.div`
  position:relative;
  width:100%;
  height:auto;
  border-radius:9px;
  /*border:1px solid #D0D0D0;*/
`
const MainSearch = styled.div`
  display:inline-flex;
  justify-content:space-between;
  align-items:center;
  width:100%;
  height:48px;
  background:#f8f7f7;
  padding:13px 23.3px 14px 34px;
  box-sizing:border-box;
  border-radius:9px;

  @media ${(props) => props.theme.mobile} {
      height:calc(100vw*(43/428));
      padding:calc(100vw*(11/428)) calc(100vw*(21/428)) calc(100vw*(13/428)) calc(100vw*(27/428));
    }
`
const SearchInput = styled.input`
  width:375px;
  background:none;
  font-size:16px;
  transform: skew(-0.1deg);
  color:#707070;
  font-weight:bold;
  &::placeholder{color:#979797;}

  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(280/428));
      font-size:calc(100vw*(14/428));
    }
`
const SearchBtn = styled.button`
  width:30px;
  height:30px;
  background:transparent url(${IconSearch}) no-repeat center center;
  background-size:19px 18px;

  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(30/428));
      height:calc(100vw*(30/428));
      font-size:calc(100vw*(14/428));
      background-size:calc(100vw*(16/428)) calc(100vw*(15/428));
    }
`

const SearchResult = styled.div`
  position:Absolute;
  width:100%;
  height:460px;
  top:44px;
  @media ${(props) => props.theme.container} {
      width:90%;
      height:calc(100vw*(460/1436));
    }
  @media ${(props) => props.theme.mobile} {
      display:none;
    }
`
const NoneHisto = styled.div`
  position:absolute;
  left:50%;
  transform:translateX(-50%);
  top:0;
  display:flex;justify-content:space-between;
  width:1029px;
  height:460px;
  background:#fff;
  padding:26px 20px;
  border:1px solid #e2e2e2;
  z-index:2;
`
const SearchArea = styled.div`
  width:301px;
`
const TopTxt = styled.div`
  position:relative;
  width:100%;
  font-size:16px;
  color:#4a4a4a;
  padding-bottom:15px;
  padding-left:20px;
  font-weight:600;
  transform:skew(-0.1deg);
  &:after{
    position:absolute;left:0;bottom:0px;content:'';display:block;
    width:100%;height:1px;
    border-bottom:1px solid #4a4a4a;}
`
const SearchSubway = styled(SearchArea)`
`
const SearchUniv = styled(SearchArea)`
`
const Line = styled.div`
  width:1px; height:100%;background:#f2f2f2;
`
const NoneHistory = styled.p`
  position:absolute;
  left:50%;
  top:186px;
  transform:translateX(-50%) skew(-0.1deg);
  font-size:14px;color:#979797;font-weight:600;
`
const WrapDeleteBtn = styled.div`
  position:absolute;
  right:16px;
  bottom:10px;
  z-index:3;
`
const DeleteMsg = styled.p`
  display:inline-block;
  font-size:13px;
  margin-left:11px;
  height:18px;
  line-height:18px;
  font-weight:600;
  color:#898989;transform:skew(-0.1deg);
`
const HaveHisto = styled.div`
  position:absolute;
  width:400px;
  padding:33px 36px;
  top:0px;
  left:0;
  height:460px;
  background:#fff;border:1px solid #e2e2e2;box-sizing:border-box;
  z-index:2;
`
const History = styled.ul`

`
const HistoryList = styled.li`
  font-size:16px;
  font-weight:600;
  transform:skew(-0.1deg);
  color:#4a4a4a;
  margin-bottom:10px;
`
const SearchList = styled.ul`
  padding:0 22px;
  width:100%;
  margin-top:17px;
`
const Listtxt = styled(HistoryList)`
`
