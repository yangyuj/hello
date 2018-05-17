import React, { PureComponent } from 'react';
import { Layout, Menu, Icon, Spin, Tag, Dropdown, Avatar, message } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';

import { trans, locale } from '../../utils/i18n';
import styles from './calendarSl.css';

const { Header } = Layout;

export default class add extends PureComponent {
  render() {
      return (
        <div className={styles.divBox}></div>
      )
  }

}
