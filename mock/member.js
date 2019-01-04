import { mock, Random } from 'mockjs'; 
import { proxy } from './request';

const data = mock({
	success:{status:'success'},
  all:{
    'list':[
			{
				id: 1,
				nickname: Random.cname(),
				phone: /^1[0-9]{10}$/,
				typeid:1,
				type: '微信',
				status:'normal',
        statusTitle: '正常'
			},
			{
				id: 2,
				nickname: Random.cname(), 
				phone: /^1[0-9]{10}$/,
				typeid:2,
				type: '微博',
				status:'normal',
        statusTitle: '正常'
			},
			{
				id: 3,
				nickname: Random.cname(), 
				phone: /^1[0-9]{10}$/,
				typeid:3,
				type: 'QQ',
				status:'normal',
        statusTitle: '正常'
			},
			{
				id: 4,
				nickname: Random.cname(),
				phone: /^1[0-9]{10}$/,
				typeid:3,
				type: 'QQ',
				status:'normal',
        statusTitle: '正常'
			},
			{
				id: 5,
				nickname: Random.cname(), 
				phone: /^1[0-9]{10}$/,
				typeid:3,
				type: 'QQ',
				status:'normal',
        statusTitle: '正常'
			},
			{
				id: 6,
				nickname: Random.cname(),
				phone: /^1[0-9]{10}$/,
				typeid:3,
				type: 'QQ',
				status:'normal',
        statusTitle: '正常'
			}
    ],
    total:45,
  },

});
const apiDefines = {
  // 会员管理
	'POST /member/all': data.all,
	'POST /member/delete':data.success,
  'POST /member/save':{id:1},
};
export default proxy(apiDefines);