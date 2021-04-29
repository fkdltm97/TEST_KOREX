//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import MainHeader from '../../../component/common/MainHeader';
import SubTitle from '../../../component/common/SubTitle';
import PropertyTourSetting from '../../../component/member/mypage/property/PropertyTourSetting';
import MainFooter from '../../../component/common/MainFooter';
import TermService from '../../../component/common/TermsOfService';
import TermPrivacy from '../../../component/common/TermsOfPrivacy';
import TermLocation from '../../../component/common/TermsOfLocation';
import Bunyang from '../../../component/common/bunyang/Bunyang';
import ImgDetail from "../../../component/common/bunyang/ImgDetail";
import LiveModal from "../../../component/common/bunyang/LiveModal";
import ModalCalendar from "../../../component/common/bunyang/ModalCalendar";
import ModalCommon from '../../../component/common/modal/ModalCommon';
import ModalAddBasic from '../../../component/member/mypage/property/modal/ModalAddBasic';
import ModalAddSpecial from '../../../component/member/mypage/property/modal/ModalAddSpecial';

import {useSelector } from 'react-redux';

//server
import serverController from '../../../server/serverController';

export default function Join({match}) {
  console.log('propertyToursetting 건내받은 prd_identity_id값:',match.params);
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
  const [live, setLive] = useState(false)
  //분양 상세이미지 모달
  const [detailimg, setDetailImg] = useState(false);
  const [cal, setCal] = useState(false);

  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},cancle:{},confirm:{},confirmgreen:{},content:{}});

  const temp_tourReservsettings = useSelector(data => data.temp_tourReservsetting);
  const login_user= useSelector(data => data.login_user);//login_user정보 가져온다.
  
  var prd_identity_id=match.params.id;
  
  const [propertyToursettinglist,setPropertyToursettinglist]=useState([]);

  console.log('=>>>>proeprtyTOursetting 페이지요소 실행:',login_user);

 //여기 두개가 핵심이에여
  //모달 끄는 식
    const offModal = ()=>{
      let option = JSON.parse(JSON.stringify(modalOption));
      option.show = false;
      setModalOption(option);
    }


    //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
      const addBasic = () =>{
        //여기가 모달 키는 거에엽
        console.log('==>>>.adDBASIC함숫 실행:');
        setModalOption({
            show:true,
            setShow:offModal,
            title:"일반추가",
            content:{type:"components",text:``,component:<ModalAddBasic/>},
            submit:{show:false , title:"적용" , event : ()=>{ 
              console.log('일반추가 모달 확인submit발생:',temp_tourReservsettings);
              
              offModal(); }
            },
            cancle:{show:false , title:"초기화" , event : ()=>{ offModal(); }},
            confirm:{show:true , title:"확인" , event : async ()=>{
              console.log('일반추가 모달 확인confirm발생:',temp_tourReservsettings);

              if(login_user.memid!='' && login_user.company_id !='' && temp_tourReservsettings.normal_isholidayexcept!='' && temp_tourReservsettings.normal_select_daycount !='' && temp_tourReservsettings.normal_select_days !='' && temp_tourReservsettings.normal_select_times!=''){
                let body_info={
                  tour_type : 1,//일반:1 특별:2
                  mem_id: login_user.memid,//어떤 중개사회원id가 어떤수임한 상품에 대해서 예약셋팅하는건지
                  company_id: login_user.company_id, 
                  prd_identity_ids : prd_identity_id,
                  normal_isholidayexcept : temp_tourReservsettings.normal_isholidayexcept,
                  normal_select_daycount : temp_tourReservsettings.normal_select_daycount,
                  normal_select_days : temp_tourReservsettings.normal_select_days,
                  normal_select_times: temp_tourReservsettings.normal_select_times
                };
                console.log('JSONBODY SUBMIT INFO:',body_info,JSON.stringify(body_info));

                let res=await serverController.connectFetchController('/api/broker/productToursettingRegister','POST',JSON.stringify(body_info));
                console.log('res_result:',res);
              }else{
                alert('입력값이 비어있습니다.');
              }
              
              offModal();
            }}
        });
      }

    //만약에 다른걸 키고 싶으면 아래 함수 호출하시면됩니다.
      const addSpecial = () =>{
        setModalOption({
            show:true,
            setShow:offModal,
            title:"특별추가",
            content:{type:"component",text:`ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ`,component:<ModalAddSpecial/>},
            submit:{show:false , title:"" , event : ()=>{ console.log('특별추가모달 확인 submit발생:');offModal(); }},
            cancle:{show:false , title:"" , event : ()=>{offModal(); }},
            confirm:{show:true , title:"확인" , event : async ()=>{ 
              console.log('특별추가모달 confirm발생',temp_tourReservsettings);
              
              if(login_user.memid!='' && login_user.company_id !='' && temp_tourReservsettings.special_specifydate!='' && temp_tourReservsettings.special_specifydatetimes !='' && temp_tourReservsettings.special_isexceptspecifydate!=''){
                let body_info={
                  tour_type: 2,
                  mem_id : login_user.memid,
                  company_id : login_user.company_id,
                  prd_identity_ids: prd_identity_id,
                  special_specifydate : temp_tourReservsettings.special_specifydate,
                  special_specifydatetimes : temp_tourReservsettings.special_specifydatetimes,
                  special_isexceptspecifydate : temp_tourReservsettings.special_isexceptspecifydate
                };
                console.log('JSONBODY SUMBIT INFO:',body_info,JSON.stringify(body_info));

                let res= await serverController.connectFetchController('/api/broker/productToursettingRegister','POST',JSON.stringify(body_info));
                console.log('res_result:',res);
              }else{
                alert('입력값이 비어있습니다.');
              }
              offModal(); 
            }
           }
        });
      }

      useEffect( async () => {
        console.log('최초 한번 실행 투어셋팅페이지 도달시 한번 실행');
        let body_info = {
          mem_id : login_user.memid,
          company_id : login_user.company_id,
          prd_identity_ids : prd_identity_id //어떤 매물id에 대한 투어예약셋팅내역들인지
        };
        console.log('JSON>BODYINFO STIRNGIFY ',body_info,JSON.stringify(body_info));
    
        let res= await serverController.connectFetchController('/api/broker/productToursettinglist','POST',JSON.stringify(body_info));
        console.log('res results:>>>>:',res);
    
        setPropertyToursettinglist(res.result_data);
       
        console.log('propertytoursettinglist:',propertyToursettinglist);
      },[]);

    return (
        <>
          <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
          <LiveModal live={live} setLive={setLive}/>
          <ModalCalendar cal={cal} setCal={setCal}/>
          <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
          <MainHeader openBunyang={openBunyang}/>
          <Container>
              <SubTitle title={"소속명"} arrow={"　▼"} rank={false} path={"/Team"} cursor={"pointer"}/>
              <PropertyTourSetting addBasic={addBasic} addSpecial={addSpecial} id={prd_identity_id} propertyToursettinglist={propertyToursettinglist}/>
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
