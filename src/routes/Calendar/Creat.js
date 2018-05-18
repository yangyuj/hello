import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
TreeSelect,Modal} from 'antd';
//import AssessmentHeaderLayout from '../../layouts/AssessmentHeaderLayout';
import styles from './Creat.less';
import { trans } from '../../utils/i18n';
import { routerRedux } from 'dva/router';
import SelectUser from '../../components/SelectUser';


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


@connect(state => ({
    addWork : state.Calendar.addCalendarapi,
    personlist: state.Calendar.mohuList,//模糊查询的数据
    guanliPeople:state.Calendar.peoplelist,
    searchPeopleData: state.Calendar.searchPeopleData
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
	 this.setState({ value: value});
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
	    title: trans('global.confirmTitle', '请把信息填写完整！'),

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

  peopleSearch = (keyWord) => {
    const { dispatch } = this.props;

    if(this.peopleSearchFlag) {
      return;
    }

    this.peopleSearchFlag = setTimeout(() => {
      dispatch({
        type: 'Calendar/searchPeople',
        payload: {
          name: keyWord
        }
      }).then(() => {
         this.peopleSearchFlag = false;
      });
    }, 800)
  }

  render() {
    let { searchPeopleData } = this.props;
  	let _this=this
  	let tree=this.state.treeData

    const radioStyle = {
      display: 'block',
      height: '25px',
      lineHeight: '28px',
    };
    return (

      <div    className={styles.content}>
        <div style={{textAlign:"left"}} className={styles.addrili}>{trans('creat.newTime','新建日历')}</div>
        <table className={styles.table}>
         <tbody>
           <tr>
            <td className={styles.leftKuang}>{trans('global.calendarName','日历名称：')} </td>
            <td className={styles.rightKuang}><Input placeholder={trans('global.pleaseEnte','请输入')} ref="mingsheng" onChange={this.cmingchenginput}/></td>
           </tr>
           <tr>
            <td className={styles.leftKuang}>{trans('global.englishCalendarName','日历英文名称：')} </td>
            <td className={styles.rightKuang}><Input placeholder={trans('global.pleaseEnte','请输入')} onChange={this.emingchenginput}/></td>
           </tr>
           <tr>
              <td className={styles.leftKuang}>{trans('global.admin','日历管理员：')} </td>
              <td className={styles.rightKuang}>
                {tree && tree.length > 0 && <SelectUser
                  data={searchPeopleData}
                  treeData={tree}
                  placeholder={trans('global.pleaseSelectTip', '选择或搜索你想要的人')}
                  onChange={this.onChangeXiala}
                  onSearch={this.peopleSearch} />}
              </td>
           </tr>
           <tr>
            <td className={styles.leftKuang}>{trans('global.schedule','日程生效：')}</td>
            <td>
              <RadioGroup  value={this.state.first} >
  			        <Radio style={radioStyle} value={1}>{trans('global.scheduleRidioOne','管理员确定后在生效，自动添加到个人日程中')}</Radio>
  			        <Radio style={radioStyle} value={2}  disabled >{trans('global.scheduleRidioTwo','及时生效，自动添加到个人日程中')}</Radio>
  			        <Radio style={radioStyle} value={3}  disabled >{trans('global.scheduleRidioThree','报名后，再添加到个人日程中')}</Radio>
      			  </RadioGroup>
            </td>
           </tr>
          </tbody>
        </table>
        <div className={styles.di}>
         <Button onClick={this.cancel}>{trans('global.cancel','取消')}</Button><span className={styles.jiange}></span>
         <Button type="primary" onClick={this.add}>{trans('global.determine','确定')}</Button>
       </div>
      </div>

    );
  }
}
