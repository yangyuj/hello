import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';



// const data = [];

@connect(state => ({

}))
class TableView extends PureComponent {
  state = {

  }

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '日期',
        dataIndex: 'scheduleId',
        key: 'scheduleId',
      }, {
        title: '时间',
        dataIndex: 'scheduleStartTime',
        key: 'scheduleStartTime',
      }, {
        title: '主题',
        dataIndex: 'theme',
        key: 'theme',
      }, {
        title: '参与人员',
        dataIndex: 'people',
        key: 'people',
      }, {
        title: '地点',
        dataIndex: 'location',
        key: 'location',
      }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
      }
    ];
    this.state = {
      data:[]
    };
  }
  componentDidMount() {
    const {
        getListInfoMessage
      } = this.props;
    console.log(getListInfoMessage);
    this.setState({
      data: getListInfoMessage
    });
    
  }
  

  render() {
    const { getListInfoMessage } = this.props;
    console.log(this.state.data);
    // console.log(getListInfoMessage);
    return (
      <div className={styles.standardTable}>
        <Table className={styles.weekTable} columns={this.columns} dataSource={this.state.data} pagination={false} />
      </div>
    );
  }
}

export default TableView;
