import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tabs, Table, Divider, Checkbox
} from 'antd';
import { routerRedux } from 'dva/router';
import styles from './CalShow.less';
import { trans } from '../../utils/i18n';

const FormItem = Form.Item;
const { Option } = Select;
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
    },{
        title: '周四',
        dataIndex: 'people',
        key: 'people',
    },{
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
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        date: 'John Brown',
        time: 32,
        theme: 32,
        people: 32,
        remark: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        key: '3',
        date: 'John Brown',
        time: 32,
        theme: 32,
        people: 32,
        remark: 32,
        address: 'New York No. 1 Lake Park',
    }
];
const columnsWeek = [
    {
        title: '周六',
        dataIndex: 'date',
        key: 'date',
    },{
        title: '周日',
        dataIndex: 'date',
        key: 'date',
    } 
];
const dataWeek = [
    {
        key: '1',
        date: 'John Brown',
        time: 32,
        theme: 32,
        people: 32,
        remark: 32,
        address: 'New York No. 1 Lake Park',
    }, {
        key: '2',
        date: 'John Brown',
        time: 32,
        theme: 32,
        people: 32,
        remark: 32,
        address: 'New York No. 1 Lake Park',
    },{
        key: '3',
        date: 'John Brown',
        time: 32,
        theme: 32,
        people: 32,
        remark: 32,
        address: 'New York No. 1 Lake Park',
    }
];

@connect(state => ({
    getCalendarInfoMessage: state.CalendarInfo.getCalendarInfoMessage
}))
@Form.create()
export default class CalendarShow extends PureComponent {
    state = {
    }

    constructor(props) {
        super(props);
        this.state = {
          
        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'CalendarInfo/CalendarInfo',
            payload: {

            }
        });
    }
    onChange = (e) =>{
        console.log(`checked = ${e.target.checked}`);
    }
    toNewCalendar=()=>{
        this.props.dispatch(routerRedux.push('/creat'));
    }
    toTable = ()=>{
        this.props.dispatch(routerRedux.push('/tableShow'));
    }
    render() {
        const { getCalendarInfoMessage } = this.props;
        const dataMsg = getCalendarInfoMessage;
        // console.log(dataMsg && dataMsg.content);
        return (
            <div className={styles.main}>
                <div className={styles.topHeader}>
                    <Tabs defaultActiveKey="1" className={styles.showTabs}>
                        {/* {
                           dataMsg && dataMsg.content.map((index, value)=>{
                               return(
                                <TabPane tab="Tab" key={index}>Content of Tab Pane 1</TabPane>
                               );
                           }) 
                        } */}
                        <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
                        <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                    </Tabs>
                    <Button className={styles.newCanlendar} onClick={this.toNewCalendar}>新建日历</Button>
                </div>
                <div className={styles.showHeader}>
                    <span className={styles.showName}>云谷学校行事历</span>
                    <span className={styles.weekChange}>
                        <Button className={styles.weekChangeBtn}><Icon type="left" /></Button>
                        第五周
                        <Button className={styles.weekChangeBtn}><Icon type="right" /></Button>
                    </span>
                    <ul className={styles.viewChange}>
                        <li className={styles.barsLi} onClick={this.toTable}><Icon type="bars" /></li>
                        <li className={styles.borderLi}></li>
                        <li className={styles.calendarLi}><Icon type="calendar" /></li>
                    </ul>
                    <Checkbox onChange={this.onChange} className={styles.showWeekend}>显示双休日</Checkbox>
                    <Button type="primary" className={styles.confirmationSchedule}>确认日程</Button>
                    <Button type="primary" className={styles.newInvitation}>新建邀约</Button>
                </div>
                <Table className={styles.weekTable} {...this.state} columns={columns} dataSource={data} pagination={false} />
                <Table className={styles.weekendTable} columns={columnsWeek} dataSource={dataWeek} pagination={false}/>
            </div>
        );
    }
}
