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
          "identify": ["employee"]
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
        "current": 8,
        "list":[
            {
              "id": 1,
              "name": "2018学年上学期",
              "start_time":4726497364,//(学年的开始日期)
              "end_time":473695763294,//（学年的结束日期）
            },{
              "id": 8,
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
        "currentWeek":"6",
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
    "content": {
      "1": [
        {
          "scheduleId": 1,
          "scheduleTime": "xx",
          "theme": "会议232",
          "people": "xxx,xxx,xxx,xxx",
          "location": "小雪",
          "remark": "xxx",
          "start": "7:20",
          "end": "8:00"
        },
        {
          "scheduleId": 2,
          "scheduleTime": "xx",
          "theme": "会议",
          "people": "xxx,xxx,xxx,xxx",
          "location": "小雪",
          "remark": "xxx",
          "start": "7:00",
          "end": "7:20"
        },
        {
          "scheduleId": 3,
          "scheduleTime": "xx",
          "theme": "会议",
          "people": "xxx,xxx,xxx,xxx",
          "location": "小雪",
          "remark": "xxx",
          "start": "7:00",
          "end": "7:20"
        }
      ],
      "2": [
        {
          "scheduleId": 1,
          "scheduleTime": "xx",
          "theme": "会议",
          "people": "xxx,xxx,xxx,xxx",
          "location": "小雪",
          "remark": "xxx",
          "start": "8:00",
          "end": "8:20"
        },
        {
          "scheduleId": 2,
          "scheduleTime": "xx",
          "theme": "会议",
          "people": "xxx,xxx,xxx,xxx",
          "location": "小雪",
          "remark": "xxx",
          "start": "8:00",
          "end": "8:20"
        },
        {
          "scheduleId": 3,
          "scheduleTime": "xx",
          "theme": "会议",
          "people": "xxx,xxx,xxx,xxx",
          "location": "小雪",
          "remark": "xxx",
          "start": "8:00",
          "end": "8:20"
        }
      ],
      "3": [
        {
          "scheduleId": 1,
          "scheduleTime": "xx",
          "theme": "会议",
          "people": "xxx,xxx,xxx,xxx",
          "location": "小雪",
          "remark": "xxx",
          "start": "14:00",
          "end": "15:20"

        },
        {
          "scheduleId": 2,
          "scheduleTime": "xx",
          "theme": "会议",
          "people": "xxx,xxx,xxx,xxx",
          "location": "小雪",
          "remark": "xxx",
          "start": "14:00",
          "end": "15:20"
        },
        {
          "scheduleId": 3,
          "scheduleTime": "xx",
          "theme": "会议",
          "people": "xxx,xxx,xxx,xxx",
          "location": "小雪",
          "remark": "xxx",
          "start": "14:00",
          "end": "15:20"
        }
      ],
      "timeStamp": 1524563786979
    },
    "content—bac":[
      {
        "key": 1,
        "list": [
          {
            "scheduleId": 1,
            "scheduleTime": "xx",
            "theme": "会议232",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "7:20",
            "end": "8:00"
          },
          {
            "scheduleId": 2,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "7:00",
            "end": "7:20"
          },
          {
            "scheduleId": 3,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "7:00",
            "end": "7:20"
          }
        ]
      },
      {
        "key": 2,
        "list": [
          {
            "scheduleId": 1,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "8:00",
            "end": "8:20"
          },
          {
            "scheduleId": 2,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "8:00",
            "end": "8:20"
          },
          {
            "scheduleId": 3,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "8:00",
            "end": "8:20"
          }
        ]
      },
      {
        "key": 3,
        "list": [
          {
            "scheduleId": 1,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "14:00",
            "end": "15:20"

          },
          {
            "scheduleId": 2,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "14:00",
            "end": "15:20"
          },{
            "scheduleId": 2,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "14:00",
            "end": "15:20"
          },
          {
            "scheduleId": 3,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "14:00",
            "end": "15:20"
          }
        ]
      },
      {
        "key": 4,
        "list": [
          {
            "scheduleId": 1,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "14:00",
            "end": "15:20"
          },
          {
            "scheduleId": 2,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "14:00",
            "end": "15:20"
          },
          {
            "scheduleId": 3,
            "scheduleTime": "xx",
            "theme": "会议",
            "people": "xxx,xxx,xxx,xxx",
            "location": "小雪",
            "remark": "xxx",
            "start": "14:00",
            "end": "15:20"
          }
        ]
      }
    ]
  },
  //日历的类别显示
  'GET /api/getAllCalendar': {
    "ifLogin": true,
    "status": true,
    "message": "查询成功！",
    "code": 0,
    "ifAdmin": false,
    "content": [
      {
        "id": 1,
        "name": "行事历"
      },
      {
        "id": 2,
        "name": "菠萝计划"
      }, {
        "id": 3,
        "name": "苹果计划"
      }, {
        "id": 4,
        "name": "西瓜计划"
      }
    ]
  },
  //日程详情的显示
  'GET /api/checkDetail': {
    "ifLogin": true,
    "status": true,
    "message": "查询成功！",
    "code": 0,
    "ifAdmin": false,
    "content": {
      "scheduleTemplate": {
        "id": 1, //(日程id)
        "cName": "七年级核心管理团队会议",
        "eName": "name",
        "sTime": "2018-04-17 10:33:26",
        "eTime": "2018-04-17 10:33:27",
        "address": "小雪",
        "remark": "必须来",
        "weekDay": "周二"
      },
      "personNumbers": 23,
      "bixuan": ["张三", "李四"],
      "kexuan": ["呜呜", "湖师大苏"]
    }
  },
  //确认日程
  'GET /api/confirmCalendar': {
    "ifLogin": "是否登录",
    "status": true,
    "message": "消息",
  },
  //删除日程
  'GET /api/deleteScheduleTemplate': {
    "ifLogin": "是否登录",
    "status": true,
    "message": "消息",
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
  //模糊查询
  'GET /api/selectPersonName': {
    "ifLogin": true,
    "status": true,
    "message": "查询人员成功",
    "code": 11,
    "content": {
      "persons": [
        {
          "userId": null,
          "userUnionId": null,
          "orgId": null,
          "name": "李明",
          "ename": "liming",
          "nickName": null,
          "sex": null,
          "certType": null,
          "certNo": null,
          "mobile": null,
          "email": null,
          "tel": null,
          "nameSpelling": null,
          "nationalityCode": null,
          "deleted": null,
          "birthday": null,
          "birthCityCode": null,
          "birthplace": null,
          "remarks": null,
          "createTime": null,
          "modifyTime": null,
          "relationType": 1
        }
      ]

    },
    "ifAdmin": false
  },
  //新建日历
  'POST /api/addCalendar': (req, res) => {
    res.send({
      ifLogin: true,
      status: true,
      message: "插入成功！",
      code: 0,
      ifAdmin: false,
      content: []
    });
  },
  //查询所有人员

  'GET /api/getDepartmentList':{
        "ifLogin": true,
        "status": true,
        "message": "查询人员成功123",
        "code": 11,
        "content": {
         "getDepartmentList": [
            {

              "value": "4-7",
              "key": "4-7",
              "label": "学生发展研究院",
              "children":[{
                "value": "4-7-1",
                "key": "4-7-1",
                "label":"一年级组",
                "children":[{
                  "value": "4-7-1-1",
                  "key": "4-7-1-1",
                  "label":"李明"
                },{
                  "value": "4-7-1-2",
                  "key": "4-7-1-2",
                  "label":"王帅"
                }]
              }]
            },
            {
               "value": "4-8",
              "key": "4-8",
              "label": "课程研究院",
              "children":[{
                "value": "4-8-61",
                "key": "4-8-61",
                "label":"七年级组",
                "children":[{
                  "value": "4-7-61-61",
                  "key": "4-7-61-61",
                  "label":"赵杰"
                },{
                  "value": "4-7-61-62",
                  "key": "4-7-61-62",
                  "label":"张三"
                }]
              }]
            }
    ]
      },
    "ifAdmin": false
  },
  //创建邀约
  'POST /api/createScheduleTemplate': (req, res) => {
    res.send({
      "ifLogin": true,
      "status": true,
      "message": "创建成功",
      "code": 11,
      "content": [],
      "ifAdmin": false
    });
  },
  //获取所有日历
  'GET /api/getAllCalendar': {
    "ifLogin": true,
    "status": true,
    "message": "查询日历成功",
    "code": 11,
    "content": [
      {
        "id": 1,
        "name": "行事历"
      },
      {
        "id": 2,
        "name": "菠萝计划"
      }
    ],
    "ifAdmin": false
  },
  //获取地点
  'GET /api/getAddressList': {
    "ifLogin": true,
    "status": true,
    "message": "查询地点信息列表成功",
    "code": 11,
    "content": {
      "listInfobyAddress": [
        {
          "id": 1,
          "cName": "教室1",
          "eName": null,
          "remark": null,
          "startTime": null,
          "endtime": null,
          "deleted": false
        },
        {
          "id": 2,
          "cName": "教室12",
          "eName": null,
          "remark": null,
          "startTime": null,
          "endtime": null,
          "deleted": false
        },
        {
          "id": 3,
          "cName": "教室13",
          "eName": null,
          "remark": null,
          "startTime": null,
          "endtime": null,
          "deleted": false
        },
        {
          "id": 4,
          "cName": "教室14",
          "eName": null,
          "remark": null,
          "startTime": null,
          "endtime": null,
          "deleted": false
        }
      ]
    },
    "ifAdmin": false
  },
};

export default noProxy ? {} : delay(proxy, 1000);
