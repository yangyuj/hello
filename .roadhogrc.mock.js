import mockjs from 'mockjs';
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



};

export default noProxy ? {} : delay(proxy, 1000);
