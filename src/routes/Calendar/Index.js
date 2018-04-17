import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Modal } from 'antd';
import { routerRedux } from 'dva/router';
import CalendarHeaderLayout from '../../layouts/CalendarHeaderLayout';
import { trans } from '../../utils/i18n';
import styles from './Index.less';

const confirm = Modal.confirm;

@connect(state => ({
  //content: state.assessmentIndex,
}))
export default class Index extends PureComponent {
  componentDidMount() {
    /* this.props.dispatch({
      type: 'assessmentIndex/fetch',
      payload: {
        count: 8,
      },
    }); */
  }

  render() {

    return (
      <div className={styles.cardList}>
        This is test
      </div>
    );
  }
}
