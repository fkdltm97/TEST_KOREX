import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입을 정의해줍니다.
const DONGCHANGE = 'brokerRequest_productEdit/dongchange';
const HOSILCHANGE = 'brokerRequest_productEdit/hosilchange';
const FLOORCHANGE = 'brokerRequest_productEdit/floorchange';
const DANGICHANGE= 'brokerRequest_productEdit/dangichange';
const ADDRESSCHANGE= 'brokerRequest_productEdit/addresschange';
const PHONECHANGE= 'brokerRequest_productEdit/phonechange';
const NAMECHANGE= 'brokerRequest_productEdit/namechange';
const MAEMULTYPECHANGE= 'brokerRequest_productEdit/maemultypechange';

const MAEMULNAMECHANGE ='brokerRequest_productEdit/maemulnamechange';
const EXCULSIVEDIMENSIONCHANGE= 'brokerRequest_productEdit/exculsivedimensionchange';
const EXCULSIVEPYEONGCHANGE= 'brokerRequest_productEdit/exculsivepyeongchange';
const SUPPLYDIMENSIONCHANGE= 'brokerRequest_productEdit/supplydimensionchange';
const SUPPLYPYEONGCHANGE= 'brokerRequest_productEdit/supplypyeongchange';
const SELLTYPECHANGE= 'brokerRequest_productEdit/selltypechange';
const SELLPRICECHANGE= 'brokerRequest_productEdit/sellpricechange';
const MANAGECOSTCHANGE= 'brokerRequest_productEdit/managecostchange';
const IBJUISINSTANTCHANGE= 'brokerRequest_productEdit/ibjuisinstantchange';
const IBJUSPECIFYDATECHANGE= 'brokerRequest_productEdit/ibjuspecifydatechange';
const EXCULSIVEPERIODSCHANGE= 'brokerRequest_productEdit/exculsiveperiodschange';
const COMPANYIDCHANGE= 'brokerRequest_productEdit/companyidchange';
const REQUESTMEMIDCHANGE= 'brokerRequest_productEdit/requestmemidchange';

const PRDIDENTITYIDCHANGE='brokerRequest_productEdit/prdidentityidchange';
const REQUESTMANNAMECHANGE='brokerRequest_productEdit/requestmannamechange';
const REQUESTMEMPHONECHANGE='brokerRequest_productEdit/requestmemphonechange';

//추가정보
const APARTSPACECHANGE='brokerRequest_productEdit/apartspacechange';
const BATHROOMCOUNTCHANGE='brokerRequest_productEdit/bathroomcountchange';
const DIRECTIONCHANGE='brokerRequest_productEdit/directionchange';
const ENTRANCECHANGE='brokerRequest_productEdit/entrancechange';
const HEATFUELTYPECHANGE='brokerRequest_productEdit/heatfueltypechange';
const HEATMETHODTYPECHANGE='brokerRequest_productEdit/heatmethodtypechange';
const ISELEVATORCHANGE='brokerRequest_productEdit/iselevatorchange';
const ISPARKINGCHANGE='brokerRequest_productEdit/isparkingchange';
const ISCONTRACTRENEWALCHANGE='brokerRequest_productEdit/iscontractrenewalchange';
const ISDUPLEXFLOORCHANGE='brokerRequest_productEdit/isduplexfloorchange';
const ISWITHPETCHANGE='brokerRequest_productEdit/iswithpetchange';
const LOANPRICECHANGE='brokerRequest_productEdit/loanpricechange';
const MAEMULDESCRIPTIONCHANGE='brokerRequest_productEdit/maemuldescriptionchange';
const MAEMULDESCRIPTIONDETAILCHANGE='brokerRequest_productEdit/maemuldescriptiondetailchange';
const MONTHBASEGUARANTEEPRICECHANGE='brokerRequest_productEdit/monthbaseguaranteepricechange';
const PARKINGOPTIONSCHANGE='brokerRequest_productEdit/parkingoptionschange';
const ROOMCOUNTCHANGE='brokerRequest_productEdit/roomcountchange';
const ROOMTYPECHANGE='brokerRequest_productEdit/roomtypechange';
const SECURITYOPTIONCHANGE='brokerRequest_productEdit/securityoptionchange';
const SPACEADDONOPTIONCHANGE='brokerRequest_productEdit/spaceaddonoptionchange';
const SPACEOPTIONCHANGE='brokerRequest_productEdit/spaceoptionchange';

