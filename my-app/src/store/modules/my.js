import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const UP = 'my/INCREMENT';
const DOWN = 'my/DECREMENT';
const INPUTEVENT = 'my/INPUTEVENT';

// 액션 생성 함수를 만듭니다.
export const up = createAction(UP);
export const down = createAction(DOWN);
export const inputEvent = createAction(INPUTEVENT);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
  testNum : 10005
};

// immer 를 사용하여 값을 수정하는 리듀서입니다.
export default handleActions({
  
  [UP]: (state, action) => {
    console.log('up함수 호출 my/up호출:',state,action);
    return produce(state, draft => {
      draft.testNum = draft.testNum * 3;
    });
  },
  // { } 를 따로 열지 않고 바로 리턴하면 이런 형식입니다.
  [DOWN]: (state, action) =>{
    console.log('down함수 호출 my/down호출:',state,action);
    return produce(state, draft => {
      draft.testNum = draft.testNum / 3;
    });
  },
  [INPUTEVENT]: (state, action) => {
     console.log('inputEvent함수 호출 my/inputenvet호출:',state,action);
    return produce(state, draft => {
      console.log('procude에서의 state,draft,action은??:',state,draft,action);
      draft.testNum = action.payload.num;
    });
  }
}, initialState);