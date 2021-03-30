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
          <WrapFilterModal>
            <ModalFilterBg onClick={() => {setFilter(false)}}/>
            <ModalFilter>
              <FilterCloseBtn>
                <Link onClick={() => {setFilter(false)}}>
                  <FilterCloseImg src={Close}/>
                </Link>
              </FilterCloseBtn>
              <ModalFilterTitle>필터</ModalFilterTitle>
              <WrapFilterSelect>
              {/*정렬기준 select*/}
                <FilterBox>
                  <FilterLabel>정렬기준</FilterLabel>
                  <FilterSelectSort>
                    <Link onClick={showFilterSelect}>
                      <Option>최신등록순</Option>{/*여기에 FilterSelectList 값이 담기면 될 것 같습니다..될까요?ㅠㅠ*/}
                        {
                          filterSelect ?
                          <FilterSelectSortList>
                            <InOption>최신등록순</InOption>
                            <InOption>과거등록순</InOption>
                            <InOption>가나다순</InOption>
                          </FilterSelectSortList>
                          :
                          null
                        }
                    </Link>
                  </FilterSelectSort>
                </FilterBox>
              {/*상태 select*/}
                <FilterBox>
                  <FilterLabel>상태</FilterLabel>
                  <FilterSelectCondition>
                    <Link onClick={showFilterSelect2}>
                      <Option>전체</Option>{/*여기에 FilterSelectList 값이 담기면 될 것 같습니다..될까요?ㅠㅠ*/}
                        {
                          filterSelect2 ?
                          <FilterSelectConditionList>
                            <InOption>전체</InOption>
                            <InOption>오늘</InOption>
                            <InOption>내일</InOption>
                            <InOption>예약취소</InOption>
                            <InOption>만료</InOption>
                          </FilterSelectConditionList>
                          :
                          null
                        }
                    </Link>
                  </FilterSelectCondition>
                </FilterBox>
              </WrapFilterSelect>
              {/*버튼*/}
              <WrapFilterButtons>
                <ResetBtn type="button" name="">초기화</ResetBtn>
                <SaveBtn type="submit" name="">적용</SaveBtn>
              </WrapFilterButtons>
            </ModalFilter>
          </WrapFilterModal>
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
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(395/428));
    padding:calc(100vw*(33/428)) calc(100vw*(15/428));
  }
`
const MapCloseBtn = styled.div`
  width:100%;text-align:right;
  margin-bottom:22px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(22/428));
  }
`
const MapCloseImg = styled.img`
  display:inline-block;width:15px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(12/428));
  }
`
const ModalMapTitle = styled.h3`
  font-size:20px;font-weight:800;color:#707070;
  transform:skew(-0.1deg);
  padding-bottom:20px;
  border-bottom:1px solid #707070;
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
    padding-bottom:calc(100vw*(15/428));
  }
`

const InMapBox = styled.div`
  width:100%;height:100%;
  background:#eee;
`
const WrapFilterModal = styled(WrapModalMap)`
`
const ModalFilterBg = styled(ModalMapBg)`
`
const ModalFilter = styled(ModalMap)`
  height:520px;
  @media ${(props) => props.theme.mobile} {
    height:calc(100vw*(458/428));
  }
`
const FilterCloseBtn = styled(MapCloseBtn)`
`
const FilterCloseImg = styled(MapCloseImg)`
`
const ModalFilterTitle = styled(ModalMapTitle)`
  margin-bottom:12px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(12/428));
  }
`
const WrapFilterSelect = styled.div`
  width:100%;
`
const FilterBox = styled.div`
  position:relative;
  width:100%;
  margin-bottom:70px;
  &:last-child{margin-bottom:0;}
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(67/428));
  }
`
const FilterLabel = styled.label`
  font-size:12px;color:#4a4a4a;
  transform:skew(-0.1deg);
  font-family:'nbg', sans-serif;
  margin-bottom:9px;
  @media ${(props) => props.theme.mobile} {
    margin-bottom:calc(100vw*(9/428));
    font-size:calc(100vw*(12/428));
  }
`
const FilterSelectSort = styled.div`
  position:Absolute;
  top:22px;
  width:100%;
  text-align:center;
  font-size:15px;color:#4a4a4a;transform:skew(-0.1deg);
  border-radius:4px;border:1px solid #a3a3a3;
  background:#fff;
  z-index:9999;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(22/428));
    font-size:calc(100vw*(14/428));
  }
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
  background:url(${ArrowDown}) no-repeat 400px 16px;
  background-size:13px 8px;
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(12/428)) 0;
    background:url(${ArrowDown}) no-repeat calc(100vw*(320/428)) calc(100vw*(16/428)); background-size:calc(100vw*(13/428)) calc(100vw*(8/428));
  }

`
const InOption = styled(Option)`
  padding:8px 0;
  background:#fff;
  &:hover{background:#f8f7f7;}
  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(8/428)) 0;
  }
`
const FilterSelectConditionList = styled(FilterSelectSortList)`
  top:200px;
  height:100px;
  overflow-y:scroll;
  @media ${(props) => props.theme.mobile} {
    top:calc(100vw*(200/428));
    height:calc(100vw*(100/428));
  }
`
const WrapFilterButtons = styled.div`
  position:Absolute;
  left:50%;bottom:78px;transform:translateX(-50%);
  width:100%;
  display:flex;justify-content:center;align-items:center;
  @media ${(props) => props.theme.mobile} {
    bottom:calc(100vw*(72/428));
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
  @media ${(props) => props.theme.mobile} {
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
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(10/428));

  }
`
