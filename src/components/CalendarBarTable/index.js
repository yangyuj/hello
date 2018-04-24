import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import { trans } from '../../utils/i18n';
import { intToChinese } from '../../utils/utils';
import styles from './index.less';

const spaceMaps = ['', '', (<span className={styles.floatEl}>text</span>), '', '', '', ''];
const weekMap = ['周一', '周二', '周三', '周四', '周五', '周六', '周天'];
const timeLine = ['上午7点', '上午8点', '上午9点', '上午10点', '上午11点', '正午', '下午1点', '下午2点', '下午3点', '下午4点', '下午5点', '下午6点'];
const timeLineNumber = [700, 800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800];


export default class Index extends PureComponent {
  state = {
    ifWeekend: false
  }
  componentDidMount() {

  }

  renderCol (number, map) {
    let cols = [],
        colSpan = number>5? '3': '4',
        colClass = arguments[2] || '';

    for(let i = 0; i < number; i++) {
      cols.push(<Col key={i} className={styles.spanBox} span={colSpan}>
        <div className={colClass}>{map[i]}</div>
      </Col>);
    }
    return cols;
  }

  minuteDifference(startTime, endTime) {
    let s = startTime.split(':'),
        e = endTime.split(':');
    return (e[0] - s[0])*60 + parseInt(e[1] - s[1], 10);
  }

  calculationList(data) {
    let weekCalenList = [],
        weekMap = {},
        renderData = [];

    if(!data || data.length < 1) {
      return;
    }

    data.map(el => {
      weekMap[el.key] = [];
      el.list.length > 0 && el.list.map(e => {
        let start = parseInt(e.start.replace(':', ''), 10),
            end = parseInt(e.end.replace(':', ''), 10);
        weekMap[el.key].push({
          ...e,
          startNumber: start,
          endNumber: end,
          height: this.minuteDifference(e.start, e.end) * 10 / 6
        });
      })
    })
    timeLineNumber.map(el => {
      let lineEl = [];
      for (let i = 1; i <= 7; i++) {
        if(weekMap[i] && weekMap[i].length >0) {
          let a = [],
              w = '100%';
          weekMap[i].map( e => {
            if(e.startNumber < el + 60 && e.startNumber >= el) {
              a.push(e);
            }
          })

          if(a.length > 0){
            let elment = [];
            a.map((v, l) => {
              elment.push(<span key={l} style={{position: v.startNumber - el>0? 'relative': '', top: (v.startNumber - el) * 10/6 + '%', width: 1/a.length * 100 + '%', height: v.height + '%'}} className={styles.floatEl}>{v.theme}</span>)
            })
            lineEl.push(<span className={styles.rendBox}>{elment}</span>)
          } else  {
            lineEl.push('');
          }
        } else {
          lineEl.push('');
        }

      }
      renderData.push(lineEl);
    })
    console.log(renderData);
    return renderData;

  }

  render() {
    const { dataSource } = this.props;
    let { ifWeekend } = this.state,
        colSpan = ifWeekend? '3': '4',
        columns = ifWeekend? 7: 5,
        calendarMap = this.calculationList(dataSource);
    console.log(calendarMap);
    return (
      <div className={styles.borderBox}>
        <Row className={styles.colTitle} type="flex" justify="space-between">
          <Col className={styles.spanBox} span={'2'}>
            <div className="gutter-box"></div>
          </Col>
          {this.renderCol(columns, weekMap)}
        </Row>
        {timeLine.map((el, i) => {
          return(<Row key={i} type="flex" justify="space-between" className={styles.tableBody}>
            <Col className={styles.spanBox} span={'2'}>
              <div className={styles.timeBox}>
                <span className={styles.positionBox}>{el}</span>
              </div>
            </Col>
            {this.renderCol(columns, calendarMap?calendarMap[i]:spaceMaps, styles.timeLineBox)}
          </Row>)
        })}

      </div>
    );
  }
}
