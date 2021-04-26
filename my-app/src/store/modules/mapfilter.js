import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const UPDATE_EXCLUSIVE = 'mapRight/exclusive';

// 액션 생성 함수를 만듭니다.
export const updateExclusive = createAction(UPDATE_EXCLUSIVE);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
    isExclusive : {is:true},
};

// immer 를 사용하여 값을 수정하는 리듀서입니다.
export default handleActions({
  [UPDATE_EXCLUSIVE]: (state, action) => {
    return produce(state, draft => {
        draft.isExclusive = action.payload.isExclusive ? action.payload.isExclusive : draft.isExclusive;
    });
  },
}, initialState);