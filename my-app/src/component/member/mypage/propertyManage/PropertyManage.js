//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";


//css
import styled from "styled-components"

//img
import Filter from '../../../../img/member/filter.png';

import Item from '../../../../img/main/item01.png';
import Noimg from '../../../../img/member/company_no.png';
import IconSearch from '../../../../img/main/icon_search.png';
import ArrowDown from '../../../../img/member/arrow_down.png';
import Check from '../../../../img/map/radio.png';
import Checked from '../../../../img/map/radio_chk.png';

import { Mobile, PC } from "../../../../MediaQuery"

//component
import ManageList from "./ManageList";

export default function Manage({cancleModal,mapModal,confirmModal,selectModal,select,setSelect, editModal,editAllModal,editResultModal,value,type}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }

  /*data map*/
  const ManageListItem =[
    {
      Manage_id : 0,
      img:Item,
      condition:"오늘",
      number:"2D0000324",
      name:"홍길동",
      phone:"01012345678",
      address:"충남내포신도시2차대방엘리움더센트럴 7층 707호",
      kinds:"아파트",
      trade:"매매",
      price:"1억 5,000",
      type:"today"
    },
    {
      Manage_id : 1,
      img:Item,
      condition:"2일 후",
      number:"2D0000324",
      name:"홍길동",
      phone:"01012345678",
      address:"충남내포신도시2차대방엘리움더센트럴 7층 707호",
      kinds:"아파트",
      trade:"매매",
      price:"1억 5,000",
      type:"days"
    },
    {
      Manage_id : 2,
      img:Noimg,
      condition:"예약 해제",
      number:"2D0000324",
      name:"홍길동",
      phone:"01012345678",
      address:"충남내포신도시2차대방엘리움더센트럴 7층 707호",
      kinds:"아파트",
      trade:"매매",
      price:"1억 5,000",
      type:"cancle"
    },
    {
      Manage_id : 3,
      img:Noimg,
      condition:"만료",
      number:"2D0000324",
      name:"홍길동",
      phone:"01012345678",
      address:"충남내포신도시2차대방엘리움더센트럴 7층 707호",
      kinds:"아파트",
      trade:"매매",
      price:"1억 5,000",
      type:"end"
    },
]

    return (
        <Container>
          <WrapManage>
            <TopTitle>물건투어예약접수관리</TopTitle>
            <TopSortingBtn>
              <AddBtn onClick={()=> {selectModal();}}>전체</AddBtn>
            </TopSortingBtn>
            <TopInfo>
              <All>총 <GreenColor>4</GreenColor> 건</All>
              <FilterAndAdd>
                <SearchBox>
                  <InputSearch type="search" placeholder="건물,의뢰인 검색"/>
                  <SearchButton type="button"/>
                </SearchBox>
                <FilterImg src={Filter} alt="filter"/>
              </FilterAndAdd>
            </TopInfo>
            {/* 이 부분은 AddBtn의 select모달에서 하위요소가 선택됐을때 노출됩니다. */}
              {
                select ?
                <AfterSelectView>
                  <CheckBox>
                    <InputCheck type="checkbox" id="all" defaultChecked/>
                    <CheckLabel for="all">
                      <Span/>
                      전체선택
                    </CheckLabel>
                  </CheckBox>
                  <EditBtn type="button" onClick={()=>{editAllModal();}}>일괄 수정</EditBtn>
                </AfterSelectView>
                :
                null
              }
           
            <WrapManageList>
            {
            ManageListItem.map((value) => {

              const type=()=>{
                if(value.type == "today") { //오늘
                  return 1
                }else if(value.type == "days") {//2일후
                  return 1
                } else if(value.type == "cancle") { // 예약 해제
                  return 0.5
                } else if(value.type == "end") { // 만료
                  return 0.5
                }
              }
              return(
                <ManageList cancleModal={cancleModal} confirmModal={confirmModal} editModal={editModal} editResultModal={editResultModal}
                mapModal={mapModal} type={type} value={value} select={select} setSelect={setSelect}/>
              )
            })
          }
        </WrapManageList>
      </WrapManage>
  </Container>
  );
}

