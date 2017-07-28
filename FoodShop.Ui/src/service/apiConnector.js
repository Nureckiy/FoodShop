import config from '../config';
import req from 'jquery-browserify';

var RequestHelper = function() {
  this.host = config.apiPath;

  this.postWithAjax = (url, entity, success, failed) => {
    return makeRequest({
        url: this.host + url,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(entity)
      },
      success,
      failed
    );
  };

  this.putWithAjax = (url, entity, success, failed) => {
    return makeRequest({
        url: this.host + url,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(entity)
      },
      success,
      failed
    );
  };

  this.patchToExternal = (url, entity, success, failed) => {
    return makeRequest({
        url: url,
        type: 'PATCH',
        dataType: 'json',
        contentType: 'application/json',
        connection: 'Username-Password-Authentication',
        data: JSON.stringify(entity)
      },
      success,
      failed

    );
  };

  this.getWithAjax = (url, entity, success, failed) => {
    return makeRequest({
        url: this.host + url,
        type: 'GET',
        contentType: 'application/json',
        data: entity
      },
      success,
      failed
    );
  };
};

function makeRequest(params, success, failed) {
  const token = localStorage.getItem('id_token');
  let headers = {};
  if (token) {
    headers.Authorization = 'Bearer ' + token;
  }

  return req.ajax({
    ...params,
    headers,
    success: function(data, statusText, xhr) {
      success &&
      success(data, statusText, xhr);
    },
    error: function(xhr) {
      failed &&
      failed(xhr);
    }
  });
}


exports.RequestHelper = RequestHelper;
