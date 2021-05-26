// //react
// import React ,{useState, useEffect} from 'react';
// import {Link} from "react-router-dom";


// //css
// import styled from "styled-components"

// //img
// import Filter from '../../../../img/member/filter.png';
// import Bell from '../../../../img/member/bell.png';
// import BellActive from '../../../../img/member/bell_active.png';
// import Location from '../../../../img/member/loca.png';
// import Set from '../../../../img/member/setting.png';
// import Item from '../../../../img/main/item01.png';
// import Noimg from '../../../../img/member/company_no.png';
// import Close from '../../../../img/main/modal_close.png';
// import Change from '../../../../img/member/change.png';
// import Marker from '../../../../img/member/marker.png';
// import ArrowDown from '../../../../img/member/arrow_down.png';

// import { Mobile, PC } from "../../../../MediaQuery"

// import serverController from '../../../../server/serverController';


// //component
// import RequestListPage from "./RequestList";
// import RequestSorting from "./RequestSorting";

// import CommonTopInfo from '../../../../component/member/mypage/commonList/commonTopInfo';

// //redux addons assets;
// import {useSelector } from 'react-redux';


// export default function Request({mannerModal,startModal,cancleModal,completeModal,cancle2Modal,setFilter,value,type}) {

   
//   //... 눌렀을때(메뉴)
//   const [menu,setMenu] = useState(false);
//   const showModal =()=>{
//     setMenu(!menu);
//   }
//   const [brokerproductlist,setBrokerproductlist]= useState([]);
//   const [is_serveron,setIs_serveron] = useState(false);

//   const login_user_redux = useSelector(data => data.login_user);//로그인 정보 저장 리덕스.로그인 mem_id조회.
//   console.log('myRequest 내 중개의뢰 리스트 페이지 도달,내가 중개의뢰한(상품들 products조회):중개의뢰타입인것들만 조회한다.',login_user_redux);
  
//   useEffect( async () => {
//      //어떤 요청의뢰자가 등록/의뢰 로 인해서 생성된 매물들인지 구한다. 현재 테이블 구조상 prd_id수정히스토리도 다루고있기에 request_memid에 대한 내역 여러개 있을수있고(같은 매물에 대해서) prd_idneity_id distinct필요해보임(그룹핑) 보낼것은 마이페이지 로그인mem_id일것임.
//      /*let login_res=await serverController.connectFetchController('/api/auth/islogin','get');
//     console.log('islogin request result myrequest>>>',login_res,login_res.login_session);
//     */
//     let body_info ={
//     };
//     console.log('>>>>post parameter list:',body_info);
//     try{
//       let res=await serverController.connectFetchController('/api/broker/user_brokerRequestlistview','post',JSON.stringify(body_info));
//       console.log('res_result:',res);
//       //alert(res);

//       if(res){
//         setIs_serveron(true);
//       }else{
//         setIs_serveron(false);
//       }
//       setBrokerproductlist(res.result_data);
//     }catch(e){

//     }
//   },[]);//상태변화시마다 실행은 아니고 로드시점 최초한번.
//   console.log('-===>>>page load broerk_proudctlist value:',brokerproductlist);

//   /*data map*/
//   const RequestListItem =[
//     {
//       prd_identity_id : 0,
//       prd_img:Item,
//       date:"21.00.00 - 21.00.00",
//       prd_status:"검토 대기",
//       modify_date:"2021.00.00",
//       prd_name:"충남내포신도시2차대방엘리움더센트럴",
//       prd_type:"아파트",
//       address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
//       address_detail: "자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
//       prd_sel_type:"매매",
//     },
//     {
//       prd_identity_id : 1,
//       prd_img:Item,
//       date:"21.00.00 - 21.00.00",
//       prd_status:"거래 준비",
//       modify_date:"2021.00.00",
//       prd_name:"충남내포신도시2차대방엘리움더센트럴",
//       prd_type:"아파트",
//       address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)  강남구 서초동 서초동 서초동",
//       address_detail:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)  강남구 서초동 서초동 서초동",
//       prd_sel_type:"매매"
//     },
//     {
//       prd_identity_id : 2,
//       prd_img:Noimg,
//       date:"21.00.00 - 21.00.00",
//       prd_status:"의뢰 철회",
//       modify_date:"2021.00.00",
//       prd_name:"충남내포신도시2차대방엘리움더센트럴",
//       prd_type:"아파트",
//       address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
//       address_detail:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
//       prd_sel_type:"매매",
//     },
//     {
//       prd_identity_id : 3,
//       prd_img:Noimg,
//       date:"21.00.00 - 21.00.00",
//       prd_status:"위임 취소",
//       modify_date:"2021.00.00",
//       prd_name:"충남내포신도시2차대방엘리움더센트럴",
//       prd_type:"아파트",
//       address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
//       address_detail:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
//       prd_sel_type:"매매",
//     }
// ]

