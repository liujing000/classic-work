import { mock, Random } from 'mockjs'; 
import { proxy } from './request';

const data = mock({
	success:{status:'success'},
  all:{
    'list':[
			{
				id: 1,
				title: '心经',
				parent: 0,
				parentTitle: '藏1',
				description: Random.csentence(),
				status:'normal',
        statusTitle: '正常'
			},
			{
				id: 2,
				title: '楞严经',
				parent: 1,
				parentTitle: '部1',
				description: Random.csentence(),
				status:'normal',
        statusTitle: '正常'
			},
			{
				id: 3,
				title: '心经1',
				parent: 0,
				parentTitle: '藏1',
				description: Random.csentence(),
				status:'normal',
        statusTitle: '正常'
			},
			{
				id: 4,
				title: '楞严经1',
				parent: 1,
				parentTitle: '部1',
				description: Random.csentence(),
				status:'normal',
        statusTitle: '正常'
			},
    ],
    total:45,
  },

});
const apiDefines = {
  // 经典分类
	'POST /classic/category/all': data.all,
	// 编辑经典分类
	'POST /classic/category/save':{id:1},
	// 删除经典分类
	'POST /classic/category/delete':data.success,
};
export default proxy(apiDefines);