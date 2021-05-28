//react
import React ,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import styled from "styled-components"

//component
import SubTitle from '../../../component/common/SubTitle';
import PropertyManage from '../../../component/member/mypage/propertyManage/PropertyManage';

import ModalCommon from '../../../component/common/modal/ModalCommon';
import ModalMap from '../../../component/member/mypage/propertyManage/modal/ModalMap';
import ModalFilter from '../../../component/member/mypage/propertyManage/modal/ModalFilter';
import ModalSelect from '../../../component/member/mypage/propertyManage/modal/ModalSelect';
import ModalEdit from '../../../component/member/mypage/propertyManage/modal/ModalEdit';
import ModalAllEdit from '../../../component/member/mypage/propertyManage/modal/ModalAllEdit';
import ModalEditResult from '../../../component/member/mypage/propertyManage/modal/ModalEditResult';

import CommonHeader from '../../../component/common/commonHeader';
import CommonFooter from '../../../component/common/commonFooter';

//server
import serverController from '../../../server/serverController';

import {useSelector} from 'react-redux';

export default function Join() {
  //이용약관
  // const [termservice, setTermService] = useState(false);
  // const openTermService = (onOff) =>{ setTermService(onOff);}

  // //개인정보처리방침
  // const [termprivacy, setTermPrivacy] = useState(false);
  // const openTermPrivacy = (onOff) =>{ setTermPrivacy(onOff);}

  // //위치기반서비스 이용약관
  // const [termlocation, setTermLocation] = useState(false);
  // const openTermLocation = (onOff) =>{ setTermLocation(onOff);}

  // //분양 모달
  // const [bunyang, setBunyang] = useState(false);
  // const openBunyang = (onOff) =>{ setBunyang(onOff);}
  // //라이브 시청 모달
  // const [live, setLive] = useState(false);
  // //분양 상세이미지 모달
  // const [detailimg, setDetailImg] = useState(false);
  // const [cal, setCal] = useState(false);

  //필터 모달창
  const [filter,setFilter] = useState(false);
  //물건예약수정 모달창
  const [reserve,setReserve] = useState(false);
  const [modalOption,setModalOption] = useState({show : false,setShow:null,link:"",title:"",submit:{},submitnone:{},cancle:{},confirm:{},confirmgreennone:{},content:{}});

  // (전체 버튼 누르면 나오는) 리스트 셀렉트
  const [select, setSelect] = useState(false);
  console.log(select);
  
  //사용자 투어예약접수리스트 가져오기.
  const login_userinfo = useSelector(data => data.login_user);
  const [reservationItemlist,setReservationItemlist] = useState([]);//reservationItemlist 예약아이템리스트 page에서 선언하고, 여기서 사용한다. 초기화하고 건내준다.
  const [prdidvalue,setPrdidvalue] = useState('');

  //각 선택한 매물아이템에 대한 투어예약셋팅 정보로써 고유한 state로써 취급한다.
  var week=['일','월','화','수','목','금','토'];
  
  const [except_datelist,setExcept_datelist] = useState([]);//표현에서 제외할 특정날짜 리스트
  const [result_usedatalist,setResult_usedatalist] = useState([]);//사용할 표현할 최종데이터리스트 초기값 배열
  

  //투어예약신청리스트 최초
  useEffect(async () => {
    console.log('=>>>>propertyYTOurtmnangae페이지 최초 실행시점때만 실행, 접수리스트 데이터 조회:');
    if(login_userinfo.is_login){
      let body_info = {
        memid : login_userinfo.memid,
        company_id : login_userinfo.company_id,
        user_type : login_userinfo.user_type,
        isexculsive: login_userinfo.isexculsive
      };
      console.log('JSONBODY INFO TEST:',JSON.stringify(body_info));

      let res= await serverController.connectFetchController('/api/broker/brokerproduct_reservationList','POST',JSON.stringify(body_info));

      if(res){
        console.log('res result ...>:::',res);

        var reservation_data=res.result_data;
        setReservationItemlist(reservation_data);
      }
    }
    
  },[]);

  //투어예약신청리스트 변경시
  useEffect(async () => {
    console.log('=>>>>>propertyTourmanage페이지의 reservationImtelist state변수값 변화감지 변화시에만 실행되는 형태',reservationItemlist,prdidvalue);

  },[reservationItemlist,prdidvalue]);


  //투어예약수정모달창 관련 수정 액션시에(확인) 개별수정
  const sendinfo_data={};
  const sendInfo_local= (selectDay,selectTimes,tourid,tourtype,td_id,r_tr_id) => {
    sendinfo_data['selectDay'] = selectDay;
    sendinfo_data['selectTimes']= selectTimes;
    sendinfo_data['tourid'] =tourid;
    sendinfo_data['tourtype']=tourtype;
    sendinfo_data['td_id']=td_id;
    sendinfo_data['r_tr_id'] = r_tr_id;//어떤 예약신청아이디인지 여부 저장.

    console.log('sendinfo_local정보 확인 먼저 저장여부>>>>:',sendinfo_data);
  }
  const sendInfo_local_starttime = (time) => {
  
    sendinfo_data['starttime'] = time;//문자열 그대로 저장.
    console.log('sendinfo_local_starttime>>:',sendinfo_data);
  }
  const sendInfo_local_endtime= (time) => {
   
    sendinfo_data['endtime'] = time;
    console.log('sendinfo_local_endtime:',sendinfo_data);
  }
  const clickReservation_edit = async () => {
    console.log('reservation(id선택한 방문예약셋팅날짜 수정::',sendinfo_data);

    offModal();

    if(login_userinfo.is_login){
      let body_info = {
        tr_id : sendinfo_data.r_tr_id,//어떤 tr_id에 대한 수정을 하는건지 알기위함.
        selectdate: sendinfo_data.selectDay,
        selectTime: sendinfo_data.selectTimes,
        selectTourid : sendinfo_data.tourid,//바꿀 날짜,시간대,tourid,타입,시간대,
        selectTourtype: sendinfo_data.tourtype,
        selectTdid:sendinfo_data.td_id,
        starttime:sendinfo_data.starttime,
        endtime:sendinfo_data.endtime
      };

      console.log('JSON_BODY>>>:',JSON.stringify(body_info));
      
      let res=await serverController.connectFetchController('/api/broker/brokerProduct_tourRerservation_modify','POST',JSON.stringify(body_info));

      if(res){
        console.log('====>>>>>res_result::',res);
      }
      
    }else{
      //비로그인 상태
    }
  }  

  //여기 두개가 핵심이에여
  //모달 끄는 식
  const offModal = ()=>{
    let option = JSON.parse(JSON.stringify(modalOption));
    option.show = false;
    setModalOption(option);
  }

  //만약에 필터 모달을 키고 싶으면 아래 함수 호출하시면됩니다.
    const cancleModal = (tr_id) =>{
      //여기가 모달 키는 거에엽
      setModalOption({
          show:true,
          setShow:offModal,
          title:"예약 해제",
          content:{type:"text",text:`예약을 해제하시겠습니까?\n해제 시, 예약자에게 알림이 전송됩니다.`,component:""},
          submit:{show:true , title:"확인" , event : async ()=>{
            offModal();confirmModal();

            console.log('what tr_id::',tr_id);

            let body_info={
              tr_id_val : tr_id
            };
            let res=await serverController.connectFetchController('/api/broker/brokerproduct_reservation_release','POST',JSON.stringify(body_info));

            if(res){
              console.log('ress_>>>>>>:',res);
            }
          }},
          cancle:{show:true , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }}
      });
    }
