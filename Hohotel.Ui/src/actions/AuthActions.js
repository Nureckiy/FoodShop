/*eslint no-unused-vars: "off"*/

import * as types from '../constants/AuthConstants';
import service from '../service/service';
import * as utils from '../utils/utils';
import { create, createAsync } from './ActionCreator';
import { EventEmitter } from 'events';
import Auth0Lock from 'auth0-lock';
import { isTokenExpired } from '../utils/jwtHelper.js';
import history from '../store/History';
import config from '../config';

export function login() {
  return (dispatch) => {
    dispatch({
      type: types.LOGIN
    });
    const lock = new Auth0Lock(config.auth0.clientId, config.auth0.domain, lockOptions);
    lock.on('authenticated', doAuthentication);
    lock.show();

    const success = create(dispatch, types.LOGIN_SUCCESS);
    const fail = create(dispatch, types.LOGIN_FAIL);

    function doAuthentication(authResult) {
      localStorage.setItem('id_token', authResult.idToken);
      lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          fail(error);
        } else {
          localStorage.setItem('profile', JSON.stringify(profile));
          lock.hide();
          success(profile);
        }
      });
    }
  };
}

export function logout() {
  localStorage.removeItem('id_token');
  localStorage.removeItem('profile');
  history.push('#');
  return (dispatch) => {
    dispatch ({ type: types.LOGOUT });
  };
}

export function updateProfile(values) {
  return(dispatch, getState) => {
    dispatch({
      type: types.UPDATE_PROFILE,
      values
    });

    const { profile, profile: { user_id }} = getState().AuthReducer;
    service.updateUser({ user_id, domain: config.auth0.domain, values }, success, create(dispatch, types.UPDATE_PROFILE_FAIL));

    function success(data, status) {
      data = Object.assign(profile, { user_metadata: data.user_metadata });
      localStorage.setItem('profile', JSON.stringify(data));
      dispatch({
        type: types.UPDATE_PROFILE_SUCCESS,
        data,
        status
      });
    }
  };
}

export function refreshProfile() {
  return(dispatch) => {
    dispatch({ type: types.REFRESH_PROFILE });
    const profile = localStorage.getItem('profile');
    const token = localStorage.getItem('id_token');
    if (!token || isTokenExpired(token) || !profile) {
      dispatch(logout());
    }
  };
}

const lockOptions = {
  auth: {
    redirectUrl: 'http://localhost:3000/',
    redirect: false,
    responseType: 'token',
    params: {scope: 'openid name groups roles permissions'}
  },
  autoclose: true,
  closable: false,
  rememberLastLogin: true,
  avatar: null,
  theme: {
    logo: 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1487084851/Pizza-icon_bqtwwf.png'
  },
  languageDictionary: {
    title: 'FoodShop'
  }
};