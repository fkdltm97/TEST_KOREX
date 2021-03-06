import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const UPDATE_FILTER = 'mapfilter/filter';
const UPDATE_FILTERARR = 'mapfilter/filterArr';
const UPDATE_FILTERUI = 'mapfilter/filterUI';
const UPDATE_RESET = 'mapfilter/filterReset';

// 액션 생성 함수를 만듭니다.
export const updateFilter = createAction(UPDATE_FILTER);
export const updateFilterArr = createAction(UPDATE_FILTERARR);
export const updateFilterUI = createAction(UPDATE_FILTERUI);
export const updateFilterRest = createAction(UPDATE_RESET);

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
    // 상단 필터 
    filterArr:{
      prd_sel_type:["매매"],  // 상품 전월세 타입
      floor:"전체", // 층수
      switchArr:[],  // 주차장, 화장실
      is_mana:0, // 관리비,
      is_park:0, // 주차장
      is_toilet:0, // 화장실
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
    },
    // 필터 UI
    filterUI:{
      // 공통 필터
      prd_sel_type:[1, 0, 0], // 거래유형
      priceRangeValue:[0, 100], // 매매 범위값
      manaRangeValue:[0, 75], // 관리비 범위값
      areaRangeValue:[0, 100], // 면적 범위값
      jeonseRangeValue:[0, 30], // 보증금(전세금) 범위값
      monthlyRangeValue:[0, 18], // 월세 범위 값
      manaStatus: 0, // 관리비 토글
      floor:0, // 층수
      use:0, // 사용승인일
      
      roomApart:0, // 방수
      bath:0, // 욕실수
      danji:0, // 총세대수
      
      purpose:0, // 용도
      roomOfficetel:[1, 0, 0, 0, 0, 0], // 방구조
      double:0, // 복층
      parkOfficetel:0, // 주차장
      pet:0, // 반려동물

      parkStore:0, // 주차장
      toilet:0, // 화장실
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
  [UPDATE_FILTERUI]: (state, action) => {
    return produce(state, draft => {
        draft.filterUI = action.payload.filterUI ? action.payload.filterUI : draft.filterUI;
    });
  },
  [UPDATE_RESET]: (state, action) => {
    return produce(state, draft => {
        draft.filter = action.payload.filter ? action.payload.filter : draft.filter;
        draft.filterArr = action.payload.filterArr ? action.payload.filterArr : draft.filterArr;
        draft.filterUI = action.payload.filterUI ? action.payload.filterUI : draft.filterUI;
    });
  },
}, initialState);