const Container = styled.div`
    width:680px;
    margin:0 auto;
    padding:24px 0 250px;
    @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(380/428));
      padding:calc(100vw*(30/428)) 0 calc(100vw*(150/428));
      }
`
const WrapManage = styled.div`
  width:100%;
`
const TopTitle = styled.h2`
  font-size:20px;color:#707070;
  text-align:left;padding-left:30px;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    padding-left:calc(100vw*(16/428));
    }
`
const TopSortingBtn = styled.div`
  width:100%;margin-top:30px;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(20/428));
    }
`
const TopInfo = styled.div`
  display:flex;justify-content:flex-start;align-items:center;
  padding:16px 40px;
  margin-top:20px;
  border-top:1px solid #f2f2f2;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(20/428));
    padding:calc(100vw*(10/428)) calc(100vw*(10/428));
    }
`
const All = styled.span`
  font-size:17px;color:#4a4a4a;
  font-weight:800;transform:skew(-0.1deg);
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(14/428));
    }
`
const FilterAndAdd = styled.div`
  display:flex;justify-content:flex-end; align-items:center;
  margin-left:130px;
  @media ${(props) => props.theme.mobile} {
    margin-left:calc(100vw*(60/428));
  }
`
const SearchBox = styled.div`
  display:flex;justify-content:flex-end;align-items:center;
  width: 300px;
  height: 43px;border-radius: 4px;
  margin-right:17px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(200/428));
    height:calc(100vw*(43/428));
    margin-right:calc(100vw*(13/428));
  }
`
const InputSearch = styled.input`
  width:87%;
  height:100%;
  background:transparent;
  font-size: 15px;transform:skew(-0.1deg);
  font-weight: 600;
  text-align: center;
  color: #707070;
  &::placeholder{color:#979797;font-weight:normal;}
  @media ${(props) => props.theme.mobile} {
    font-size:calc(100vw*(15/428));
  }
`
const SearchButton = styled.button`
  width:43px;height:43px;
  background:url(${IconSearch}) no-repeat center center;background-size:17px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(43/428));
    height:calc(100vw*(43/428));
    background:url(${IconSearch}) no-repeat center center;background-size:calc(100vw*(17/428));
  }
`
const AddBtn = styled.div`
  width:200px;cursor:pointer;
  height: 30px;
  border-radius: 4px;
  border: solid 1px #a3a3a3;
  line-height:26px;
  padding:0 15px;
  font-size:13px;
  font-weight:800;transform:skew(-0.1deg);
  text-align:center;
  margin-left:30px;
  color:#707070;
  background:url(${ArrowDown}) no-repeat 92% center; background-size:11px;
  @media ${(props) => props.theme.mobile} {
    padding:0 calc(100vw*(15/428));
    height:calc(100vw*(30/428));
    line-height:calc(100vw*(26/428));
    font-size:calc(100vw*(13/428));
    margin-left:calc(100vw*(16/428));
    background-size:calc(100vw*(11/428));
    }
`
const GreenColor = styled(All)`
  color:#01684b;
`
const FilterImg = styled.img`
  display:inline-block;
  width:18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
    margin-left:calc(100vw*(15/428));
  }
`
const WrapManageList = styled.ul`

`
const AfterSelectView = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding:16px 40px;border-bottom:1px solid #f2f2f2;

  @media ${(props) => props.theme.mobile} {
    padding:calc(100vw*(10/428)) calc(100vw*(10/428));
    }
`
const CheckBox = styled.div`
`
const InputCheck = styled.input`
  display:none;
  &:checked+label span{background:url(${Checked}) no-repeat;background-size:100% 100%}
`
const CheckLabel = styled.label`
  display:inline-block;
  font-size:15px;color:#707070;transform:skew(-0.1deg);
  vertical-align:middle; font-weight:600;
  @media ${(props) => props.theme.mobile} {
      font-size:calc(100vw*(15/428));
    }
`
const Span = styled.span`
   display:inline-block;
   width:20px;height:20px;
   margin-right:15px;
   background:url(${Check}) no-repeat; background-size:100% 100%;
   vertical-align:middle; 
   @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(20/428));
      height:calc(100vw*(20/428));
      margin-right:calc(100vw*(15/428));
    }
`
const EditBtn = styled.button`
  display:inline-block;
  width:80px;height:32px;
  line-height:30px;
  border-radius: 4px;
  border: solid 2px #429370;
  background-color: #01684b;
  font-size:13px;color:#fff;transform:skew(-0.1deg);
  font-weight:600;text-align:center;
  @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(80/428));
      height:calc(100vw*(32/428));
      line-height:calc(100vw*(30/428));
      font-size:calc(100vw*(13/428));
    }

`