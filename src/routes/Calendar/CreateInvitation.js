import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
  TreeSelect, TimePicker, Modal
} from 'antd';
import SelectUser from '../../components/SelectUser';
import styles from './CreatInvition.less';



import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';
import moment from 'moment';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const SHOW_ALL = TreeSelect.SHOW_ALL;
const format = 'HH:mm';

@connect(state => ({
  addWork: state.Calendar.addCalendarapi,
  personlist: state.Calendar.mohuList,
  yaoyue: state.Calendar.yaoyue,
  rililist: state.Calendar.allrili,
  placelist: state.Calendar.allplace,
  peoplelist: state.Calendar.peoplelist,
  searchPeopleData: state.Calendar.searchPeopleData
}))
@Form.create()
export default class Creat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      c_zhuti: null,
      e_zhuti: null,
      leixing: null,
      value1: null,
      value2: null,
      data: null,
      firstTime: '8:00',
      lastTime: '8:00',
      chongfu: null,
      place: null,
      beizhu: null,
      treeData: [],
      defaultV: null
    };
  }

  componentDidMount() {
    let _this = this
    const { dispatch, match: { params } } = this.props;
    dispatch({
      type: 'Calendar/charili', //查询all日历
      payload: {

      }
    }).then(function () {
      let riliall = _this.props.rililist
        && _this.props.rililist.content;

      for (let i = 0; i < riliall.length; i++) {
        if (riliall[i].id == params.calendarId) {
          localStorage.setItem("kkkk", riliall[i].id)
          _this.setState({ leixing: riliall[i].id })
          _this.setState({ defaultV: riliall[i].name })
        }
      }

    })

    //查询地点
    dispatch({
      type: 'Calendar/chaPlace',
      payload: {

      }
    })


    dispatch({  //查询所有人员
      type: 'Calendar/people',
      payload: {

      }
    }).then(function () {
      _this.setState({
        treeData: _this.props.peoplelist
          && _this.props.peoplelist.content.getDepartmentList
      })
    })

    //搜索人接口
    dispatch({
      type: 'Calendar/searchPeople',
      payload: {
        keyWord: ''
      }
    })

  }

  handleChange = (value) => {
    this.setState({ leixing: value })
  }

  handleChangechong = (value) => {
    this.setState({ chongfu: value })
  }

  czhutiinput = (e) => {
    this.setState({
      c_zhuti: e.target.value
    })
  }

  ezhutiinput = (e) => {
    this.setState({
      e_zhuti: e.target.value
    })
  }

  chong(value) {
    let m = [] //
    let list = []
    for (let i = 0; i < value.length; i++) {
      if (m.indexOf(value[i].split('-')[1]) == -1) {
        m.push(value[i].split('-')[1])
        list.push(value[i])
      }
    }
    // console.log(m)
    // console.log(list)
    return list
  }

  onChangeXiala1 = (value) => {

    this.setState({ value1: value });
  }

  onChangeXiala2 = (value) => {
    this.setState({ value2: this.chong(value) });
  }

  dataChange = (date, dateString) => {
    this.setState({ data: dateString })

  }

  timeChangefitst = (time, timeString) => {
    this.setState({ firstTime: timeString })
  }

  timeChangelast = (time, timeString) => {
    this.setState({ lastTime: timeString })
  }

  handleChangeplace = (value) => {
    this.setState({ place: value })
  }

  handleBlurplace = (e) => {

  }

  handleFocusplace = () => {
  }

  beizhu = (e) => {
    this.setState({ beizhu: e.target.value })
  }

  showConfirm() {
    confirm({
      title: '请把信息填写完整！',
      onOk() {},
      onCancel() {},
    });
  }

  addYaoyue = (e) => {
    if (this.state.c_zhuti == null ||
      this.state.e_zhuti == null ||
      this.state.value1 == null ||
      this.state.data == null ||
      this.state.chongfu == null ||
      this.state.place == null
    ) {
      this.showConfirm()
    } else {
      //拼成2017/9/9 3:80
      let chuofrist = this.state.data.replace(/-/g, '/') + ' ' + this.state.firstTime
      let chuolast = this.state.data.replace(/-/g, '/') + ' ' + this.state.lastTime
      let _this = this
      const { dispatch, match: { params } } = this.props;
      dispatch({
        type: 'Calendar/addyao',
        payload: {
          calendarId: this.state.leixing,
          cName: this.state.c_zhuti,
          eName: this.state.e_zhuti,
          optionalPersonnel: this.state.value2,
          requiredPersonnel: this.state.value1,
          // optionalPersonnel:["7-34","7-10","33-17"],
          // requiredPersonnel: ["46-67","18-31"],
          startTime: new Date(chuofrist).getTime(),
          endTime: new Date(chuolast).getTime(),
          repeatTypeCode: parseInt(this.state.chongfu),
          address: this.state.place,
          remark: this.state.beizhu,
          semesterId: parseInt(params.yearId)
        }
      }).then(function (res) {
        if (_this.props.yaoyue
          && _this.props.yaoyue.status == true) {
          _this.props.dispatch(routerRedux.push('/index' + '/' + _this.state.leixing));
          //alert('新建成功')
        } else {
          alert(_this.props.yaoyue
            && _this.props.yaoyue.message)
        }
      })
    }

  }

  cancel = (e) => {
    this.props.dispatch(routerRedux.push('/index' + '/' + localStorage.getItem('kkkk')));
  }

  peopleSearch = (keyWord) => {
    const { dispatch } = this.props;

    if(this.peopleSearchFlag) {
      return;
    }console.log(keyWord);
    this.peopleSearchFlag = setTimeout(() => {
      dispatch({
        type: 'Calendar/searchPeople',
        payload: {
          keyWord: keyWord
        }
      }).then(() => {
         this.peopleSearchFlag = false;
      });
    }, 800)
  }

  render() {
    let { searchPeopleData } = this.props;
    let tree = this.state.treeData
    const tProps1 = {
      treeData: tree,
      value: this.state.value1,
      onChange: this.onChangeXiala1,
      treeCheckable: true,
      allowClear: true,
      searchPlaceholder: '',
      treeNodeFilterProp: 'title',
      style: {
        width: 500,
      },
    };
    const tProps2 = {
      treeData: tree,
      value: this.state.value2,
      onChange: this.onChangeXiala2,
      treeCheckable: true,
      allowClear: true,
      searchPlaceholder: '',
      style: {
        width: 500,
      },
    };

    let allRili = this.props.rililist && this.props.rililist.content;

    return (
      <div className={styles.content}>
        <div style={{ textAlign: "left" }} className={styles.addyaoyue}>新建邀约</div>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td className={styles.leftKuang}>类型：</td>
              {this.state.defaultV && (<td className={styles.rightKuang}>
                <Select defaultValue={this.state.defaultV} style={{ width: 300 }} onChange={this.handleChange}>
                  {
                    this.props.rililist
                    && this.props.rililist.content.map((value, index) => {
                      return <Option value={value.id} key={value.id}>{value.name}</Option>
                    })
                  }
                </Select>
              </td>)}
            </tr>
            <tr>
              <td className={styles.leftKuang}>主题：</td>
              <td className={styles.rightKuang}><Input placeholder="请输入" ref="cmingsheng" onChange={this.czhutiinput} /></td>
            </tr>
            <tr>
              <td className={styles.leftKuang}>英文主题：</td>
              <td className={styles.rightKuang}><Input placeholder="请输入" ref="emingsheng" onChange={this.ezhutiinput} /></td>
            </tr>
            <tr>
              <td className={styles.leftKuang1}>必选人员：</td>
              <td className={styles.rightKuang}>
                {tree && tree.length > 0 && <SelectUser
                  data={searchPeopleData}
                  treeData={tree}
                  onChange={this.onChangeXiala1}
                  onSearch={this.peopleSearch} />}
              </td>
            </tr>
            <tr>
              <td className={styles.leftKuang1}>可选人员：</td>
              <td className={styles.rightKuang}>
                {tree && tree.length > 0 && <SelectUser
                  data={searchPeopleData}
                  treeData={tree}
                  onChange={this.onChangeXiala2}
                  onSearch={this.peopleSearch} />}
              </td>
            </tr>
            <tr>
              <td className={styles.leftKuang1}>时间：</td>
              <td className={styles.rightKuang}><DatePicker onChange={this.dataChange} placeholder="日期" /><span className={styles.jiange}></span>
                <TimePicker defaultValue={moment('8:00', format)} format={format} onChange={this.timeChangefitst} /><span className={styles.jiange}></span>
                <TimePicker defaultValue={moment('8:00', format)} format={format} onChange={this.timeChangelast} />
              </td>
            </tr>
            <tr>
              <td className={styles.leftKuang1}>重复：</td>
              <td className={styles.rightKuang}>
                <Select placeholder="请选择类型" style={{ width: 300 }} onChange={this.handleChangechong}>
                  <Option value="1">不重复</Option>
                  <Option value="2">每天</Option>
                  <Option value="3">每周</Option>
                  <Option value="5">每2周</Option>
                  <Option value="4">每月</Option>
                </Select>

              </td>
            </tr>
            <tr>
              <td className={styles.leftKuang1}>地点：</td>
              <td className={styles.rightKuang}>
                <Select
                  mode="combobox"
                  size="default"
                  defaultValue=""
                  placeholder=""
                  onChange={this.handleChangeplace}
                  style={{ width: 200 }}
                >
                  {
                    this.props.placelist
                    && this.props.placelist.content.listInfobyAddress.map((value, index) => {
                      return <Option value={value.cName} key={value.id}>{value.cName}</Option>
                    })
                  }
                  {/*<Option value="3-1">3-1</Option>
                <Option value="3-2">3-2</Option>
                <Option value="3-3">3-3</Option>*/}
                </Select>
              </td>
            </tr>
            <tr>
              <td className={styles.leftKuang1}>备注：</td>
              <td className={styles.rightKuang}>
                <TextArea rows={4} onChange={this.beizhu} />
              </td>
            </tr>

          </tbody>
        </table>
        <div className={styles.di}>
          <Button onClick={this.cancel}>取消</Button><span className={styles.jiange}></span>
          <Button type="primary" onClick={this.addYaoyue}>确定</Button>
        </div>
      </div>
    );
  }
}
