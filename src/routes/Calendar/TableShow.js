import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip, Table, Divider
} from 'antd';
import styles from './TableShow.less';
import { trans } from '../../utils/i18n';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const pagination = { position: 'none' };
const columns = [
    {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
    }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
    }, {
        title: '主题',
        dataIndex: 'theme',
        key: 'theme',
    },{
        title: '参与人员',
        dataIndex: 'people',
        key: 'people',
    },{
        title: '地点',
        dataIndex: 'address',
        key: 'address',
    }, {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
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

@connect(state => ({
    getTimeInfoMessage: state.timeInfo.getTimeInfoMessage
}))
@Form.create()
export default class Show extends PureComponent {
    state = {
        pagination: "none",
    }

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'timeInfo/timeInfo',
            payload: {

            }
        });
    }
    render() {
        const { getTimeInfoMessage } = this.props;
        console.log(getTimeInfoMessage);
        return (
            <div className={styles.main}>
                <div className={styles.showHeader}>
                    <span className={styles.showName}>云谷学校行事历</span>
                    <span className={styles.weekChange}>
                        <Button className={styles.weekChangeBtn}><Icon type="left" /></Button>
                        第五周
                        <Button className={styles.weekChangeBtn}><Icon type="right" /></Button>
                    </span>
                    <ul className={styles.viewChange}>
                        <li className={styles.barsLi}><Icon type="bars" /></li>
                        <li className={styles.borderLi}></li>
                        <li className={styles.calendarLi}><Icon type="calendar" /></li>
                    </ul>
                    <Button type="primary" className={styles.confirmationSchedule}>确认日程</Button>
                    <Button type="primary" className={styles.newInvitation}>新建邀约</Button>
                </div>
                <Table {...this.state} columns={columns} dataSource={data} />
            </div>
        );
    }
}
