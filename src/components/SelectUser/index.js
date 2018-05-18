import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Select, Dropdown, Tree } from 'antd';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';
import styles from './index.less';
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

export default class Index extends PureComponent {

  state = {
    dropVisible: false,
    checkListId: [],
    checkListLabel: []
  }



  componentWillMount() {
    let { value } = this.props;
    let checkListId = [], checkListLabel = [];
    value && value.length > 0 && value.map((el) => {
      checkListId.push(el.userId);
      checkListLabel.push(el.name);
    })
    this.setState({
      checkListId,
      checkListLabel
    })
  }

  onSearch (keyWord) {
    this.props.onSearch.call(this, keyWord);
  }

  rendChildren () {
    let { data } = this.props;
    const children = [];
    data && data.length > 0 && data.map((el) => {
      this.state.checkListId.indexOf(el.id) < 0
        && children.push(<Option checked key={el.id}>{el.name}</Option>);
    })
    return children;
  }

  updateList = (node) => {
    let {checkListId, checkListLabel} = this.state;
    let newCheckListId = checkListId.concat(),
        newCheckListLabel = checkListLabel.concat();

    if(node && node.length > 0) {
      node.map((el) => {
        let { props } = el;
        let userId = props.value;

        if(userId && newCheckListId.indexOf(userId) < 0) {
          newCheckListId.push(userId);
          newCheckListLabel.push(props.label);
        }
      });
    }
    debugger;
    this.setState({
      checkListId: newCheckListId,
      checkListLabel: newCheckListLabel
    })

    this.props.onChange.call(this, newCheckListId);

  }

  treeCheck = (keys, e) => {
    let nodes = e.checkedNodes;
    this.updateList(nodes);
  }

  renderTreeNodes = (treeData) => {
    return treeData.map((item) => {
      let newItem = {
        title: item.label,
        ...item
      }
      if (item.children) {
        return (
          <TreeNode
            title={item.label}
            key={item.key}
            dataRef={newItem}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...newItem} />;
    });
  }

  onSelect () {

  }

  onVisibleChange (visible) {
    this.setState({
      dropVisible: visible
    })
  }

  renderDown () {
    let { treeData } = this.props;
    return (
      <div className={styles.dropTree}>
        <Tree
          checkable
          checkedKeys={this.state.checkListId}
          onCheck={this.treeCheck}
          onSelect={this.onSelect}>
          {this.renderTreeNodes(treeData)}
        </Tree>
      </div>
    );
  }

  selectCheck = (val, e) => {
    this.updateList([
      {
        props: {
          value: val,
          label: e.props.children
        }
      }
    ]);
  }

  deSelectCheck = (val) => {
    let checkListId = this.state.checkListId.concat(),
        checkListLabel = this.state.checkListLabel.concat(),
        index = checkListLabel.indexOf(val);

    if(index > -1){
      checkListId.splice(index, 1);
      checkListLabel.splice(index, 1);
      this.setState({
        checkListId,
        checkListLabel
      })
    }
  }

  render () {
    return (<div>
      <Dropdown
        visible={this.state.dropVisible}
        onVisibleChange={this.onVisibleChange.bind(this)}
        overlay={this.renderDown()}
        trigger={['click']}>
        <i className={ styles.rightIcon + ' ' + styles.iconfont + ' ' + styles['icon-zuzhijiagou']}></i>
      </Dropdown>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        value={this.state.checkListLabel}
        className={styles.selectBox}
        placeholder={this.props.placeholder}
        onSelect={this.selectCheck}
        onDeselect={this.deSelectCheck}
        onSearch={this.onSearch.bind(this)}>
        {this.rendChildren()}
      </Select>

    </div>);
  }
}
