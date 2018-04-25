import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';

const weekMap = [1,2,3,4,5,6,7];
let map = [];

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
        dataIndex: 'scheduleTime',
        key: 'scheduleTime',
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
  list =() =>{
    for(i=1;i<=7;i++){
      let week = weekMap[i];
      week.map((value, index)=>{
        map.push({...value,week:i})
      })
    }
    console.log(map);
  }

  render() {
    const { checkListInfo } = this.props;
    console.log(checkListInfo && checkListInfo.timeStamp);
    return (
      <div className={styles.standardTable}>
        {
          
        }
        <Table 
          className={styles.weekTable} 
          columns={this.columns} 
          // dataSource={checkListInfo} 
          pagination={false} />
      </div>
    );
  }
}

export default TableView;