//   const topInfoContent = () => {
//     return(
//       <FilterAndAdd>
//       <Link to="/AddRequest">
//         <AddBtn>추가</AddBtn>
//       </Link>
//     </FilterAndAdd>
//     )
//   }

//     return (
//         <Container>
//           <WrapRequest>
//             <TopTitle>내 중개의뢰</TopTitle>
//             <RequestSorting/>{/*컴포넌트입니다*/}

//             {/* 수정코드입니다. */}
//             <CommonTopInfo length={is_serveron == true ? brokerproductlist.length : RequestListItem.length} leftComponent={topInfoContent()}/>
//             {/* -- 원래 코드입니다. */}
//             {/*
//               <TopInfo>
//                 <All>총 <GreenColor>{ is_serveron == true ? brokerproductlist.length : RequestListItem.length}</GreenColor> 건</All>
//                 <FilterAndAdd>
//                   <Link to="/AddRequest">
//                     <AddBtn>추가</AddBtn>
//                   </Link>
//                 </FilterAndAdd>
//               </TopInfo>
//             */}

//             <RequestList>
//               {console.log('server logon or error여부 :',is_serveron)}
//             {
              
//             is_serveron == false &&  RequestListItem.length > 0 ?
//             RequestListItem.map((value) => {

//               const type=()=>{
//                 if(value.prd_status == "검토 대기") { //검토대기
//                   return 1
//                 }else if(value.prd_status == "거래 준비") {//거래준비
//                   return 1
//                 } else if(value.prd_status == "의뢰 철회") { // 의뢰 철회
//                   return 0.5
//                 } else if(value.prd_status == "위임 취소") { // 위임 취소
//                   return 0.5
//                 }
//               }

//               return(
//                 <RequestListPage mannerModal={mannerModal} cancleModal={cancleModal} startModal={startModal} cancle2Modal={cancle2Modal} completeModal={completeModal} type={type} value={value}/>
//               )
//             })
//             :
//             null
//           }
          
//           {
//             is_serveron == true && brokerproductlist.length > 0 ? 
//             brokerproductlist.map((value) => {

//               const type=()=>{
//                 if(value[0].prd_status == '대기' || value[0].prd_status=='검토대기'){
//                   return 1
//                 }else if(value[0].prd_status == '거래준비'){
//                   return 1
//                 }else if(value[0].prd_status == '의뢰철회'){
//                   return 0.5
//                 }else if(value[0].prd_status == '위임취소'){
//                   return 0.5
//                 }
//               }

//               return(
//                 <RequestListPage setFilter={setFilter} type={type} value={value[0]}/>
//               )
              
//             })
//             :null
//           }

//         </RequestList>
//       </WrapRequest>
//   </Container>
//   );
// }

