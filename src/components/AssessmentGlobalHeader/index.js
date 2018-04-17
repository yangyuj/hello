import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Spin, Tag, Dropdown, Avatar, message } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import { trans, locale } from '../../utils/i18n';

const { Header } = Layout;

export default class AssessmentHeader extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }

  handleNoticeClear = (type) => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: 'global/clearNotices',
      payload: type,
    });
  }

  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      this.props.dispatch({
        type: 'global/fetchNotices',
      });
    }
  }

  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      window.location.href = '/api/logout';
    }
  }

  checkLange = (e) => {
    let target = e.target,
        lang = target.getAttribute('data-lang');
    e.preventDefault();
    this.props.dispatch({
      type: 'global/checkLange',
      payload: {
        languageCode: lang
      }
    });
  }

  handleLinkClick = (e) => {
    let target = e.target,
        refs = this.refs;
    refs.norm.className = '';
    refs.unNorm.className = '';
    target == refs.norm && (target.className = styles.currrent || '');
    target == refs.unNorm && (target.className = styles.currrent || '');
  }

  @Debounce(600)
  triggerResizeEvent() { // eslint-disable-line
    const event = document.createEvent('HTMLEvents');
    event.initEvent('resize', true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      currentUser: data, collapsed, fetchingNotices,
    } = this.props;
    let currentUser = data.content || {};
    const pathname = window.location.pathname;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.handleMenuClick}>
        <Menu.Item disabled>&nbsp;</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />{trans('global.logout', '退出登录')}</Menu.Item>
      </Menu>
    );


    const isNorm = window.location.href.indexOf('#/assessment/norm') > -1;
    const lg = locale();
    return (
      <Header className={styles.header}>
        <div className={styles.langBox}>
          {lg == 'en' && <a data-lang="zh" onClick={this.checkLange} href="">中文</a>}
          {lg != 'en' && <a data-lang="en" onClick={this.checkLange} href="">En</a>}
        </div>
        <div className={styles.right}>
          {currentUser.name ? (
              <Dropdown overlay={menu}>
                <span className={`${styles.action} ${styles.account}`}>
                  <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                  {currentUser.name}
                </span>
              </Dropdown>
          ) : <Spin size="small" style={{ marginLeft: 8 }} />}
        </div>
        <a href="/" className={styles.logo}></a>
        <div className={styles.topMenu}>
          <a href={pathname + '#/assessment/index'} ref="unNorm" onClick={this.handleLinkClick} className={!isNorm? styles.currrent: ''}>{trans('global.headTab1', '成长画像')}</a>
          {currentUser.identify && currentUser.identify.indexOf("employee") > -1 && <a href={pathname + '#/assessment/norm'} ref="norm" onClick={this.handleLinkClick} className={isNorm? styles.currrent: ''}>{trans('global.headTab2', '核心素养')}</a>}
        </div>
      </Header>
    );
  }
}