//예약해제 완료되었습니다 모달
    const confirmModal = () =>{
      //여기가 모달 키는 거에엽
      setModalOption({
          show:true,
          setShow:offModal,
          title:"예약 해제",
          content:{type:"text",text:`예약해제가 완료되었습니다.`,component:""},
          submit:{show:false , title:"확인" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }},
          confirmgreennone:{show:true , title:"확인" , event : ()=>{offModal(); }}
      });
    }

    const updateModal = () =>{
      //여기가 모달 키는 거에엽
      setModalOption({
          show:true,
          setShow:offModal,
          title:"필터",
          content:{type:"components",text:`Testsetsetsetsetestse`,component:<ModalFilter/>},
          submitnone:{show:true , title:"적용" , event : ()=>{offModal(); }},
          cancle:{show:true , title:"초기화" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }}
      });
    }

    const mapModal = () =>{
      setModalOption({
          show:true,
          setShow:offModal,
          title:"건물 위치",
          content:{type:"component",text:` 완료되었습니다.`,component:<ModalMap/>},
          submit:{show:false , title:"확인" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }},
      });
    }
    const selectModal = () =>{
      setModalOption({
          show:true,
          setShow:offModal,
          title:"물건투어예약접수 관리",
          content:{type:"component",text:``,component:<ModalSelect setTridchklist={setTridchklist} setPrdidvalue={setPrdidvalue} setReservationItemlist={setReservationItemlist} select={select} setSelect={(e)=>{setSelect(e); offModal();}}/>},
          submit:{show:false , title:"확인" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }},
      });
    }
    //임의 항목 수정하기 누를시 투어예약접수관리 개별수정.특정 매물id에 대한 셋팅리스트 보여주며, 그 tr_id에 대해서 수정처리될수있게한다.
    const editModal = async (select_prd_identity_id,r_tr_id) =>{

      let body_info={
         id : select_prd_identity_id
      };
      let res=await serverController.connectFetchController('/api/broker/brokerProduct_toursetting_dates','POST',JSON.stringify(body_info));

      if(res){
        console.log("res_result:",res);

        var result_data=res.result_data;

        var special_tourlist_array=[];
        var special_count=0;

        for(let key in result_data[1]){
          console.log('>>>jspeical tour added list:',key,result_data[1][key]);
          special_tourlist_array[special_count] = {};
          special_tourlist_array[special_count]['specifydate'] = result_data[1][key]['set_specifydate'];
          special_tourlist_array[special_count]['specifydatetimes'] = result_data[1][key]['set_specifydatetimes'];
          special_tourlist_array[special_count]['tour_id'] = result_data[1][key]['tour_id'];
          special_tourlist_array[special_count]['tour_specifyday_except'] = result_data[1][key]['tour_specifyday_except'];
          special_tourlist_array[special_count]['tour_type'] = result_data[1][key]['tour_type'];

          special_count++;
        }
        console.log('>>>>>>server load 특별 추가 제외날짜 데이터들:',special_tourlist_array);

        //일반 추가 데이터들
        var default_match_dates=[];
        var normal_count=0;
        for(let key in result_data[0]){
          console.log('=>>>>normal tour added list,display count limit',key,result_data[0][key],result_data[0][key]['day_select_count']);

          var loca_display_count_limit=result_data[0][key]['day_select_count'];
          var loca_match_dates=result_data[0][key]['match_dates'];
          var loca_tourtype=result_data[0][key]['tour_type'];
          for(let inn=0; inn<loca_match_dates.length; inn++){
            if(inn < loca_display_count_limit){
              default_match_dates[normal_count] = loca_match_dates[inn];
              default_match_dates[normal_count]['tour_type'] = loca_tourtype;

              normal_count++;
            }
          }
        }

        console.log('===>>>default match dates::',default_match_dates);
        var merged_match_dates=[];
        for(let m=0; m<default_match_dates.length; m++){
          merged_match_dates[m]= {};
          merged_match_dates[m]['tour_date'] = default_match_dates[m]['tour_date'];
          merged_match_dates[m]['tour_id'] = default_match_dates[m]['tour_id'];
          merged_match_dates[m]['setting_times'] = default_match_dates[m]['setting_times'];
          merged_match_dates[m]['tour_type'] = default_match_dates[m]['tour_type'];
        }

        for(let j=0; j<special_tourlist_array.length; j++){

          if(special_tourlist_array[j]['tour_specifyday_except'] == 0){
            //추가된 항목들에 대해서만 추가하려는 항목들에대해서만 돌린다.
          
            var special_tourlist_array_item = special_tourlist_array[j]; //일반 기본 날짜리스트에서 special 특별 add추가리스트를 추가하는 개념.이미 있는것에 대해 추가하려고 할시 덮어씌움.
  
            var is_overwraped=false;
            console.log('==>>>추가하려는 특별날짜 요소(outer for):',special_tourlist_array_item);
  
            //추가하려는 날짜가 이미 있는지 여부 이미 있으면 기존 겹치는 default날짜요소를 특별요소 관련 속성으로 덮어씌우고, 없는 새로운 요소라면 새로 추가한다.
            for(let s=0; s<merged_match_dates.length; s++){
              var merged_match_date_item=merged_match_dates[s];
              //console.log('==>>>>기존 default dates items요소 순환 (inner for):',merged_match_date_item);
              if( special_tourlist_array_item['specifydate'] == merged_match_date_item['tour_date']){
                //console.log('====>>>날짜 겹침 매칭 기존날짜::',merged_match_date_item['tour_date']);
                merged_match_date_item['setting_times'] = special_tourlist_array_item['specifydatetimes'];
                merged_match_date_item['tour_id'] = special_tourlist_array_item['tour_id'];
                merged_match_date_item['tour_type'] = special_tourlist_array_item['tour_type'];//일반->특별로 우선순위 대체 교체진행
                merged_match_date_item['is_normal_to_special_replaced'] = true;
                is_overwraped = true;
              }
            }
            if(is_overwraped == false){
              //중복되지 않는 특별추가요소는 그 요소에 대한것으로 새로이 추가.
              merged_match_dates.push({tour_date : special_tourlist_array_item['specifydate'], tour_id: special_tourlist_array_item['tour_id'], setting_times: special_tourlist_array_item['specifydatetimes'], tour_type: special_tourlist_array_item['tour_type']}); //특정 tourdate,tourid,settingtimes,tourtype등 특별용 추가.
            }
          }
        }
        console.log('=>>>>>default matchdate and special_tourlist data mereged:',default_match_dates, merged_match_dates);
  
        //merged_match_dates에서 제외할..제거할 것 
        var except_special_dates=[];
        var except_date_count=0;
        for(let j=0; j<special_tourlist_array.length; j++){
          if(special_tourlist_array[j]['tour_specifyday_except'] == 1){
            //제외하려는 특별날짜 리스트만 돌린다. 제외하려는 날짜들을 저장해놓는다.
  
            except_special_dates[except_date_count]= special_tourlist_array[j];//제외하려는 날짜
  
            except_date_count++;
          }
        }

        var result_use_datalist=[];

        for(let r=0; r<merged_match_dates.length; r++){
          let loca_result_dateData=merged_match_dates[r];
          let loca_result_getyoil=week[new Date(loca_result_dateData['tour_date']).getDay()];
          let loca_result_getday=new Date(loca_result_dateData['tour_date']).getDate();
          let loca_result_tourid=loca_result_dateData['tour_id'];
          let loca_result_tourtype=loca_result_dateData['tour_type'];

          console.log('result_total _dataitem date,setTimes,onldaydtea,onand yoil',loca_result_dateData['tour_date'],loca_result_dateData['setting_times'],loca_result_getyoil,loca_result_getday);

          result_use_datalist[r] = {};
          result_use_datalist[r]['date'] = loca_result_dateData['tour_date'];
          result_use_datalist[r]['setTimes'] = loca_result_dateData['setting_times'];
          result_use_datalist[r]['date_yoil'] = loca_result_getyoil;
          result_use_datalist[r]['date_day']=loca_result_getday;
          result_use_datalist[r]['tour_id']=loca_result_tourid;
          result_use_datalist[r]['tour_type'] =loca_result_tourtype;
        }
        console.log('==>>>>>final result usedatalist,except{_s-eopclidates:',result_use_datalist,except_special_dates);

        function data_ascending(a,b){
          var left=new Date(a['date']).getTime();
          var right=new Date(b['date']).getTime();

          return left > right ? 1 : -1;
        }

        result_use_datalist=result_use_datalist.sort(data_ascending);

        //제외할 항목들 제외
        for(let s=0; s<except_special_dates.length; s++){
          let except_special_dates_item = except_special_dates[s]['specifydate'];

          for(let h=0; h<result_use_datalist.length; h++){
            if(except_special_dates_item == result_use_datalist[h]['date']){
              //제외할 항목에 해당되는 결과항목날짜의 경우 프로퍼티 invisible추가하여 제외처리한다.
              result_use_datalist[h]['isexcepted']=true;
            }
          }
        }
        setExcept_datelist(except_special_dates);
        setResult_usedatalist(result_use_datalist);

      }
      setModalOption({
          show:true,
          setShow:offModal,
          title:"물건투어예약접수 수정",
          content:{type:"component",text:``,component:<ModalEdit sendInfo_local={sendInfo_local} sendInfo_local_starttime={sendInfo_local_starttime} sendInfo_local_endtime={sendInfo_local_endtime} select_prd_identity_id={select_prd_identity_id} r_tr_id={r_tr_id} except_datelist={except_datelist} result_usedatalist={result_usedatalist}/>},
          submit:{show:false , title:"확인" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:true , title:"확인" , event : ()=>{
            offModal(); editResultModal();
            clickReservation_edit();
          }}
      });
    }

    //체크모드,매물별 trlist 일괄수정 모드시에 관련 사용
    //어떤 tridlist체크했는지 여부
    const [Tridchklist,setTridchklist] = useState([]);
    const [except_datelist_for_multimodify,setExcept_datelist_for_mutlimodify] = useState([]);
    const [result_usedatalist_for_multimodify,setResult_usedatalist_for_multimodify] = useState([]);
    
    const tridchklist_function = (value,type) => {
      console.log('현재 체크된 tridchcklistt:',Tridchklist);
      
      var tridchklist_array=Tridchklist;
      var is_exists=false;
      if(type == 'add'){
        for(let j=0; j<tridchklist_array.length; j++){
          if(tridchklist_array[j] == value){
            is_exists=true;
          }
        }
        if(is_exists){

        }else{
          tridchklist_array.push(value);
        }
      }else if(type=='remove'){
        let find_remove_index;
        for(let r=0; r<tridchklist_array.length; r++){
          if(tridchklist_array[r] == value){
            //삭제할 항목에 해당하는 요소의 인댁스를 찾는다.
            find_remove_index=r;
          }
        }
        tridchklist_array.splice(find_remove_index,1);//해당 위치에서의 한개 삭제한다.
      }
      console.log('삭제/add 적용 tridchklist_array:',tridchklist_array);
      setTridchklist(tridchklist_array);
    }
    //일괄수정처리.
    //투어예약수정 매물(한개)에 대한 여러 trlist에 대한 체크항목들 일괄수정.
    const sendinfo_data_multimodify={};
    const sendInfo_local_multimodify= (selectDay,selectTimes,tourid,tourtype,td_id,tridchklist) => {
      sendinfo_data_multimodify['selectDay'] = selectDay;
      sendinfo_data_multimodify['selectTimes']= selectTimes;
      sendinfo_data_multimodify['tourid'] =tourid;
      sendinfo_data_multimodify['tourtype']=tourtype;
      sendinfo_data_multimodify['td_id']=td_id;
      sendinfo_data_multimodify['tridchklist'] = tridchklist;//어떤 예약신청아이디인지 여부 저장.

      console.log('sendinfo_local정보 확인 먼저 저장여부>>>>:',sendinfo_data_multimodify);
    }
    const sendInfo_local_multimodify_starttime = (time) => {
    
      sendinfo_data_multimodify['starttime'] = time;//문자열 그대로 저장.
      console.log('sendinfo_local_starttime>>:',sendinfo_data_multimodify);
    }
    const sendInfo_local_multimodify_endtime= (time) => {
    
      sendinfo_data_multimodify['endtime'] = time;
      console.log('sendinfo_local_endtime:',sendinfo_data_multimodify);
    }
    const clickReservation_edit_multimodify = async () => {
      console.log('reservation(id선택한 방문예약셋팅날짜 수정::',sendinfo_data_multimodify);

      offModal();

      if(sendinfo_data_multimodify){
        
        if(sendinfo_data_multimodify.selectDay=='' || sendinfo_data_multimodify.selectDay==null || sendinfo_data_multimodify.selectTimes=='' || sendinfo_data_multimodify.tourid==''){
          return;
        }
      }
      if(login_userinfo.is_login){
        let body_info = {
          tridchklist : sendinfo_data_multimodify.tridchklist.join(','),//어떤 tr_id항목들 집합들에 대해서 수정하는건지 일괄수정인지
          selectdate: sendinfo_data_multimodify.selectDay,
          selectTime: sendinfo_data_multimodify.selectTimes,
          selectTourid : sendinfo_data_multimodify.tourid,//바꿀 날짜,시간대,tourid,타입,시간대,
          selectTourtype: sendinfo_data_multimodify.tourtype,
          selectTdid:sendinfo_data_multimodify.td_id,
          starttime:sendinfo_data_multimodify.starttime,
          endtime:sendinfo_data_multimodify.endtime
        };

        console.log('JSON_BODY>>>:',JSON.stringify(body_info));
        
        let res=await serverController.connectFetchController('/api/broker/brokerProduct_tourRerservation_multimodify','POST',JSON.stringify(body_info));

        if(res){
          console.log('====>>>>>res_result::',res);
        }
        
      }else{
        //비로그인 상태
      }
    }  
    const editAllModal = async (prdidvalue) =>{
      //일괄수정하려는 대상들 리스트(trlist)의 카운트와, 그 리스트들이 어떠한 매물(prd_identity_id)에 대한 방문예약신청인것들인지(단일id)구한다.어떠한 tr_id리스트들을 일괄 수정인지 구한다. 일괄수정이면 전체 수정을 하는 액션 취하는것이고, 체크한것들 수정을 취한다. 정확히는 선택한 tr들을 수정처리한다. 어떤 tr_list체크한건지 같이 전달하여 반복문돌리면서 모두 동일한 내용으로 수정하려는 내용으로 처리한다.

      let body_info = {
        id : prdidvalue
      }
      let res=await serverController.connectFetchController('/api/broker/brokerProduct_toursetting_dates','POST',JSON.stringify(body_info));

      if(res){
        console.log("res_result:",res);

        var result_data=res.result_data;

        var special_tourlist_array=[];
        var special_count=0;

        for(let key in result_data[1]){
          console.log('>>>jspeical tour added list:',key,result_data[1][key]);
          special_tourlist_array[special_count] = {};
          special_tourlist_array[special_count]['specifydate'] = result_data[1][key]['set_specifydate'];
          special_tourlist_array[special_count]['specifydatetimes'] = result_data[1][key]['set_specifydatetimes'];
          special_tourlist_array[special_count]['tour_id'] = result_data[1][key]['tour_id'];
          special_tourlist_array[special_count]['tour_specifyday_except'] = result_data[1][key]['tour_specifyday_except'];
          special_tourlist_array[special_count]['tour_type'] = result_data[1][key]['tour_type'];

          special_count++;
        }
        console.log('>>>>>>server load 특별 추가 제외날짜 데이터들:',special_tourlist_array);

        //일반 추가 데이터들
        var default_match_dates=[];
        var normal_count=0;
        for(let key in result_data[0]){
          console.log('=>>>>normal tour added list,display count limit',key,result_data[0][key],result_data[0][key]['day_select_count']);

          var loca_display_count_limit=result_data[0][key]['day_select_count'];
          var loca_match_dates=result_data[0][key]['match_dates'];
          var loca_tourtype=result_data[0][key]['tour_type'];
          for(let inn=0; inn<loca_match_dates.length; inn++){
            if(inn < loca_display_count_limit){
              default_match_dates[normal_count] = loca_match_dates[inn];
              default_match_dates[normal_count]['tour_type'] = loca_tourtype;

              normal_count++;
            }
          }
        }

        console.log('===>>>default match dates::',default_match_dates);
        var merged_match_dates=[];
        for(let m=0; m<default_match_dates.length; m++){
          merged_match_dates[m]= {};
          merged_match_dates[m]['tour_date'] = default_match_dates[m]['tour_date'];
          merged_match_dates[m]['tour_id'] = default_match_dates[m]['tour_id'];
          merged_match_dates[m]['setting_times'] = default_match_dates[m]['setting_times'];
          merged_match_dates[m]['tour_type'] = default_match_dates[m]['tour_type'];
        }

        for(let j=0; j<special_tourlist_array.length; j++){

          if(special_tourlist_array[j]['tour_specifyday_except'] == 0){
            //추가된 항목들에 대해서만 추가하려는 항목들에대해서만 돌린다.
          
            var special_tourlist_array_item = special_tourlist_array[j]; //일반 기본 날짜리스트에서 special 특별 add추가리스트를 추가하는 개념.이미 있는것에 대해 추가하려고 할시 덮어씌움.
  
            var is_overwraped=false;
            console.log('==>>>추가하려는 특별날짜 요소(outer for):',special_tourlist_array_item);
  
            //추가하려는 날짜가 이미 있는지 여부 이미 있으면 기존 겹치는 default날짜요소를 특별요소 관련 속성으로 덮어씌우고, 없는 새로운 요소라면 새로 추가한다.
            for(let s=0; s<merged_match_dates.length; s++){
              var merged_match_date_item=merged_match_dates[s];
              //console.log('==>>>>기존 default dates items요소 순환 (inner for):',merged_match_date_item);
              if( special_tourlist_array_item['specifydate'] == merged_match_date_item['tour_date']){
                //console.log('====>>>날짜 겹침 매칭 기존날짜::',merged_match_date_item['tour_date']);
                merged_match_date_item['setting_times'] = special_tourlist_array_item['specifydatetimes'];
                merged_match_date_item['tour_id'] = special_tourlist_array_item['tour_id'];
                merged_match_date_item['tour_type'] = special_tourlist_array_item['tour_type'];//일반->특별로 우선순위 대체 교체진행
                merged_match_date_item['is_normal_to_special_replaced'] = true;
                is_overwraped = true;
              }
            }
            if(is_overwraped == false){
              //중복되지 않는 특별추가요소는 그 요소에 대한것으로 새로이 추가.
              merged_match_dates.push({tour_date : special_tourlist_array_item['specifydate'], tour_id: special_tourlist_array_item['tour_id'], setting_times: special_tourlist_array_item['specifydatetimes'], tour_type: special_tourlist_array_item['tour_type']}); //특정 tourdate,tourid,settingtimes,tourtype등 특별용 추가.
            }
          }
        }
        console.log('=>>>>>default matchdate and special_tourlist data mereged:',default_match_dates, merged_match_dates);
  
        //merged_match_dates에서 제외할..제거할 것 
        var except_special_dates=[];
        var except_date_count=0;
        for(let j=0; j<special_tourlist_array.length; j++){
          if(special_tourlist_array[j]['tour_specifyday_except'] == 1){
            //제외하려는 특별날짜 리스트만 돌린다. 제외하려는 날짜들을 저장해놓는다.
  
            except_special_dates[except_date_count]= special_tourlist_array[j];//제외하려는 날짜
  
            except_date_count++;
          }
        }

        var result_use_datalist=[];

        for(let r=0; r<merged_match_dates.length; r++){
          let loca_result_dateData=merged_match_dates[r];
          let loca_result_getyoil=week[new Date(loca_result_dateData['tour_date']).getDay()];
          let loca_result_getday=new Date(loca_result_dateData['tour_date']).getDate();
          let loca_result_tourid=loca_result_dateData['tour_id'];
          let loca_result_tourtype=loca_result_dateData['tour_type'];

          console.log('result_total _dataitem date,setTimes,onldaydtea,onand yoil',loca_result_dateData['tour_date'],loca_result_dateData['setting_times'],loca_result_getyoil,loca_result_getday);

          result_use_datalist[r] = {};
          result_use_datalist[r]['date'] = loca_result_dateData['tour_date'];
          result_use_datalist[r]['setTimes'] = loca_result_dateData['setting_times'];
          result_use_datalist[r]['date_yoil'] = loca_result_getyoil;
          result_use_datalist[r]['date_day']=loca_result_getday;
          result_use_datalist[r]['tour_id']=loca_result_tourid;
          result_use_datalist[r]['tour_type'] =loca_result_tourtype;
        }
        console.log('==>>>>>final result usedatalist,except{_s-eopclidates:',result_use_datalist,except_special_dates);

        function data_ascending(a,b){
          var left=new Date(a['date']).getTime();
          var right=new Date(b['date']).getTime();

          return left > right ? 1 : -1;
        }

        result_use_datalist=result_use_datalist.sort(data_ascending);

        //제외할 항목들 제외
        for(let s=0; s<except_special_dates.length; s++){
          let except_special_dates_item = except_special_dates[s]['specifydate'];

          for(let h=0; h<result_use_datalist.length; h++){
            if(except_special_dates_item == result_use_datalist[h]['date']){
              //제외할 항목에 해당되는 결과항목날짜의 경우 프로퍼티 invisible추가하여 제외처리한다.
              result_use_datalist[h]['isexcepted']=true;
            }
          }
        }
        setExcept_datelist_for_mutlimodify(except_special_dates);
        setResult_usedatalist_for_multimodify(result_use_datalist);

      }

      if(Tridchklist.length < 1){
        alert('일괄 수정할 항목들을 체크해주세요!');
        return false;
      }
      setModalOption({
          show:true,
          setShow:offModal,
          title:"물건투어예약접수 일괄 수정",
          content:{type:"component",text:``,component:<ModalAllEdit sendInfo_local_multimodify={sendInfo_local_multimodify} sendInfo_local_multimodify_starttime={sendInfo_local_multimodify_starttime} sendInfo_local_multimodify_endtime={sendInfo_local_multimodify_endtime} Tridchklist={Tridchklist} prdidvalue={prdidvalue} except_datelist_for_multimodfiy={except_datelist_for_multimodify} result_usedatalist_for_multimodify={result_usedatalist_for_multimodify}/>},
          submit:{show:false , title:"확인" , event : ()=>{offModal(); }},
          cancle:{show:false , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:true , title:"확인" , event : ()=>{
            offModal(); editResultModal();
            clickReservation_edit_multimodify();
          }}
      });
    }
    //예약수정 얼럿창
    const editResultModal = () =>{
      setModalOption({
          show:true,
          setShow:offModal,
          title:"물건투어예약접수",
          content:{type:"component",text:``,component:<ModalEditResult/>},
          submit:{show:true , title:"확인" , event : ()=>{offModal(); }},
          cancle:{show:true , title:"취소" , event : ()=>{offModal(); }},
          confirm:{show:false , title:"확인" , event : ()=>{offModal(); }}
      });
    }
    
    return (
        <>
          {/* <ImgDetail detailimg={detailimg} setDetailImg={setDetailImg}/>
          <LiveModal live={live} setLive={setLive}/>
          <ModalCalendar cal={cal} setCal={setCal}/>
          <Bunyang bunyang={bunyang} openBunyang={openBunyang} setLive={setLive} setDetailImg={setDetailImg} setCal={setCal}/>
          <MainHeader openBunyang={openBunyang}/> */}
          <CommonHeader/>
          <Container>
            <SubTitle title={"소속명"} arrow={"　▼"} path={"/Team"} cursor={"pointer"}/> 
            <PropertyManage tridchklist_function={tridchklist_function} prdidvalue={prdidvalue} reservationItemlist={reservationItemlist} cancleModal={cancleModal} confirmModal={confirmModal} select={select} setSelect={setSelect}
            mapModal={mapModal} selectModal={selectModal} updateModal={updateModal} editModal={editModal} editAllModal={editAllModal} editResultModal={editResultModal}/>
            <ModalCommon modalOption={modalOption}/>
          </Container>
          <CommonFooter/>
          {/* <TermService termservice={termservice} openTermService={openTermService}/>
          <TermPrivacy termprivacy={termprivacy} openTermPrivacy={openTermPrivacy}/>
          <TermLocation termlocation={termlocation} openTermLocation={openTermLocation}/>
          <MainFooter openTermService={openTermService} openTermPrivacy={openTermPrivacy} openTermLocation={openTermLocation}/> */}
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
