import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const EMAILCHANGE = 'temp_regi_userdata/emailchange';
const NAMECHANGE = 'temp_regi_userdata/namechange';
const PHONECHANGE = 'temp_regi_userdata/phonechange';
const USERTYPECHANGE = 'temp_regi_userdata/usertypechange';
const AGREESTATUSCHANGE = 'temp_regi_userdata/agreestatuschange';
const PASSWORDCHANGE  = 'temp_regi_userdata/passwordchange';

// 액션 생성 함수를 만듭니다.
export const emailchange = createAction(EMAILCHANGE);
export const namechange = createAction(NAMECHANGE);
export const phonechange = createAction(PHONECHANGE);
export const usertypechange= createAction(USERTYPECHANGE);
export const agreestatuschange= createAction(AGREESTATUSCHANGE);
export const passwordchange = createAction(PASSWORDCHANGE);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
   email : '',
   name: '',
   phone: '',
   agree_status : '',
   password : '',
   usertype: '',
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
}, initialState);