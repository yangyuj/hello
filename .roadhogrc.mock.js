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
  // GET POST 可省略
  'GET /api/users': [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }],
  'GET /api/project/notice': getNotice,
  'GET /api/activities': getActivities,
  'GET /api/rule': getRule,
  'POST /api/rule': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: postRule,
  },
  'POST /api/forms': (req, res) => {
    res.send({ status: false, message: '数据提交失败' });
  },
  'GET /api/tags': mockjs.mock({
    'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }]
  }),
  'GET /api/fake_list': getFakeList,
  'GET /api/fake_chart_data': getFakeChartData,
  'GET /api/profile/basic': getProfileBasicData,
  'GET /api/profile/advanced': getProfileAdvancedData,
  'POST /api/login/account': (req, res) => {
    const { password, userName, type } = req.body;
    res.send({
      status: password === '888888' && userName === 'admin' ? 'ok' : 'error',
      type,
    });
  },
  'POST /api/register': (req, res) => {
    res.send({ status: 'ok' });
  },
  'GET /api/notices': getNotices,
  'GET /api/card_list': getCardList,
  'GET /api/student_list': {
    $params: {
      pageSize: {
        desc: '分页',
        exp: 2,
      },
    },
    $body: studentPostList,
  },


  //核心素养--学科素养数据
  'GET /api/core_attainment': {
    ifLogin: true,
    status: true,
    content:
    {
      "list": [{
        key: '1',
        know: '知识技能项目1',
        script: '等级标准描述',
        L1: '掌握',
        L2: '应用',
        L3: '熟练'
      }, {
        key: '2',
        know: '知识技能项目2',
        script: '等级标准描述',
        L1: '掌握',
        L2: '应用',
        L3: '熟练'
      },{
        key: '3',
        know: '知识技能项目3',
        script: '等级标准描述',
        L1: '掌握',
        L2: '应用',
        L3: '熟练'
      }],
      "columns":  [{
        title: '维度',
        dataIndex: 'know',
        key: 'know',
      }, {
        title: '描述',
        dataIndex: 'script',
        key: 'script',
      }, {
        title: 'L1',
        dataIndex: 'L1',
        key: 'L1',
      },{
        title: 'L2',
        dataIndex: 'L2',
        key: 'L2',
      },{
        title: 'L3',
        dataIndex: 'L3',
        key: 'L3',
      }],
      "isTutor": true
    }
  },
  //核心素养--下拉框
  'GET /api/get_allSubject': {
    ifLogin: true,
    status: true,
    content: {
      "list": [
        {
          id: '1',
          name: 'haung',
        },
        {
          id: '2',
          name: 'haha',
        },
        {
          id: '3',
          name: 'xixi',
        },]
    }
  },
  //修改列表的请求模拟数据
  'GET /api/subjectChangeSend': {
    ifLogin: true,
    status: true,
    content: {
      "list": [
        {
          id: '1',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '2',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '3',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '4',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '5',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '6',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '7',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '8',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '9',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '10',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '11',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '12',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '13',
          subjectId: '22',
          name: '数学',
          ename: 'math',
          annualTarget: '100分',
          modifyTime: 'dddd',
        },
        {
          id: '14',
          subjectId: '33',
          name: 'yuwen',
          ename: 'chinses',
          annualTarget: '200分',
          modifyTime: 'ssss',
        }],
      pagination: {
        "total": 13
      }
    }
  },
  //获取分页器的信息
  'GET /api/getAllCourses': {
    "pageSize":1,
    "currentPage":1
  },
  //给后端数据
  'POST /api/updateCoursesById': {
    ifLogin: true,
    status: true,
    message: "消息",
    code: 0,
    content: "ssss",
    ifAdmin: true
  },

  'GET /api/assessment_detail': (req, res) => {
    res.send({
      ifLogin: true,
      status: true,
      message: '这里是消息',
      content: {
        name: '2017上学期期末成长评估',
        date: '2016-01-01～2016-03-31',
        status: 1,
        evaluateDate: '2016-01-01～2016-03-31',
        confirmDate: '2016-01-01～2016-03-31',
        completeDate: '2016-01-01～2016-03-31',
        identity:[
           'student',
           'employee'
        ]
      }
    });
  },
  'GET /api/curriculum_list': (req, res) => {
    res.send({
      ifLogin: true,
      status: true,
      message: '这里是消息',
      content: {
        list:[
          {
            id: '1',
            name: '2017上学期'
          },
          {
            id: '2',
            name: '2017下学期'
          }
        ]
      }
    });
  },
  'GET /api/get_grade': (req, res) => {
    res.send({
      ifLogin: true,
      status: true,
      message: '这里是消息',
      content: {
        list:[
          {
            id: '1',
            name: '一年级1班'
          },
          {
            id: '2',
            name: '七年级2班'
          }
        ]
      }
    });
  },
  'GET /api/get_curriculum': (req, res) => {
    res.send({
      ifLogin: true,
      status: true,
      message: '这里是消息',
      content: {
        list:[
          {
            id: '1',
            name: '七年级英语'
          },
          {
            id: '2',
            name: '七年级语文'
          }
        ]
      }
    });
  },
  'GET /api/get_stu_self_rating': (req, res) => {
    res.send({
      "message": "这里是提示信息",
      "ifLogin": true,
      "status": true,
      "code": 0,
      "content": {
        "id": 1,
        "planId": 2,
        "stuId": 3,
        "confirmStatus": false,
        "myStage": "我的舞台",
        "myHavest": "我的收获",
        "myActionPlan": "我的行动计划划",
        "files": [
          {
            "uid": 1,
            "name": "文件名称1",
            "url": "http://yungu-syncinfo.oss-cn-hangzhou.aliyuncs.com/a055a133-b8d0-45a9-869d-586907204969?Expires=1829888754&OSSAccessKeyId=LTAIwsd2nTCHslke&Signature=i16gKOZHOzV6S07g%2B4qwwdpbs3g%3D",
            "type": "vedio"
          },
          {
            "uid": 2,
            "name": "文件名称2",
            "url": "http://yungu-syncinfo.oss-cn-hangzhou.aliyuncs.com/a055a133-b8d0-45a9-869d-586907204969?Expires=1829888754&OSSAccessKeyId=LTAIwsd2nTCHslke&Signature=i16gKOZHOzV6S07g%2B4qwwdpbs3g%3D",
            "type": "image"
          },
          {
            "uid": 3,
            "name": "文件名称3",
            "url": "http://yungu-syncinfo.oss-cn-hangzhou.aliyuncs.com/a055a133-b8d0-45a9-869d-586907204969?Expires=1829888754&OSSAccessKeyId=LTAIwsd2nTCHslke&Signature=i16gKOZHOzV6S07g%2B4qwwdpbs3g%3D",
            "type": "file"
          }
        ]
      }
    });
  },
  'GET /api/tutor_get': (req, res) => {
    res.send({
      "message": "这里是提示信息",
      "ifLogin": true,
      "status": true,
      "code": 0,
      "content":{
        "id": 1,
        "planId": 1,
        "stuId": 1,
        "suggestion": "导师建议",
        "parentFeedback": "家长反馈",
        "mateEvaluate": "同学互评",
        "planName": '2017上学期',
        "studentName": '小田',
        "normList": [
          {
            "id": 1,
            "name": "通识能力1",
            "description": "评价描述"
          },
          {
            "id": 2,
            "name": "通识能力2",
            "description": "评价描述"
          },
          {
            "id": 3,
            "name": "通识能力3",
            "description": "评价描述"
          }
        ],
        "stuWorkImg":{
          "uid":1,
          "url":"..."
        }
      }
    });
  },
  'GET /api/courses_get': (req, res) => {
    /*res.send({
        "ifLogin": true,
        "status": true,
        "message": "查询成功",
        "code": 0,
        "content": {
          "courseAssessment": {
            "id": 22,
            "planId": 2,
            "courseId": 61,
            "title": "语文",
            "courseScore": 2,
            "studentName": "周睹瓢",
            "planName": "陈鹏展评估计划",
            "annualTarget": "id61的课程年段目标",
            "suggestion": "123",
            "highLightMoment": "123",
            "normList": [
              {
                "id": 1,
                "name": "学科素养1",
                "score": 3,
                "description": "123",
                "scoreName": "",
                "average": 2
              },
              {
                "id": 2,
                "name": "学科素养2",
                "score": 3,
                "description": "123",
                "scoreName": "",
                "average": 2
              },
              {
                "id": 3,
                "name": "学科素养3",
                "score": 3,
                "description": "123",
                "scoreName": "",
                "average": 2
              }
            ],
            "files": []
          },
          "template": {
            "code": "1",
            "scoreTemplate": {
              "name": "百分",
              "min": 1,
              "max": 100,
              "mapping": null
            },
            "normTemplate": {
              "min": 1,
              "max": 10,
              "scoreMark": true,
              "descriptionMark": true,
              "mapping": null,
              "normList": [
                {
                  "id": 1,
                  "name": "学科素养1"
                },
                {
                  "id": 2,
                  "name": "学科素养2"
                },
                {
                  "id": 3,
                  "name": "学科素养3"
                }
              ]
            }
          },
          "project": null
        }
    });*/
    res.send({
      "message": "这里是提示信息",
      "ifLogin": true,
      "status": true,
      "code": 0,
      "content": {
        "courseAssessment":{
          "id":1,
          "planId":1,
          "studentName": "小田 ",
          "courseId":1,
          "title":"语文",
          "annualTarget":"年段目标",
          "suggestion":"导师建议",
          "highLightMoment":"高光时刻",
          "courseScore":90,
          "normList":[
              {
                "id":1,
                "name":"学科素养1",
                "score":1,
                "description":"2222222",
                "scoreName":"差",
                "average":2
              },{
                "id":2,
                "name":"学科素养2",
                "score":2,
                "description":"",
                "scoreName":"中",
                "average":3
              },
              {
                "id":3,
                "name":"学科素养3",
                "score":3,
                "description":"",
                "scoreName":"良",
                "average":4
              },{
                "id":4,
                "name":"素养指标4",
                "score":2,
                "description":"",
                "scoreName":"良",
                "average":4
              },{
                "id":5,
                "name":"素养指标5",
                "score":3,
                "description":"",
                "scoreName":"良",
                "average":4
              },{
                "id":6,
                "name":"素养指标6",
                "score":2,
                "description":"",
                "scoreName":"良",
                "average":4
              }
            ],
          "files":[
              {
                "uid":1,
                "name":"附件1",
                "url":"...",
                "type":"image"
              },{
                "uid":2,
                "name":"附件2",
                "url":"...",
                "type":"vedio"
              }, {
                "uid":3,
                "name":"附件3",
                "url":"...",
                "type":"file"
              }
            ]
        },
        "template":{
          "code":"2",
          "scoreTemplate":{
            "name":"等级/分数",
            "min":1,
            "max":4,
            "mapping":[
              {
                "min":1,
                "max":1,
                "name":"差"
              },{
                "min":2,
                "max":2,
                "name":"合格"
              },{
                "min":3,
                "max":3,
                "name":"良"
              },{
                "min":4,
                "max":4,
                "name":"优"
              },
            ]
          },
          "normTemplate":{
            "min": '0',
            "max": '10',
            "scoreMark":true,
            "descriptionMark":true,
            "normList":[
              {
                "id":1,
                "name":"素养指标1"
              },{
                "id":2,
                "name":"素养指标2"
              },{
                "id":3,
                "name":"素养指标3"
              }
            ],
            "mapping": null
          }
        },
        "project":{
          "name":"去听音乐会",
          "subjects":"艺术,道法",
          "dutyTeacher":"吴老师,田老师",
          "linkageTeacher":"行空，婉婷"
        }
      }
    });
  },

  'POST /api/creat_assessment': (req, res) => {
    res.send({
      status: 500,
      ifLogin: true,
      message: '数据提交失败'
    });
  },

  'POST /api/assessment_submit': (req, res) => {
    res.send({
      status: true,
      ifLogin: true,
      message: '数据提交失败'
    });
  },
  'POST /api/self_rating': (req, res) => {
    res.send({
      status: true,
      ifLogin: true,
      message: '数据提交失败',

    });
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
