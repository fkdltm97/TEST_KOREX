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
import Noimg from '../../../../img/member/company_no.png';
import Close from '../../../../img/main/modal_close.png';
import Change from '../../../../img/member/change.png';
import Marker from '../../../../img/member/marker.png';
import ArrowDown from '../../../../img/member/arrow_down.png';
import IconSearch from '../../../../img/main/icon_search.png';

import { Mobile, PC } from "../../../../MediaQuery"

//server process
import serverController from '../../../../server/serverController';

//component
import PropertyList from "./PropertyList";

import CommonTopInfo from '../../../../component/member/mypage/commonList/commonTopInfo';

export default function Propertymanage({setFilter,updateModal,value,type}) {

  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const [brokerRequest_productlist,setBrokerRequest_productlist] = useState([]);
  const showModal =()=>{
    setMenu(!menu);
  }

  /*data map*/
  const PropertyListItem =[
    {
      prd_id : 0,
      prd_img:Item,
      prd_exculsive_start_date:"21.00.00",
      prd_exculsive_end_date : '21.00.08',
      product_create_origin:"1",
      prd_status:"검토대기",
      number:"2D0000324",
      prd_name:"충남내포신도시2차대방엘리움더센트럴",
      prd_type:"아파트",
      prd_name:"충남내포신도시2차대방엘리움더센트럴",
      prd_sel_type:"매매",
      request_mem_name:"홍길동", 
    },
    {
      prd_id : 1,
      prd_img:Item,
      prd_exculsive_start_date:"2021.00.00",
      prd_exculsive_end_date:"2021.00.00",
      product_create_origin:"2",
      prd_status:"검토대기",
      number:"2D0000324",
      prd_name:"충남내포신도시2차대방엘리움더센트럴",
      prd_type:"아파트",
      prd_name:"충남내포신도시2차대방엘리움더센트럴",
      prd_sel_type:"매매",
      request_mem_name:"홍길동"
    }
  ]
   //이 부분 오류나서 주석처리해놨습니다!
   useEffect( async () => {
     console.log('최초 한번 실행, 해당 로그인 memid(companyid전문중개사)에 해당하는 중개사에게 누구누구리스트가 의뢰한건지 어떤매물들이(등록이전) 등록된건지조회');

     let body_info={

     };

     let res_result=await serverController.connectFetchController('/api/broker/BrokerRequest_productlist','POST',JSON.stringify(body_info));
     console.log('brokerRequest_prouductlist load res_result:',res_result);

     setBrokerRequest_productlist(res_result.result_data);
    
   },[]);


  const topInfoContent = () => {
    return(
      <FilterAndAdd>
        <SearchBox>
          <InputSearch type="search" placeholder="건물,의뢰인 검색"/>
          <SearchButton type="button"/>
        </SearchBox>
        <FilterImg onClick={()=>{setFilter(true);updateModal();}} src={Filter} alt="filter"/>
        <Link to="/AddProperty">
          <AddBtn>추가</AddBtn>
        </Link>
      </FilterAndAdd>
    )
  }

    return (
        <Container>
          <WrapRequest>
            <TopTitle>물건관리</TopTitle>
            <CommonTopInfo length={brokerRequest_productlist.length} leftComponent={topInfoContent()}/>
            {/*
              <TopInfo>
                <All>총 <GreenColor>{brokerRequest_productlist.length}</GreenColor> 건</All>
                <FilterAndAdd>
                  <SearchBox>
                    <InputSearch type="search" placeholder="건물,의뢰인 검색"/>
                    <SearchButton type="button"/>
                  </SearchBox>
                  <FilterImg onClick={()=>{setFilter(true);updateModal();}} src={Filter} alt="filter"/>
                  <Link to="/AddProperty">
                    <AddBtn>추가</AddBtn>
                  </Link>
                </FilterAndAdd>
              </TopInfo>
            */}
            <WrapPropertyList>
            {
            brokerRequest_productlist.map((value) => {

              let result_item=value[0];
              console.log('result_item:',result_item);
              const type=()=>{
                if(result_item.product_create_origin == '중개의뢰' || result_item.product_create_origin == 1) { 
                  return "#fe7a01"
                }else if(result_item.product_create_origin == '외부수임') {
                  return "#01684b"
                }
              }

              return(
                <PropertyList setFilter={setFilter} type={type} value={result_item}/>
              )
            })
          }
        </WrapPropertyList>

      </WrapRequest>
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
    width:680px;
    margin:0 auto;
    padding:24px 0 250px;
    @media ${(props) => props.theme.mobile} {
      width:calc(100vw*(380/428));
      padding:calc(100vw*(30/428)) 0 calc(100vw*(150/428));
      }
`
const WrapRequest = styled.div`
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
const TopInfo = styled.div`
  display:flex;justify-content:space-between;align-items:center;
  padding:16px 40px;
  margin-top:30px;
  border-top:1px solid #f2f2f2;
  border-bottom:1px solid #f2f2f2;
  @media ${(props) => props.theme.mobile} {
    margin-top:calc(100vw*(30/428));
    padding:calc(100vw*(22/428)) calc(100vw*(10/428));
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
`
const SearchBox = styled.div`
  display:flex;justify-content:flex-end;align-items:center;
  width: 300px;
  height: 43px;border-radius: 4px;
  margin-right:17px;
  border: solid 1px #e4e4e4;
  background-color: #ffffff;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(158/428));
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
  width: 81px;
  height: 30px;
  border-radius: 4px;
  border: solid 2px #f0a764;
  background-color: #fe7a01;
  line-height:26px;
  font-size:13px;
  font-weight:800;transform:skew(-0.1deg);
  text-align:center;
  margin-left:15px;
  color:#fff;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(80/428));
    height:calc(100vw*(30/428));
    line-height:calc(100vw*(26/428));
    font-size:calc(100vw*(13/428));
    margin-left:calc(100vw*(15/428));
    }
`
const GreenColor = styled(All)`
  color:#01684b;
`
const FilterImg = styled.img`
  display:inline-block;
  width:18px;cursor:pointer;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
  }
`
const WrapPropertyList = styled.ul`
  width:100%;
`
