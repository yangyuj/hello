import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user'], () => import('../layouts/CalendarLayout')),
    path: '/',
    layout: 'CalendarLayout',
    children: [
      {
        name: '新建日历',
        path: 'creat',
        component: dynamicWrapper(app, ['Calendar'], () => import('../routes/Calendar/Creat'))
      },
      {
        name: '我的行程',
        path: 'index',
        component: dynamicWrapper(app, ['index'], () => import('../routes/Calendar/Index'))
      },
      {
        name: '表格视图',
        path: 'TableShow',
        component: dynamicWrapper(app, ['tableShow'], () => import('../routes/Calendar/TableShow'))
      },{
        name: '日历视图',
        path: 'CalShow',
        component: dynamicWrapper(app, ['calShow'], () => import('../routes/Calendar/CalShow'))
      },{
        name:"新建邀约",
        path:'createInvitation',
        component: dynamicWrapper(app, ['Calendar'], () => import('../routes/Calendar/CreateInvitation'))
      },{
        name:"修改日历",
       // path:'updata/:calendarId/:scheduleId',
        path:'updata/:calendarId',
        component: dynamicWrapper(app, ['Calendar'], () => import('../routes/Calendar/Updata'))
      },{
        name:"修改邀约",
       // path:'updataInvitation/:calendarId/:scheduleId',
        path:'updataInvitation/:calendarId/:scheduleId/:endTime',
        component: dynamicWrapper(app, ['Calendar'], () => import('../routes/Calendar/UpdataInvitation'))
      }
    ],
  },
];
