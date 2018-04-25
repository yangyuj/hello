import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';

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

    };
  }
  componentDidMount() {
   
  }
  

  render() {
    const { checkListInfo } = this.props;
    console.log(checkListInfo);
    return (
      <div className={styles.standardTable}>
        {
          checkListInfo && checkListInfo.length>0 && checkListInfo.map((value,index)=>{
            // return(
            //   <div key={index}>{value}</div>
            // );
            console.log(value);
          })
        }
        <Table className={styles.weekTable} columns={this.columns} dataSource={checkListInfo} pagination={false} />
      </div>
    );
  }
}

export default TableView;
