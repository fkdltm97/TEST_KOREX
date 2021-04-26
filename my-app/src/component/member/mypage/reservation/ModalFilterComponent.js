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

//필터 모달
export default function Reserve({filter,setFilter}) {
  //Filter내 셀렉트 박스
  const [filterSelect,setFilterSelect] = useState(false);
  const [filterSelect2,setFilterSelect2] = useState(false);

  const showFilterSelect = ()=>{
    setFilterSelect(!filterSelect);
  }
  const showFilterSelect2 = ()=>{
    setFilterSelect2(!filterSelect2);
  }

  if(filter == false)
    return null;
  //Filter 모달창
    return (
        <Container>
              <>
              {/*정렬기준 select*/}
                <FilterBox>
                  <FilterLabel>정렬기준</FilterLabel>
                  <FilterSelectSort>
                    <FilterSelectSortList>
                      <InOption>최신등록순</InOption>
                      <InOption>과거등록순</InOption>
                      <InOption>가나다순</InOption>
                    </FilterSelectSortList>
                  </FilterSelectSort>
                </FilterBox>
              {/*상태 select*/}
                <FilterBox>
                  <FilterLabel>상태</FilterLabel>
                  <FilterSelectCondition>
                    <FilterSelectConditionList>
                      <InOption>전체</InOption>
                      <InOption>오늘</InOption>
                      <InOption>내일</InOption>
                      <InOption>예약취소</InOption>
                      <InOption>만료</InOption>
                    </FilterSelectConditionList>
                  </FilterSelectCondition>
                </FilterBox>
              </>
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
  margin-bottom:40px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(40/428));
  }
`
const ModalMapTitle = styled.h3`
  font-size:20px;font-weight:800;color:#707070;
  transform:skew(-0.1deg);
  padding-bottom:20px;
  border-bottom:1px solid #707070;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(15/428));
    padding-bottom:calc(100vw*(15/428));
  }
`
const InMapBox = styled.div`
  width:100%;height:100%;
  background:#eee;
`
const WrapFilterSelect = styled.div`
  width:100%;
`
const FilterBox = styled.div`
  position:relative;
  width:100%;
  margin-bottom:20px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(20/428));
  }
`
const FilterLabel = styled.label`
  display:inline-block;
  font-size:12px;color:#4a4a4a;
  transform:skew(-0.1deg);
  font-family:'nbg', sans-serif;
  margin-bottom:9px;
  padding-left:3px;
  @media ${(props) => props.theme.modal} {
    margin-bottom:calc(100vw*(9/428));
    font-size:calc(100vw*(12/428));
    padding-left:calc(100vw*(3/428));
  }
`
const FilterSelectSort = styled.div`
  width:100%;

`
const FilterSelectCondition = styled(FilterSelectSort)`
  z-index:99;
`
const FilterSelectSortList = styled.select`
  width:100%;
  height:43px;
  text-align-last:center;
  font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
  border-radius:4px;border:1px solid #a3a3a3;
  background:#fff;
  appearance:none;
  background:url(${ArrowDown}) no-repeat 400px center;background-size:11px;
  @media ${(props) => props.theme.modal} {
    font-size:calc(100vw*(14/428));
    height:calc(100vw*(43/428));
    background:url(${ArrowDown}) no-repeat 90% center;background-size:calc(100vw*(11/428));
  }
`
const Option = styled.option`
  font-family:'nbg',sans-serif;

`
const InOption = styled(Option)`
  padding:8px 0;
  background:#fff;
  &:hover{background:#f8f7f7;}
  @media ${(props) => props.theme.modal} {
    padding:calc(100vw*(8/428)) 0;
  }
`
const FilterSelectConditionList = styled(FilterSelectSortList)`
`
const WrapFilterButtons = styled.div`
  position:Absolute;
  left:50%;bottom:60px;transform:translateX(-50%);
  width:100%;
  display:flex;justify-content:center;align-items:center;
  @media ${(props) => props.theme.modal} {
    bottom:calc(100vw*(40/428));
  }
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
  @media ${(props) => props.theme.modal} {
    width:calc(100vw*(180/428));
    height:calc(100vw*(60/428));
    line-height:calc(100vw*(54/428));
    font-size:calc(100vw*(15/428));
  }
`
const SaveBtn = styled(ResetBtn)`
  background:#01684b;
  border:3px solid #04966d;
  margin-left:8px;
  @media ${(props) => props.theme.modal} {
    margin-left:calc(100vw*(10/428));

  }
`
