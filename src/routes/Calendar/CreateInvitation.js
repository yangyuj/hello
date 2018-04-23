import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
TreeSelect,TimePicker} from 'antd';
//import AssessmentHeaderLayout from '../../layouts/AssessmentHeaderLayout';
import styles from './CreatInvition.less';
import { trans } from '../../utils/i18n';
import moment from 'moment';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const SHOW_ALL=TreeSelect.SHOW_ALL;
const format = 'HH:mm';
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const treeData = [{
  label: '技术部',
  value: '技术部',
  key: '0-0',
  children: [{
    label: '张三',
    value: '张三',
    key: '0-0-0',
  },{
    label: '王哦',
    value: '王哦',
    key: '0-0-1',
  }],
}, {
  label: '市场部',
  value: '市场部',
  key: '0-1',
  children: [{
    label: '王为',
    value: '王为',
    key: '0-1-0',
  }, {
    label: '王子',
    value: '王子',
    key: '0-1-1',
  }, {
    label: '品牌',
    value: '品牌',
    key: '0-1-2',
  }],
}];
@connect(state => ({
    addWork : state.Calendar.addCalendarapi,
    personlist: state.Calendar.mohuList,
    yaoyue:state.Calendar.yaoyue,
    rililist:state.Calendar.allrili
}))
@Form.create()
export default class Creat extends PureComponent {
     constructor(props) {
        super(props);
        this.state = {
           c_zhuti:null,
           e_zhuti:null,
           leixing:null,
           value1:null,
           value2:null,
           data:null,
           firstTime:null,
           lastTime:null,
           chongfu:null,
           place:null,
           beizhu:null
        };
    }
     componentDidMount(){
      let _this=this
         const { dispatch } = this.props;
              dispatch({
                  type: 'Calendar/charili',
                  payload: {
                    
                  }
              }).then(function(){
                console.log(_this.props.rililist
                      && _this.props.rililist.content)

              })
     }
	  handleChange=(value)=> {
    console.log(`类型 ${value}`);
    this.setState({leixing:value})
   }
   handleChangechong=(value)=> {
    console.log(`重复 ${value}`);
    this.setState({chongfu:value})
   }
   czhutiinput=(e)=>{
     this.setState({
        c_zhuti: e.target.value
      })
   }
   ezhutiinput=(e)=>{
     this.setState({
        e_zhuti: e.target.value
      })
   }
   onChangeXiala1 = (value) => {
    console.log('onChange ', value, arguments);
    this.setState({ value1:value });
    }
    onChangeXiala2 = (value) => {
    console.log('onChange ', value, arguments);
    this.setState({ value2:value });
    }
    dataChange=(date, dateString)=> {
    console.log(date, dateString);
    this.setState({data:dateString})

  }
  timeChangefitst=(time, timeString)=>{
     console.log(time, timeString);
     this.setState({firstTime:timeString})
  }
  timeChangelast=(time, timeString)=>{
     console.log(time, timeString);
       this.setState({lastTime:timeString})
  }


  handleChangeplace=(value)=> {
    console.log(`地点 ${value}`);
    this.setState({place:value})
    }

  handleBlurplace=()=> {
      console.log('blur');
    }

