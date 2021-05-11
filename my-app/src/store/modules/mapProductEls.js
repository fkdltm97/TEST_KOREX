import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const UPDATE_EXCLUSIVE = 'mapProductEls/exc';
const UPDATE_PROBROKER = 'mapProductEls/pro';
const UPDATE_BROKERPRODUCT = 'mapProductEls/broPro';
const UPDATE_BLOCK = 'mapProductEls/block';
const UPDATE_ORDER = 'mapProductEls/order';
const UPDATE_CLICKEXC = 'mapProductEls/clickExc';
const UPDATE_CLICKPRO = 'mapProductEls/clickPro';
const UPDATE_CLICKBLO = 'mapProductEls/clickBlo';

// 액션 생성 함수를 만듭니다.
export const updateExclusive = createAction(UPDATE_EXCLUSIVE);
export const updateProbroker = createAction(UPDATE_PROBROKER);
export const updateBrokerProduct = createAction(UPDATE_BROKERPRODUCT);
export const updateBlock = createAction(UPDATE_BLOCK);
export const updateOrder = createAction(UPDATE_ORDER);
export const updateClickExc = createAction(UPDATE_CLICKEXC);
export const updateClickPro = createAction(UPDATE_CLICKPRO);
export const updateClickBlo = createAction(UPDATE_CLICKBLO);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
    exclusive  : [],
    probroker: [],
    brokerProduct: [],
    block: [],
    order:0,
    clickExc:0,
    clickPro:0,
    clickBlo:0,
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
  [UPDATE_BROKERPRODUCT]: (state, action) => {
    return produce(state, draft => {
        draft.brokerProduct = action.payload.brokerProduct ? action.payload.brokerProduct : draft.brokerProduct;
    });
  },
  [UPDATE_BLOCK]: (state, action) => {
    return produce(state, draft => {
        draft.block = action.payload.block ? action.payload.block : draft.block;
    });
  },
  [UPDATE_ORDER]: (state, action) => {
    return produce(state, draft => {
        draft.order = action.payload.order ? action.payload.order : draft.order;
    });
  },
  [UPDATE_CLICKEXC]: (state, action) => {
    return produce(state, draft => {
        draft.clickExc = action.payload.clickExc ? action.payload.clickExc : draft.clickExc;
    });
  },
  [UPDATE_CLICKPRO]: (state, action) => {
    return produce(state, draft => {
        draft.clickPro = action.payload.clickPro ? action.payload.clickPro : draft.clickPro;
    });
  },
  [UPDATE_CLICKBLO]: (state, action) => {
    return produce(state, draft => {
        draft.clickBlo = action.payload.clickBlo ? action.payload.clickBlo : draft.clickBlo;
    });
  },
}, initialState);