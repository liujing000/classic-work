import request from '@/utils/request';
import { async } from 'q';
import http from '~/utils/http';

export async function current() {
  return http.get('/system/user/current');
}

export async function login(params) {
  let loginUrl = window.authUrl ? window.authUrl : '/user/login';
  return http.raw(loginUrl, {
    method: 'POST',
    body: params,
  });
}

export async function logout() {
  return http.post('/user/logout');
}
 