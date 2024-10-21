import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class StatiChart14 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Datas: this.props.info.Datas,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Xcolumn: this.props.info.Xcolumn,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Ycolumn: this.props.info.Ycolumn,
    };
  }

  componentDidMount() {
    const chart = am4core.create('chartdiv14', am4charts.XYChart);

    // eslint-disable-next-line react/destructuring-assignment
    chart.data = this.state.Datas;
    // eslint-disable-next-line react/destructuring-assignment
    const ycol = this.state.Ycolumn;
    // eslint-disable-next-line react/destructuring-assignment
    const xcol = this.state.Xcolumn;

    // Create axes
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 50;
    dateAxis.renderer.grid.template.location = 0.5;
    dateAxis.baseInterval = {
      count: 1,
      timeUnit: xcol
    };

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = ycol;
    series.dataFields.dateX = xcol;
    series.strokeWidth = 3;
    series.connect = false;
    series.tensionX = 0.8;
    series.fillOpacity = 0.2;
    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.stroke = new am4core.InterfaceColorSet().getFor('background');
    bullet.strokeWidth = 2;
    bullet.tooltipText = '{valueY}';
    bullet.circle.radius = 4;

    bullet.adapter.add('fill', (fill, target) => {
      if (target.dataItem.valueY > 0) {
        return chart.colors.getIndex(2);
      }
      return fill;
    });

    const range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = 100;
    range.contents.stroke = chart.colors.getIndex(2);
    range.contents.fill = range.contents.stroke;
    range.contents.fillOpacity = 0.2;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.cursor = new am4charts.XYCursor();

    this.chart = chart;
  }

  /*  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  } */

  componentDidUpdate(oldProps) {
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    if (oldProps.paddingRight !== this.props.paddingRight) {
      // eslint-disable-next-line react/destructuring-assignment,react/prop-types
      this.chart.paddingRight = this.props.paddingRight;
    }
  }

  render() {
    return (
      <div id="chartdiv14" style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default StatiChart14;
