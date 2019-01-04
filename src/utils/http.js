import request from './request';

const dockUrl = window.dockUrl ? window.dockUrl : '';

const http = (path, options) => {
  let url = dockUrl + path;
  const newOptions = { ...options, headers: { Application: 'mb-custom' } };
  return request(url, newOptions);
};

http.post = (path, body) => {
  let options = {};
  options.method = 'POST';
  options.body = body;
  return http(path, options);
};

http.get = path => {
  let options = {};
  options.method = 'GET';
  return http(path, options);
};

http.raw = (path, options) => {
  const url = path.slice(dockUrl.length);
  return http(url, options);
};

export default http;
