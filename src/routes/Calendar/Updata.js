import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,
  TreeSelect, Modal
} from 'antd';
//import AssessmentHeaderLayout from '../../layouts/AssessmentHeaderLayout';
import styles from './Creat.less';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';
import SelectUser from '../../components/SelectUser';

const confirm = Modal.confirm;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;
const SHOW_ALL = TreeSelect.SHOW_ALL;

@connect(state => ({
  addWork: state.Calendar.addCalendarapi,
  personlist: state.Calendar.mohuList,//模糊查询的数据
  guanliPeople: state.Calendar.peoplelist,
  riliHUI: state.Calendar.riliHuilist,
  delete: state.Calendar.delete,
  searchPeopleData: state.Calendar.searchPeopleData
}))
@Form.create()
export default class Creat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      first: 1,
      value: null,
      disabled: true,
      c_mingzi: null,
      e_mingzi: null,
      treeData: null,
      visible: false

    };
  }

  componentWillMount() {
    let _this = this
    const { dispatch, match: { params } } = this.props;
    dispatch({  //查询所有人员
      type: 'Calendar/people',
      payload: {

      }
    }).then(function () {
      _this.setState({
        treeData: _this.props.guanliPeople
          && _this.props.guanliPeople.content.getDepartmentList
      })
    })

    //日历回显
    dispatch({
      type: 'Calendar/riliHuixian',
      payload: {
        calendarId: params.calendarId
      }
    }).then(function () {
      _this.setState({
        c_mingzi: _this.props.riliHUI
          && _this.props.riliHUI.content.calendar.cName
      })
      _this.setState({
        e_mingzi: _this.props.riliHUI
          && _this.props.riliHUI.content.calendar.eName
      })

      let adminers = _this.props.riliHUI
        && _this.props.riliHUI.content.adminers
      let atr = []
      for (let i = 0; i < adminers.length; i++) {
        atr.push(adminers[i].remarkie + "")
      }
      _this.setState({ value: atr })
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

    return list
  }

  onChangeXiala = (value) => {
    this.setState({ value: value });
  }

  showConfirm() {
    confirm({
      title: '请把信息填写完整！',

      onOk() {

      },
      onCancel() {

      },
    });
  }

  add = (e) => {

    if (this.state.c_mingzi == null
      || this.state.e_mingzi == null
      || this.state.value == null
      || this.state.value == undefined
      || this.state.c_mingzi == undefined
      || this.state.e_mingzi == undefined) {
      this.showConfirm()
    } else {
      let _this = this
      const { dispatch, match: { params } } = this.props;
      dispatch({
        type: 'Calendar/add',
        payload: {
          id: params.calendarId,
          cName: this.state.c_mingzi,
          eName: this.state.e_mingzi,
          calendarAdminIds: this.state.value,
          effectiveType: "1"
        }
      }).then(function (res) {
        if (_this.props.addWork && _this.props.addWork.status) {
          _this.props.dispatch(routerRedux.push('/index' + '/' + params.calendarId));
        } else {
          alert(_this.props.addWork && _this.props.addWork.message)
        }
      });
    }

  }
  cancel = (e) => {
    const { dispatch, match: { params } } = this.props;
    this.props.dispatch(routerRedux.push('/index' + '/' + params.calendarId));
  }
  delete = (e) => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    let _this = this
    const { dispatch, match: { params } } = this.props;
    dispatch({
      type: 'Calendar/deleteri',
      payload: {
        Id: params.calendarId  //日历ID
      }
    }).then(function () {
      if (_this.props.delete && _this.props.delete.status == true) {
        _this.props.dispatch(routerRedux.push('/index' + '/' + params.calendarId));
      } else {
      }
    })
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }
  cmingchenginput = (e) => {
    this.setState({
      c_mingzi: e.target.value
    })
  }
  emingchenginput = (e) => {
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
          keyWord: keyWord
        }
      }).then(() => {
         this.peopleSearchFlag = false;
      });
    }, 800)
  }

  render() {
    let _this = this
    let tree = this.state.treeData
    const tProps = {
      treeData: tree,
      value: this.state.value,
      onChange: this.onChangeXiala,
      onSearch: this.onChangesearch,
      treeCheckable: true,
      allowClear: true,
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
        <div style={{ textAlign: "left" }} className={styles.addrili}>编辑日历</div>
        {_this.props.riliHUI
          && _this.props.riliHUI.content
          && _this.props.riliHUI.content.calendar
          && (<table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.leftKuang}>日历名称：</td>
                <td className={styles.rightKuang}><Input value={_this.state.c_mingzi} ref="mingsheng" onChange={this.cmingchenginput} /></td>
              </tr>
              <tr>
                <td className={styles.leftKuang}>日历英文名称：</td>
                <td className={styles.rightKuang}><Input value={_this.state.e_mingzi} onChange={this.emingchenginput} /></td>
              </tr>
              <tr>
                <td className={styles.leftKuang}>日历管理员：</td>
                <td className={styles.rightKuang}>
                  {tree && tree.length > 0 && <SelectUser
                    data={this.props.searchPeopleData}
                    value={this.props.riliHUI.content.adminers}
                    treeData={tree}
                    placeholder={trans('global.pleaseSelectTip', '选择或搜索你想要的人')}
                    onChange={this.onChangeXiala}
                    onSearch={this.peopleSearch} />}
                </td>
              </tr>
              <tr>
                <td className={styles.leftKuang1}>日程生效：</td>
                <td>
                  <RadioGroup value={this.state.first} >
                    <Radio style={radioStyle} value={1}>管理员确定后在生效，自动添加到个人日程中</Radio>
                    <Radio style={radioStyle} value={2} disabled >及时生效，自动添加到个人日程中</Radio>
                    <Radio style={radioStyle} value={3} disabled >报名后，再添加到个人日程中</Radio>
                  </RadioGroup>

                </td>
              </tr>
            </tbody>
          </table>)}
        <div className={styles.di}>
          <div onClick={this.delete} className={styles.del}><Icon type="delete" className={styles.delete} />删除</div>
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
