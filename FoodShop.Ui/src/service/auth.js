import { EventEmitter } from 'events';
import Auth0Lock from 'auth0-lock';
import api from './service';
import { isTokenExpired } from '../utils/jwtHelper.js';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();
    this.state = { clientId, domain };
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl: 'http://localhost:3000/#/order',
        responseType: 'token',
        redirectAfterLogin: null
      },
      rememberLastLogin: true,
      avatar: null,
      theme: {
        logo: 'http://res.cloudinary.com/dum4mjc9q/image/upload/v1487084851/Pizza-icon_bqtwwf.png'
      },
      languageDictionary: {
        title: 'FoodShop'
      }
    });
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    this.login = this.login.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    // this.domain = domain;
  }

  _doAuthentication(authResult) {
    this.setToken(authResult.idToken);
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.error(error);
      } else {
        this.setProfile(profile);
      }
    });
  }

  login() {
    this.lock.show();
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  setProfile(profile){
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {};
  }

  setToken(idToken) {
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    window.location.reload();
  }

  updateProfile(userId, data, callback) {
    const { domain } = this.state;
    api.updateUser({ userId, domain, data })
      .then(newProfile => {
        this.setProfile(newProfile);
        callback && callback(newProfile);
      });
  }
}