import { system as systemApi } from '@/services/api';
import { is_error } from '@/utils/utils';
import { message } from 'antd';

export default {
  namespace: 'system',
  state: {
    roles:{},
    members:{},
  },

  effects: {
    *loadRoles({ payload , callback = null}, { call, put }) {
      const response = yield call( systemApi.role.all,payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      yield put({
        type: 'loadRolesSync',
        payload: response,
      });
      if (callback) { 
        yield call(callback);
      }
    },

    *removeRoles({ payload ,callback = null }, { call, put }) {
      for (let entry of payload) {
        const response = yield call( systemApi.role.delete, entry);
        if (is_error(response)) {
          message.error(response.message);
          return;
        }
        yield put({
          type: 'removeRolesSync',
          payload: entry, 
        });
      }
      if (callback) {
        yield call(callback);
      }
      message.success('成功删除');
    },

    *saveRoles({ payload, callback = null }, { call, put }) {
      const response = yield call( systemApi.role.save, payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      payload.id = response;
      yield put({
        type: 'saveRolesSync',
        payload: payload,
      });
      if (callback) {
        yield call(callback);
      }
      message.success('成功保存');
    },

    *loadMembers({ payload , callback = null }, { call, put }) {
      const response = yield call( systemApi.user.all,payload);
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      yield put({
        type: 'loadMembersSync',
        payload: response,
      });
      if (callback) { 
        yield call(callback);
      }
    },

    *removeMembers({ payload ,callback = null }, { call, put }) {
      for (let entry of payload) {
        const response = yield call(systemApi.user.delete, entry);
        if (is_error(response)) {
          message.error(response.message);
          return;
        }
        yield put({
          type: 'removeMembersSync',
          payload: entry, 
        });
      }
      if (callback) {
        yield call(callback);
      }
      message.success('成功删除');
    },

    *saveMembers({ payload, callback = null }, { call, put }) {
      const response = yield call(systemApi.user.save, payload);
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      payload.id = response;
      yield put({
        type: 'saveMembersSync',
        payload: payload,
      });
      if (callback) {
        yield call(callback);
      }
      message.success('成功保存');
    },
  },

  reducers: {

    loadRolesSync(state, action) {
      return {
        ...state,
        roles: action.payload,
      };
    },
    removeRolesSync(state, action) {
      const newRoles = state.roles;
      newRoles.list = newRoles.list.filter(role => role.id !== action.payload.id);
      return {
        ...state,
        roles: newRoles,
      };
    },
    saveRolesSync(state, action) {
      const newRoles= state.roles;
      const currentRole = newRoles.list.find( role => role.id == action.payload.id );
      if (currentRole) {
        Object.assign(currentRole, action.payload);
      } else {
        newRoles.list.push(action.payload);
      }
      return {
        ...state,
        roles: newRoles,
      };
    },
    loadMembersSync(state, action) {
      return {
        ...state,
        members: action.payload,
      };
    },
    removeMembersSync(state, action) {
      const newMembers = state.members;
      newMembers.list = newMembers.list.filter(member => member.id != action.payload.id);
      return {
        ...state,
        members: newMembers,
      };
    },
    saveMembersSync(state, action) {
      const newMembers = state.members;
      const currentMember = newMembers.list.find(member => member.uid == action.payload.id);
      if (currentMember) {
        Object.assign(currentMember, action.payload);
      } else {
        newMembers.list.push(action.payload);
      }
      return {
        ...state,
        members: newMembers,
      };
    },



    
    

  }
}