  handleFocusplace=()=> {
      console.log('focus');
    }
    beizhu=(e)=>{
   console.log(e.target.value)
     this.setState({beizhu:e.target.value})
    }
    addYaoyue=(e)=>{
 
      console.log(this.state.leixing)
      console.log(this.state.c_zhuti)
      console.log(this.state.e_zhuti)
      console.log(this.state.value1)
      console.log(this.state.value2)
       // console.log(new Date(chuofrist).getTime())
       //  console.log(new Date(chuolast).getTime())
      console.log(this.state.chongfu)
      console.log(this.state.place)
      console.log(this.state.beizhu)
     
               // console.log(new Date(chuo).getTime())
      if(this.state.leixing==null ||
         this.state.c_zhuti==null ||
         this.state.e_zhuti==null ||
         this.state.value1==null ||
         this.state.value2==null ||
         this.state.firstTime==null ||
         this.state.lastTime==null ||
         this.state.chongfu==null ||
         this.state.place==null ||
         this.state.beizhu==null 
         ){
           alert('请把信息填写完整')
      }else{
        //拼成2017/9/9 3:80
         let chuofrist=this.state.data.replace(/-/g, '/')+' '+this.state.firstTime
         let chuolast=this.state.data.replace(/-/g, '/')+' '+this.state.lastTime
             let _this=this
          const { dispatch } = this.props;
              dispatch({
                  type: 'Calendar/addyao',
                  payload: {
                    calendarId:this.state.leixing,
                    cName:this.state.c_zhuti,
                    eName:this.state.e_zhuti,
                    optionalPersonnel:this.state.value2,
                    requiredPersonnel:this.state.value1,
                    startTime:new Date(chuofrist).getTime(),
                    endTime:new Date(chuolast).getTime(),
                    repeatTypeCode:this.state.chongfu,
                    address:this.state.place,
                    remark:this.state.beizhu
                  }
              }).then(function(res){
                       console.log(_this.props.yaoyue
                      && _this.props.yaoyue.status)
                          if(_this.props.yaoyue
                      && _this.props.yaoyue.status==true){
                              alert('新建成功')
                          }else{
                               alert('新建失败')
                          }
              })
      }         
              
    }
  render() {
   const tProps1 = {
      treeData,
      value1: this.state.value,
      onChange: this.onChangeXiala1,
      onSearch: this.onChangesearch,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请输入人名/部门选择',
      style: {
        width: 300,
      },
    };
    const tProps2 = {
      treeData,
      value2: this.state.value,
      onChange: this.onChangeXiala2,
      onSearch: this.onChangesearch,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请输入人名/部门选择',
      style: {
        width: 300,
      },
    };


     let allRili=this.props.rililist
                 && this.props.rililist.content
                 console.log(allRili)
    return (
      <div className={styles.content}>
         <div style={{textAlign:"center"}}>新建邀约</div>
          <table className={styles.table}>
       <tbody>
         <tr>
          <td className={styles.leftKuang}>类型：</td>
          <td> <Select placeholder="行事历会议邀约" style={{ width: 300 }} onChange={this.handleChange}>
               {
            this.props.rililist
                 && this.props.rililist.content.map((value,index)=>{
                  return <Option  value={value.id} key={value.id}>{value.name}</Option>
            })
          }
            </Select>
          </td>
         </tr>
         <tr>
          <td className={styles.leftKuang}>主题：</td>
          <td><Input placeholder="请输入" ref="cmingsheng" onChange={this.czhutiinput}/></td>
         </tr>
          <tr>
          <td className={styles.leftKuang}>英文主题：</td>
          <td><Input placeholder="请输入" ref="emingsheng" onChange={this.ezhutiinput}/></td>
         </tr>
         <tr>
          <td className={styles.leftKuang1}>必选人员：</td>
          <td><TreeSelect {...tProps1}/> </td>
         </tr>
         <tr>
          <td className={styles.leftKuang1}>可选人员：</td>
          <td><TreeSelect {...tProps2}/> </td>
         </tr>
         <tr>
          <td className={styles.leftKuang1}>时间：</td>
          <td><DatePicker onChange={this.dataChange}  placeholder="日期"/>
          <TimePicker defaultValue={moment('01:00', format)} format={format} onChange={this.timeChangefitst}/>
          <TimePicker defaultValue={moment('01:00', format)} format={format} onChange={this.timeChangelast}/>
          </td>
         </tr>
          <tr>
          <td className={styles.leftKuang1}>重复：</td>
          <td>
           <Select placeholder="不重复" style={{ width: 300 }} onChange={this.handleChangechong}>
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
          <td>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请输入关键字搜索选择"
                optionFilterProp="children"
                onChange={this.handleChangeplace}
                onFocus={this.handleFocusplace}
                onBlur={this.handleBlurplace}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="3-1">3-1</Option>
                <Option value="3-2">3-2</Option>
                <Option value="3-3">3-3</Option>
              </Select>
          </td>
         </tr>
         <tr>
          <td className={styles.leftKuang1}>备注：</td>
          <td>
            <TextArea rows={4} onChange={this.beizhu}/>
          </td>
         </tr>
         <tr>
          <td colSpan="2" style={{textAlign:"right"}} ><Button onClick={this.cancel}>取消</Button>
          <Button type="primary" onClick={this.addYaoyue}>确定</Button></td>
         </tr>
          </tbody>
      </table>
       
      </div>
    );
  }
}
