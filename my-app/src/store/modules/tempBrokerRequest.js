import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const DONGCHANGE = 'temp_brokerRequest/dongchange';
const HOSILCHANGE = 'temp_brokerRequest/hosilchange';
const FLOORCHANGE = 'temp_brokerRequest/floorchange';
const DONGNAMECHANGE = 'temp_brokerRequest/dongnamechange';
const HOSILNAMECHANGE= 'temp_brokerRequest/hosilnamechange';
const FLOORNAMECHANGE= 'temp_brokerRequest/floornamechange';

const DANGICHANGE= 'temp_brokerRequest/dangichange';
const DANGIJIBUNADDRESSCHANGE= 'temp_brokerRequest/dangijibunaddresschange';
const DANGIROADADDRESSCHANGE= 'temp_brokerRequest/dangiroadaddresschange';
const XCHANGE= 'temp_brokerRequest/xchange';//특정한 선택 단지(단지에 속한 모든 매물들 동(bld_id),층(flr_id),호(ho_id)들은 모두 같은 단지의 경도,위도값 공유한다.
const YCHANGE= 'temp_brokerRequest/ychange';

const PHONECHANGE= 'temp_brokerRequest/phonechange';
const NAMECHANGE= 'temp_brokerRequest/namechange';
const MAEMULTYPECHANGE= 'temp_brokerRequest/maemultypechange';

const MAEMULNAMECHANGE ='temp_brokerRequest/maemulnamechange';
const JEONYONGDIMENSIONCHANGE= 'temp_brokerRequest/jeonyongdimensionchange';
const JEONYONGPYEONGCHANGE= 'temp_brokerRequest/jeonyongpyeongchange';
const SUPPLYDIMENSIONCHANGE= 'temp_brokerRequest/supplydimensionchange';
const SUPPLYPYEONGCHANGE= 'temp_brokerRequest/supplypyeongchange';
const SELLTYPECHANGE= 'temp_brokerRequest/selltypechange';
const SELLPRICECHANGE= 'temp_brokerRequest/sellpricechange';
const MANAGECOSTCHANGE= 'temp_brokerRequest/managecostchange';
const IBJUISINSTANTCHANGE= 'temp_brokerRequest/ibjuisinstantchange';
const IBJUSPECIFYDATECHANGE= 'temp_brokerRequest/ibjuspecifydatechange';
const EXCULSIVEPERIODSCHANGE= 'temp_brokerRequest/exculsiveperiodschange';
const COMPANYIDCHANGE= 'temp_brokerRequest/companyidchange';
const REQUESTMEMIDCHANGE= 'temp_brokerRequest/requestmemidchange';
const MANAGECOSTINCLUDESCHANGE= 'temp_brokerRequest/managecostincludeschange';

// 액션 생성 함수를 만듭니다.
export const dongchange = createAction(DONGCHANGE);
export const hosilchange = createAction(HOSILCHANGE);
export const floorchange = createAction(FLOORCHANGE);
export const dongnamechange= createAction(DONGNAMECHANGE);
export const hosilnamechange= createAction(HOSILNAMECHANGE);
export const floornamechange= createAction(FLOORNAMECHANGE);

export const dangichange = createAction(DANGICHANGE);
export const dangijibunaddresschange = createAction(DANGIJIBUNADDRESSCHANGE);
export const dangiroadaddresschange = createAction(DANGIROADADDRESSCHANGE);
export const xchange= createAction(XCHANGE);
export const ychange= createAction(YCHANGE);
export const phonechange = createAction(PHONECHANGE);
export const namechange = createAction(NAMECHANGE);
export const maemultypechange = createAction(MAEMULTYPECHANGE);

export const maemulnamechange= createAction(MAEMULNAMECHANGE);
export const jeonyongdimensionchange= createAction(JEONYONGDIMENSIONCHANGE);
export const jeonyongpyeongchange= createAction(JEONYONGPYEONGCHANGE);
export const supplydimensionchange= createAction(SUPPLYDIMENSIONCHANGE);
export const supplypyeongchange= createAction(SUPPLYPYEONGCHANGE);
export const selltypechange =createAction(SELLTYPECHANGE);
export const sellpricechange= createAction(SELLPRICECHANGE);
export const managecostchange= createAction(MANAGECOSTCHANGE);
export const ibjuisinstantchange= createAction(IBJUISINSTANTCHANGE);
export const ibjuspecifydatechange = createAction(IBJUSPECIFYDATECHANGE);
export const exculsiveperiodschange= createAction(EXCULSIVEPERIODSCHANGE);
export const companyidchange = createAction(COMPANYIDCHANGE);
export const requestmemidchange = createAction(REQUESTMEMIDCHANGE);
export const managecostincludeschange= createAction(MANAGECOSTINCLUDESCHANGE);

// 모듈의 초기 상태를 정의합니다.
const initialState = {
   dong : '',
   hosil: '',
   floor: '',
   dongname:'',
   hosilname:'',
   floorname:'',
   dangi: '',
   dangijibunaddress: '',
   dangiroadaddress:'',
   x:'',
   y:'',
   name: '',
   phone: '',
   maemultype: '',

   maemulname: '',
   jeonyongdimension: '',
   jeonyongpyeong:'',
   supplydimension:'',
   supplypyeong:'',
   selltype:'',
   sellprice:'',
   managecost:'',
   ibju_isinstant:'',
   ibju_specifydate:'',
   exculsive_periods:'',
   companyid : '',
   requestmemid: '',
   managecostincludes : ''
};

