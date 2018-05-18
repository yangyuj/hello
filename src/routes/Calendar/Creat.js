import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
TreeSelect,Modal} from 'antd';
//import AssessmentHeaderLayout from '../../layouts/AssessmentHeaderLayout';
import styles from './Creat.less';
import { trans } from '../../utils/i18n';
import { routerRedux } from 'dva/router';
// let m=[] //[1,3,2]
//     	let list=[]
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const SHOW_ALL=TreeSelect.SHOW_ALL;
const titleName = [
  trans('creat.name', '日历名称:'),
  trans('creat.enName','日历英文名称'),
  trans('creat.admin','日历管理员:'),
  trans('creat.schedule','日程生效:'),



];

let treeData = [{
  "label": '技术部',
  "value": '技术部',
  "key": '0-0',
  "children": [{
    "label": '张三',
    "value": '张三',
    "key": '0-0-0',
  },{
    "label": '王哦',
    "value": '王哦',
    "key": '0-0-1',
  }],
}];

@connect(state => ({
    addWork : state.Calendar.addCalendarapi,
    personlist: state.Calendar.mohuList,//模糊查询的数据
    guanliPeople:state.Calendar.peoplelist

}))
@Form.create()
export default class Creat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      first:1,
      value: undefined,
      disabled:true,
      c_mingzi:null,
      e_mingzi:null,
      treeData:null
    };
  }

  componentDidMount() {
    let _this=this
    const { dispatch } = this.props;
    dispatch({  //查询所有人员
      type: 'Calendar/people',
      payload: {

      }
    }).then(function(){
        _this.setState({treeData: _this.props.guanliPeople
    		&& _this.props.guanliPeople.content.getDepartmentList})
        console.info(treeData)

    })
  }

  chong(value) {
  	let m=[];
  	let list=[];
  	for(let i=0;i<value.length;i++){
      if(m.indexOf(value[i].split('-')[1])==-1){
      	m.push(value[i].split('-')[1])
        list.push(value[i])
      }
  	}
    return list;

  }

  onChangeXiala = (value) => {
	 this.setState({ value: this.chong(value)});
 }

  onChangesearch=(value)=>{
  	    let _this=this
  		// const { dispatch } = this.props;
      //     dispatch({  //模糊查询
      //         type: 'Calendar/mohuChaxun',
      //         payload: {
      //              name:value
      //         }
      // }).then(function(){
      //   console.log(_this.props.personlist
      //   	&& _this.props.personlist.content.teacherNameList)
      // 	//赋给treeData
      //   // _this.setState({treeData:_this.props.personlist
      //   // 	&& _this.props.personlist.content.teacherNameList})
      // })
  }

  huoquJiao=(value)=>{

  }

  showConfirm() {
	  confirm({
	    title: trans('creat.confirmTitle', '请把信息填写完整！'),

	    onOk() {
	      console.log('OK');
	    },
	    onCancel() {
	      console.log('Cancel');
	    },
	  });
	}

	add= (e) =>{
		if(this.state.c_mingzi==null
		 ||this.state.e_mingzi==null
		 ||this.state.value==null
		 || this.state.value==undefined){
			this.showConfirm()
		}else{
  		let _this=this
  		const { dispatch } = this.props;
      dispatch({
          type: 'Calendar/add',
          payload: {
             cName:this.state.c_mingzi,
             eName:this.state.e_mingzi,
             calendarAdminIds:this.state.value,
             effectiveType:"1"
          }
      }).then(function(res){
        if(_this.props.addWork && _this.props.addWork.status){
        	//alert(_this.props.addWork && _this.props.addWork.message)
        	 _this.props.dispatch(routerRedux.push('/index' + '/' + (_this.props.addWork && _this.props.addWork.content && _this.props.addWork.content.currentId)));
        }else{
          alert(_this.props.addWork && _this.props.addWork.message)
        }
      });
		}
	}

	cancel=(e)=>{
		 this.props.dispatch(routerRedux.push('/index'));
	}

	cmingchenginput=(e)=>{
		//console.log(e.target.value)
		 this.setState({
      c_mingzi: e.target.value
    })
	}

	emingchenginput=(e)=>{
		//console.log(e.target.value)
		 this.setState({
      e_mingzi: e.target.value
    })
	}

  render() {
  	let _this=this
  	let tree=this.state.treeData
  	const tProps = {
      treeData:tree,
      value: this.state.value,
      onChange: this.onChangeXiala,
      treeCheckable: true,
      allowClear:true,
      searchPlaceholder: '',
      style: {
        width: 500,
      },
    };
    const radioStyle = {
      display: 'block',
      height: '25px',
      lineHeight: '25px',
    };
    return (

      <div    className={styles.content}>
        <div style={{textAlign:"left"}} className={styles.addrili}>{trans('creat.newTime','新建日历')}</div>
        <table className={styles.table}>
         <tbody>
           <tr>
            <td className={styles.leftKuang}>{trans('creat.name','日历名称：')}</td>
            <td className={styles.rightKuang}><Input placeholder={trans('creat.pleaseEnte','请输入')} ref="mingsheng" onChange={this.cmingchenginput}/></td>
           </tr>
           <tr>
            <td className={styles.leftKuang}>{trans('creat.enName','日历英文名称：')}</td>
            <td className={styles.rightKuang}><Input placeholder={trans('creat.pleaseEnte','请输入')} onChange={this.emingchenginput}/></td>
           </tr>
           <tr>
              <td className={styles.leftKuang}>{trans('creat.admin','日历管理员：')}</td>
              <td className={styles.rightKuang}>
              	<TreeSelect {...tProps} className={styles.tree}/>
              </td>
           </tr>
           <tr>
            <td className={styles.leftKuang1}>{trans('creat.schedule','日程生效：')}</td>
            <td>
              <RadioGroup  value={this.state.first} >
  			        <Radio style={radioStyle} value={1}>{trans('creat.scheduleRidioOne','管理员确定后在生效，自动添加到个人日程中')}</Radio>
  			        <Radio style={radioStyle} value={2}  disabled >{trans('creat.scheduleRidioTwo','及时生效，自动添加到个人日程中')}</Radio>
  			        <Radio style={radioStyle} value={3}  disabled >{trans('creat.scheduleRidioThree','报名后，再添加到个人日程中')}</Radio>
      			  </RadioGroup>
            </td>
           </tr>
          </tbody>
        </table>
        <div className={styles.di}>
         <Button onClick={this.cancel}>{trans('creat.cancel','取消')}</Button><span className={styles.jiange}></span>
         <Button type="primary" onClick={this.add}>{trans('creat.confirmOk','确定')}</Button>
       </div>
      </div>

    );
  }
}
