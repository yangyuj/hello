import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';

const weekMap = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];


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
  calendarList(weekMap){
    let map = [];
    if(!weekMap) {
      return;
    }
    for(let i=1;i<=7;i++){
      if(weekMap[i] && weekMap[i].length >0) {
        let week = weekMap[i];
        week.map((value, index)=>{
          map.push({...value})
        })
      } 
    }
    // console.log(map);
    return map;
  }

  render() {
    const { checkListInfo } = this.props;
    let dataMap = this.calendarList(checkListInfo);
    // console.log(checkListInfo);
    return (
      <div className={styles.standardTable}>
        {
        }
        <Table 
          className={styles.weekTable} 
          columns={this.columns} 
          dataSource={dataMap} 
          pagination={false} />
      </div>
    );
  }
}

export default TableView;
