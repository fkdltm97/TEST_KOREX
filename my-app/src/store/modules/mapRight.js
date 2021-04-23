import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const UPDATE_EXCLUSIVE = 'mapRight/exclusive';
const UPDATE_PROBROKER = 'mapRight/probroker';
const UPDATE_BLOCK = 'mapRight/block';
const UPDATE_ZOOMIN = 'mapRight/zoomIn';
const UPDATE_ZOOMOUT = 'mapRight/zoomOut';
const UPDATE_MAPSTYLE = 'mapRight/mapStyle';
const UPDATE_AROUND = 'mapRight/around';

// 액션 생성 함수를 만듭니다.
export const updateExclusive = createAction(UPDATE_EXCLUSIVE);
export const updateProbroker = createAction(UPDATE_PROBROKER);
export const updateBlock = createAction(UPDATE_BLOCK);
export const updateZoomIn = createAction(UPDATE_ZOOMIN);
export const updateZoomOut = createAction(UPDATE_ZOOMOUT);
export const updateMapStyle = createAction(UPDATE_MAPSTYLE);
export const updateAround = createAction(UPDATE_AROUND);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
    isExclusive : {is:true},
    isProbroker: {is:true},
    isBlock : {is:false},
    isZoomIn : 0,
    isZoomOut : 0, 
    mapStyle: "roadmap",
    around : "",
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
        draft.isBlock = action.payload.isBlock ? action.payload.isBlock : draft.isBlock;
    });
  },
  [UPDATE_ZOOMIN]: (state, action) => {
    return produce(state, draft => {
        draft.isZoomIn = action.payload.isZoomIn ? action.payload.isZoomIn : draft.isZoomIn;
    });
  },
  [UPDATE_ZOOMOUT]: (state, action) => {
    return produce(state, draft => {
        draft.isZoomOut = action.payload.isZoomOut ? action.payload.isZoomOut : draft.isZoomOut;
    });
  },
  [UPDATE_MAPSTYLE]: (state, action) => {
    return produce(state, draft => {
        draft.mapStyle = action.payload.mapStyle ? action.payload.mapStyle : draft.mapStyle;
    });
  },
  [UPDATE_AROUND]: (state, action) => {
    return produce(state, draft => {
        draft.around = action.payload.around ? action.payload.around : draft.around;
    });
  },
}, initialState);