//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import RequestReview from '../../../component/member/mypage/property/RequestReview';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import Bunyang from '../../../component/common/bunyang/Bunyang';
import ImgDetail from "../../../component/common/bunyang/ImgDetail";
import LiveModal from "../../../component/common/bunyang/LiveModal";
import ModalCalendar from "../../../component/common/bunyang/ModalCalendar";
import ModalCommon from '../../../component/common/modal/ModalCommon';
import ModalCancle from '../../../component/member/mypage/property/modal/ModalCancle';

//server porcess
import serverController from '../../../server/serverController';

//redux addons developer elements
import {useSelector } from 'react-redux';
import { brokerRequest_productEditActions } from '../../../store/actionCreators';

export default function RequestReviews({match}) {
  console.log('REquestReview넘겨받은 id값:',match.params);
  var prd_identity_id=match.params.id;//해당 prd_identity_id에 해당하는 상품(매물요청)을 구한다.
  
  //server brokerRequest_product info view load
  const [brokerRequest_product,setBrokerRequest_product] = useState('');

  const [disabled, setDisabled] = useState(true);
  //이용약관
  const [termservice, setTermService] = useState(false);
  const openTermService = (onOff) =>{ setTermService(onOff);}

  //개인정보처리방침
  const [termprivacy, setTermPrivacy] = useState(false);
  const openTermPrivacy = (onOff) =>{ setTermPrivacy(onOff);}

  //위치기반서비스 이용약관
  const [termlocation, setTermLocation] = useState(false);
  const openTermLocation = (onOff) =>{ setTermLocation(onOff);}

  //분양 모달
  const [bunyang, setBunyang] = useState(false);
  const openBunyang = (onOff) =>{ setBunyang(onOff);}
  //라이브 시청 모달
  const [live, setLive] = useState(false);
  //분양 상세이미지 모달
  const [detailimg, setDetailImg] = useState(false);
  const [cal, setCal] = useState(false);
  //거절 , 수락 모달
  const [cancle, setCancle] = useState(false);
  const [accept, setAccept] = useState(false);
  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});
  
  const brokerRequest_productinfo=useSelector(data => data.brokerRequest_product);

  useEffect( async () => {
    let body_info={
       prd_identity_ids : prd_identity_id
    }
    let res=await serverController.connectFetchController('/api/broker/brokerRequest_productview','POST',JSON.stringify(body_info));
    console.log('=>>>>requestReview/view ->>> ',res.result_data[0]);

    setBrokerRequest_product(res.result_data[0]);

     console.log('-=>>>>>>리덕스 정보 저장(불러온 product데이터 저장:::');
    //리덕스 정보 저장..(기본정보불러오기)
    brokerRequest_productEditActions.addresschange({addresss: res.result_data[0].address + ' '+res.result_data[0].address_detail});
    brokerRequest_productEditActions.companyidchange({companyids : res.result_data[0].company_id});
    brokerRequest_productEditActions.exculsivedimensionchange({exculsivedimensions : res.result_data[0].exculsive_space});
    brokerRequest_productEditActions.maemultypechange({maemultypes: res.result_data[0].prd_type});
    brokerRequest_productEditActions.maemulnamechange({maemulnames: res.result_data[0].prd_name});

    brokerRequest_productEditActions.selltypechange({selltypes: res.result_data[0].prd_sel_type});
    brokerRequest_productEditActions.sellpricechange({sellprices: res.result_data[0].prd_price});

    brokerRequest_productEditActions.managecostchange({managecosts : res.result_data[0].managecost});
    brokerRequest_productEditActions.ibjuisinstantchange({ibju_isinstants : res.result_data[0].ibju_isinstant});
    brokerRequest_productEditActions.ibjuspecifydatechange({ibju_specifydates: res.result_data[0].ibju_specifydate});

    brokerRequest_productEditActions.namechange({names: res.result_data[0].request_man_name});
    brokerRequest_productEditActions.phonechange({phones: res.result_data[0].request_mem_phone});
    brokerRequest_productEditActions.requestmemidchange({requestmemids : res.result_data[0].request_memid});
    brokerRequest_productEditActions.supplydimensionchange({supplydimensions: res.result_data[0].supply_space});

    brokerRequest_productEditActions.prdidentityidchange({prd_identity_ids : prd_identity_id});
    brokerRequest_productEditActions.requestmannamechange({requestmannames: res.result_data[0].request_man_name});
    brokerRequest_productEditActions.requestmemphonechange({requestmemphones: res.result_data[0].request_mem_phone});

    //추가정보 리덕스 저장.추가정보 미 저장된 product일수도 있음. 처음 들어온경우는 비어있음.
    brokerRequest_productEditActions.apartspacechange({apartspaces : res.result_data[0].apartspaceoption});
    brokerRequest_productEditActions.bathroomcountchange({bathroomcounts : res.result_data[0].bathroom_count});
    brokerRequest_productEditActions.directionchange({directions: res.result_data[0].direction});
    brokerRequest_productEditActions.entrancechange({entrances: res.result_data[0].entrance});
    brokerRequest_productEditActions.heatfueltypechange({heatfueltypes: res.result_data[0].heat_fuel_type});
    brokerRequest_productEditActions.heatmethodtypechange({heatmethodtypes: res.result_data[0].heat_method_type});
    brokerRequest_productEditActions.iselevatorchange({iselevators: res.result_data[0].is_elevator});
    brokerRequest_productEditActions.isparkingchange({isparkings: res.result_data[0].is_parking});
    brokerRequest_productEditActions.iscontractrenewalchange({iscontractrenewals: res.result_data[0].iscontractrenewal});
    brokerRequest_productEditActions.isduplexfloorchange({isduplexfloors: res.result_data[0].isduplexfloor});
    brokerRequest_productEditActions.iswithpetchange({iswithpets: res.result_data[0].iswithpet});
    brokerRequest_productEditActions.loanpricechange({loanprices: res.result_data[0].loanprice});
    brokerRequest_productEditActions.maemuldescriptionchange({maemuldescriptions : res.result_data[0].maemul_description});
    brokerRequest_productEditActions.maemuldescriptiondetailchange({maemuldescriptiondetails : res.result_data[0].maemul_descriptiondetail});
    brokerRequest_productEditActions.managecostchange({managecosts : res.result_data[0].managecost});
    brokerRequest_productEditActions.monthbaseguaranteepricechange({monthbaseguranteeprices: res.result_data[0].month_base_guaranteeprice});
    brokerRequest_productEditActions.parkingoptionschange({parkingoptions : res.result_data[0].parkingoptions});
    brokerRequest_productEditActions.roomcountchange({roomcounts : res.result_data[0].room_count});
    brokerRequest_productEditActions.roomtypechange({roomtypes: res.result_data[0].room_type});
    brokerRequest_productEditActions.securityoptionchange({securityoptions: res.result_data[0].securityoption});
    brokerRequest_productEditActions.spaceaddonoptionchange({spaceaddonoptions: res.result_data[0].spaceaddonoption});
    brokerRequest_productEditActions.spaceoptionchange({spaceoptions : res.result_data[0].spaceoption});

  },[]);//최초 한번 실행=>>

