import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Icon, List, Modal, Tabs, Select } from 'antd';
import { routerRedux } from 'dva/router';
import CalendarHeaderLayout from '../../layouts/CalendarHeaderLayout';
import { trans } from '../../utils/i18n';
import { intToChinese } from '../../utils/utils';
import CalendarCalendarTable from '../../components/CalendarCalendarTable';
import styles from './Index.less';
import TableView from '../../components/TableView/index';

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
      calendarId: '1',
      yearId: '2',
      weekNumber: 1,
      type: 0
    },
    tableType: 'bars',
    visible: false,
    already: 0,
    schId: 0,
    calId: 0,
    semester: 0,
    mark: 0
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
      this.state.params.weekNumber = getTimeInfoMessage.week.currentWeek || 1;
      this.fetchCalendarInfo();
    });

    // const { checkDetailInfoMessage } = this.props;
    // console.log(checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.sTime);
    // console.log(checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.eTime);
    // let startTime = checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.sTime;
    // let endTime = checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.eTime;
    // let arr = startTime.split("-");
    // console.log(arr);
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
    this.props.dispatch(routerRedux.push('/createInvitation' + '/' + this.state.params.yearId));
  }
  //点击删除显示modal
  showModal = () => {
    this.setState({
      daleteVisible: true,
    });
  }
  //点击删除时候的确定，要发送请求
  handleOk = (e) => {
    this.setState({
      daleteVisible: false,
      visible: false
    });
    this.props.dispatch({
      type: 'Index/deleteInfo',
      payload: this.state.schId
    });
    this.fetchCalendarInfo();
  }
  //编辑确定跳转
  handleOutOk = (e) => {
    this.setState({
      visible: false,
    });
    this.props.dispatch(routerRedux.push('/UpdataInvitation' + '/' + this.state.schId + '/' + this.state.params.yearId));
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
    return '第' + intToChinese(weekNumber) + '周';
  }
  //点击显示细节
  calendarClick(obj) {
    this.setState({
      visible: true,
      schId: obj.scheduleId
    }, () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'Index/detailInfo',
        payload: {
          "pageType": 11,
          "scheduleId": this.state.schId
        }
      });
    });
  }
  //编辑日历跳转
  editCalendar = () => {
    // console.log("bianjirili");
    this.props.dispatch(routerRedux.push('/updata' + '/' + this.state.params.calendarId));
  }
  //
  overTab = () => {
    console.log("over");
  }
  //
  outTab = () => {
    console.log("out");
  }

  render() {
    const { getCalendarInfoMessage, getTimeInfoMessage, checkDeleteInfoMessage, checkDetailInfoMessage, checkListInfo, checkConfirmInfoMessage, currentUser } = this.props;
    const { tableType } = this.state;
    const identifyStatus = currentUser && currentUser.$body && currentUser.$body.content && currentUser.$body.content.identify;
    const edit = this.state.mark ? "inline-block" : "none";
    // console.log(checkListInfo && checkListInfo.ifAdmin);
    const Admin = checkListInfo && checkListInfo.ifAdmin;
    return (
      <div className={styles.borderBox}>
        {getCalendarInfoMessage && getCalendarInfoMessage.length > 0 && (
          <div>
            <Tabs defaultActiveKey="1" onChange={this.tabChange.bind(this)} onMouseOver={this.overTab} onMouseOut={this.outTab} style={{ paddingRight: 100 }} >
              {getCalendarInfoMessage.map(el => <TabPane tab={<span>{el.name}<Icon style={{ marginLeft: 5, display: edit }} onClick={this.editCalendar} type="form" /></span>} key={el.id}></TabPane>)}
            </Tabs>

          </div>
        )}
        <div>
          <Select
            defaultValue={getTimeInfoMessage && getTimeInfoMessage.year && getTimeInfoMessage.year.current}
            className={styles.selectBox}
            placeholder="选择学期"
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
            <Icon className={tableType == 'bars' && styles.cur} onClick={this.checkTable.bind(this, 'bars')} type="bars" />
            <span>|</span>
            <Icon className={tableType == 'calendar' && styles.cur} onClick={this.checkTable.bind(this, 'calendar')} type="calendar" />
          </span>
          {
            Admin &&
            (
              (checkListInfo && checkListInfo.confirmStatus === 1) ?
                <Button disabled className={styles.alreadyConfirm} >已确认</Button> :
                (
                  checkConfirmInfoMessage && checkConfirmInfoMessage.status ?
                    <Button disabled className={styles.alreadyConfirm} >已确认</Button> :
                    <Button type="primary" className={styles.confirmationSchedule} onClick={this.confirmCal.bind(this, checkConfirmInfoMessage)}>确认日程</Button>
                )
            )
          }
          <Button type="primary" className={styles.newInvitation} onClick={this.newInvitation}>新建邀约</Button>
        </div>
        <div className={styles.bodyBox}>
          {tableType == 'bars'
            && <TableView
              checkListInfo={checkListInfo} />}
          {tableType == 'calendar'
            && <CalendarCalendarTable
              calendarClick={this.calendarClick.bind(this)}
              dataSource={checkListInfo}
              info={checkDetailInfoMessage} />}
        </div>
        <Button className={styles.newCalendar} onClick={this.newCalendar}>新建日历</Button>
        <span className={styles.spanSolid}></span>
        <Modal
          className={styles.stylesll}
          title={checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.cName}
          visible={this.state.visible}
          onCancel={this.handleOutCancel}
          footer={[
            <p style={{ float: "left" }} onClick={this.showModal} className={styles.deleteSch}>删除</p>,
            <Button onClick={this.handleOutCancel}>取消</Button>,
            <Button type="primary" onClick={this.handleOutOk}>编辑</Button>
          ]}>
          {/* <p className={styles.detailName} style={{margin: 50 }}>{checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.cName}</p> */}
          <p className={styles.detailTime}><Icon className={styles.detailIcon} type="clock-circle-o" style={{ marginRight: 15, fontSize: 14, color: "#333" }} />{checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.eTime}</p>
          <p className={styles.detailPlace}><Icon className={styles.detailIcon} type="environment" style={{ marginRight: 15, fontSize: 14, color: "#333" }} />{checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.address}</p>
          <p className={styles.detailNum}><Icon className={styles.detailIcon} type="contacts" style={{ marginRight: 15, fontSize: 14, color: "#333" }} />{checkDetailInfoMessage && checkDetailInfoMessage.personNumbers}位邀约对象</p>
          <p className={styles.detailMustChoose} style={{ marginLeft: 26, fontSize: 14, color: "#333" }}>必选：
            {
              checkDetailInfoMessage && checkDetailInfoMessage.bixuan.map((value, index) => {
                return (
                  <span key={index} style={{ background: "#F3F3F3", marginRight: 6, fontSize: 12, padding: 2, borderRadius: 4 }}>{value}</span>
                );
              })
            }</p>
          <p className={styles.detailCanChoose} style={{ marginLeft: 26, fontSize: 14, color: "#333" }}>可选：
          {
              checkDetailInfoMessage && checkDetailInfoMessage.kexuan.map((value, index) => {
                return (
                  <span key={index} style={{ background: "#F3F3F3", marginRight: 6, fontSize: 12, padding: 2, borderRadius: 4 }}>{value}</span>
                );
              })
            }</p>
          <p className={styles.detailRemark}><Icon className={styles.detailIcon} type="profile" style={{ marginRight: 15, fontSize: 14, color: "#333" }} />{checkDetailInfoMessage && checkDetailInfoMessage.scheduleTemplateInfo && checkDetailInfoMessage.scheduleTemplateInfo.remark}</p>
          <Modal
            visible={this.state.daleteVisible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            style={{ top: 200 }} >
            <p className={styles.deleteSure}>您确定要删除这次日程么？</p>
          </Modal>
        </Modal>
      </div>
    );
  }
}
