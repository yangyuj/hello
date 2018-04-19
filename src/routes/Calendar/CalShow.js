import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tabs, Table, Divider, Checkbox
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
    checkDetailInfoMessage:state.CalendarInfo.checkDetailInfoMessage
}))
@Form.create()
export default class CalendarShow extends PureComponent {
    state = {
    }

    constructor(props) {
        super(props);
        this.state = {
            weekendShow: 0,
            widthChange: 0
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
    //点击切换到上学期
    previousWeek=()=>{

    }
    //点击切换到下学期
    nextWeek=()=>{

    }
    //下拉框选择学期
render() {
    const { getCalendarInfoMessage, getTimeInfoMessage, checkDetailInfoMessage } = this.props;
    const calData = getCalendarInfoMessage;
    const timeData = getTimeInfoMessage;
    let w = this.state.weekendShow ? 'inline-block' : 'none';
    let wC = this.state.widthChange ? '70%' : '100%';
    // console.log(checkDetailInfoMessage);
    return (
        <div className={styles.main}>
            <div className={styles.topHeader}>
                <Tabs  className={styles.showTabs}>
                    {
                        calData && calData.content.map((value, index)=>{
                            return(
                                <TabPane tab={value.name} key={index}>
                                    <div className={styles.calendarList}>
                                        <div className={styles.showHeader}>
                                            <span className={styles.showName}>
                                                <Select defaultValue={timeData && timeData.content.year.current} style={{ width: 150 }} >
                                                    {
                                                        timeData && timeData.content.year.list.map((value, index)=>{
                                                            return(
                                                                    <Option value={value.name} key={index}>{value.name}</Option>
                                                            );
                                                        })
                                                    }
                                                </Select>
                                            </span>
                                            <span className={styles.weekChange}>
                                                <Button className={styles.weekChangeBtn} onClick={this.previousWeek}><Icon type="left" /></Button>
                                                    {timeData && timeData.content.week.currentWeek}
                                                <Button className={styles.weekChangeBtn} onClick={this.nextWeek}><Icon type="right" /></Button>
                                            </span>
                                            <ul className={styles.viewChange}>
                                                <li className={styles.barsLi} onClick={this.toTable}><Icon type="bars" /></li>
                                                <li className={styles.borderLi}></li>
                                                <li className={styles.calendarLi}><Icon type="calendar" /></li>
                                            </ul>
                                            <Checkbox onChange={this.checkboxChange} className={styles.showWeekend}>显示双休日</Checkbox>
                                            <Button type="primary" className={styles.confirmationSchedule}>确认日程</Button>
                                            <Button type="primary" className={styles.newInvitation}>新建邀约</Button>
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
                                            <div className={styles.detailHeader}></div>
                                        </div>
                                    </div>
                                </TabPane>
                            );
                        }) 
                    }
                </Tabs>
                <Button className={styles.newCanlendar} onClick={this.toNewCalendar}>新建日历</Button>
            </div>
            
            
        </div>
    );
}
}
