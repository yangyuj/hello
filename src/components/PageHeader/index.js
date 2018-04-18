import React, { PureComponent, createElement } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Tabs } from 'antd';
import classNames from 'classnames';
import styles from './index.less';
import { routerRedux } from 'dva/router';

const { TabPane } = Tabs;

function getBreadcrumb(breadcrumbNameMap, url) {
  if (breadcrumbNameMap[url]) {
    return breadcrumbNameMap[url];
  }
  const urlWithoutSplash = url.replace(/\/$/, '');
  if (breadcrumbNameMap[urlWithoutSplash]) {
    return breadcrumbNameMap[urlWithoutSplash];
  }
  let breadcrumb = '';
  Object.keys(breadcrumbNameMap).forEach((item) => {
    const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
    const itemRegExp = new RegExp(itemRegExpStr);
    if (itemRegExp.test(url)) {
      breadcrumb = breadcrumbNameMap[item];
    }
  });
  return breadcrumb;
}

export default class AssessmentPageHeader extends PureComponent {
  static contextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object,
  };
  onChange = (key) => {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
    }
  };
  getBreadcrumbProps = () => {
    return {
      routes: this.props.routes || this.context.routes,
      params: this.props.params || this.context.params,
      location: this.props.location || this.context.location,
      breadcrumbNameMap: this.props.breadcrumbNameMap || this.context.breadcrumbNameMap,
    };
  };

  itemRender = (route, params, routes, paths) => {
    const { linkElement = 'a' } = this.props;
    const index = routes.indexOf(route);
    const last =  index === routes.length - 1;
    const pathname = window.location.href ;
    const url = pathname.substring(0, pathname.lastIndexOf('#'));
    return (last)
      ? <span>{route.breadcrumbName}</span>
      : <a href={url + '#' + paths[index]} >{route.breadcrumbName}</a>;
  }
  render() {
    const { routes, params, location, breadcrumbNameMap } = this.getBreadcrumbProps();
    const {
      title, logo, action, content, extraContent,
      breadcrumbList, tabList, className, linkElement = 'a',
    } = this.props;
    const clsString = classNames(styles.pageHeader, className);
    let breadcrumb = null;
    if (routes && params) {
      breadcrumb = (
        <Breadcrumb
          className={styles.breadcrumb}
          routes={routes.filter(route => route.breadcrumbName)}
          params={params}
          separator=">"
          itemRender={this.itemRender}
        />
      );
    }

    const tabDefaultValue = tabList && (tabList.filter(item => item.default)[0] || tabList[0]);

    return (
      <div  className={clsString}>
        {breadcrumb}
      </div>
    );
  }
}
