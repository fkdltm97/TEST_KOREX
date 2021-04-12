import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const USERNICK = 'user/USERNICK';
const USERPHONE= 'user/USERPHONE';
const USEREMAIL= 'user/USEREMAIL';

// 액션 생성 함수를 만듭니다.
export const userNick = createAction(USERNICK);
export const userPhone= createAction(USERPHONE);
export const userEmail = createAction(USEREMAIL);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
   user_nick : 'test',
   user_phone: '010-0000-0000',
   user_email : 'ssgsdg@naver.com'
};

// immer 를 사용하여 값을 수정하는 리듀서입니다.
export default handleActions({

  [USERNICK]: (state, action) => {
    return produce(state, draft => {
      console.log('state,  drafts value test:',state,draft,action.payload);
      draft.user_nick = action.payload.user_nick;
    });
  },
  [USERPHONE]: (state, action) => {
    return produce(state, draft => {
      console.log('state,  drafts value test:',state,draft,action.payload);
      draft.user_phone = action.payload.user_phone;
    });
  },
  [USEREMAIL]: (state, action) => {
    console.log('useremail change actiin발생:',state,action);
    return produce(state, draft => {
      console.log('====useremail >>> state , drafts value test:',state,draft,action.payload);
      draft.user_email = action.payload.user_email;
    });
  }

}, initialState);