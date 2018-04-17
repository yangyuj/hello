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
        name: '新建行事历',
        path: 'creat',
        component: dynamicWrapper(app, ['calendarCreat'], () => import('../routes/Calendar/Creat'))
      },
      {
        name: '我的行程',
        path: 'index',
        component: dynamicWrapper(app, [], () => import('../routes/Calendar/Index'))
      }
    ],
  },
];
