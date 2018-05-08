import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
TreeSelect,Modal} from 'antd';
//import AssessmentHeaderLayout from '../../layouts/AssessmentHeaderLayout';
import styles from './Creat.less';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';
const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const SHOW_ALL=TreeSelect.SHOW_ALL;

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
    guanliPeople:state.Calendar.peoplelist,
    riliHUI:state.Calendar.riliHuilist,
    delete:state.Calendar.delete

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
            treeData:null,
            visible: false
           
        };
    }

    componentWillMount() {
    	let _this=this
     const { dispatch,match: {params} } = this.props;
      dispatch({  //查询所有人员
	            type: 'Calendar/people',
	            payload: {
	                
	            }
	    }).then(function(){
	    	console.log(_this.props.guanliPeople 
	    		&& _this.props.guanliPeople.content.getDepartmentList)
			_this.setState({treeData: _this.props.guanliPeople 
	    		&& _this.props.guanliPeople.content.getDepartmentList}) 
	    })

      //日历回显
      dispatch({  
              type: 'Calendar/riliHuixian',
              payload: {
                  calendarId:params.calendarId
              }
      }).then(function(){
        console.log( _this.props.riliHUI 
          && _this.props.riliHUI.content.calendar.cName)

         _this.setState({c_mingzi: _this.props.riliHUI 
          && _this.props.riliHUI.content.calendar.cName})
          _this.setState({e_mingzi: _this.props.riliHUI 
          && _this.props.riliHUI.content.calendar.eName}) 
        // console.log(_this.props.riliHUI 
        //   && _this.props.riliHUI.content.adminers) 
          let  adminers=_this.props.riliHUI 
          && _this.props.riliHUI.content.adminers
          let atr=[]
          for(let i=0;i<adminers.length;i++){
              atr.push(adminers[i].remarkie+"")
          }
          console.log(atr)
           _this.setState({value:atr})
      })
	  }
    chong(value){
      let m=[] //
      let list=[]
      for(let i=0;i<value.length;i++){
            if(m.indexOf(value[i].split('-')[1])==-1){
              m.push(value[i].split('-')[1])
                list.push(value[i])
            }
      }
        // console.log(m)
        // console.log(list) 
    return list 
    }
	  onChangeXiala = (value) => {
  		console.log('onChange ', value, arguments);
  		this.setState({ value: this.chong(value)});
    }
    onChangesearch=(value)=>{
    	console.log(value)
    	// const { dispatch } = this.props;
	    //     dispatch({  //模糊查询
	    //         type: 'Calendar/mohuChaxun',
	    //         payload: {
	    //             name:value
	    //         }
	    // })
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
  	add= (e) =>{
  		console.log(this.state.c_mingzi)
  		console.log(this.state.e_mingzi)
  		console.log(this.state.value)
  		if(this.state.c_mingzi==null
  		 ||this.state.e_mingzi==null 
  		 ||this.state.value==null 
  		 || this.state.value==undefined
       ||this.state.c_mingzi==undefined
       ||this.state.e_mingzi==undefined ){
  		 this.showConfirm()
  		}else{
	  			let _this=this
	  		const { dispatch ,match: {params}} = this.props;
	        dispatch({
	            type: 'Calendar/add',
	            payload: {
                 id:params.calendarId,
	               cName:this.state.c_mingzi,
	               eName:this.state.e_mingzi,
	               calendarAdminIds:this.state.value,
	               effectiveType:"1"
	            }
	        }).then(function(res){
	          if(_this.props.addWork && _this.props.addWork.status){
	          	console.log(_this.props.addWork && _this.props.addWork.message)
               _this.props.dispatch(routerRedux.push('/index'));
	          }else{
	            alert(_this.props.addWork && _this.props.addWork.message)
	          }
	        });
  		}
  		
  	}
  	cancel=(e)=>{
  		 this.props.dispatch(routerRedux.push('/index'));
  	}
    delete=(e)=>{
     this.setState({
      visible: true,
     });
    }
    handleOk = (e) => {
     // console.log(e);
       let _this=this
          const { dispatch ,match: {params}} = this.props;
          dispatch({
              type: 'Calendar/deleteri',
              payload: {
                 Id:params.calendarId  //日历ID   
              }
          }).then(function(){
            console.log(_this.props.delete && _this.props.delete.status)
            if(_this.props.delete && _this.props.delete.status==true){
              console.log('delete')
              _this.props.dispatch(routerRedux.push('/index'));
            }else{
              console.log('quxiao')
            }
          })
        this.setState({
          visible: false,
        });
    }
    handleCancel = (e) => {
     // console.log(e);
      this.setState({
        visible: false,
      });
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
  	console.log(this.props.addWork && this.props.addWork.status)
  	console.log(this.props.personlist && this.props.personlist)
    console.log(_this.props.riliHUI 
          && _this.props.riliHUI.content
          && _this.props.riliHUI.content.calendar)
    console.log(this.state.e_mingzi)
  	const tProps = {
      treeData:tree,
      value: this.state.value,
      onChange: this.onChangeXiala,
      onSearch: this.onChangesearch,
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
      <div className={styles.content}>
      <div style={{textAlign:"left"}} className={styles.addrili}>编辑日历</div>
      {_this.props.riliHUI 
          && _this.props.riliHUI.content
          && _this.props.riliHUI.content.calendar
          && (<table className={styles.table}>
        <tbody>
         <tr>
          <td className={styles.leftKuang}>日历名称：</td>
          <td className={styles.rightKuang}><Input value={_this.state.c_mingzi} ref="mingsheng" onChange={this.cmingchenginput}/></td>
         </tr>
         <tr>
          <td className={styles.leftKuang}>日历英文名称：</td>
          <td className={styles.rightKuang}><Input value={_this.state.e_mingzi} onChange={this.emingchenginput}/></td>
         </tr>
          <tr>
          <td className={styles.leftKuang}>日历管理员：</td><td className={styles.rightKuang}><TreeSelect {...tProps} className={styles.tree}/></td>
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
        {/*<tr>
           <td className={styles.del}><div  onClick={this.delete}><Icon type="delete" className={styles.delete}/>删除</div></td>
           <td  style={{textAlign:"right"}}>  
              <Button onClick={this.cancel}>取消</Button><span className={styles.jiange}></span>
              <Button type="primary" onClick={this.add}>确定</Button> 
           </td>
         </tr>*/} 
          </tbody>
      </table>)}
         <div className={styles.di}>
           <div  onClick={this.delete} className={styles.del}><Icon type="delete" className={styles.delete}/>删除</div>
           <Button onClick={this.cancel}>取消</Button><span className={styles.jiange}></span>
           <Button type="primary" onClick={this.add}>确定</Button>
         </div>  
      <Modal
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <p>是否删除日历</p>
      </Modal>   
      </div>
    );
  }
}