// 액션 생성 함수를 만듭니다.
export const dongchange = createAction(DONGCHANGE);
export const hosilchange = createAction(HOSILCHANGE);
export const floorchange = createAction(FLOORCHANGE);
export const dangichange = createAction(DANGICHANGE);
export const addresschange = createAction(ADDRESSCHANGE);
export const phonechange = createAction(PHONECHANGE);
export const namechange = createAction(NAMECHANGE);
export const maemultypechange = createAction(MAEMULTYPECHANGE);

export const maemulnamechange= createAction(MAEMULNAMECHANGE);
export const exculsivedimensionchange= createAction(EXCULSIVEDIMENSIONCHANGE);
export const exculsivepyeongchange= createAction(EXCULSIVEPYEONGCHANGE);
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

export const prdidentityidchange = createAction(PRDIDENTITYIDCHANGE);
export const requestmannamechange= createAction(REQUESTMANNAMECHANGE);
export const requestmemphonechange = createAction(REQUESTMEMPHONECHANGE);

export const apartspacechange= createAction(APARTSPACECHANGE);
export const bathroomcountchange= createAction(BATHROOMCOUNTCHANGE);
export const directionchange= createAction(DIRECTIONCHANGE);
export const entrancechange= createAction(ENTRANCECHANGE);
export const heatfueltypechange= createAction(HEATFUELTYPECHANGE);
export const heatmethodtypechange= createAction(HEATMETHODTYPECHANGE);
export const iselevatorchange= createAction(ISELEVATORCHANGE);
export const isparkingchange= createAction(ISPARKINGCHANGE);
export const iscontractrenewalchange= createAction(ISCONTRACTRENEWALCHANGE);
export const isduplexfloorchange= createAction(ISDUPLEXFLOORCHANGE);
export const iswithpetchange= createAction(ISWITHPETCHANGE);
export const loanpricechange= createAction(LOANPRICECHANGE);
export const maemuldescriptionchange= createAction(MAEMULDESCRIPTIONCHANGE);
export const maemuldescriptiondetailchange= createAction(MAEMULDESCRIPTIONDETAILCHANGE);
export const monthbaseguaranteepricechange= createAction(MONTHBASEGUARANTEEPRICECHANGE);
export const parkingoptionschange= createAction(PARKINGOPTIONSCHANGE);
export const roomcountchange= createAction(ROOMCOUNTCHANGE);
export const roomtypechange= createAction(ROOMTYPECHANGE);
export const securityoptionchange= createAction(SECURITYOPTIONCHANGE);
export const spaceaddonoptionchange= createAction(SPACEADDONOPTIONCHANGE);
export const spaceoptionchange= createAction(SPACEOPTIONCHANGE);


