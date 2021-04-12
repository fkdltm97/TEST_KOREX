import { bindActionCreators } from 'redux';
import * as myActions from './modules/my';
import * as userActions from './modules/user';
import * as tempRegisterdataActions from './modules/temp_register_userdata';

import store from './index';

const { dispatch } = store;

export const MyActions = bindActionCreators(myActions, dispatch);
export const UserActions = bindActionCreators(userActions, dispatch);
export const tempRegisterUserdataActions = bindActionCreators(tempRegisterdataActions, dispatch);