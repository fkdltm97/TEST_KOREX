import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const UPDATE_EXCLUSIVE = 'mapRight/exclusive';
const UPDATE_PROBROKER = 'mapRight/probroker';
const UPDATE_BLOCK = 'mapRight/block';

// 액션 생성 함수를 만듭니다.
export const updateExclusive = createAction(UPDATE_EXCLUSIVE);
export const updateProbroker = createAction(UPDATE_PROBROKER);
export const updateBlock = createAction(UPDATE_BLOCK);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
    isExclusive : true,
    isProbroker: true,
    isBlock : false,
    isAround: false,
};

// immer 를 사용하여 값을 수정하는 리듀서입니다.
export default handleActions({
  [UPDATE_EXCLUSIVE]: (state, action) => {
    return produce(state, draft => {
        draft.isExclusive = action.payload.isExclusive ? action.payload.isExclusive : draft.isExclusive;
    });
  },
  [UPDATE_PROBROKER]: (state, action) => {
    return produce(state, draft => {
        draft.isProbroker = action.payload.isProbroker ? action.payload.isProbroker : draft.isProbroker;
    });
  },
  [UPDATE_BLOCK]: (state, action) => {
    return produce(state, draft => {
        draft.isAround = action.payload.isAround ? action.payload.isAround : draft.isAround;
    });
  },
}, initialState);