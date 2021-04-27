import { combineReducers } from 'redux';
import my from './my';
import user from './user';
import temp_register_userdata from './temp_register_userdata';
import mapRight from './mapRight';
import mapFilter from './mapFilter';

export default combineReducers({
  my,
  user,
  temp_register_userdata,
  mapRight,
  mapFilter,
});