import React, { PureComponent } from 'react';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';

const columns = [
  {
      title: '周一',
      dataIndex: 'date',
      key: 'date',
  }, {
      title: '周二',
      dataIndex: 'time',
      key: 'time',
  }, {
      title: '周三',
      dataIndex: 'theme',
      key: 'theme',
  }, {
      title: '周四',
      dataIndex: 'people',
      key: 'people',
  }, {
      title: '周五',
      dataIndex: 'address',
      key: 'address',
  }
];
const data = [
  {
      key: '1',
      date: 'John Brown',
      time: 32,
      theme: 32,
      people: 32,
      remark: 32,
      address: 'New York',
  }, {
      key: '2',
      date: 'John Brown',
      time: 32,
      theme: 32,
      people: 32,
      remark: 32,
      address: 'New York',
  }, {
      key: '3',
      date: 'John Brown',
      time: 32,
      theme: 32,
      people: 32,
      remark: 32,
      address: 'New York',
  }
];
const columnsWeek = [
  {
      title: '周六',
      dataIndex: 'Saturday',
      key: 'Saturday',
  }, {
      title: '周日',
      dataIndex: 'Sunday',
      key: 'Sunday',
  }
];
const dataWeek = [
  {
      key: '9',
      Saturday: 'John Brown',
      Sunday: 32,
  }, {
      key: '8',
      Saturday: 'John Brown',
      Sunday: 32,
  }, {
      key: '7',
      Saturday: 'John Brown',
      Sunday: 32,
  }
];

class TableView extends PureComponent {
  state = {
  };

  render() {
    let w = this.state.weekendShow ? 'inline-block' : 'none';
    let wC = this.state.widthChange ? '70%' : '100%';
    return (
      <div className={styles.standardTable}>
        <Table
          className={styles.weekTable}
          columns={columns}
          dataSource={data}
          pagination={false}
          style={{ width: wC }}
        />
        <Table
          className={styles.weekendTable}
          columns={columnsWeek}
          dataSource={dataWeek}
          pagination={false}
          style={{ display: w }}
        />
      </div>
    );
  }
}

export default TableView;
