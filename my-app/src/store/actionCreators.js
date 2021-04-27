import { bindActionCreators } from 'redux';
import * as myActions from './modules/my';
import * as userActions from './modules/user';
import * as tempRegisterdataActions from './modules/temp_register_userdata';
import * as mapRight from './modules/mapRight';
import * as mapFilter from './modules/mapFilter';

import store from './index';

const { dispatch } = store;

export const MyActions = bindActionCreators(myActions, dispatch);
export const UserActions = bindActionCreators(userActions, dispatch);
export const tempRegisterUserdataActions = bindActionCreators(tempRegisterdataActions, dispatch);
export const MapRight = bindActionCreators(mapRight, dispatch);
export const MapFilterRedux = bindActionCreators(mapFilter, dispatch);