// 모듈의 초기 상태를 정의합니다.
const initialState = {
   dong : '',
   hosil: '',
   floor: '',
   dangi: '',
   address: '',
   name: '',
   phone: '',
   maemultype: '',

   maemulname: '',
   exculsivedimension: '',
   exculsivepyeong:'',
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

   prdidentityid : '',
   requestmanname : '',
   requestmemphone: '',

   apartspace: '',
   bathroomcount:'',
   direction: '',
   entrance:'',
   heatfueltype:'',
   heatmethodtype:'',
   iselevator:'',
   isparking:'',
   iscontractrenewal:'',
   isduplexfloor:'',
   iswithpet:'',
   loanprice:'',
   maemuldescription:'',
   maemuldescriptiondetail:'',
   monthbaseguaranteeprice:'',
   parkingoptions:'',
   roomcount:'',
   roomtype:'',
   securityoption:'',
   spaceaddonoption:'',
   spaceoption:''
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
  [DANGICHANGE]: (state, action) => {
    console.log('dangichange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.dangi = action.payload.dangis;
   });
 },
 [ADDRESSCHANGE]: (state, action) => {
    console.log('dangiaddresschange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.address = action.payload.addresss;
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
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.maemulname = action.payload.maemulnames;
   });
 },
 [EXCULSIVEDIMENSIONCHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.exculsivedimension = action.payload.exculsivedimensions;
   });
 },
 [EXCULSIVEPYEONGCHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.exculsivepyeong = action.payload.exculsivepyeongs;
   });
 },
 [SUPPLYDIMENSIONCHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.supplydimension = action.payload.supplydimensions;
   });
 },
 [SUPPLYPYEONGCHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.supplypyeong = action.payload.supplypyeongs;
   });
 },
 [SELLTYPECHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.selltype = action.payload.selltypes;
   });
 },
 [SELLPRICECHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.sellprice = action.payload.sellprices;
   });
 },
 [MANAGECOSTCHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.managecost = action.payload.managecosts;
   });
 },
 [IBJUISINSTANTCHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.ibju_isinstant = action.payload.ibju_isinstants;
   });
 },
 [IBJUSPECIFYDATECHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.ibju_specifydate = action.payload.ibju_specifydates;
   });
 },
 [EXCULSIVEPERIODSCHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.exculsive_periods = action.payload.exculsive_periodss;
   });
 },
 [COMPANYIDCHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.companyid = action.payload.companyids;
   });
 },
 [REQUESTMEMIDCHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.requestmemid = action.payload.requestmemids;
   });
 },
 [PRDIDENTITYIDCHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.prdidentityid = action.payload.prd_identity_ids;
   });
 },
 [REQUESTMANNAMECHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.requestmanname = action.payload.requestmannames;
   });
 },
 [REQUESTMEMPHONECHANGE]: (state, action) => {
    console.log('maemultypechange 함수 호출 :',state,action);
   return produce(state, draft => {
     draft.requestmemphone = action.payload.requestmemphones;
   });
 },
 

 [APARTSPACECHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.apartspace = action.payload.apartspaces;
 });
},
[BATHROOMCOUNTCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.bathroomcount = action.payload.bathroomcounts;
 });
},
[DIRECTIONCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.direction = action.payload.directions;
 });
},
[ENTRANCECHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.entrance = action.payload.entrances;
 });
},
[HEATFUELTYPECHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.heatfueltype = action.payload.heatfueltypes;
 });
},
[HEATMETHODTYPECHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.heatmethodtype = action.payload.heatmethodtypes;
 });
},
[ISELEVATORCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.iselevator = action.payload.iselevators;
 });
},
[ISPARKINGCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.isparking = action.payload.isparkings;
 });
},
[ISCONTRACTRENEWALCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.iscontractrenewal = action.payload.iscontractrenewals;
 });
},
[ISDUPLEXFLOORCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.isduplexfloor = action.payload.isduplexfloors;
 });
},
[ISWITHPETCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.iswithpet = action.payload.iswithpets;
 });
},
[LOANPRICECHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.loanprice = action.payload.loanprices;
 });
},
[MAEMULDESCRIPTIONCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.maemuldescription = action.payload.maemuldescriptions;
 });
},
[MAEMULDESCRIPTIONDETAILCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.maemuldescriptiondetail = action.payload.maemuldescriptiondetails;
 });
},
[MONTHBASEGUARANTEEPRICECHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.monthbaseguaranteeprice = action.payload.monthbaseguranteeprices;
 });
},
[PARKINGOPTIONSCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.parkingoptions = action.payload.parkingoptions;
 });
},
[ROOMCOUNTCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.roomcount = action.payload.roomcounts;
 });
},
[ROOMTYPECHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.roomtype = action.payload.roomtypes;
 });
},
[SECURITYOPTIONCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.securityoption = action.payload.securityoptions;
 });
},
[SPACEADDONOPTIONCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.spaceaddonoption = action.payload.spaceaddonoptions;
 });
},
[SPACEOPTIONCHANGE]: (state, action) => {
  console.log('maemultypechange 함수 호출 :',state,action);
 return produce(state, draft => {
   draft.spaceoption = action.payload.spaceoptions;
 });
},

 
}, initialState);