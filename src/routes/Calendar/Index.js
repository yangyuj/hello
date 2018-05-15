import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Icon, List, Modal, Tabs, Select, DatePicker } from 'antd';
import { routerRedux } from 'dva/router';
import CalendarHeaderLayout from '../../layouts/CalendarHeaderLayout';
import { trans } from '../../utils/i18n';
import { intToChinese } from '../../utils/utils';
import CalendarCalendarTable from '../../components/CalendarCalendarTable';
import styles from './Index.less';
import TableView from '../../components/TableView/index';
import moment from 'moment';

const confirm = Modal.confirm;
const TabPane = Tabs.TabPane;
const Option = Select.Option;


@connect(state => ({
  getCalendarInfoMessage: state.Index.getCalendarInfoMessage,
  getTimeInfoMessage: state.Index.getTimeInfoMessage,
  checkDetailInfoMessage: state.Index.checkDetailInfoMessage,
  checkDeleteInfoMessage: state.Index.checkDeleteInfoMessage,
  checkConfirmInfoMessage: state.Index.checkConfirmInfoMessage,
  checkListInfo: state.Index.checkListInfo,
  currentUser: state.user.currentUser
}))
export default class Index extends PureComponent {
  state = {
    params: {
      calendarId: '',
      yearId: '',
      weekNumber: 1,
      type: 0
    },
    tableType: 'calendar',
    visible: false,
    already: 0,
    schId: 0,
    calId: 0,
    semester: 0,
    mark: 0,
    tabVal: 0,
    startTime: 0,
    endTime: 0,
    timeLong: 0,
    dateWeek: 0,
    weekDay: 0,
    changeDate: 0,
    cWeek: 0,
    tableSchId: 0,
    reTime: 0
  }
  componentDidMount() {
    const { dispatch, match } = this.props;

    dispatch({
      type: 'Index/CalendarInfo',
      payload: this.state.params
    }).then(() => {
      dispatch({
        type: 'Index/timeInfo',
        payload: {
          completeTime: 0,
          week: (match.params && match.params.weekCurrent) || ''
        }
      }).then(() => {
        const { getTimeInfoMessage, getCalendarInfoMessage, match: { params } } = this.props;
        this.state.params.weekNumber = getTimeInfoMessage.week.currentWeek || 1;
        this.state.params.yearId = getTimeInfoMessage && getTimeInfoMessage.year && getTimeInfoMessage.year.current;
        this.state.params.calendarId = params.calId ? params.calId : getCalendarInfoMessage && getCalendarInfoMessage.currentId;
        // this.state.cWeek = getTimeInfoMessage && getTimeInfoMessage.week && getTimeInfoMessage.week.currentWeek
        this.fetchCalendarInfo();
      });
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

  //日历分类选择
  tabChange(val) {
    this.state.params.calendarId = val;
    this.state.tabVal = val;
    this.fetchCalendarInfo();
    //改变修改日历的入口状态
    this.setState({
      mark: true
    })
  }

  //学期选择
  yearsChange(val) {
    // console.log(val);
    this.state.params.yearId = val;
    this.fetchCalendarInfo();
    const { getTimeInfoMessage } = this.props;
    getTimeInfoMessage && getTimeInfoMessage.year.list.map((value, index) => {
      if (value.id === val) {
        this.state.semester = value.end_time;
      }
    })
  }
  //切换周
  checkWeek(type) {
    const { dispatch } = this.props;
    let week = this.props.getTimeInfoMessage.week.currentWeek,
      currentWeek = this.props.getTimeInfoMessage.week.currentWeek;
    if (type == 'left' && parseInt(week, 10) > 1) {
      week--;
    }
    if (type == 'right' && parseInt(week, 10) <= parseInt(currentWeek, 10)) {
      week++;
    }
    dispatch({
      type: 'Index/checkWeek',
      payload: week
    })
    // console.log(week);
    this.state.params.weekNumber = week;
    this.fetchCalendarInfo();
  }
  //切换日历显示类型
  checkTable(type) {
    this.setState({
      tableType: type
    })
  }
  //确认日程
  confirmCal = (value) => {
    this.props.dispatch({
      type: 'Index/confirmInfo',
      payload: {
        calendarId: this.state.params.calendarId,
        confirmWeek: this.state.params.weekNumber,//确认周
        semesterId: this.state.params.yearId //学期Id
      }
    });

  }
  //新建日历
  newCalendar = () => {
    this.props.dispatch(routerRedux.push('/Creat'));
  }
  //新建邀约
  newInvitation = () => {
    this.props.dispatch(routerRedux.push('/createInvitation' + '/' + this.state.params.yearId + '/' + this.state.params.calendarId));
  }
  //点击删除显示modal
  showModal = () => {
    this.setState({
      daleteVisible: true,
    });
  }
  //不重复删除时候的确定，要发送请求
  handleOk = (e) => {
    this.setState({
      daleteVisible: false,
      visible: false
    });
    alert('999')
    console.log("klll");
    this.props.dispatch({
      type: 'Index/deleteInfo',
      payload: {
        scheduleTemplateId: this.state.schId,
        repateStatus: 0,
        repTime: this.state.dateWeek,
        yearId: this.state.params.yearId
      }
    }).then(() => {
      this.fetchCalendarInfo();
    });
    this.fetchCalendarInfo();
  }
  //重复仅删除本次
  handleOkOnly = (e) => {
    this.setState({
      daleteVisible: false,
      visible: false
    });
    this.props.dispatch({
      type: 'Index/deleteInfo',
      payload: {
        scheduleTemplateId: this.state.schId,
        repateStatus: 1,
        repTime: this.state.dateWeek,
        yearId: this.state.params.yearId
      }

    }).then(() => {
      this.fetchCalendarInfo();
    });
    this.fetchCalendarInfo();
  }
  //重复删除以后全部
  handleOkAll = (e) => {
    this.setState({
      daleteVisible: false,
      visible: false
    });
    this.props.dispatch({
      type: 'Index/deleteInfo',
      payload: {
        scheduleTemplateId: this.state.schId,
        repateStatus: 2,
        repTime: this.state.dateWeek,
        yearId: this.state.params.yearId
      }

    }).then(() => {
      this.fetchCalendarInfo();
    });
    this.fetchCalendarInfo();
  }
  //编辑确定跳转
  handleOutOk = (e) => {
    this.setState({
      visible: false,
    });
    this.props.dispatch(routerRedux.push('/UpdataInvitation' + '/' + this.state.schId + '/' + this.state.params.yearId + '/' + this.state.dateWeek + '/' + this.state.params.weekNumber));
  }
  handleCancel = (e) => {
    this.setState({
      daleteVisible: false
    });
  }
  handleOutCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  renderWeek(weekNumber) {
    // console.log(weekNumber);
    return '第' + intToChinese(weekNumber) + '周';
  }
  //点击显示细节
  calendarClick(obj) {
    let dateW = obj && obj.cdate;
    let weekDate = dateW.slice(2);
    let weekday = dateW.slice(0, 2);
    let st = obj && obj.start;
    let et = obj && obj.end;
    let stc = st.split(':'),
      etc = et.split(':');
    let long = ((etc[0] - stc[0]) < 1 ? '' : (etc[0] - stc[0]) + trans('global.hour', '小时')) + (parseInt(etc[1] - stc[1]) == 0 ? '' : (parseInt(etc[1] - stc[1]) + trans('global.minute', '分钟')));
    let timeS = st.split(':').join(""),
      timeE = et.split(':').join("");
    let timeStart = (timeS < 1200) ? (trans('global.am', '上午') + st) : (trans('global.pm', '下午') + st);
    let timeEnd = (timeE < 1200) ? (trans('global.am', '上午') + et) : (trans('global.pm', '下午') + et);
    this.state.dateWeek = weekDate;
    this.state.weekDay = weekday;
    this.state.startTime = timeStart;
    this.state.endTime = timeEnd;
    this.state.timeLong = long;

    const { dispatch } = this.props;
    dispatch({
      type: 'Index/detailInfo',
      payload: {
        "pageType": 11,
        "scheduleId": this.state.schId,
        "date": this.state.dateWeek,
        "yearId": this.state.params.yearId
      }
    }).then(() => {
      this.setState({
        visible: true,
        schId: obj.scheduleId
      }, () => {});
    });

  }
  //编辑日历跳转
  editCalendar = () => {
    this.props.dispatch(routerRedux.push('/updata' + '/' + this.state.params.calendarId));
  }
  //选择日期的时间
  sendDate = (date, dateString) => {
    let str = dateString.replace(/-/g, '/');
    let dateChange = new Date(str);
    let timeChange = dateChange.getTime();
    this.state.changeDate = timeChange;
    const { dispatch } = this.props;
    dispatch({
      type: 'Index/timeInfo',
      payload: {
        completeTime: this.state.changeDate
      }
    }).then(() => {
      const { getTimeInfoMessage } = this.props;
      this.state.params.yearId = getTimeInfoMessage && getTimeInfoMessage.year && getTimeInfoMessage.year.current;
      this.state.params.weekNumber = (getTimeInfoMessage && getTimeInfoMessage.week && getTimeInfoMessage.week.currentWeek) || 1;
      this.fetchCalendarInfo();
    });
  }
  //表格视图的删除
  deleteClick(record) {
    console.log(record);
    this.setState({
      tableSchId: record.scheduleId,
      reTime: record.date,
      daleteTable: true,
    });
  }
  //表格不重复删除时候的确定，要发送请求
  Ok = (e) => {
    this.setState({
      daleteTable: false,
      visible: false
    });
    this.props.dispatch({
      type: 'Index/deleteInfo',
      payload: {
        scheduleTemplateId: this.state.tableSchId,
        repateStatus: 0,
        repTime: this.state.reTime,
        yearId: this.state.params.yearId
      }
    }).then(() => {
      this.fetchCalendarInfo();
    });
    this.fetchCalendarInfo();
  }

  OkOnly = (e) => {
    this.setState({
      daleteTable: false,
      visible: false
    });
    this.props.dispatch({
      type: 'Index/deleteInfo',
      payload: {
        scheduleTemplateId: this.state.tableSchId,
        repateStatus: 1,
        repTime: this.state.reTime,
        yearId: this.state.params.yearId
      }

    }).then(() => {
      this.fetchCalendarInfo();
    });
    this.fetchCalendarInfo();
  }
  表格重复删除以后全部
  OkAll = (e) => {
    this.setState({
      daleteTable: false,
      visible: false
    });
    this.props.dispatch({
      type: 'Index/deleteInfo',
      payload: {
        scheduleTemplateId: this.state.tableSchId,
        repateStatus: 2,
        repTime: this.state.reTime,
        yearId: this.state.params.yearId
      }

    }).then(() => {
      this.fetchCalendarInfo();
    });
    this.fetchCalendarInfo();
  }
  //表格视图的编辑
  editClick(record) {
    this.props.dispatch(routerRedux.push('/UpdataInvitation' + '/' + record.scheduleId + '/' + this.state.params.yearId + '/' + record.date + '/' + this.state.params.weekNumber));
  }

  render() {
    const { getCalendarInfoMessage, getTimeInfoMessage, checkDetailInfoMessage, checkListInfo, checkConfirmInfoMessage, currentUser, match: { params } } = this.props;
    const { tableType } = this.state;
    const identifyStatus = currentUser && currentUser.$body && currentUser.$body.content && currentUser.$body.content.identify;
    const edit = this.state.mark ? "inline-block" : "none";
    const Admin = checkListInfo && checkListInfo.ifAdmin;
    const ifRe = checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.ifRepeat;
    const canEdit = checkDetailInfoMessage && checkDetailInfoMessage.bj_code;
    const cuId = params.calId ? params.calId : getCalendarInfoMessage && getCalendarInfoMessage.currentId;
    const cWeek = params.weekCurrent ? params.weekCurrent : getTimeInfoMessage && getTimeInfoMessage.week && getTimeInfoMessage.week.currentWeek;
    const currentYear = getTimeInfoMessage && getTimeInfoMessage.year && getTimeInfoMessage.year.current;
    const stime = checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.sTime;
    const etime = checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.eTime;
    return (
      <div className={styles.borderBox}>
        {getCalendarInfoMessage && getCalendarInfoMessage.content && getCalendarInfoMessage.content.length > 0 && (
          <div>
            <Tabs activeKey={String(this.state.params.calendarId)} onChange={this.tabChange.bind(this)} style={{ marginRight: 120 }} >
              {getCalendarInfoMessage && getCalendarInfoMessage.content.map(el => <TabPane tab={<span>{el.name}
                {
                  (this.state.params.calendarId == el.id) && Admin &&
                  <Icon style={{ marginLeft: 5, display: "inline-block" }} onClick={this.editCalendar} type="form" />
                }
              </span>} key={el.id}></TabPane>)}
            </Tabs>
          </div>
        )}
        <div>
          <Select
            value={this.state.params.yearId}
            className={styles.selectBox}
            placeholder={trans('index.choose', '选择学期')}
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
          <DatePicker
            onChange={this.sendDate}
            style={{ width: 40, border: "none" }}
            className={styles.dateStyle}
            placeholder=''
          />
          <Button className={styles.weekChangeBtn} onClick={this.checkWeek.bind(this, 'right')}><Icon type="right" /></Button>
          <span className={styles.tabbleCheck}>
            <Icon className={tableType == 'calendar' && styles.cur} onClick={this.checkTable.bind(this, 'calendar')} type="calendar" />
            <span>|</span>
            <Icon className={tableType == 'bars' && styles.cur} onClick={this.checkTable.bind(this, 'bars')} type="bars" />
          </span>
          {
            Admin &&
            (
              (checkListInfo && checkListInfo.confirmStatus === 1) ?
                <Button disabled className={styles.alreadyConfirm} >{trans('index.alreadyConfirm', '已确认')}</Button> :
                (
                  checkConfirmInfoMessage && checkConfirmInfoMessage.status ?
                    <Button disabled className={styles.alreadyConfirm} >{trans('index.alreadyConfirm', '已确认')}</Button> :
                    <Button type="primary" className={styles.confirmationSchedule} onClick={this.confirmCal.bind(this, checkConfirmInfoMessage)}>{trans('index.confirmCalendar', '确认日程')}</Button>
                )
            )
          }
          <Button type="primary" className={styles.newInvitation} onClick={this.newInvitation}>{trans('index.newInvitation', '新建邀约')}</Button>
        </div>
        <div className={styles.bodyBox}>
          {tableType == 'calendar'
            && <CalendarCalendarTable
              calendarClick={this.calendarClick.bind(this)}
              dataSource={checkListInfo}
              info={checkDetailInfoMessage} />}
          {tableType == 'bars'
            && <TableView
              deleteClick={this.deleteClick.bind(this)}
              editClick={this.editClick.bind(this)}
              checkListInfo={checkListInfo} />}
        </div>
        <Button className={styles.newCalendar} onClick={this.newCalendar}>{trans('index.newCalendar', '新建日历')}</Button>
        <span className={styles.spanSolid}></span>
        <Modal
          className={styles.stylesll}
          title={checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.cName}
          visible={this.state.visible}
          onCancel={this.handleOutCancel}
          footer={[
            canEdit === 1 &&
            <p
              key="1"
              style={{ float: "left" }}
              onClick={this.showModal}
              className={styles.deleteSch}>{trans('global.delete', '删除')}
            </p>,
            <Button  key="2" onClick={this.handleOutCancel}>取消</Button>,
            canEdit === 1 &&
            <Button key="3" type="primary" onClick={this.handleOutOk}>{trans('global.edit', '编辑')}</Button>
          ]}>
            <div>
              <p  key="7">
                <Icon className={styles.detailIcon} type="clock-circle-o" style={{ marginRight: 15, fontSize: 14, color: "#333" }} />
                {this.state.dateWeek}({this.state.weekDay})
              </p>
              <p  key="6" style={{ marginLeft: 26, fontSize: 14, color: "#333" }}>
                {this.state.startTime}-{this.state.endTime}<span style={{ width: 15, display: 'inline-block' }}></span>
                {this.state.timeLong}
              </p>
              <p  key="5">
                <Icon
                  className={styles.detailIcon}
                  type="environment"
                  style={{ marginRight: 15, fontSize: 14, color: "#333" }} />
                  {checkDetailInfoMessage
                    && checkDetailInfoMessage.scheduleTemplateInfo
                    && checkDetailInfoMessage.scheduleTemplateInfo.address}
              </p>
              <p  key="4">
                <Icon className={styles.detailIcon} type="contacts" style={{ marginRight: 15, fontSize: 14, color: "#333" }} />
                {checkDetailInfoMessage && checkDetailInfoMessage.personNumbers}
                {trans('index.objectOfInvitation', '位邀约对象')}
              </p>
              <p  key="3" style={{ marginLeft: 26, fontSize: 14, color: "#333" }}>{trans('index.mandatory', '必选：')}
                {
                  checkDetailInfoMessage && checkDetailInfoMessage.bixuan.map((value, index) => {
                    return (
                      <span
                        key={index}
                        style={{ background: "#F3F3F3", marginRight: 6, fontSize: 12, padding: 2, borderRadius: 4 }}>
                          {value}
                      </span>
                    );
                  })
                }</p>
              <p  key="2" style={{ marginLeft: 26, fontSize: 14, color: "#333" }}>{trans('index.optional', '可选：')}
                {
                  checkDetailInfoMessage && checkDetailInfoMessage.kexuan.map((value, index) => {
                    return (
                      <span key={index}
                        style={{ background: "#F3F3F3", marginRight: 6, fontSize: 12, padding: 2, borderRadius: 4 }}>
                        {value}
                      </span>
                    );
                  })
                }</p>
              <p  key="1">
                <Icon
                  className={styles.detailIcon}
                  type="profile" style={{ marginRight: 15, fontSize: 14, color: "#333" }} />
                  {checkDetailInfoMessage
                    && checkDetailInfoMessage.scheduleTemplateInfo
                    && checkDetailInfoMessage.scheduleTemplateInfo.remark}
              </p>
            </div>
         </Modal>
         {
            ifRe ?
              <Modal
                visible={this.state.daleteVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                style={{ top: 200 }}
                footer={[
                  <Button key="1" onClick={this.handleCancel}>{trans('index.cancel', '取消')}</Button>,
                  <Button key="2" onClick={this.handleOkAll}>{trans('index.allDelete', '以后的日程都删除')}</Button>,
                  <Button key="3" type="primary" onClick={this.handleOkOnly}>{trans('index.onlyDelete', '仅删除这一次日程')}</Button>
                ]}>
                <p className={styles.deleteSure}>{trans('index.sureDelete"', '您确定要删除这次日程么？')}</p>
              </Modal> :
              <Modal
                visible={this.state.daleteVisible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                style={{ top: 200 }}
                footer={[
                  <Button key="1" onClick={this.handleCancel}>{trans('index.cancel', '取消')}</Button>,
                  <Button key="2" type="primary" onClick={this.handleOk}>{trans('global.delete', '删除')}</Button>
                ]}>
                <p className={styles.deleteSure}>{trans('index.sureDelete"', '您确定要删除这次日程么？')}</p>
              </Modal>
          }
          {
            ifRe ?
              <Modal
                visible={this.state.daleteTable}
                style={{ top: 200 }}
                footer={[
                  <Button key="1" onClick={this.handleCancel}>{trans('index.cancel', '取消')}</Button>,
                  <Button key="2" onClick={this.OkAll}>{trans('index.allDelete"', '以后的日程都删除')}</Button>,
                  <Button key="3" type="primary" onClick={this.OkOnly}>{trans('index.onlyDelete', '仅删除这一次日程')}</Button>
                ]}>
                <p className={styles.deleteSure}>{trans('index.sureDelete"', '您确定要删除这次日程么？')}</p>
              </Modal> :
              <Modal
                visible={this.state.daleteTable}
                style={{ top: 200 }}
                footer={[
                  <Button key="1" onClick={this.handleCancel}>{trans('index.cancel', '取消')}</Button>,
                  <Button key="2" type="primary" onClick={this.Ok}>{trans('global.delete', '删除')}</Button>
                ]}>
                <p className={styles.deleteSure}>{trans('index.sureDelete"', '您确定要删除这次日程么？')}</p>
              </Modal>
            }
      </div>
    );
  }
}
