import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Spin, Tag, Dropdown, Avatar, message } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less';
import { trans, locale } from '../../utils/i18n';

const { Header } = Layout;

export default class GlobalHeader extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }

  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
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
        <a href="/" className={styles.logo}>{trans('global.logo', '云谷日程中心')}</a>
        <div className={styles.topMenu}>
          <a href={pathname + '#/index'} ref="unNorm">{trans('global.headTab2', '行事历')}</a>
          <a  href={pathname + '#/calshow'} ref="norm">{trans('global.headTab1', '个人日程')}</a>
          <a href={pathname + '#/schoolCalendar'} ref="">{trans('global.headTab3', '校历')}</a>

        </div>
        {/* <div>
          <ul>
            <li className={styles.}>管理员身份</li>
            <li>员工身份</li>
          </ul>
        </div> */}
      </Header>
    );
  }
}