// immer 를 사용하여 값을 수정하는 리듀서입니다.
export default handleActions({
  
  [DONGCHANGE]: (state, action) => {
    console.log('dongchange함수 호출',state,action);
    return produce(state, draft => {
      draft.dong = action.payload.dongs;
    });
  },
  // { } 를 따로 열지 않고 바로 리턴하면 이런 형식입니다.
  [HOSILCHANGE]: (state, action) =>{
    console.log('hosilchange 함수 호출:',state,action);
    return produce(state, draft => {
      draft.hosil = action.payload.hosils;
    });
  },
  [FLOORCHANGE]: (state, action) => {
     console.log('floorchange 함수 호출 :',state,action);
    return produce(state, draft => {
      draft.floor = action.payload.floors;
    });
  },
  [DONGNAMECHANGE]: (state, action) => {
    console.log('DONGNAMECHANGE 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.dongname = action.payload.dongnames;
   });
 },
 [HOSILNAMECHANGE]: (state, action) => {
  console.log('HOSILNAMECHANGE 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.hosilname = action.payload.hosilnames;
 });
},
[FLOORNAMECHANGE]: (state, action) => {
  console.log('FLOORNAMECHANGE 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.floorname = action.payload.floornames;
 });
},
  [DANGICHANGE]: (state, action) => {
    console.log('dangichange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.dangi = action.payload.dangis;
   });
 },
 [DANGIJIBUNADDRESSCHANGE]: (state, action) => {
    console.log('DANGIJIBUNADDRESSCHANGE 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.dangijibunaddress = action.payload.dangijibunaddress;
   });
 },
 [DANGIROADADDRESSCHANGE]: (state, action) => {
  console.log('dangiaddress & address change 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.dangiroadaddress = action.payload.dangiroadaddress;
 });
},
 [XCHANGE] : (state,action) => {
   console.log('dangi x pos change함수호출:',state,action);
   return produce(state,draft => {
     draft.x= action.payload.x_pos;
   });
 },
 [YCHANGE] : (state,action) => {
   console.log('dangi y pos change함수 호출:',state,action);
   return produce(state,draft => {
     draft.y= action.payload.y_pos;
   });
 },
 [PHONECHANGE]: (state, action) => {
    console.log('phonechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.phone = action.payload.phones;
   });
 },
 [NAMECHANGE]: (state, action) => {
    console.log('namechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.name = action.payload.names;
   });
 },
 [MAEMULTYPECHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.maemultype = action.payload.maemultypes;
   });
 },

 [MAEMULNAMECHANGE]: (state, action) => {
    console.log('maemulnamechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.maemulname = action.payload.maemulnames;
   });
 },
 [JEONYONGDIMENSIONCHANGE]: (state, action) => {
    console.log('jeonyongdimensioncahnge 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.jeonyongdimension = action.payload.jeonyongdimensions;
   });
 },
 [JEONYONGPYEONGCHANGE]: (state, action) => {
    console.log('jeonyongpyeongchange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.jeonyongpyeong = action.payload.jeonyongpyeongs;
   });
 },
 [SUPPLYDIMENSIONCHANGE]: (state, action) => {
    console.log('supplydimesnionchange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.supplydimension = action.payload.supplydimensions;
   });
 },
 [SUPPLYPYEONGCHANGE]: (state, action) => {
    console.log('suppylpyeongchange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.supplypyeong = action.payload.supplypyeongs;
   });
 },
 [SELLTYPECHANGE]: (state, action) => {
    console.log('selltypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.selltype = action.payload.selltypes;
   });
 },
 [SELLPRICECHANGE]: (state, action) => {
    console.log('sellrpciehcnage 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.sellprice = action.payload.sellprices;
   });
 },
 [MANAGECOSTCHANGE]: (state, action) => {
    console.log('managecostchange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.managecost = action.payload.managecosts;
   });
 },
 [IBJUISINSTANTCHANGE]: (state, action) => {
    console.log('ibjuisinstatnchange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.ibju_isinstant = action.payload.ibju_isinstants;
   });
 },
 [IBJUSPECIFYDATECHANGE]: (state, action) => {
    console.log('ibjuspecifydatechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.ibju_specifydate = action.payload.ibju_specifydates;
   });
 },
 [EXCULSIVEPERIODSCHANGE]: (state, action) => {
    console.log('exculsiveperidoschange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.exculsive_periods = action.payload.exculsive_periodss;
   });
 },
 [COMPANYIDCHANGE]: (state, action) => {
    console.log('companyidchange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.companyid = action.payload.companyids;
   });
 },
 [REQUESTMEMIDCHANGE]: (state, action) => {
    console.log('requestmemdichange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.requestmemid = action.payload.requestmemids;
   });
 },
 [MANAGECOSTINCLUDESCHANGE]: (state, action) => {
  console.log('managecostincluedschange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.managecostincludes = action.payload.managecostincludess;
 });
},
}, initialState);