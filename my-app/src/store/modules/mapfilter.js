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
      prd_sel_type:["매매"],  // 상품 전월세 타입
      floor:"전체", // 층수
      switchArr:[], // 관리비, 주차장, 화장실
      life_facilites:[], // 옵션
      use:"전체", // 사용승인일
      purpose:"전체", // 용도 (오피스텔)
      room:["전체"], // 방수
      double:"전체", // 복층여부
      pet:"전체", // 반려동물
      roomApart:"전체", //  방수(아파트)
      bath:"전체", // 욕실수
      danji:"전체", // 총세대수
      priceRange:"전체", // 매매 범위
      manaRange:"전체", // 관리비 범위
      areaRange:"전체", // 면적 범위
      jeonseRange:"전체", // 보증금(전세금) 범위
      monthlyRange:"전체", // 월세 범위 

      priceRangeValue:[0, 100], // 매매 범위값
      manaRangeValue:[0, 75], // 관리비 범위값
      areaRangeValue:[0, 100], // 면적 범위값
      jeonseRangeValue:[0, 30], // 보증금(전세금) 범위값
      monthlyRangeValue:[0, 18], // 월세 범위 값
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