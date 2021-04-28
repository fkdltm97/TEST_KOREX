import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const UPDATE_FILTER = 'mapfilter/filter';
const UPDATE_FILTERARR = 'mapfilter/filterArr';

// 액션 생성 함수를 만듭니다.
export const updateFilter = createAction(UPDATE_FILTER);
export const updateFilterArr = createAction(UPDATE_FILTERARR);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
    filter : {
      prd_sel_type:["1"],  // 상품 전월세 타입
      prd_price:"",  // 상품 가격
      expenses:false,  // 관리비 유무  --> ERD X 
      expensesRange:"", // 관리비  --> ERD X
      supply_space:"", // 공급 면적
      floor:"", //  층수
      is_parking:false, // 주차 여부
      is_toilet:false, // 화장실 유뮤
      life_facilites:[], // 옵션
      use:"" // 사용 승인일  --> ERD X
    },
    filterArr:{
      prd_sel_type:["매매"],
      floor:"전체",
      switchArr:[],
      life_facilites:[],
      use:"전체",
      purpose:"전체",
      room:["전체"],
      double:"전체",
      pet:"전체",
      roomApart:"전체",
      bath:"전체",
      danji:"전체"
    },
};

// immer 를 사용하여 값을 수정하는 리듀서입니다.
export default handleActions({
  [UPDATE_FILTER]: (state, action) => {
    return produce(state, draft => {
        draft.filter = action.payload.filter ? action.payload.filter : draft.filter;
    });
  },
  [UPDATE_FILTERARR]: (state, action) => {
    return produce(state, draft => {
        draft.filterArr = action.payload.filterArr ? action.payload.filterArr : draft.filterArr;
    });
  },
}, initialState);