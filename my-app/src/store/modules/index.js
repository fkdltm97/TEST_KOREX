import { combineReducers } from 'redux';
import my from './my';
import user from './user';
import temp_register_userdata from './temp_register_userdata';
import login_user from './login_user';
import tempBrokerRequest from './tempBrokerRequest';
import brokerRequest_product from './brokerRequest_product';

export default combineReducers({
  my,
  user,
  temp_register_userdata,
  login_user,
  tempBrokerRequest,
  brokerRequest_product
});