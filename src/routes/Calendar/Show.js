import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
} from 'antd';
import styles from './Show.less';
import { trans } from '../../utils/i18n';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;


@connect(state => ({
    getTimeInfoMessage:state.getTimeInfoMessage
}))
@Form.create()
export default class Show extends PureComponent {
    state = {

    }

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount(){
        const { dispatch } = this.props;
        dispatch({
            type: 'timeInfo/timeInfo',
            payload:{

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
            </div>
        );
    }
}
