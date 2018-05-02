import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Icon, Modal } from 'antd';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';
import { intToChinese, fixedZero } from '../../utils/utils';
import styles from './index.less';

const spaceMaps = ['', '', '', '', '', '', ''];
const weekMap = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];
const timeLine = ['全天', '上午7点', '上午8点', '上午9点', '上午10点', '上午11点', '正午', '下午1点', '下午2点', '下午3点', '下午4点', '下午5点', '下午6点'];
const timeLineNumber = [0, 700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800];


export default class Index extends PureComponent {
  state = {
    ifWeekend: true,
    visible: false,
    detailShow: 0
  }


  renderCol(number, map, curentTime) {
    let cols = [],
      curD = (curentTime ? new Date(curentTime) : new Date()).getDay(),
      colSpan = number > 5 ? '3' : '4',
      colClass = arguments[3] || '';
    curD == 0 && (curD = 7);
    for (let i = 0; i < number; i++) {
      cols.push(<Col key={i} className={styles.spanBox} span={colSpan}>
        <div className={colClass + ' ' + ((curD == i + 1) && styles.currentCol) + ' ' + (i % 2 == 0 && styles.bgCol)}>{map[i]}</div>
      </Col>);
    }
    return cols;
  }

  minuteDifference(startTime, endTime) {
    let s = startTime.split(':'),
      e = endTime.split(':');
    return (e[0] - s[0]) * 60 + parseInt(e[1] - s[1], 10);
  }

  renderColEl(el) {
    return (
      <span className={styles.colMain}>
        {el.theme}<br />
        {el.start} - {el.end}<br />
        {el.location && (<span><Icon type="environment-o" /> {el.location}</span>)}
      </span>
    );
  }

  floatClick(v) {
    this.props.calendarClick && this.props.calendarClick.call(this, v);
    this.setState({
      detailShow: !this.state.detailShow,
    })
  }

  calculationList(weekMap) {
    let weekCalenList = [],
      //weekMap = {},
      renderData = [];


    if (!weekMap) {
      return;
    }
    timeLineNumber.map(el => {
      let lineEl = [];
      for (let i = 1; i <= 7; i++) {
        if (weekMap[i] && weekMap[i].length > 0) {
          let a = [],
            allDay = [],
            w = '100%';
          weekMap[i].map(e => {
            let startNumber = parseInt(e.start.replace(':', ''), 10),
              endNumber = parseInt(e.end.replace(':', ''), 10);
            if (startNumber <= 700 && endNumber >= 1800) {
              allDay.push(e);
              return;
            }
            if (startNumber < parseInt(el, 10) + 60 && startNumber >= el) {
              a.push(e);
            }
          })

          if (el == 0) {
            if (allDay.length > 0) {
              let elment = [];
              allDay.map((v, l) => {
                elment.push(<span
                  key={l}
                  onClick={this.floatClick.bind(this, v)}
                  style={{
                    width: 1 / allDay.length * 100 + '%',
                    height: '100%'
                  }}
                  className={styles.floatEl}>
                  {this.renderColEl(v)}
                </span>)
              })
              lineEl.push(<span className={styles.rendBox}>{elment}</span>)
            } else {
              lineEl.push('');
            }
            continue;
          }

          if (a.length > 0) {
            let elment = [];
            a.map((v, l) => {
              elment.push(<span
                key={l}
                onClick={this.floatClick.bind(this, v)}
                style={{
                  top: (parseInt(v.start.replace(':', ''), 10) - el) * 10 / 6 + '%',
                  width: 1 / a.length * 100 + '%',
                  height: this.minuteDifference(v.start, v.end) * 10 / 6 + '%'
                }}
                className={styles.floatEl}>
                {this.renderColEl(v)}
              </span>)
            })
            lineEl.push(<span className={styles.rendBox}>{elment}</span>)
          } else {
            lineEl.push('');
          }
        } else {
          lineEl.push('');
        }

      }
      renderData.push(lineEl);
    })
    return renderData;
  }

