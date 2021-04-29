import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const EMAILCHANGE = 'temp_regi_userdata/emailchange';
const NAMECHANGE = 'temp_regi_userdata/namechange';
const PHONECHANGE = 'temp_regi_userdata/phonechange';
const USERTYPECHANGE = 'temp_regi_userdata/usertypechange';
const AGREESTATUSCHANGE = 'temp_regi_userdata/agreestatuschange';
const PASSWORDCHANGE  = 'temp_regi_userdata/passwordchange';
const BUSINESSNUMBERCHANGE= 'temp_regi_userdata/businessnumberchange';
const BUSINESSNAMECHANGE = 'temp_regi_userdata/businessnamechange';
const CLCMNGNOCHANGE= 'temp_regi_userdata/clcmngnochange';

// 액션 생성 함수를 만듭니다.
export const emailchange = createAction(EMAILCHANGE);
export const namechange = createAction(NAMECHANGE);
export const phonechange = createAction(PHONECHANGE);
export const usertypechange= createAction(USERTYPECHANGE);
export const agreestatuschange= createAction(AGREESTATUSCHANGE);
export const passwordchange = createAction(PASSWORDCHANGE);
export const businessnumberchange= createAction(BUSINESSNUMBERCHANGE);
export const businessnamechange= createAction(BUSINESSNAMECHANGE);
export const clcmngnochange= createAction(CLCMNGNOCHANGE);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
   email : '',
   name: '',
   phone: '',
   agree_status : '',
   password : '',
   usertype: '',
   businessnumber : '',//기업,중개사,분양사 사업자번호
   businessname: '', //기업,중개사,분양사 상호명
   clcmngno : ''//중개사 회원가입 한정, 가입하려는 대상자가 사전clc에 등록되어있다면 그 clc mng넘버정보(clc등록 중개사정보)를 참조,저장
};

// immer 를 사용하여 값을 수정하는 리듀서입니다.
export default handleActions({
  
  [EMAILCHANGE]: (state, action) => {
    console.log('emailchange함수 호출 이메일변경',state,action);
    return produce(state, draft => {
      draft.email = action.payload.emails;
    });
  },
  // { } 를 따로 열지 않고 바로 리턴하면 이런 형식입니다.
  [NAMECHANGE]: (state, action) =>{
    console.log('namechange 함수 호출 이름값 변경:',state,action);
    return produce(state, draft => {
      draft.name = action.payload.names;
    });
  },
  [PHONECHANGE]: (state, action) => {
     console.log('phonechange 함수 호출 폰값 변경:',state,action);
    return produce(state, draft => {
      console.log('produce 에서의 state,draft,action은??:',state,draft,action);
      draft.phone = action.payload.phones;
    });
  },
  [AGREESTATUSCHANGE]: (state, action) => {
    console.log('agreestatuschange 함수 호출 동의값 변경:',state,action);
   return produce(state, draft => {
     console.log('produce 에서의 state,draft,action은??:',state,draft,action);
     draft.agree_status = action.payload.agreeStatuss;
   });
 },
 [PASSWORDCHANGE]: (state, action) => {
    console.log('passwordchange 함수 호출 암호값 변경:',state,action);
   return produce(state, draft => {
     console.log('produce 에서의 state,draft,action은??:',state,draft,action);
     draft.password = action.payload.passwords;
   });
 },
  [USERTYPECHANGE]: (state, action) => {
    console.log('usertype change 함수 호출 암호값 변경:',state,action);
  return produce(state, draft => {
    console.log('produce 에서의 state,draft,action은??:',state,draft,action);
    draft.usertype = action.payload.usertypes;
  });
  },
  [BUSINESSNUMBERCHANGE] : (state,action) => {
    console.log('businessnumber change함수 호출 사업자번호값 변경:',state,action);
    return produce(state,draft => {
      console.log('produce에서의 state,draft,action은??:',state,draft,action);
      draft.businessnumber = action.payload.bussinessnumbers;
    });
  },
  [BUSINESSNAMECHANGE] : (state,action) => {
    console.log('businessname change함수 호출 사업체명값 변경:',state,action);
    return produce(state,draft => {
      console.log('produce에서의 state,draft,action은??:',state,draft,action);
      draft.businessname = action.payload.bussinessnames;
    });
  },
  [CLCMNGNOCHANGE] : (state,action) => {
    console.log('clcmngno change함수 호출 clc사전등록 중개업소 mngno 값 변경:',state,action);
    return produce(state,draft => {
      console.log('produce에서의 state,draft,action은??:',state,draft,action);
      draft.clcmngno = action.payload.clcmngnos;
    });
  }
}, initialState);