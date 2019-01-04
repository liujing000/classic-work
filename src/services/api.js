import { stringify } from 'qs';
import http from '@/utils/http';
import request from '@/utils/request';

export const system = {
  role:{
    async all(value){
      return http.post('/system/role/all',value);
    },
    async delete({ id }) {
      return http.post('/system/role/delete', { id: id });
    },
    async save(value) {
      return http.post('/system/role/save', value);
    },
  },
  user:{
    async all(value) {
      return http.post('/system/user/all',value);
    },
    async delete({ id }) {
      return http.post('/system/user/delete', { id: id });
    },
    async save(value) {
      return http.post('/system/user/save', value);
    },
    sms: {
      async all(value) {
        return http.post('/system/sms/all',value);
      },
      async save(value) {
        return http.post('/system/sms/save', value);
      },
    }, 
  },
  
};

export const member = {
  async all(value){
    return http.post('/member/all',value);
  },
  async delete({ id }) {
    return http.post('/member/delete', { id: id });
  },
  async save(value) {
    return http.post('/member/save', value);
  },
};

export const classic = {
  category:{
    async all(value){
      return http.post('/classic/category/all',value);
    },
    async delete({ id }) {
      return http.post('/classic/category/delete', { id: id });
    },
    async save(value) {
      return http.post('/classic/category/save', value);
    },
    async category(value) {
      return http.post('/classic/category/category', value);
    },
  },
  volume:{
    async all(value){
      return http.post('/classic/volume/all',value);
    },
    async delete({ id }) {
      return http.post('/classic/volume/delete', { id: id });
    },
    async save(value) {
      return http.post('/classic/volume/save', value);
    },
  },
  chapter:{
    async all(value){
      return http.post('/classic/chapter/all',value);
    },
    async delete({ id }) {
      return http.post('/classic/chapter/delete', { id: id });
    },
    async save(value) {
      return http.post('/classic/chapter/save', value);
    },
  },
  special:{
    async all(value){
      return http.post('/classic/special/all',value);
    },
    async delete({ id }) {
      return http.post('/classic/special/delete', { id: id });
    },
    async save(value) {
      return http.post('/classic/special/save', value);
    },
  },
  payments:{
    async all(value){
      return http.post('/classic/payments/all',value);
    }
  },
  async all(value) {
    return http.post('/classic/all', value);
  },
  async delete(id) {
    return http.post('/classic/delete', { id: id });
  },
  async save(value) {
    return http.post('/classic/save', value);
  },
};

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
