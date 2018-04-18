import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { studentList, studentPostList } from './mock/student';
import { getActivities, getNotice, getFakeList , getCardList} from './mock/api';
import { getFakeChartData } from './mock/chart';
import { imgMap } from './mock/utils';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  'GET /api/current_user': {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: {
      "ifLogin": true,
      "status": true,
      "message": "获取成功",
      "code": 0,
      "content": {
        "name": "蔡武娟",
        "avatar": "https://static.dingtalk.com/media/lADOysn4mc0CgM0Cfg_638_640.jpg",
        "userId": 14,
        "notifyCount": 12,
        "identify":["employee"]
      }
    }
  },

  //列表显示的请求
  'GET /api/getTimeInfo': {
    "ifLogin":true,
    "status":true,
    "message":"查询成功！",
    "code":0,
    "ifAdmin":false,
    "content":[
      {
        "id": 1,
        "name": "2018学年",
        "start_time":4726497364,     //(学年的开始日期)
        "end_time":473695763294,     //（学年的结束日期）
        "List":[
          {
            "id":1,
            "name" : "上学期",
            "list":[
              {
                "week": "第一周",
                "weekType":  false,	
                "betweenTime":"344567/234567890" 
              },{
                "week": "第二周",
                "weekType": true,	
                "betweenTime":"344567/234567890" 
              },{
                "week": "第三周",
                "weekType": true,	
                "betweenTime":"344567/234567890" 
              },{
                "week": "第四周",
                "weekType": false,	
                "betweenTime":"344567/234567890" 
              }
            ]
          },
          {
            "id":2,
            "name" : "下学期",
            "list":[
              {
                "week": "第一周",
                "weekType": true,	
                "betweenTime":"344567/234567890" 
              },{
                "week": "第二周",
                "weekType": false,	
                "betweenTime":"344567/234567890" 
              },{
                "week": "第三周",
                "weekType": false,	
                "betweenTime":"344567/234567890" 
              },{
                "week": "第四周",
                "weekType": true,	
                "betweenTime":"344567/234567890" 
              }
            ]
          }
        ]
      },
      {
        "id": 2,
        "name": "2019学年",
        "start_time":4726497364,     //(学年的开始日期)
        "end_time":473695763294,     //（学年的结束日期）
        "List" :[
          {
            "id":1,
            "name" : "上学期",
            "list":[
              {
                "week": "第一周",
                "weekType": false,	
                "betweenTime" :"344567/234567890" 
              },{
                "week": "第二周",
                "weekType": false,	
                "betweenTime" :"344567/234567890" 
              },{
                "week": "第三周",
                "weekType": true,	
                "betweenTime" :"344567/234567890" 
              },{
                "week": "第四周",
                "weekType": false,	
                "betweenTime" :"344567/234567890" 
              }
            ]
          },
          {
            "id":2,
            "name" : "下学期",
            "list":[
              {
                "week": "第一周",
                "weekType": false,	
                "betweenTime" :"344567/234567890" 
              },{
                "week": "第二周",
                "weekType": false,	
                "betweenTime" :"344567/234567890" 
              },{
                "week": "第三周",
                "weekType": false,	
                "betweenTime" :"344567/234567890" 
              },{
                "week": "第四周",
                "weekType": true,	
                "betweenTime" :"344567/234567890" 
              }
            ]
          }
        ]
      }
    ]
  },

  'POST /api/tutor_save': (req, res) => {
    res.send({
      status: true,
      ifLogin: true,
      message: '数据提交失败',
      content: {
        id: 100
      }
    });
  },

  'POST /api/file_upload': (req, res) => {
    res.send({
      status: true,
      ifLogin: true,
      content: {
        uid: 101,
        url: 'test.png'
      }
    });
  },
  'POST /api/courses_save': (req, res) => {
    res.send({
      status: true,
      ifLogin: true,
      message: '数据提交失败',
      content: {
        id: 100
      }
    });
  },
  'POST /api/publish_plan': (req, res) => {
    res.send({
      status: true,
      ifLogin: true,
      message: '数据提交失败',
      content: {
        id: 100
      }
    });
  },

  'POST /api/tuborConfirmRecord': (req, res) => {
    res.send({
      status: true,
      ifLogin: true,
      message: '数据提交失败',
    });
  },
  'POST /api/set_language': (req, res) => {
    res.send({
      status: true,
      ifLogin: true,
      message: '数据提交失败',
    });
  },


};

export default noProxy ? {} : delay(proxy, 1000);
