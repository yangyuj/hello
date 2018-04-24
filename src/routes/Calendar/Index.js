import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Icon, List, Modal, Tabs, Select} from 'antd';
import { routerRedux } from 'dva/router';
import CalendarHeaderLayout from '../../layouts/CalendarHeaderLayout';
import { trans } from '../../utils/i18n';
import { intToChinese } from '../../utils/utils';
import CalendarBarTable from '../../components/CalendarBarTable';
import styles from './Index.less';

const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
const Option = Select.Option;


@connect(state => ({
  getCalendarInfoMessage: state.Index.getCalendarInfoMessage,
  getTimeInfoMessage: state.Index.getTimeInfoMessage,
  checkDetailInfoMessage: state.Index.checkDetailInfoMessage,
  checkDeleteInfoMessage:state.Index.checkDeleteInfoMessage,
  checkConfirmInfoMessage:state.Index.checkConfirmInfoMessage,
  checkListInfo: state.Index.checkListInfo
}))
export default class Index extends PureComponent {
  state = {
    params: {
      calendarId: '',
      yearId: '',
      weekNumber: 1,
      type: 0
    },
    tableType: 'bars'
  }
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
        type: 'Index/CalendarInfo',
        payload: this.state.params
    })
    dispatch({
        type: 'Index/timeInfo',
        payload: {
        }
    }).then(() => {
      const { getTimeInfoMessage } = this.props;
      this.state.params.weekNumber = getTimeInfoMessage.week.totalWeek || 1;
      this.fetchCalendarInfo();
    });
    dispatch({
        type: 'Index/detailInfo',
        payload: {
        }
    });
  }

  //获取所有日历数据
  fetchCalendarInfo() {
    const { dispatch } = this.props;
    return dispatch({
        type: 'Index/fetchList',
        payload: this.state.params
    })
  }

  //日程分类选择
  tabChange (val) {
    this.state.params.calendarId = val;
    this.fetchCalendarInfo();
  }

  //学期选择
  yearsChange (val) {
    this.state.params.yearId = val;
    this.fetchCalendarInfo();
  }

  //切换周
  checkWeek (type) {
    const { dispatch } = this.props;
    let week = this.props.getTimeInfoMessage.week.currentWeek,
        totalWeek = this.props.getTimeInfoMessage.week.totalWeek;
    if(type == 'left' && parseInt(week, 10) > 1) {
      week--;
    }
    if(type == 'right' && parseInt(week, 10) <= parseInt(totalWeek, 10)) {
      week++;
    }
    dispatch({
        type: 'Index/checkWeek',
        payload: week
    })
    this.state.params.weekNumber = week;
    this.fetchCalendarInfo();

  }

  //切换日历显示类型
  checkTable (type) {
    this.setState({
      tableType: type
    })
  }

  renderWeek (weekNumber) {
      return '第' + intToChinese(weekNumber) + '周';
  }

  render() {
    const {getCalendarInfoMessage, getTimeInfoMessage, checkDetailInfoMessage, checkListInfo} = this.props;
    const {tableType} = this.state;
    return (
      <div className={styles.borderBox}>
        {getCalendarInfoMessage && getCalendarInfoMessage.length > 0 &&(
          <Tabs defaultActiveKey="1" onChange={this.tabChange.bind(this)}>
            {getCalendarInfoMessage.map(el => <TabPane tab={el.name} key={el.id}></TabPane>)}
          </Tabs>
        )}
        <div>
          <Select
            className={styles.selectBox}
            placeholder="Select a person"
            onChange={this.yearsChange.bind(this)}>
            {getTimeInfoMessage
              && getTimeInfoMessage.year
              && getTimeInfoMessage.year.list
              && getTimeInfoMessage.year.list.length > 0
              && getTimeInfoMessage.year.list.map(el => <Option key={el.id} value={el.id}>{el.name}</Option>)}
          </Select>
          <Button className={styles.weekChangeBtn} onClick={this.checkWeek.bind(this, 'left')}><Icon type="left" /></Button>
            {getTimeInfoMessage
              && getTimeInfoMessage.week
              && <span className={styles.plr_10}>{this.renderWeek(getTimeInfoMessage.week.currentWeek)}</span>}
          <Button className={styles.weekChangeBtn} onClick={this.checkWeek.bind(this, 'right')}><Icon type="right" /></Button>
          <span className={styles.tabbleCheck}>
            <Icon className={tableType=='bars' && styles.cur} onClick={this.checkTable.bind(this, 'bars')} type="bars" />
            <span>|</span>
            <Icon className={tableType=='calendar' && styles.cur} onClick={this.checkTable.bind(this, 'calendar')} type="calendar" />
          </span>
        </div>
        <div className={styles.bodyBox}>
          {tableType == 'bars'
            && <CalendarBarTable
                dataSource={checkListInfo} />}
          {tableType == 'calendar' && '这里是日程表格控件2'}
        </div>
      </div>
    );
  }
}
