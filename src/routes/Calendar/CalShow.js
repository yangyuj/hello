import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Form, Input, DatePicker, Select, Modal, Button, Card, InputNumber, Radio, Icon, Tabs, Table, Divider, Checkbox
} from 'antd';
import { routerRedux } from 'dva/router';
import styles from './CalShow.less';
import { trans } from '../../utils/i18n';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
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

@connect(state => ({
    getCalendarInfoMessage: state.CalendarInfo.getCalendarInfoMessage,
    getTimeInfoMessage: state.CalendarInfo.getTimeInfoMessage,
    checkDetailInfoMessage: state.CalendarInfo.checkDetailInfoMessage,
    checkDeleteInfoMessage: state.CalendarInfo.checkDeleteInfoMessage,
    checkConfirmInfoMessage: state.CalendarInfo.checkConfirmInfoMessage
}))
@Form.create()
export default class CalendarShow extends PureComponent {
    state = {
        visible: false
    }

    constructor(props) {
        super(props);
        this.state = {
            weekendShow: 0,
            widthChange: 0,
            confirmShow: "inline-block",
            params: {
                tabChange: 0,
                yearsChange: 0,
                weekChange: 0
            }
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'CalendarInfo/CalendarInfo',
            payload: {

            }
        }).then(() => {
            dispatch({
                type: 'CalendarInfo/timeInfo',
                payload: {

                }
            });
        }).then(() => {
            dispatch({
                type: 'CalendarInfo/detailInfo',
                payload: {

                }
            });
        });
    }
    //控制是否显示周末
    checkboxChange = (e) => {
        // console.log(e.target.checked);
        this.setState({
            weekendShow: !this.state.weekendShow,
            widthChange: !this.state.widthChange
        })
    }
    //转换成日历视图
    toNewCalendar = () => {
        this.props.dispatch(routerRedux.push('/creat'));
    }
    //转换成表格视图
    toTable = () => {
        this.props.dispatch(routerRedux.push('/tableShow'));
    }
    //点击切换到上一周
    previousWeek = (value) => {
        // console.log(value);
        const current = value.currentWeek;
        const total = value.totalWeek;
        // console.log(current.substr(1, 1)); 
    }
    //点击切换到下一周
    nextWeek = (value) => {
        // console.log(value);
        const current = value.currentWeek;
        const total = value.totalWeek;
        // console.log(current.substr(1, 1)); 
    }
    //删除日程
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    //删除日程时候的确定
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
        this.props.dispatch({
            type: 'CalendarInfo/deleteInfo',
            payload: {

            }
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    //转换日期时间
    changTime = (value) => {
        console.log(value);
    }
    //确认日程
    confirmCal = (value) => {
        this.props.dispatch({
            type: 'CalendarInfo/confirmInfo',
            payload: {

            }
        });
        console.log(value);
        if (value) {
            this.setState({
                confirmShow: !this.state.confirmShow
            });
        }
    }
    //新建邀约
    newInvitation = () => {
        this.props.dispatch(routerRedux.push('/tableShow'));
    }
    //切换日历
    changeTab = (value) => {
        console.log(value);
    }
    //切换学期
    changeSemester = (value) => {
        console.log(value);
    }

    render() {
        const { getCalendarInfoMessage, getTimeInfoMessage, checkDetailInfoMessage, checkConfirmInfoMessage } = this.props;
        const calData = getCalendarInfoMessage;
        const timeData = getTimeInfoMessage;
        const detailData = checkDetailInfoMessage;
        const confirmData = checkConfirmInfoMessage;
        let w = this.state.weekendShow ? 'inline-block' : 'none';
        let wC = this.state.widthChange ? '70%' : '100%';
        let con = this.state.confirmShow ? 'inline-block' : 'none';
        // console.log(checkConfirmInfoMessage);
        return (
            <div className={styles.main}>
                <div className={styles.topHeader}>
                    {
                        calData
                        && calData.length > 0
                        && (<Tabs className={styles.showTabs} defaultActiveKey="1" onChange={this.changeTab.bind(this)}>
                            {calData.map((el, i) => <TabPane tab={el.name} key={i} />)}
                        </Tabs>)
                    }
                    <div className={styles.calendarList}>
                        <div className={styles.showHeader}>
                            <span className={styles.showName}>
                                <Select defaultValue={timeData && timeData.content.year.current} onChange={this.changeSemester} style={{ width: 150 }} >
                                    {
                                        timeData && timeData.content.year.list.map((value, index) => {
                                            return (
                                                <Option value={value.name} key={index} >{value.name}</Option>
                                            );
                                        })
                                    }
                                </Select>
                            </span>
                            <span className={styles.weekChange}>
                                <Button className={styles.weekChangeBtn} onClick={this.previousWeek.bind(this, timeData && timeData.content.week)}><Icon type="left" /></Button>
                                {timeData && timeData.content.week.currentWeek}
                                <Button className={styles.weekChangeBtn} onClick={this.nextWeek.bind(this, timeData && timeData.content.week)}><Icon type="right" /></Button>
                            </span>
                            <ul className={styles.viewChange}>
                                <li className={styles.barsLi} onClick={this.toTable}><Icon type="bars" /></li>
                                <li className={styles.borderLi}></li>
                                <li className={styles.calendarLi}><Icon type="calendar" /></li>
                            </ul>
                            <Checkbox onChange={this.checkboxChange} className={styles.showWeekend}>显示双休日</Checkbox>
                            <Button type="primary" className={styles.confirmationSchedule} onClick={this.confirmCal.bind(this, confirmData)} style={{ display: con }}>确认日程</Button>
                            <Button disabled className={styles.alreadyConfirm} style={{ display: !con }}>已确认</Button>
                            <Button type="primary" className={styles.newInvitation} onClick={this.newInvitation}>新建邀约</Button>
                        </div>
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
                        <div className={styles.checkDetail}>
                            <div className={styles.detailHeader}>{detailData && detailData.content.scheduleTemplate.cName}</div>
                            <p className={styles.detailTime}><Icon className={styles.detailIcon} type="clock-circle-o" />{detailData && detailData.content.scheduleTemplate.sTime}({detailData && detailData.content.scheduleTemplate.weekDay})</p>
                            <p className={styles.detailPlace}><Icon className={styles.detailIcon} type="environment" />{detailData && detailData.content.scheduleTemplate.address}</p>
                            <p className={styles.detailNum}><Icon className={styles.detailIcon} type="contacts" />{detailData && detailData.content.personNumbers}位邀约对象</p>
                            <p className={styles.detailMustChoose}>必选：{detailData && detailData.content.bixuan}</p>
                            <p className={styles.detailCanChoose}>可选：{detailData && detailData.content.kexuan}</p>
                            <p className={styles.detailRemark}><Icon className={styles.detailIcon} type="profile" />{detailData && detailData.content.scheduleTemplate.remark}</p>
                            <p className={styles.detailFooter}>
                                <span onClick={this.showModal} className={styles.deleteSpan}><Icon type="delete" />删除</span>
                                <Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
                                    <p className={styles.deleteSure}>您确定要删除这次日程么？</p>
                                </Modal>
                                <Button className={styles.detailBtnEdit} size="small" type="primary">编辑</Button>
                                <Button className={styles.detailBtnCancel} size="small">取消</Button>
                            </p>
                        </div>
                    </div>
                    <Button className={styles.newCanlendar} onClick={this.toNewCalendar}>新建日历</Button>
                </div>
            </div>
        );
    }
}
