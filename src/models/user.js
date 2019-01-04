import { login, logout, current } from '@/services/user';
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    authStatus: undefined,
  },
 
  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(current);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },

    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      // const req = yield call(login);
      console.log(response)
      yield put({
        type: 'setAuthStatus',
        payload: response,
      });
      // Login successfully
      // if(req.username !== '')
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *logout(_, { call,put }) {
      yield call(logout);
      yield put({
        type: 'setAuthStatus',
        payload: {
          status: false,
          role: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        }, 
      };
    },
    setAuthStatus(state, { payload }) {
      setAuthority(payload.role);
      return {
        ...state,
        authStatus: payload.status,
      };
    },
  },
};
