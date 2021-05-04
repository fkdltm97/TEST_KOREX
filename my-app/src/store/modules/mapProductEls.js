import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const UPDATE_EXCLUSIVE = 'mapProductEls/exc';
const UPDATE_PROBROKER = 'mapProductEls/pro';
const UPDATE_BLOCK = 'mapProductEls/block';

// 액션 생성 함수를 만듭니다.
export const updateExclusive = createAction(UPDATE_EXCLUSIVE);
export const updateProbroker = createAction(UPDATE_PROBROKER);
export const updateBlock = createAction(UPDATE_BLOCK);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
    exclusive  : [],
    probroker: [],
    block: [],
};

// immer 를 사용하여 값을 수정하는 리듀서입니다.
export default handleActions({
  [UPDATE_EXCLUSIVE]: (state, action) => {
    return produce(state, draft => {
        draft.exclusive = action.payload.exclusive ? action.payload.exclusive : draft.exclusive;
    });
  },
  [UPDATE_PROBROKER]: (state, action) => {
    return produce(state, draft => {
        draft.probroker = action.payload.probroker ? action.payload.probroker : draft.probroker;
    });
  },
  [UPDATE_BLOCK]: (state, action) => {
    return produce(state, draft => {
        draft.block = action.payload.block ? action.payload.block : draft.block;
    });
  },
}, initialState);