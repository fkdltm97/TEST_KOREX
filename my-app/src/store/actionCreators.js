import { bindActionCreators } from 'redux';
import * as myActions from './modules/my';
import * as userActions from './modules/user';
import * as tempRegisterdataActions from './modules/temp_register_userdata';
import * as login_userActions from './modules/login_user';
import * as tempBrokerRequestactions from './modules/tempBrokerRequest';

import store from './index';

const { dispatch } = store;

export const MyActions = bindActionCreators(myActions, dispatch);
export const UserActions = bindActionCreators(userActions, dispatch);
export const tempRegisterUserdataActions = bindActionCreators(tempRegisterdataActions, dispatch);
export const Login_userActions= bindActionCreators(login_userActions, dispatch);
export const tempBrokerRequestActions = bindActionCreators(tempBrokerRequestactions,dispatch);
