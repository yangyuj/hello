import mockjs from 'mockjs';
// import { studentList, studentPostList } from './mock/student';
// import { getActivities, getNotice, getFakeList , getCardList} from './mock/api';
// import { getFakeChartData } from './mock/chart';
// import { imgMap } from './mock/utils';
// import { getProfileBasicData } from './mock/profile';
// import { getProfileAdvancedData } from './mock/profile';
// import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';


// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // 支持值为 Object 和 Array
  //'GET /api/current_user': {

  'POST /api/current_user': (req, res) => {
    res.send({
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
    });
  },

  //列表显示学年和学期的请求
  'GET /api/getTimeInfo': {
    "ifLogin":true,
    "status":true,
    "message":"查询成功！",
    "code":0,
    "ifAdmin":false,
    "content":{
      "year":{
        "current":"2018学年上学期",
        "list":[
            {
              "id": 1,
              "name": "2018学年上学期",
              "start_time":4726497364,//(学年的开始日期)
              "end_time":473695763294,//（学年的结束日期）
            },{
              "id": 1,
              "name": "2018学年下学期",
              "start_time":4726497364,//(学年的开始日期)
              "end_time":473695763294,//（学年的结束日期）
            },{
              "id": 2,
              "name": "2019学年上学期",
              "start_time":4726497364,//(学年的开始日期)
              "end_time":473695763294,//（学年的结束日期）
            },{
              "id": 3,
              "name": "2019学年下学期",
              "start_time":4726497364,//(学年的开始日期)
              "end_time":473695763294,//（学年的结束日期）
            }
        ]
      },
      "week":{
        "currentWeek":"第六周",
        "totalWeek":"18"
      }
    }
  },
  //列表内容的显示
  'GET /api/getScheduleList': {
    "ifLogin":true,
    "status":true,
    "message":"查询成功！",
    "code":0,
    "ifAdmin":false,
    "content":[
      {
        "key": 1,
        list:[
          {"scheduleId":1,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"},
          {"scheduleId":2,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"},
          {"scheduleId":3,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"}
        ]
      },{
        "key": 2,
        list:[
          {"scheduleId":1,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"},
          {"scheduleId":2,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"},
          {"scheduleId":3,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"}
        ]
      },{
        "key": 3,
        list:[
          {"scheduleId":1,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"},
          {"scheduleId":2,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"},
          {"scheduleId":3,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"}
        ]
      },{
        "key": 4,
        list:[
          {"scheduleId":1,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"},
          {"scheduleId":2,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"},
          {"scheduleId":3,"scheduleTime":"xx","theme":"会议","people":"xxx,xxx,xxx,xxx","location":"小雪","remark":"xxx"}
        ]
      }
    ]
  },
  //日历的类别显示
  'GET /api/getAllCalendar': {
    "ifLogin":true,
    "status":true,
    "message":"查询成功！",
    "code":0,
    "ifAdmin":false,
    "content":[
      {
        "id":1,
        "name":"行事历"
      },
      {
        "id":2,
        "name":"菠萝计划"
      },{
        "id":3,
        "name":"苹果计划"
      },{
        "id":4,
        "name":"西瓜计划"
      }
    ]
  },
  //日程详情的显示
  'GET /api/checkDetail':{
    "ifLogin":true,
    "status":true,
    "message":"查询成功！",
    "code":0,
    "ifAdmin":false,
    "content":{
      "scheduleTemplate":{
        "id":1, //(日程id)
        "cName":"七年级核心管理团队会议",
        "eName":"name",
        "sTime":"2018-04-17 10:33:26",
        "eTime":"2018-04-17 10:33:27",
        "address":"小雪",
        "remark":"必须来",
        "weekDay":"周二"
      },
      "personNumbers":23,
      "bixuan":["张三","李四"],
      "kexuan":["呜呜","湖师大苏"]
    }
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
