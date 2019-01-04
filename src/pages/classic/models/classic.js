import { classic as classicApi } from '@/services/api';
import { is_error } from '@/utils/utils';
import { message } from 'antd';

export default {
  namespace: 'classic',
  state: {
    categories:[],
    categoriesAll:[],
    volume:[],
    chapter:[],
    special:[],
    payments:[],
    all:[]
  },

  effects: {
    *loadCategories({ payload , callback = null}, { call, put }) {
      const response = yield call( classicApi.category.all,payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      yield put({
        type: 'loadCategoriesSync',
        payload: response,
      });
      if (callback) { 
        yield call(callback);
      }
    },
    *loadCategoriesAll({ payload , callback = null}, { call, put }) {
      const response = yield call( classicApi.category.category,payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      yield put({
        type: 'loadCategoriesSyncAll',
        payload: response,
      });
      if (callback) { 
        yield call(callback);
      }
    },
    *loadVolume({ payload , callback = null}, { call, put }) {
      const response = yield call( classicApi.volume.all,payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      yield put({
        type: 'loadVolumeSync',
        payload: response,
      });
      if (callback) { 
        yield call(callback);
      }
    },
    *loadChapter({ payload , callback = null}, { call, put }) {
      const response = yield call( classicApi.chapter.all,payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      yield put({
        type: 'loadChapterSync',
        payload: response,
      });
      if (callback) { 
        yield call(callback);
      }
    },
    *loadSpecial({ payload , callback = null}, { call, put }) {
      const response = yield call( classicApi.special.all,payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      yield put({
        type: 'loadSpecialSync',
        payload: response,
      });
      if (callback) { 
        yield call(callback);
      }
    },
    *loadPayments({ payload , callback = null}, { call, put }) {
      const response = yield call( classicApi.payments.all,payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      yield put({
        type: 'loadPaymentsSync',
        payload: response,
      });
      if (callback) { 
        yield call(callback);
      }
    },
    *loadAll({ payload , callback = null}, { call, put }) {
      const response = yield call( classicApi.all,payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      yield put({
        type: 'loadAllSync',
        payload: response,
      });
      if (callback) { 
        yield call(callback);
      }
    },

    *removeCategories({ payload ,callback = null }, { call, put }) {
      console.log(payload)
      for (let entry of payload) {
        const response = yield call( classicApi.category.delete, entry);
        if (is_error(response)) {
          message.error(response.message);
          return;
        }
        yield put({
          type: 'removeCategoriesSync',
          payload: entry, 
        });
      }
      if (callback) {
        yield call(callback);
      }
      message.success('成功删除');
    },
    *removeVolume({ payload ,callback = null }, { call, put }) {
      console.log(payload)
      for (let entry of payload) {
        const response = yield call( classicApi.volume.delete, entry);
        if (is_error(response)) {
          message.error(response.message);
          return;
        }
        yield put({
          type: 'removeVolumeSync',
          payload: entry, 
        });
      }
      if (callback) {
        yield call(callback);
      }
      message.success('成功删除');
    },
    *removeChapter({ payload ,callback = null }, { call, put }) {
      console.log(payload)
      for (let entry of payload) {
        const response = yield call( classicApi.chapter.delete, entry);
        if (is_error(response)) {
          message.error(response.message);
          return;
        }
        yield put({
          type: 'removeChapterSync',
          payload: entry, 
        });
      }
      if (callback) {
        yield call(callback);
      }
      message.success('成功删除');
    },
    *removeSpecial({ payload ,callback = null }, { call, put }) {
      console.log(payload)
      for (let entry of payload) {
        const response = yield call( classicApi.special.delete, entry);
        if (is_error(response)) {
          message.error(response.message);
          return;
        }
        yield put({
          type: 'removeSpecialSync',
          payload: entry, 
        });
      }
      if (callback) {
        yield call(callback);
      }
      message.success('成功删除');
    },
    *removeAll({ payload ,callback = null }, { call, put }) {
      console.log(payload)
      for (let entry of payload) {
        const response = yield call( classicApi.delete, entry);
        if (is_error(response)) {
          message.error(response.message);
          return;
        }
        yield put({
          type: 'removeAllSync',
          payload: entry, 
        });
      }
      if (callback) {
        yield call(callback);
      }
      message.success('成功删除');
    },

    *saveCategories({ payload, callback = null }, { call, put }) {
      const response = yield call( classicApi.category.save, payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      payload.id = response;
      yield put({
        type: 'saveCategoriesSync',
        payload: payload,
      });
      if (callback) {
        yield call(callback);
      }
      message.success('成功保存');
    },
    *saveVolume({ payload, callback = null }, { call, put }) {
      const response = yield call( classicApi.volume.save, payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      payload.id = response;
      yield put({
        type: 'saveVolumeSync',
        payload: payload,
      });
      if (callback) {
        yield call(callback);
      }
      message.success('成功保存');
    },
    *saveChapter({ payload, callback = null }, { call, put }) {
      const response = yield call( classicApi.chapter.save, payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      payload.id = response;
      yield put({
        type: 'saveChapterSync',
        payload: payload,
      });
      if (callback) {
        yield call(callback);
      }
      message.success('成功保存');
    },
    *saveSpecial({ payload, callback = null }, { call, put }) {
      const response = yield call( classicApi.special.save, payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      payload.id = response;
      yield put({
        type: 'saveSpecialSync',
        payload: payload,
      });
      if (callback) {
        yield call(callback);
      }
      message.success('成功保存');
    },
    *saveAll({ payload, callback = null }, { call, put }) {
      const response = yield call( classicApi.save, payload );
      if (is_error(response)) {
        message.error(response.message);
        return;
      }
      payload.id = response;
      yield put({
        type: 'saveAllSync',
        payload: payload,
      });
      if (callback) {
        yield call(callback);
      }
      message.success('成功保存');
    },
  },

  reducers: {
    loadCategoriesSync(state, action) {
      return {
        ...state,
        categories: action.payload,
      };
    },
    loadCategoriesSyncAll(state, action) {
      return {
        ...state,
        categoriesAll: action.payload,
      };
    },
    loadVolumeSync(state, action) {
      return {
        ...state,
        volume: action.payload,
      };
    },
    loadChapterSync(state, action) {
      return {
        ...state,
        chapter: action.payload,
      };
    },
    loadSpecialSync(state, action) {
      return {
        ...state,
        special: action.payload,
      };
    },
    loadPaymentsSync(state, action) {
      return {
        ...state,
        payments: action.payload,
      };
    },
    loadAll(state, action) {
      return {
        ...state,
        all: action.payload,
      };
    },
    removeCategoriesSync(state, action) {
      const newCategories = state.categories;
      newCategories.list = newCategories.list.filter(category => category.id !== action.payload.id);
      return {
        ...state,
        categories: newCategories,
      };
    },
    removeVolumeSync(state, action) {
      const newVolume = state.volume;
      newVolume.list = newVolume.list.filter(volume => volume.id !== action.payload.id);
      return {
        ...state,
        volume: newVolume,
      };
    },
    removeChapterSync(state, action) {
      const newChapter = state.chapter;
      newChapter.list = newChapter.list.filter(chapter => chapter.id !== action.payload.id);
      return {
        ...state,
        chapter: newChapter,
      };
    },
    removeSpecialSync(state, action) {
      const newSpecial = state.special;
      newSpecial.list = newSpecial.list.filter(special => special.id !== action.payload.id);
      return {
        ...state,
        special: newSpecial,
      };
    },
    removeAllSync(state, action) {
      const newAll = state.all;
      newAll.list = newAll.list.filter(all => all.id !== action.payload.id);
      return {
        ...state,
        all: newAll,
      };
    },
    saveCategoriesSync(state, action) {
      const newCategories = state.categories;
      const currentCategory = newCategories.list.find(category => category.uid == action.payload.id);
      if (currentCategory) {
        Object.assign(currentCategory, action.payload);
      } else {
        newCategories.list.push(action.payload);
      }
      return {
        ...state,
        categories: newCategories,
      };
    },
    saveVolumeSync(state, action) {
      const newVolume = state.volume;
      const currentVolume = newVolume.list.find(volume => volume.id == action.payload.id);
      if (currentVolume) {
        Object.assign(currentVolume, action.payload);
      } else {
        newVolume.list.push(action.payload);
      }
      return {
        ...state,
        volume: newVolume,
      };
    },
    saveChapterSync(state, action) {
      const newChapter = state.chapter;
      const currentChapter = newChapter.list.find(chapter => chapter.id == action.payload.id);
      if (currentChapter) {
        Object.assign(currentChapter, action.payload);
      } else {
        newChapter.list.push(action.payload);
      }
      return {
        ...state,
        chapter: newChapter,
      };
    },
    saveSpecialSync(state, action) {
      const newSpecial = state.special;
      const currentSpecial = newSpecial.list.find(special => special.id == action.payload.id);
      if (currentSpecial) {
        Object.assign(currentSpecial, action.payload);
      } else {
        newSpecial.list.push(action.payload);
      }
      return {
        ...state,
        special: newSpecial,
      };
    },

    saveAllSync(state, action) {
      const newAll = state.all;
      const currentAll = newAll.list.find(all => all.id == action.payload.id);
      if (currentAll) {
        Object.assign(currentAll, action.payload);
      } else {
        newAll.list.push(action.payload);
      }
      return {
        ...state,
        all: newAll,
      };
    },


    
    

  }
}

