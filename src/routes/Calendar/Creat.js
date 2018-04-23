import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
TreeSelect} from 'antd';
//import AssessmentHeaderLayout from '../../layouts/AssessmentHeaderLayout';
import styles from './Creat.less';
import { trans } from '../../utils/i18n';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const SHOW_ALL=TreeSelect.SHOW_ALL;

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
    personlist: state.Calendar.mohuList,//模糊查询的数据
    guanliPeople:state.Calendar.peoplelist

}))
@Form.create()
export default class Creat extends PureComponent {
     constructor(props) {
        super(props);
        this.state = {
            first:1,
            value: null,
		    disabled:true,
		    c_mingzi:null,
		    e_mingzi:null,

        };
    }

    componentDidMount() {
    	let _this=this
     const { dispatch } = this.props;
      dispatch({  //模糊查询
	            type: 'Calendar/people',
	            payload: {
	                
	            }
	    }).then(function(){
	    	console.log(_this.props.guanliPeople 
	    		&& _this.props.guanliPeople.content.getDepartmentList)
	    	let plist=_this.props.guanliPeople 
	    		&& _this.props.guanliPeople.content.getDepartmentList
	    	

				for(let i=0;i<plist.length;i++){
					let peopleJson={  label: '',
									  value: '',
									  key: '',
									  children: [{
									    label: '',
									    value: '',
									    key: '',
									  }],
									}
                      peopleJson.label=plist[i].orgName
                      peopleJson.value=plist[i].orgName
                      peopleJson.key=plist[i].parentId

	             }
	    })
	}

	onChangeXiala = (value) => {
		console.log('onChange ', value, arguments);
		this.setState({ value });
    }
    onChangesearch=(value)=>{
    	console.log(value)
    	const { dispatch } = this.props;
	        dispatch({  //模糊查询
	            type: 'Calendar/mohuChaxun',
	            payload: {
	                name:value
	            }
	    })
    }
  	add= (e) =>{
  		console.log(this.state.c_mingzi)
  		console.log(this.state.e_mingzi)
  		console.log(this.state.value)
  		if(this.state.c_mingzi==null
  		 ||this.state.e_mingzi==null 
  		 ||this.state.value==null 
  		 || this.state.value==undefined){
  			alert('请填写完整信息')
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
	          	alert(_this.props.addWork && _this.props.addWork.message)
	          }else{
	            alert(_this.props.addWork && _this.props.addWork.message)
	          }
	        });
  		}
  		
  	}
  	cancel=(e)=>{
  		alert('取消')
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
  	console.log(this.props.addWork && this.props.addWork.status)
  	console.log(this.props.personlist && this.props.personlist)
  	const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChangeXiala,
      onSearch: this.onChangesearch,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请输入人名/部门选择',
      style: {
        width: 300,
      },
    };
      const radioStyle = {
      display: 'block',
      height: '25px',
      lineHeight: '25px',
    };
    return (
      <div className={styles.content}>
      <div style={{textAlign:"center"}}>新建日历</div>
      <table className={styles.table}>
       <tbody>
         <tr>
          <td className={styles.leftKuang}>日历名称：</td><td><Input placeholder="请输入" ref="mingsheng" onChange={this.cmingchenginput}/></td>
         </tr>
         <tr>
          <td className={styles.leftKuang}>日历英文名称：</td><td><Input placeholder="请输入" onChange={this.emingchenginput}/></td>
         </tr>
          <tr>
          <td className={styles.leftKuang}>日历管理员：</td><td><TreeSelect {...tProps}/></td>
         </tr>
         <tr>
          <td className={styles.leftKuang1}>日程生效：</td>
          <td>
               <RadioGroup  value={this.state.first} >
			        <Radio style={radioStyle} value={1}>管理员确定后在生效，自动添加到个人日程中</Radio>
			        <Radio style={radioStyle} value={2}  disabled >及时生效，自动添加到个人日程中</Radio>
			        <Radio style={radioStyle} value={3}  disabled >报名后，再添加到个人日程中</Radio>
			  </RadioGroup>

          </td>
         </tr>
         <tr>
           <td colSpan="2" style={{textAlign:"right"}}>
              <Button onClick={this.cancel}>取消</Button> <Button type="primary" onClick={this.add}>确定</Button> 
           </td>
         </tr>
          </tbody>
      </table>
           
      </div>
    );
  }
}
