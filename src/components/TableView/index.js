import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from './index.less';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';
import { intToChinese, fixedZero } from '../../utils/utils';

const weekMap = [trans('global.monday', '周一'),
                trans('global.tuesday', '周二'),
                trans('global.wednesday', '周三'),
                trans('global.thursday','周四'),
                trans('global.friday', '周五'),
                trans('global.saturday', '周六'),
                trans('global.sunday', '周天')];

@connect(state => ({

}))
class TableView extends PureComponent {
  state = {

  }

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: trans('tableView.date', '日期'),
        dataIndex: 'week',
        key: 'week',
        width: '10%',
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
        title: trans('tableView.time', '时间'),
        dataIndex: 'scheduleTime',
        width: '10%',
        key: 'scheduleTime'
      }, {
        title: trans('tableCom.theme', '主题'),
        dataIndex: 'theme',
        width: '15%',
        key: 'theme'
      }, {
        title: trans('tableCom.people', '参与人员'),
        dataIndex: 'people',
        width: '20%',
        key: 'people'
      }, {
        title: trans('tableCom.location', '地点'),
        dataIndex: 'location',
        width: '15%',
        key: 'location'
      }, {
        title: trans('tableCom.remark', '备注'),
        dataIndex: 'remark',
        width: '20%',
        key: 'remark'
      }, {
        title: trans('tableCom.action', '操作'),
        width: '15%',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={this.delete.bind(this, record)}>{trans('global.delete', '删除')}</a>
            <a href="javascript:;" onClick={this.edit.bind(this, record)} style={{ marginLeft: 20 }}>{trans('global.edit', '编辑')}</a>
          </span>
        ),
      }
    ];
  }
  delete(record) {
    // console.log(this.props);
    this.props.deleteClick && this.props.deleteClick.call(this, record)
  }
  edit(record) {
    this.props.editClick && this.props.editClick.call(this, record)
  }
  calculationWeekDate(time) {
    let date = time ? new Date(time) : new Date(),
      day = date.getDay(),
      newWeekMap = [];

    day == 0 && (day = 7);
    for (var i = 1; i <= 7; i++) {
      let elDate = new Date(time + 24 * 3600 * 1000 * (i - day));
      newWeekMap.push(fixedZero(elDate.getMonth() + 1) + '-' + fixedZero(elDate.getDate()))
    }

    return newWeekMap;
  }

  calendarList(weekMap) {
    let map = [],
      weekDate = this.calculationWeekDate(weekMap && weekMap.timeStamp);
    if (!weekMap) {
      return;
    }

    for (let i = 1; i <= 7; i++) {
      if (weekMap[i] && weekMap[i].length > 0) {
        let week = weekMap[i];
        week.map((value, index) => {

          map.push({
            ...value,
            key: i + '-' + index,
            date: weekDate[i - 1],
            week: trans('global.week', '周') + intToChinese(i),
            rowSpan: index == 0 ? week.length : 0
          })

        })
      }
    }
    return map;
  }

  rowClassName(record, index) {
    let rc = record.rowSpan == 0 ? styles.lineTr : '';
    return rc;
  }

  render() {
    const { checkListInfo } = this.props;
    console.info(checkListInfo)
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
