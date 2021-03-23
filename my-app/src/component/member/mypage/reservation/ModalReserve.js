//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Filter from '../../../../img/member/filter.png';
import Bell from '../../../../img/member/bell.png';
import BellActive from '../../../../img/member/bell_active.png';
import Location from '../../../../img/member/loca.png';
import Set from '../../../../img/member/setting.png';
import Item from '../../../../img/main/item01.png';
import Noimg from '../../../../img/main/main_icon3.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';

//물건투어 예약 수정모달
export default function ModalMapReserve({ reserve, setReserve }) {
  if(reserve == false)
    return null;
    return (
        <Container>
          <WrapModalMap>
            <ModalMapBg onClick={()=>{setMap(false)}}/>
            <ModalMap>
              <MapCloseBtn>
                <Link onClick={()=>{setMap(false)}}>
                  <MapCloseImg src={Close}/>
                </Link>
              </MapCloseBtn>
              <ModalMapTitle>건물위치</ModalMapTitle>
              <ModalMapAddress>
                <AddressTxt>서울시 구로구 신도림동 131-13 103동</AddressTxt>
                <ChangeAddress>
                  <Link>
                    <ChangeImg src={Change}/>
                    <ChangeTxt>도로명</ChangeTxt>
                  </Link>
                </ChangeAddress>
              </ModalMapAddress>
              <ShowMap>
                <InMapBox></InMapBox>
                <MapMarker>
                  <MapMarkerImg src={Marker}/>
                </MapMarker>
              </ShowMap>
            </ModalMap>
          </WrapModalMap>
        </Container>
  );
}

const Pb = styled.b`
  display:block;
  @media ${(props) => props.theme.mobile} {
        display:inline;
    }
`
const Mb = styled.b`
  display:inline;
  @media ${(props) => props.theme.mobile} {
        display:block;
    }
`
const Container = styled.div`
    width:100%;

`

const WrapModalMap = styled.div`
  width:100%;
`
const ModalMapBg = styled.div`
  width:100%;height:100%;
  position:fixed;left:0;top:0;
  background:rgba(0,0,0,0.2);
  display:block;content:'';
  z-index:2;
`
const ModalMap = styled.div`
  position:absolute;
  left:50%;top:50%;transform:translate(-50%,-50%);
  width:535px;border-radius:24px;
  border:1px solid #f2f2f2;
  background:#fff;
  padding:49px 50px 60px 50px;
  z-index:3;
`
const MapCloseBtn = styled.div`
  width:100%;text-align:right;
  margin-bottom:22px;
`
const MapCloseImg = styled.img`
  display:inline-block;width:15px;
`
const ModalMapTitle = styled.h3`
  font-size:20px;font-weight:800;color:#707070;
  transform:skew(-0.1deg);
  padding-bottom:20px;
  border-bottom:1px solid #707070;
`
const ModalMapAddress = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding:16px 5px;
`
const AddressTxt = styled.p`
  font-size:15px;color:#4a4a4a;font-weight:800;
  transform:skew(-0.1deg);
`
const ChangeAddress = styled.div`

`
const ChangeImg = styled.img`
  display:inline-block;
  width:15px;
`
const ChangeTxt = styled.p`
  display:inline-block;
  font-size:10px;font-weight:800;
  transform:skew(-0.1deg);color:#979797;
  margin-left:8px;
  margin-top:2px;
`
const ShowMap = styled.div`
  width:100%;height:240px;
  position:relative;
`
const InMapBox = styled.div`
  width:100%;height:100%;
  background:#eee;
`
const MapMarker = styled.div`
  position:absolute;
  width:50px;height:66px;
  left:60%;
  bottom:20px;
`
const MapMarkerImg = styled.img`
  display:inline-block;width:100%;height:100%;
`
const WrapFilterModal = styled(WrapModalMap)`
`
const ModalFilterBg = styled(ModalMapBg)`
`
const ModalFilter = styled(ModalMap)`
  height:520px;
`
const FilterCloseBtn = styled(MapCloseBtn)`
`
const FilterCloseImg = styled(MapCloseImg)`
`
const ModalFilterTitle = styled(ModalMapTitle)`
  margin-bottom:12px;
`
const WrapFilterSelect = styled.div`
  width:100%;
`
const FilterBox = styled.div`
  position:relative;
  width:100%;
  margin-bottom:70px;
  &:last-child{margin-bottom:0;}
`
const FilterLabel = styled.label`
  font-size:12px;color:#4a4a4a;
  transform:skew(-0.1deg);
  font-family:'nbg', sans-serif;
  margin-bottom:9px;
`
const FilterSelectSort = styled.div`
  position:Absolute;
  top:22px;
  width:100%;
  text-align:center;
  font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
  border-radius:4px;border:1px solid #a3a3a3;
  background:url(${ArrowDown}) no-repeat 400px 16px; background-size:13px 8px;
  z-index:9999;
`
const FilterSelectCondition = styled(FilterSelectSort)`
  z-index:99;
`
const FilterSelectSortList = styled.div`

  width:100%;
`
const Option = styled.div`
  padding:12px 0;
  text-align:center;
  cursor:pointer;
  transition:all 0.3s;

`
const InOption = styled(Option)`
  padding:8px 0;
  background:#fff;
  &:hover{background:#f8f7f7;}
`
const FilterSelectConditionList = styled(FilterSelectSortList)`
  top:200px;
  height:100px;
  overflow-y:scroll;
`
const WrapFilterButtons = styled.div`
  position:Absolute;
  left:50%;bottom:78px;transform:translateX(-50%);
  width:100%;
  display:flex;justify-content:center;align-items:center;
`
const ResetBtn = styled.button`
  width: 200px;
  height: 66px;
  border-radius: 11px;
  border: solid 3px #e4e4e4;
  background: #979797;
  line-height:60px;color:#fff;
  font-size:20px;font-weight:800;transform:skew(-0.1deg);
  text-align:center;
`
const SaveBtn = styled(ResetBtn)`
  background:#01684b;
  border:3px solid #04966d;
  margin-left:8px;
`