  calculationWeekDate(time) {
    let date = new Date(time || ''),
      day = date.getDay(),
      newWeekMap = [];

    day == 0 && (day = 7);
    weekMap.map((el, key) => {
      let elDate = new Date(time + 24 * 3600 * 1000 * (key + 1 - day));
      newWeekMap.push(el + fixedZero(elDate.getMonth() + 1) + '-' + fixedZero(elDate.getDate()));
    });
    return newWeekMap;
  }

  calculationCurrentLineTop(time) {
    let curHours = (time ? new Date(time) : new Date()).getHours();
    return 80 + (curHours - 7) * 121 + 60;
  }
  //删除日程时候的确定
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    // this.props.dispatch({
    //   type: 'CalendarInfo/deleteInfo',
    //   payload: {

    //   }
    // })
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { dataSource } = this.props;
    let { ifWeekend } = this.state,
      colSpan = ifWeekend ? '3' : '4',
      columns = ifWeekend ? 7 : 5,
      calendarMap = this.calculationList(dataSource),
      weekTitleMap = dataSource ? this.calculationWeekDate(dataSource.timeStamp) : weekMap,
      lineTop = this.calculationCurrentLineTop(dataSource && dataSource.timeStamp),
      serverDate = dataSource && dataSource.timeStamp ? new Date(dataSource.timeStamp) : new Date();
    let d = this.state.detailShow ? 'block' : 'none';
    return (
      <div className={styles.borderBox}>
        <Row className={styles.colTitle} type="flex" justify="space-between">
          <Col className={styles.spanBox} span={'2'}>
            <div className="gutter-box"></div>
          </Col>
          {this.renderCol(columns, weekTitleMap, dataSource && dataSource.timeStamp)}
        </Row>

        <Row className={styles.rowLine} style={{ top: lineTop + 'px' }} type="flex" justify="space-between">
          <Col className={styles.spanBox} span={'2'}>
            <div className={styles.timeBox}>{fixedZero(serverDate.getHours()) + ':' + fixedZero(serverDate.getMonth())}</div>
          </Col>
          {this.renderCol(columns, spaceMaps, dataSource && dataSource.timeStamp)}
        </Row>

        {timeLine.map((el, i) => {
          return (<Row key={i} type="flex" justify="space-between" className={styles.tableBody + ' ' + (i == 0 && styles.allDayRow)}>
            <Col className={styles.spanBox} span={'2'}>
              <div className={styles.timeBox}>
                <span className={styles.positionBox}>{el}</span>
              </div>
            </Col>
            {this.renderCol(columns, calendarMap ? calendarMap[i] : spaceMaps, dataSource && dataSource.timeStamp, styles.timeLineBox)}
          </Row>)
        })}
        <div className={styles.checkDetail} style={{ display: d }}>
          <div className={styles.detailHeader}></div>
          <p className={styles.detailTime}><Icon className={styles.detailIcon} type="clock-circle-o" /></p>
          <p className={styles.detailPlace}><Icon className={styles.detailIcon} type="environment" /></p>
          <p className={styles.detailNum}><Icon className={styles.detailIcon} type="contacts" />位邀约对象</p>
          <p className={styles.detailMustChoose}>必选：</p>
          <p className={styles.detailCanChoose}>可选：</p>
          <p className={styles.detailRemark}><Icon className={styles.detailIcon} type="profile" /></p>
          <p className={styles.detailFooter}>
            <span onClick={this.showModal} className={styles.deleteSpan}><Icon type="delete" />删除</span>
            <Modal visible={this.state.visible} onOk={this.handleOk} onCancel={this.handleCancel} >
              <p className={styles.deleteSure}>您确定要删除这次日程么？</p>
            </Modal>
            <Button className={styles.detailBtnEdit} size="small" type="primary">编辑</Button>
            <Button className={styles.detailBtnCancel} size="small">取消</Button>
          </p>
        </div>
      </div>
    );
  }
}
