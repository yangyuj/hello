import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Icon } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
//import GlobalHeader from '../components/GlobalHeader';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
//import SiderMenu from '../components/SiderMenu';
import NotFound from '../routes/Exception/404';
import { trans, locale } from '../utils/i18n';

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

class CalendarLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
    routeData: PropTypes.array,
  }
  getChildContext() {
    const { location, navData, getRouteData } = this.props;
    const routeData = getRouteData('CalendarLayout');
    const firstMenuData = navData.reduce((arr, current) => arr.concat(current.children), []);
    const menuData = this.getMenuData(firstMenuData, '');
    const breadcrumbNameMap = {};

    routeData.concat(menuData).forEach((item) => {
      breadcrumbNameMap[item.path] = {
        name: item.name,
        component: item.component,
      };
    });
    return { location, breadcrumbNameMap, routeData };
  }
  getPageTitle() {
    const { location, getRouteData } = this.props;
    const { pathname } = location;
    let title = trans('global.title', '日程中心 -- 杭州云谷学校');
    getRouteData('CalendarLayout').forEach((item) => {
      if (item.path === pathname) {
        title = `${item.name}`;
      }
    });
    return title;
  }
  getMenuData = (data, parentPath) => {
    let arr = [];
    data.forEach((item) => {
      if (item.name) {
        arr.push({ path: `${parentPath}/${item.path}`, name: item.name });
      }
      if (item.children) {
        arr = arr.concat(this.getMenuData(item.children, `${parentPath}/${item.path}`));
      }
    });
    return arr;
  }
  render() {
    const {
      currentUser, getRouteData, navData, location, dispatch,
    } = this.props;
    const layout = (
      <Layout>
        <Layout>
            <GlobalHeader currentUser = { currentUser }

                dispatch = { dispatch } />
            <Content>
                <div style = {{minHeight: 'calc(100vh - 260px)'}}>
                    <Switch >
                        {getRouteData('CalendarLayout').map(item =>( <Route exact = { item.exact }
                                key = { item.path }
                                path = { item.path }
                                component = { item.component }/>
                            ))}
                        <Redirect exact from = "/" to = "/index" />
                        <Route component={ NotFound } />
                    </Switch>
                </div>
                <GlobalFooter copyright={<div>Copyright <Icon type = "copyright" /> {trans('global.footer', '2018 杭州云谷学校')}</div>} />
            </Content>
        </Layout>
      </Layout>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classNames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    );
  }
}

export default connect(state => { return {
  currentUser: state.user.currentUser
};})(CalendarLayout);
