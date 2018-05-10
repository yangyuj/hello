import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
  TreeSelect, TimePicker, Modal
} from 'antd';
//import AssessmentHeaderLayout from '../../layouts/AssessmentHeaderLayout';
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
const dateFormat = 'YYYY/MM/DD';
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const treeData = [{
  label: '技术部',
  value: '技术部',
  key: '0-0',
  children: [{
    label: '张三',
    value: '张三',
    key: '0-0-0',
  }, {
    label: '王哦',
    value: '王哦',
    key: '0-0-1',
  }],
}];
@connect(state => ({
  addWork: state.Calendar.addCalendarapi,
  personlist: state.Calendar.mohuList,
  yaoyue: state.Calendar.yaoyue,
  rililist: state.Calendar.allrili,
  placelist: state.Calendar.allplace,
  peoplelist: state.Calendar.peoplelist,
  yaoyueHui: state.Calendar.yaoyueHuilist,
  xiugaiyaoyue: state.Calendar.xiugaiyaoyue
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
      firstTime: null,
      lastTime: null,
      chongfu: null,
      place: null,
      beizhu: null,
      treeData: null,
      bjcode: null,
      queding: null,
      chongfuziduan: null,
      startTime: null,
      endTime: null,
      beforeRepeat: null,
      editOnly: null,
      time: null,
      timeLast: null
    };
  }
  componentWillMount() {
    let _this = this
    const { dispatch, match: { params } } = this.props;
    dispatch({
      type: 'Calendar/charili', //查询all日历
      payload: {
      }
    }).then(function () {
      // console.log(_this.props.rililist
      //   && _this.props.rililist.content)
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
      // console.log(_this.props.peoplelist
      //   && _this.props.peoplelist.content.getDepartmentList)
      _this.setState({
        treeData: _this.props.peoplelist
          && _this.props.peoplelist.content.getDepartmentList
      })
    })
    //邀约回显
    dispatch({  //查询所有人员
      type: 'Calendar/yaoyueHuixian',
      payload: {
        scheduleId: params.scheduleId,   //邀约ID
        pageType: "12",
        yearId: params.yearId,
        date: params.date
      }
    }).then(function () {
      // console.log(_this.props.yaoyueHui
      //   && _this.props.yaoyueHui.content.scheduleTemplateInfo)
      _this.setState({
        leixing: _this.props.yaoyueHui
          && _this.props.yaoyueHui.content.scheduleTemplateInfo.calendarId,
        startTime: _this.props.yaoyueHui && _this.props.yaoyueHui.content.preStartTime,
        endTime: _this.props.yaoyueHui && _this.props.yaoyueHui.content.preEndTime,
        startTime_buchongfu:_this.props.yaoyueHui && _this.props.yaoyueHui.content.scheduleTemplateInfo.startTime,
        endTime_buchongfu:_this.props.yaoyueHui && _this.props.yaoyueHui.content.scheduleTemplateInfo.endTime,
        beforeRepeat: _this.props.yaoyueHui && _this.props.yaoyueHui.content.scheduleTemplateInfo.ifRepeat
      },function(){
        if(_this.state.beforeRepeat){
          _this.state.time = _this.props.yaoyueHui && _this.props.yaoyueHui.content.preStartTime,
          _this.state.timeLast = _this.props.yaoyueHui && _this.props.yaoyueHui.content.preEndTime
        }else{
          _this.state.time = _this.props.yaoyueHui && _this.props.yaoyueHui.scheduleTemplateInfo && _this.props.yaoyueHui.scheduleTemplateInfo.startTime,
          _this.state.timeLast = _this.props.yaoyueHui && _this.props.yaoyueHui.scheduleTemplateInfo && _this.props.yaoyueHui.content.scheduleTemplateInfo.endTime
        }
      })
      
      _this.setState({
        c_zhuti: _this.props.yaoyueHui
          && _this.props.yaoyueHui.content.scheduleTemplateInfo.cName
      })
      _this.setState({
        e_zhuti: _this.props.yaoyueHui
          && _this.props.yaoyueHui.content.scheduleTemplateInfo.eName
      })

      let allrenyuan = _this.props.yaoyueHui
        && _this.props.yaoyueHui.content.persons
      let bixuan = []
      let kexuan = []
      for (let i = 0; i < allrenyuan.length; i++) {
        if (allrenyuan[i].relationType == 1) {
          bixuan.push(allrenyuan[i].remarkie + '')
        } else {
          kexuan.push(allrenyuan[i].remarkie + '')
        }
      }
      _this.setState({ value1: bixuan })
      _this.setState({ value2: kexuan })
       
       if(_this.props.yaoyueHui && 
        _this.props.yaoyueHui.content.scheduleTemplateInfo.ifRepeat){
           let timechuo_first = new Date(_this.props.yaoyueHui
          && _this.props.yaoyueHui.content.preStartTime)
         let timechuo_end = new Date(_this.props.yaoyueHui
          && _this.props.yaoyueHui.content.preEndTime)
           _this.setState({ data: timechuo_first.getFullYear() + '-' + (timechuo_first.getMonth() + 1) + '-' + timechuo_first.getDate() })
            _this.setState({ firstTime: timechuo_first.getHours() + ':' + timechuo_first.getMinutes() })
            _this.setState({ lastTime: timechuo_end.getHours() + ':' + timechuo_end.getMinutes() })

       }else{
          let timechuo_first = new Date(_this.props.yaoyueHui
          && _this.props.yaoyueHui.content.scheduleTemplateInfo.startTime)
         let timechuo_end = new Date(_this.props.yaoyueHui
          && _this.props.yaoyueHui.content.scheduleTemplateInfo.endTime)
          _this.setState({ data: timechuo_first.getFullYear() + '-' + (timechuo_first.getMonth() + 1) + '-' + timechuo_first.getDate() })
          _this.setState({ firstTime: timechuo_first.getHours() + ':' + timechuo_first.getMinutes() })
          _this.setState({ lastTime: timechuo_end.getHours() + ':' + timechuo_end.getMinutes() })

       }
      

      // console.log(timechuo_first.getFullYear() + '-' + (timechuo_first.getMonth() + 1) + '-' + timechuo_first.getDate())
      // console.log(timechuo_first.getHours() + ':' + timechuo_first.getMinutes())
      // console.log(timechuo_end.getHours() + ':' + timechuo_end.getMinutes())
      // _this.setState({ data: timechuo_first.getFullYear() + '-' + (timechuo_first.getMonth() + 1) + '-' + timechuo_first.getDate() })
      // _this.setState({ firstTime: timechuo_first.getHours() + ':' + timechuo_first.getMinutes() })
      // _this.setState({ lastTime: timechuo_end.getHours() + ':' + timechuo_end.getMinutes() })

      _this.setState({
        chongfu: _this.props.yaoyueHui
          && _this.props.yaoyueHui.content.scheduleTemplateInfo.repeatMark
      })

      let type = _this.props.yaoyueHui
        && _this.props.yaoyueHui.content.scheduleTemplateInfo.repeatMark
      if (type == "1") {
        _this.setState({ chongfuziduan: '不重复' })
      }
      if (type == 2) {

      }
      if (type == 3) {

      }
      if (type == 4) {

      }
      if (type == 5) {

      }

      _this.setState({
        place: _this.props.yaoyueHui
          && _this.props.yaoyueHui.content.scheduleTemplateInfo.address
      })
      _this.setState({
        beizhu: _this.props.yaoyueHui
          && _this.props.yaoyueHui.content.scheduleTemplateInfo.remark
      })

      //bj_code判断
      let mark = _this.props.yaoyueHui
        && _this.props.yaoyueHui.content.bj_code
      // console.log(mark)
      if (mark == "0002") {
        _this.setState({ bjcode: true })
        _this.setState({ queding: true })
      }
      if (mark == "0001") {
        _this.setState({ bjcode: true })
      }
      if (mark == "0003") {
        _this.setState({ bjcode: false })
      }
    })


  }
  handleChange = (value) => {
    // console.log(`类型 ${value}`);
    this.setState({ leixing: value })
  }
  handleChangechong = (value) => {
    // console.log(`重复 ${value}`);
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
    // console.log('onChange ', value, arguments);
    this.setState({ value1: this.chong(value) });
  }
  onChangeXiala2 = (value) => {
    // console.log('onChange ', value, arguments);
    this.setState({ value2: this.chong(value) });
  }
  dataChange = (date, dateString) => {
    // console.log(date, dateString);
    this.setState({ data: dateString })

  }
  timeChangefitst = (time, timeString) => {
    // console.log(time, timeString);
    this.setState({ firstTime: timeString })
  }
  timeChangelast = (time, timeString) => {
    // console.log(time, timeString);
    this.setState({ lastTime: timeString })
  }
  handleChangeplace = (value) => {
    // console.log(`地点 ${value}`);
    this.setState({ place: value })
  }
  handleBlurplace = (e) => {
    // console.log("blur");

  }
  handleFocusplace = () => {
    // console.log('focus');
  }
  beizhu = (e) => {
    // console.log(e.target.value)
    this.setState({ beizhu: e.target.value })
  }
  //修改当天还是修改以后的弹出框
  chooseStyle = () => {
    let _this = this;
    let ifrepeat;
    if (this.state.chongfu == '1') {
      ifrepeat = 0;
    } else {
      ifrepeat = 1;
    }
    const { dispatch, match: { params } } = this.props;
    let chuofrist = this.state.data.replace(/-/g, '/') + ' ' + this.state.firstTime
    let chuolast = this.state.data.replace(/-/g, '/') + ' ' + this.state.lastTime
    Modal.confirm({
      title: '选择重复日程的修改方式',
      okText: '仅修改本次日程',
      cancelText: '以后的重复日程一同修改',
      onOk() {
        _this.state.editOnly = 1;
        dispatch({
          type: 'Calendar/xiugaiyaoyue',
          payload: {
            preStartTime: _this.state.startTime,
            preEndTime: _this.state.endTime,
            id: parseInt(params.scheduleId),//邀约id
            calendarId: _this.state.leixing,//日历ID
            cName: _this.state.c_zhuti,
            eName: _this.state.e_zhuti,
            startTime: new Date(chuofrist).getTime(),
            endTime: new Date(chuolast).getTime(),
            address: _this.state.place,
            remark: _this.state.beizhu,
            repeatTypeCode: parseInt(_this.state.chongfu),
            optionalPersonnel: _this.state.value2,
            requiredPersonnel: _this.state.value1,
            semesterId: parseInt(params.yearId), //学期ID
            ifRepeat: ifrepeat,
            ifChooseDayOnly: _this.state.editOnly
          }
        }).then(function () {
          if (_this.props.xiugaiyaoyue
            && _this.props.xiugaiyaoyue.status == true) {
            _this.props.dispatch(routerRedux.push('/index' + '/' + _this.state.leixing));
          } else {
            alert(_this.props.xiugaiyaoyue
              && _this.props.xiugaiyaoyue.message)
          }
        })
      },
      onCancel() {
        _this.state.editOnly = 0;
        dispatch({
          type: 'Calendar/xiugaiyaoyue',
          payload: {
            preStartTime: _this.state.startTime,
            preEndTime: _this.state.endTime,
            id: parseInt(params.scheduleId),//邀约id
            calendarId: _this.state.leixing,//日历ID
            cName: _this.state.c_zhuti,
            eName: _this.state.e_zhuti,
            startTime: new Date(chuofrist).getTime(),
            endTime: new Date(chuolast).getTime(),
            address: _this.state.place,
            remark: _this.state.beizhu,
            repeatTypeCode: parseInt(_this.state.chongfu),
            optionalPersonnel: _this.state.value2,
            requiredPersonnel: _this.state.value1,
            semesterId: parseInt(params.yearId), //学期ID
            ifRepeat: ifrepeat,
            ifChooseDayOnly: _this.state.editOnly
          }
        }).then(function () {
          if (_this.props.xiugaiyaoyue
            && _this.props.xiugaiyaoyue.status == true) {
            _this.props.dispatch(routerRedux.push('/index' + '/' + _this.state.leixing));
          } else {
            alert(_this.props.xiugaiyaoyue
              && _this.props.xiugaiyaoyue.message)
          }
        })
      },
    });
  }
  //点击编辑邀约的右下角确定按钮
  addYaoyue = (e) => {
    let ifrepeat;
    if (this.state.chongfu == '1') {
      ifrepeat = 0;
    } else {
      ifrepeat = 1;
    }
    let chuofrist = this.state.data.replace(/-/g, '/') + ' ' + this.state.firstTime
    let chuolast = this.state.data.replace(/-/g, '/') + ' ' + this.state.lastTime
    let _this = this
    const { dispatch, match: { params } } = this.props;
    if (_this.state.leixing == null ||
      _this.state.c_zhuti == null ||
      _this.state.e_zhuti == null ||
      _this.state.value1 == null ||
      _this.state.value2 == null ||
      _this.state.firstTime == null ||
      _this.state.lastTime == null ||
      _this.state.chongfu == null ||
      _this.state.place == null ||
      _this.state.beizhu == null
    ) {
      alert('请把信息填写完整');
    } else {
      console.log(_this.state.beforeRepeat);
      if (_this.state.beforeRepeat === true) {
        this.chooseStyle();
      } else {
        dispatch({
          type: 'Calendar/xiugaiyaoyue',
          payload: {
            preStartTime: _this.state.startTime_buchongfu,
            preEndTime:_this.state.endTime_buchongfu,
            id: parseInt(params.scheduleId),//邀约id
            calendarId: _this.state.leixing,//日历ID
            cName: _this.state.c_zhuti,
            eName: _this.state.e_zhuti,
            startTime: new Date(chuofrist).getTime(),
            endTime: new Date(chuolast).getTime(),
            address: _this.state.place,
            remark: _this.state.beizhu,
            repeatTypeCode: parseInt(_this.state.chongfu),
            optionalPersonnel: _this.state.value2,
            requiredPersonnel: _this.state.value1,
            semesterId: parseInt(params.yearId), //学期ID
            ifRepeat: ifrepeat
            // ifChooseDayOnly: _this.state.editOnly
          }
        }).then(function () {
          if (_this.props.xiugaiyaoyue
            && _this.props.xiugaiyaoyue.status == true) {
            _this.props.dispatch(routerRedux.push('/index' + '/' + _this.state.leixing));
          } else {
            alert(_this.props.xiugaiyaoyue
              && _this.props.xiugaiyaoyue.message)
          }
        })
      }
    }


    // else{
    //   //拼成2017/9/9 3:80
    //    let chuofrist=this.state.data.replace(/-/g, '/')+' '+this.state.firstTime
    //    let chuolast=this.state.data.replace(/-/g, '/')+' '+this.state.lastTime
    //        let _this=this
    //     const { dispatch } = this.props;
    //         dispatch({
    //             type: 'Calendar/addyao',
    //             payload: {
    //               calendarId:this.state.leixing,
    //               cName:this.state.c_zhuti,
    //               eName:this.state.e_zhuti,
    //               optionalPersonnel:this.state.value2,
    //               requiredPersonnel:this.state.value1,
    //               startTime:new Date(chuofrist).getTime(),
    //               endTime:new Date(chuolast).getTime(),
    //               repeatTypeCode:this.state.chongfu,
    //               address:this.state.place,
    //               remark:this.state.beizhu
    //             }
    //         }).then(function(res){
    //                  console.log(_this.props.yaoyue
    //                 && _this.props.yaoyue.status)
    //                     if(_this.props.yaoyue
    //                 && _this.props.yaoyue.status==true){
    //                         alert('新建成功')
    //                     }else{
    //                          alert('新建失败')
    //                     }
    //         })
    // }         

  }
  //取消按钮
  cancel = (e) => {
    this.props.dispatch(routerRedux.push('/index' + '/' + this.state.leixing));
  }
  render() {
    let repeatType = this.state.chongfu
    let _this = this
    let tree = this.state.treeData
    let time,timelast
    // let time = new Date(_this.props.yaoyueHui
    //   && _this.props.yaoyueHui.content.preStartTime)
    // let timelast = new Date(_this.props.yaoyueHui
    //   && _this.props.yaoyueHui.content.preEndTime)
    // console.log(time)
    if(_this.props.yaoyueHui
          && _this.props.yaoyueHui.content.scheduleTemplateInfo.ifRepeat){
          time=new Date(_this.props.yaoyueHui
          && _this.props.yaoyueHui.content.preStartTime)
          timelast=new Date(_this.props.yaoyueHui
          && _this.props.yaoyueHui.content.preEndTime)
    }else{
           time=new Date(_this.props.yaoyueHui
          && _this.props.yaoyueHui.content.scheduleTemplateInfo.startTime)
          timelast=new Date(_this.props.yaoyueHui
          && _this.props.yaoyueHui.content.scheduleTemplateInfo.preEndTime)
    }
    console.log(new Date(_this.props.yaoyueHui
      && _this.props.yaoyueHui.content.scheduleTemplateInfo.startTime))

    // let time = new Date(_this.props.yaoyueHui
    //   && _this.props.yaoyueHui.content.preStartTime)
    // let timelast = new Date(_this.props.yaoyueHui
    //   && _this.props.yaoyueHui.content.preEndTime)


    // let time = new Date(_this.state.time)
    // let timelast = new Date(_this.state.timeLast)

    // console.log(time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate())
    // console.log(this.state.leixing)
    // console.log(this.state.value1)
    // console.log(this.state.value2)
    const tProps1 = {
      treeData: tree,
      value: this.state.value1,
      onChange: this.onChangeXiala1,
      onSearch: this.onChangesearch,
      treeCheckable: true,
      allowClear: true,
      searchPlaceholder: '',
      style: {
        width: 500,
      }
    };
    const tProps2 = {
      treeData: tree,
      value: this.state.value2,
      onChange: this.onChangeXiala2,
      onSearch: this.onChangesearch,
      treeCheckable: true,
      allowClear: true,
      searchPlaceholder: '',
      style: {
        width: 500,
      }
    };
    let allRili = this.props.rililist
      && this.props.rililist.content
    // console.log(allRili)
    return (
      <div className={styles.content}>
        <div style={{ textAlign: "left" }} className={styles.addyaoyue}>编辑邀约</div>
        {_this.props.yaoyueHui &&
          _this.props.yaoyueHui.content &&
          (<table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.leftKuang}>类型：</td>
                <td className={styles.rightKuang}>
                  <Select defaultValue={_this.props.yaoyueHui
                    && _this.props.yaoyueHui.content.cCalendarType} style={{ width: 300 }} onChange={this.handleChange} >
                    {
                      this.props.rililist
                      && this.props.rililist.content.map((value, index) => {
                        return <Option value={value.id} key={value.id}>{value.name}</Option>
                      })
                    }
                  </Select>
                </td>
              </tr>
              <tr>
                <td className={styles.leftKuang}>主题：</td>
                <td className={styles.rightKuang}><Input value={_this.state.c_zhuti} ref="cmingsheng" onChange={this.czhutiinput} /></td>
              </tr>
              <tr>
                <td className={styles.leftKuang}>英文主题：</td>
                <td className={styles.rightKuang}><Input value={_this.state.e_zhuti} ref="emingsheng" onChange={this.ezhutiinput} /></td>
              </tr>
              <tr>
                <td className={styles.leftKuang1}>必选人员：</td>
                <td className={styles.rightKuang}><TreeSelect {...tProps1} className={styles.tree} /> </td>
              </tr>
              <tr>
                <td className={styles.leftKuang1}>可选人员：</td>
                <td className={styles.rightKuang}><TreeSelect {...tProps2} className={styles.tree} /> </td>
              </tr>
              <tr>
                <td className={styles.leftKuang1}>时间：</td>
                <td className={styles.rightKuang}><DatePicker defaultValue={moment(time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate(), dateFormat)} onChange={this.dataChange} placeholder="日期" />
                  <span className={styles.jiange}></span>
                  <TimePicker defaultValue={moment(time.getHours() + ':' + time.getMinutes(), format)} format={format} onChange={this.timeChangefitst} />
                  <span className={styles.jiange}></span>
                  <TimePicker defaultValue={moment(timelast.getHours() + ':' + timelast.getMinutes(), format)} format={format} onChange={this.timeChangelast} />
                </td>
              </tr>
              <tr>
                <td className={styles.leftKuang1}>重复：</td>
                <td className={styles.rightKuang}>
                  <Select value={repeatType == 1 ? '不重复' : repeatType == 2 ?
                    '每天' : repeatType == 3 ? '每周' : repeatType == 4 ? '每月' : repeatType == 5 ? '每2周' : ''} style={{ width: 300 }} onChange={this.handleChangechong} >
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
                    value={_this.state.place}
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
                  <TextArea rows={4} onChange={this.beizhu} value={_this.state.beizhu} />
                </td>
              </tr>
              {/*<tr>
            <td colSpan="2" style={{textAlign:"right"}} ><Button onClick={this.cancel}>取消</Button><span className={styles.jiange}></span>
            <Button type="primary" onClick={this.addYaoyue} disabled={this.state.queding}>确定</Button></td>
           </tr>*/}
            </tbody>
          </table>)
        }
        <div className={styles.di}>
          <Button onClick={this.cancel}>取消</Button><span className={styles.jiange}></span>
          <Button type="primary" onClick={this.addYaoyue} disabled={this.state.queding}>确定</Button>
        </div>

      </div>
    );
  }
}
