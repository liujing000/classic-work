import { member as memberApi } from '@/services/api';
import { is_error } from '@/utils/utils';
import { message } from 'antd';

export default {
  namespace: 'member',
  state: {
    members:[],
  },

  effects: {
    *loadMembers({ payload , callback = null}, { call, put }) {
      const response = yield call( memberApi.all,payload );
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
      console.log(payload)
      for (let entry of payload) {
        const response = yield call( memberApi.delete, entry);
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
      const response = yield call( memberApi.save, payload );
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
    loadMembersSync(state, action) {
      return {
        ...state,
        members: action.payload,
      };
    },
    removeMembersSync(state, action) {
      const newMembers = state.members;
      newMembers.list = newMembers.list.filter(member => member.id !== action.payload.id);
      return {
        ...state,
        members: newMembers,
      };
    },
    saveMembersSync(state, action) {
      const newMembers = state.members;
      const currentMember = newMembers.find(member => member.uid == action.payload.uid);
      if (currentMember) {
        Object.assign(currentMember, action.payload);
      } else {
        newMembers.push(action.payload);
      }
      return {
        ...state,
        members: newMembers,
      };
    },



    
    

  }
}

