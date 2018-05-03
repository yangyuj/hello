import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';
import { intToChinese, fixedZero } from '../../utils/utils';

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
        dataIndex: 'week',
        key: 'week',
        className: styles.bgCol,
        render: (text, row, index) => {
          return {
            children: <span>{text}<br />{row.date}</span>,
            props: {
              rowSpan: row.rowSpan,
            }
          };
        }
       }, {
        title: '时间',
        dataIndex: 'scheduleTime',
        key: 'scheduleTime'
      }, {
        title: '主题',
        dataIndex: 'theme',
        key: 'theme'
      }, {
        title: '参与人员',
        dataIndex: 'people',
        key: 'people'
      }, {
        title: '地点',
        dataIndex: 'location',
        key: 'location'
      }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
      }
    ];
  }

  calculationWeekDate(time) {
    let date = time?new Date(time) :new Date(),
      day = date.getDay(),
      newWeekMap = [];

    day == 0 && (day = 7);
    for (var i = 1; i <= 7; i++) {
      let elDate = new Date(time + 24 * 3600 * 1000 * (i - day));
      newWeekMap.push(fixedZero(elDate.getMonth() + 1) + '-' + fixedZero(elDate.getDate()))
    }

    return newWeekMap;
  }

  calendarList(weekMap){
    let map = [],
        weekDate = this.calculationWeekDate(weekMap && weekMap.timeStamp);
    if(!weekMap) {
      return;
    }

    for(let i = 1; i <= 7; i++) {
      if(weekMap[i] && weekMap[i].length >0) {
        let week = weekMap[i];
        week.map((value, index)=>{
          map.push({
            ...value,
            key: i + '-' + index,
            date: weekDate[i-1],
            week: '周' + intToChinese(i),
            rowSpan: index == 0? week.length: 0
          })
        })
      }
    }
    return map;
  }

  rowClassName (record, index) {
    let rc = record.rowSpan == 0? styles.lineTr: '';
    return rc;
  }

  render() {
    const { checkListInfo } = this.props;
    let dataMap = this.calendarList(checkListInfo);
    return (
      <div className={styles.standardTable}>
        <Table
          rowClassName={this.rowClassName}
          className={styles.weekTable}
          columns={this.columns}
          dataSource={dataMap}
          pagination={false} />
      </div>
    );
  }
}

export default TableView;
