import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
TreeSelect,TimePicker,Modal} from 'antd';
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
const SHOW_ALL=TreeSelect.SHOW_ALL;
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
  },{
    label: '王哦',
    value: '王哦',
    key: '0-0-1',
  }],
}];
@connect(state => ({
    addWork : state.Calendar.addCalendarapi,
    personlist: state.Calendar.mohuList,
    yaoyue:state.Calendar.yaoyue,
    rililist:state.Calendar.allrili,
    placelist:state.Calendar.allplace,
    peoplelist:state.Calendar.peoplelist,
    yaoyueHui:state.Calendar.yaoyueHuilist
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
           beizhu:null,
           treeData:null,
           bjcode:null,
           queding:null,
           chongfuziduan:null
        };
    }
     componentDidMount(){
      let _this=this
         const { dispatch ,match: {params}} = this.props;
              dispatch({
                  type: 'Calendar/charili', //查询all日历
                  payload: {
                    
                  }
              }).then(function(){
                console.log(_this.props.rililist
                      && _this.props.rililist.content)

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
              }).then(function(){
                console.log(_this.props.peoplelist 
                  && _this.props.peoplelist.content.getDepartmentList)
              _this.setState({treeData: _this.props.peoplelist 
                  && _this.props.peoplelist.content.getDepartmentList}) 
              })
           
           //邀约回显
           dispatch({  //查询所有人员
                      type: 'Calendar/yaoyueHuixian',
                      payload: {
                           scheduleId:params.scheduleId,   //邀约ID
                           pageType:"12"
                      }
              }).then(function(){
                console.log(_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo)
                 _this.setState({leixing:_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo.calendarId})
                 _this.setState({c_zhuti:_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo.cName})
                  _this.setState({e_zhuti:_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo.eName})

                  let allrenyuan=_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.persons
                  let bixuan=[]
                  let kexuan=[]
                  for(let i=0;i<allrenyuan.length;i++){
                    if(allrenyuan[i].relationType==1){
                      bixuan.push(allrenyuan[i].userId+'')
                    }else{
                       kexuan.push(allrenyuan[i].userId+'')
                    }
                  }
                  _this.setState({value1:bixuan})
                  _this.setState({value2:kexuan})

                  let timechuo_first=new Date(_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo.startTime)
                  let timechuo_end=new Date(_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo.endTime)

                  console.log(timechuo_first.getFullYear()+'-'+(timechuo_first.getMonth()+1)+'-'+timechuo_first.getDate())
                  console.log(timechuo_first.getHours()+':'+timechuo_first.getMinutes())
                  console.log(timechuo_end.getHours()+':'+timechuo_end.getMinutes())
                  _this.setState({data:timechuo_first.getFullYear()+'-'+(timechuo_first.getMonth()+1)+'-'+timechuo_first.getDate()})
                  _this.setState({firstTime:timechuo_first.getHours()+':'+timechuo_first.getMinutes()})
                  _this.setState({lastTime:timechuo_end.getHours()+':'+timechuo_end.getMinutes()})

                 _this.setState({chongfu:_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo.repeatType}) 

                 let type=_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo.repeatType
                  if(type=="1"){
                     _this.setState({chongfuziduan:'不重复'})
                  }
                  if(type==2){

                  }
                  if(type==3){

                  }
                  if(type==4){

                  }
                  if(type==5){

                  }

                  _this.setState({place:_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo.address})
                  _this.setState({beizhu:_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo.remark})

                  //bj_code判断
                  let mark=_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.bj_code
                  console.log(mark)
                  if(mark=="0002"){
                    _this.setState({bjcode:true})
                    _this.setState({queding:true})

                  }
                  if(mark=="0001"){
                    _this.setState({bjcode:true})
                  }
                  if(mark=="0003"){
                    _this.setState({bjcode:false})
                  }
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

  handleBlurplace=(e)=> {
      console.log("blur");
      
    }

  handleFocusplace=()=> {
      console.log('focus');
    }
    beizhu=(e)=>{
   console.log(e.target.value)
     this.setState({beizhu:e.target.value})
    }
     showConfirm() {
    confirm({
      title: '请把信息填写完整！',

      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
    addYaoyue=(e)=>{
 
      console.log(this.state.leixing)
      console.log(this.state.c_zhuti)
      console.log(this.state.e_zhuti)
      console.log(this.state.value1)
      console.log(this.state.value2)

      console.log(this.state.data)
      console.log(this.state.firstTime)
      console.log(this.state.lastTime)
       // console.log(new Date(chuofrist).getTime())
       //  console.log(new Date(chuolast).getTime())
      console.log(this.state.chongfu)
      console.log(this.state.place)
      console.log(this.state.beizhu)
     

        let chuofrist=this.state.data.replace(/-/g, '/')+' '+this.state.firstTime
        let chuolast=this.state.data.replace(/-/g, '/')+' '+this.state.lastTime
        let _this=this
        const { dispatch ,match: {params}} = this.props;
                 dispatch({
                  type: 'Calendar/xiugaiyaoyue',
                  payload: {
                     id: params.scheduleId,//邀约id
                     calendarId:params.calendarId,//日历ID
                     cName:this.state.c_zhuti,
                     eName:this.state.e_zhuti,
                     startTime:new Date(chuofrist).getTime(),
                     endTime:new Date(chuolast).getTime(),
                     address:this.state.place,
                     remark:this.state.beizhu,
                     repeatTypeCode:this.state.chongfu,
                     optionalPersonnel:this.state.value2,
                     requiredPersonnel:this.state.value1,
                     endTimeSetting:params.endTime //该学期的结束时间（时间戳）
                  }
              }).then(function(){

              })
      //          // console.log(new Date(chuo).getTime())
      // if(this.state.leixing==null ||
      //    this.state.c_zhuti==null ||
      //    this.state.e_zhuti==null ||
      //    this.state.value1==null ||
      //    this.state.value2==null ||
      //    this.state.firstTime==null ||
      //    this.state.lastTime==null ||
      //    this.state.chongfu==null ||
      //    this.state.place==null ||
      //    this.state.beizhu==null 
      //    ){
      //      alert('请把信息填写完整')
      // }else{
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
    cancel=(e)=>{
       this.props.dispatch(routerRedux.push('/index'));
    }
  render() {
    let repeatType=this.props.yaoyueHui 
                  && this.props.yaoyueHui.content.scheduleTemplateInfo.repeatType
    let _this=this
    let tree=this.state.treeData
    let time=new Date(_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo.startTime)
    let timelast=new Date(_this.props.yaoyueHui 
                  && _this.props.yaoyueHui.content.scheduleTemplateInfo.endTime)
    console.log(time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate())
    console.log(this.state.leixing)
    console.log(this.state.value1)
    console.log(this.state.value2)
    const tProps1 = {
      treeData:tree,
      value: this.state.value1,
      onChange: this.onChangeXiala1,
      onSearch: this.onChangesearch,
      treeCheckable: true,    
      searchPlaceholder: '请输入人名/部门选择',
      style: {
        width: 300,
      },
      disabled:this.state.bjcode
    };
    const tProps2 = {
      treeData:tree,
      value: this.state.value2,
      onChange: this.onChangeXiala2,
      onSearch: this.onChangesearch,
      treeCheckable: true,
      searchPlaceholder: '请输入人名/部门选择',
      style: {
        width: 300,
      },
      disabled:this.state.bjcode
    };


    let allRili=this.props.rililist
                 && this.props.rililist.content
                 console.log(allRili)
    return (
      <div className={styles.content}>
         <div style={{textAlign:"center"}} className={styles.addyaoyue}>编辑邀约</div>
       {_this.props.yaoyueHui &&
        _this.props.yaoyueHui.content &&
        (<table className={styles.table}>
         <tbody>
           <tr>
            <td className={styles.leftKuang}>类型：</td>
            <td>
              <Select defaultValue={_this.props.yaoyueHui 
                    && _this.props.yaoyueHui.content.cCalendarType} style={{ width: 300 }} onChange={this.handleChange} disabled={this.state.bjcode}>
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
            <td><Input defaultValue={_this.props.yaoyueHui 
                    && _this.props.yaoyueHui.content.scheduleTemplateInfo.cName} ref="cmingsheng" onChange={this.czhutiinput} disabled={this.state.bjcode}/></td>
           </tr>
            <tr>
            <td className={styles.leftKuang}>英文主题：</td>
            <td><Input defaultValue={_this.props.yaoyueHui 
                    && _this.props.yaoyueHui.content.scheduleTemplateInfo.eName} ref="emingsheng" onChange={this.ezhutiinput} disabled={this.state.bjcode}/></td>
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
            <td><DatePicker defaultValue={moment(time.getFullYear()+'/'+(time.getMonth()+1)+'/'+time.getDate(), dateFormat)} onChange={this.dataChange}  placeholder="日期" disabled={this.state.bjcode}/>
            <span className={styles.jiange}></span>
            <TimePicker defaultValue={moment(time.getHours()+':'+time.getMinutes(), format)} format={format} onChange={this.timeChangefitst} disabled={this.state.bjcode}/>
            <span className={styles.jiange}></span>
            <TimePicker defaultValue={moment(timelast.getHours()+':'+timelast.getMinutes(), format)} format={format} onChange={this.timeChangelast} disabled={this.state.bjcode}/>
            </td>
           </tr>
            <tr>
            <td className={styles.leftKuang1}>重复：</td>
            <td>
             <Select defaultValue={repeatType==1?'不重复':repeatType==2?
             '每天':repeatType==3?'每周':repeatType==4?'每月':repeatType==5?'每2周':''} style={{ width: 300 }} onChange={this.handleChangechong} disabled={this.state.bjcode}>
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
                  mode="combobox"
                  size="default"
                  defaultValue={_this.props.yaoyueHui 
                    && _this.props.yaoyueHui.content.scheduleTemplateInfo.address}
                  placeholder=""
                  onChange={this.handleChangeplace}
                  style={{ width: 200 }}
                  disabled={this.state.bjcode}
                >
                {
                  this.props.placelist
                   && this.props.placelist.content.listInfobyAddress.map((value,index)=>{
                    return <Option  value={value.cName} key={value.id}>{value.cName}</Option>
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
            <td>
              <TextArea rows={4} onChange={this.beizhu} defaultValue={_this.props.yaoyueHui 
                    && _this.props.yaoyueHui.content.scheduleTemplateInfo.remark} disabled={this.state.bjcode}/>
            </td>
           </tr>
           <tr>
            <td colSpan="2" style={{textAlign:"right"}} ><Button onClick={this.cancel}>取消</Button><span className={styles.jiange}></span>
            <Button type="primary" onClick={this.addYaoyue} disabled={this.state.queding}>确定</Button></td>
           </tr>
            </tbody>
        </table>)
        }
        
       
      </div>
    );
  }
}