//여기 두개가 핵심이에여
  //모달 끄는 식
    const offModal = ()=>{
      let option = JSON.parse(JSON.stringify(modalOption));
      option.show = false;
      setModalOption(option);
    }


    //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
      const acceptModal = () =>{
        //여기가 모달 키는 거에엽
        setModalOption({
            show:true,
            setShow:offModal,
            title:"의뢰접수 수락",
            content:{type:"text",
            text:`의뢰인과 사전에 통화하여\n접수내용을 충분히 확인하시고\n의뢰 수락을 하시는 것이 좋습니다.\n의뢰를 수락하시겠습니까?`,component:""},
            submit:{show:true , title:"확인" , link:"/RequestReviewEdit", event : async()=>{
              offModal(); 
              let body_info={
                prd_identity_id : brokerRequest_productinfo.prdidentityid,
                company_id : brokerRequest_productinfo.companyid
              };
              console.log('의뢰 수락 생성된 매물 의뢰매물의 상태값 검토대기->거래준비로 상태값만 변경:',JSON.stringify(body_info));
              let res=await serverController.connectFetchController('/api/broker/brokerRequest_productstatusupdate','POST',JSON.stringify(body_info));
              console.log('res result:',res);

              if(res){

              }
            }},
            cancle:{show:true , title:"취소" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"확인" , event : ()=>{offModal();}}
        });
      }

    //만약에 다른걸 키고 싶으면 아래 함수 호출하시면됩니다.
      const cancleModal = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"의뢰접수 거절",
            content:{type:"component",text:`ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ`,component:<ModalCancle/>},
            submit:{show:false , title:"" , event : ()=>{offModal(); }},
            cancle:{show:false , title:"" , event : ()=>{offModal(); }},
            confirm:{show:false , title:"" , event : ()=>{offModal(); }},
            confirmgreen:{show: true, title:"확인" , link:"/PropertyManagement", event : ()=>{offModal();}}
        });
      }

    return (
        <>
          <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
          <LiveModal live={live} setLive={setLive}/>
          <ModalCalendar cal={cal} setCal={setCal}/>
          <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
          <MainHeader openBunyang={openBunyang}/>
          <Container>
            <SubTitle title={"소속명"} arrow={"　▼"} rank={false} path={"/Team"} cursor={"pointer"}/>
            <RequestReview brokerRequest_product = {brokerRequest_product} cancleModal={cancleModal} acceptModal={acceptModal} setAccept={setAccept} setCancle={setCancle} disabled={disabled}/>
            <ModalCommon modalOption={modalOption}/>
          </Container>
          <TermService termservice={termservice} openTermService={openTermService}/>
          <TermPrivacy termprivacy={termprivacy} openTermPrivacy={openTermPrivacy}/>
          <TermLocation termlocation={termlocation} openTermLocation={openTermLocation}/>
          <MainFooter openTermService={openTermService} openTermPrivacy={openTermPrivacy} openTermLocation={openTermLocation}/>
        </>
  );
}

const Container = styled.div`
    width: 100%;
    min-height:calc(100vh - 289px);
    @media ${(props) => props.theme.mobile} {
        min-height:calc(100vh - calc(100vw*(334/428)));
      }
`