// const Pb = styled.b`
//   display:block;
//   @media ${(props) => props.theme.mobile} {
//         display:inline;
//     }
// `
// const Mb = styled.b`
//   display:inline;
//   @media ${(props) => props.theme.mobile} {
//         display:block;
//     }
// `
// const Container = styled.div`
//     width:680px;
//     margin:0 auto;
//     padding:24px 0 250px;
//     @media ${(props) => props.theme.mobile} {
//       width:calc(100vw*(380/428));
//       padding:calc(100vw*(30/428)) 0 calc(100vw*(150/428));
//       }
// `
// const WrapRequest = styled.div`
//   width:100%;
// `
// const TopTitle = styled.h2`
//   font-size:20px;color:#707070;
//   text-align:left;padding-left:30px;
//   font-weight:800;transform:skew(-0.1deg);
//   @media ${(props) => props.theme.mobile} {
//     font-size:calc(100vw*(14/428));
//     padding-left:calc(100vw*(16/428));
//     }
// `
// const TopInfo = styled.div`
//   display:flex;justify-content:space-between;align-items:center;
//   padding:16px 40px;
//   margin-top:30px;
//   border-top:1px solid #f2f2f2;
//   border-bottom:1px solid #f2f2f2;
//   @media ${(props) => props.theme.mobile} {
//     margin-top:calc(100vw*(30/428));
//     padding:calc(100vw*(22/428)) calc(100vw*(10/428));
//     }
// `
// const All = styled.span`
//   font-size:17px;color:#4a4a4a;
//   font-weight:800;transform:skew(-0.1deg);
//   @media ${(props) => props.theme.mobile} {
//     font-size:calc(100vw*(14/428));
//     }
// `
// const FilterAndAdd = styled.div`
//   display:flex;justify-content:flex-start; align-items:center;
// `
// const AddBtn = styled.div`
//   width: 81px;
//   height: 30px;
//   border-radius: 4px;
//   border: solid 2px #f0a764;
//   background-color: #fe7a01;
//   line-height:26px;
//   font-size:13px;
//   font-weight:800;transform:skew(-0.1deg);
//   text-align:center;
//   margin-left:15px;
//   color:#fff;
//   @media ${(props) => props.theme.mobile} {
//     width:calc(100vw*(80/428));
//     height:calc(100vw*(30/428));
//     line-height:calc(100vw*(26/428));
//     font-size:calc(100vw*(13/428));
//     margin-left:calc(100vw*(15/428));
//     }
// `
// const GreenColor = styled(All)`
//   color:#01684b;
// `
// const FilterImg = styled.img`
//   display:inline-block;
//   width:18px;
//   @media ${(props) => props.theme.mobile} {
//     width:calc(100vw*(18/428));
//   }
// `
// const RequestList = styled.ul`
//   width:100%;
// `

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

import { Mobile, PC } from "../../../../MediaQuery"

import serverController from '../../../../server/serverController';


//component
import RequestListPage from "./RequestList";
import RequestSorting from "./RequestSorting";
import ModalAddUserInfo from './modal/ModalAddUserInfo';
import CommonTopInfo from '../../../../component/member/mypage/commonList/commonTopInfo';

//redux addons assets;
import {useSelector } from 'react-redux';


