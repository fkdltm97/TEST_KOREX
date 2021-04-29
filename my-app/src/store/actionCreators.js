import { bindActionCreators } from 'redux';
import * as myActions from './modules/my';
import * as userActions from './modules/user';
import * as tempRegisterdataActions from './modules/temp_register_userdata';
import * as login_userActions from './modules/login_user';
import * as tempBrokerRequestactions from './modules/tempBrokerRequest';
import * as brokerRequest_productEditactions from './modules/brokerRequest_product';
import * as mapRight from './modules/mapRight';
import * as temp_tourReservsettingAction from './modules/temp_tourReservsetting';
import * as mapFilter from './modules/mapfilter';

import store from './index';

const { dispatch } = store;

export const MyActions = bindActionCreators(myActions, dispatch);
export const UserActions = bindActionCreators(userActions, dispatch);
export const tempRegisterUserdataActions = bindActionCreators(tempRegisterdataActions, dispatch);
export const Login_userActions= bindActionCreators(login_userActions, dispatch);
export const tempBrokerRequestActions = bindActionCreators(tempBrokerRequestactions,dispatch);
export const brokerRequest_productEditActions = bindActionCreators(brokerRequest_productEditactions,dispatch);
export const MapRight = bindActionCreators(mapRight, dispatch);
export const temp_tourReservsettingActions = bindActionCreators(temp_tourReservsettingAction,dispatch);
export const MapFilterRedux = bindActionCreators(mapFilter, dispatch);
