import { mock } from 'mockjs'; 
import { proxy } from './request';

const data = mock({
  success:{status:'success'},
  sms:{
    "key": "wqeqeqweqweqw",
    "secret": "qweqweqweqw",
    "signature": "qweqweqweqweqw"
  },
  roles:{
    'list':[
			{
				id: 1,
				title: '超级管理员', 
				scope: 'root',
				// base:1,
				// baseTitle: () => Random.ctitle(2, 5),
			},
			{
				id: 2,
				title: '视频管理员',
				scope: 'video',
				// base:1,
				// baseTitle: () => Random.ctitle(2, 5),
			},
			{
				id: 3,
				title: '经典管理员',
				scope: 'classic',
				// base:1,
				// baseTitle: () => Random.ctitle(2, 5),
			}
    ],
    total:45,
  },
  members:{
    'list':[
      {
        'id': 1,
        username: 'zhang',
        role:1,
        roleScope:'root',
        roleTitle:'超级管理员',
        remark:'这是超级管理员',
        status:'normal',
        statusTitle: '正常'
      },
      {
        'id': 2,
        username: 'wang',
        role:2,
        roleScope:'video',
        roleTitle:'视频管理员',
        remark:'这是视频管理员',
        status:'normal',
        statusTitle: '正常'
      },
      {
        'id': 3,
        username: 'li',
        role:1,
        roleScope:'classic',
        roleTitle:'经典管理员',
        remark:'这是经典管理员',
        status:'normal',
        statusTitle: '正常'
      },
      {
        'id': 4,
        username: 'zhao',
        role:1,
        roleScope:'root',
        roleTitle:'超级管理员',
        remark:'这是超级管理员',
        status:'normal',
        statusTitle: '正常'
      },
      {
        'id': 5,
        username: 'ww',
        role:2,
        roleScope:'video',
        roleTitle:'视频管理员',
        remark:'这是视频管理员',
        status:'normal',
        statusTitle: '正常'
      },
      {
        'id': 6,
        username: 'cl',
        role:1,
        roleScope:'classic',
        roleTitle:'经典管理员',
        remark:'这是经典管理员',
        status:'normal',
        statusTitle: '正常'
      },
     
    ],
    total:45,
  }

});
const apiDefines = {
  // 短信
  'POST /system/sms/all': data.sms,
  'POST /system/sms/save':data.success,
  // 用户及权限
  // 用户类型
  'POST /system/role/all': data.roles,
  'POST /system/role/delete':data.success,
  'POST /system/role/save':{id:1},
  // 用户列表
  'POST /system/user/all': data.members,
  'POST /system/user/delete':data.success,
  'POST /system/user/save':{id:1},
};
export default proxy(apiDefines);