export default function Request({mannerModal,startModal,filterModal,cancleModal,completeModal,cancle2Modal,setFilter,value,type}) {

   
  //... 눌렀을때(메뉴)
  const [menu,setMenu] = useState(false);
  const showModal =()=>{
    setMenu(!menu);
  }
  const [brokerproductlist,setBrokerproductlist]= useState([]);
  const [is_serveron,setIs_serveron] = useState(false);

  const [userInfo,setUserInfo] = useState(false);

  const login_user_redux = useSelector(data => data.login_user);//로그인 정보 저장 리덕스.로그인 mem_id조회.
  console.log('myRequest 내 중개의뢰 리스트 페이지 도달,내가 중개의뢰한(상품들 products조회):중개의뢰타입인것들만 조회한다.',login_user_redux);
  
  useEffect( async () => {
     //어떤 요청의뢰자가 등록/의뢰 로 인해서 생성된 매물들인지 구한다. 현재 테이블 구조상 prd_id수정히스토리도 다루고있기에 request_memid에 대한 내역 여러개 있을수있고(같은 매물에 대해서) prd_idneity_id distinct필요해보임(그룹핑) 보낼것은 마이페이지 로그인mem_id일것임.
     /*let login_res=await serverController.connectFetchController('/api/auth/islogin','get');
    console.log('islogin request result myrequest>>>',login_res,login_res.login_session);
    */
    let body_info ={
    };
    console.log('>>>>post parameter list:',body_info);
    try{
      let res=await serverController.connectFetchController('/api/broker/user_brokerRequestlistview','post',JSON.stringify(body_info));
      console.log('res_result:',res);
      //alert(res);

      if(res){
        setIs_serveron(true);
      }else{
        setIs_serveron(false);
      }
      setBrokerproductlist(res.result_data);
    }catch(e){

    }
  },[]);//상태변화시마다 실행은 아니고 로드시점 최초한번.
  console.log('-===>>>page load broerk_proudctlist value:',brokerproductlist);

  /*data map*/
  const RequestListItem =[
    {
      prd_identity_id : 0,
      prd_img:Item,
      date:"21.00.00 - 21.00.00",
      prd_status:"검토 대기",
      modify_date:"2021.00.00",
      prd_name:"충남내포신도시2차대방엘리움더센트럴",
      prd_type:"아파트",
      address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
      address_detail: "자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
      prd_sel_type:"매매",
    },
    {
      prd_identity_id : 1,
      prd_img:Item,
      date:"21.00.00 - 21.00.00",
      prd_status:"거래 준비",
      modify_date:"2021.00.00",
      prd_name:"충남내포신도시2차대방엘리움더센트럴",
      prd_type:"아파트",
      address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)  강남구 서초동 서초동 서초동",
      address_detail:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)  강남구 서초동 서초동 서초동",
      prd_sel_type:"매매"
    },
    {
      prd_identity_id : 2,
      prd_img:Noimg,
      date:"21.00.00 - 21.00.00",
      prd_status:"의뢰 철회",
      modify_date:"2021.00.00",
      prd_name:"충남내포신도시2차대방엘리움더센트럴",
      prd_type:"아파트",
      address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
      address_detail:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
      prd_sel_type:"매매",
    },
    {
      prd_identity_id : 3,
      prd_img:Noimg,
      date:"21.00.00 - 21.00.00",
      prd_status:"위임 취소",
      modify_date:"2021.00.00",
      prd_name:"충남내포신도시2차대방엘리움더센트럴",
      prd_type:"아파트",
      address:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
      address_detail:"자이 3층 203호 서울시 강남구 서초동 (OO읍 OO리)",
      prd_sel_type:"매매",
    }
]

  const topInfoContent = () => {
    return(
      <FilterAndAdd>
      {/*유저 정보 있을 경우 이부분 주석 해제 되어야함*/}
      {/*<Link to="/AddRequest" className="data_link"></Link>*/}

      {/*05.21 유저 정보가 없을 경우 본인정보 추가 모달 떠야함!! default 값으로 고정*/}
      <div className="linkToDiv" onClick={()=>{setUserInfo(true)}}>
        <AddBtn>추가</AddBtn>
      </div>
    </FilterAndAdd>
    )
  }

    return (
        <Container>
          <WrapRequest>
            <TopTitle>내 중개의뢰</TopTitle>
            <RequestSorting filterModal={filterModal}/>{/*컴포넌트입니다*/}

            {/* 수정코드입니다. */}
            <CommonTopInfo length={is_serveron == true ? brokerproductlist.length : RequestListItem.length} leftComponent={topInfoContent()}/>
            {/* -- 원래 코드입니다. */}
            {/*
              <TopInfo>
                <All>총 <GreenColor>{ is_serveron == true ? brokerproductlist.length : RequestListItem.length}</GreenColor> 건</All>
                <FilterAndAdd>
                  <Link to="/AddRequest">
                    <AddBtn>추가</AddBtn>
                  </Link>
                </FilterAndAdd>
              </TopInfo>
            */}

            <RequestList>
              {console.log('server logon or error여부 :',is_serveron)}
            {
              
            is_serveron == true &&  RequestListItem.length > 0 ?  //false -> true 바꾼기...
            RequestListItem.map((value) => {

              const type=()=>{
                if(value.prd_status == "검토 대기") { //검토대기
                  return 1
                }else if(value.prd_status == "거래 준비") {//거래준비
                  return 1
                } else if(value.prd_status == "의뢰 철회") { // 의뢰 철회
                  return 0.5
                } else if(value.prd_status == "위임 취소") { // 위임 취소
                  return 0.5
                }
              }

              return(
                <RequestListPage filterModal={filterModal} mannerModal={mannerModal} cancleModal={cancleModal} startModal={startModal} cancle2Modal={cancle2Modal} completeModal={completeModal} type={type} value={value}/>
              )
            })
            :
            null
          }
          
          {
            is_serveron == true && brokerproductlist.length > 0 ? 
            brokerproductlist.map((value) => {

              const type=()=>{
                if(value[0].prd_status == '대기' || value[0].prd_status=='검토대기'){
                  return 1
                }else if(value[0].prd_status == '거래준비'){
                  return 1
                }else if(value[0].prd_status == '의뢰철회'){
                  return 0.5
                }else if(value[0].prd_status == '위임취소'){
                  return 0.5
                }
              }

              return(
                <RequestListPage setFilter={setFilter} type={type} value={value[0]}/>
              )
              
            })
            :null
          }

        </RequestList>
      </WrapRequest>
      
          {
            userInfo ?
            <ModalAddUserInfo setUserInfo={setUserInfo}/>
            :
            null
          }
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
  position:relative;
  display:flex;justify-content:flex-start; align-items:center;
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
  width:18px;
  @media ${(props) => props.theme.mobile} {
    width:calc(100vw*(18/428));
  }
`
const RequestList = styled.ul`
  width:100%;
`
