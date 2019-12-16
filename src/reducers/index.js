import { combineReducers } from 'redux';
import auth from './auth';
import provide from './provide';
import request from './request';
import userUtil from './userUtil';
import comment from './comment';
import admin from './admin';
import alert from './alert';

export default combineReducers({
  auth,
  provide,
  request,
  userUtil,
  comment,
  admin,
  alert
});
