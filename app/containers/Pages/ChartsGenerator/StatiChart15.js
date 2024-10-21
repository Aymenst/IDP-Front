import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class StatiChart15 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Datas: this.props.info.Datas,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Xcolumn: this.props.info.Xcolumn,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Ycolumn: this.props.info.Ycolumn,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Serie1: this.props.info.Serie1,
    };
  }

  componentDidMount() {
    const chart = am4core.create('chartdiv15', am4charts.XYChart);
    // Add data
    // eslint-disable-next-line react/destructuring-assignment
    chart.data = this.state.Datas;
    // eslint-disable-next-line react/destructuring-assignment
    const ycol = this.state.Ycolumn;
    // eslint-disable-next-line react/destructuring-assignment
    const xcol = this.state.Xcolumn;
    // eslint-disable-next-line react/destructuring-assignment
    const serie1 = this.state.Serie1;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = xcol;
    series.dataFields.openValueY = ycol;
    series.dataFields.valueY = serie1;
    series.tooltipText = ycol + ' : {openValueY.value} ' + serie1 + ' : {valueY.value}';
    series.sequencedInterpolation = true;
    series.fillOpacity = 0.3;
    series.defaultState.transitionDuration = 1000;
    series.tensionX = 0.8;

    const series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = xcol;
    series2.dataFields.valueY = ycol;
    series2.sequencedInterpolation = true;
    series2.defaultState.transitionDuration = 1500;
    series2.stroke = chart.colors.getIndex(6);
    series2.tensionX = 0.8;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();

    this.chart = chart;
  }

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  componentWillReceiveProps(props) {
    console.log(props);
    this.setState = ({
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Datas: this.props.info.Datas,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Xcolumn: this.props.info.Xcolumn,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Ycolumn: this.props.info.Ycolumn,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Serie1: this.props.info.Serie1,
    });
  }

  componentDidUpdate(oldProps) {
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    if (oldProps.paddingRight !== this.props.paddingRight) {
      // eslint-disable-next-line react/destructuring-assignment,react/prop-types
      this.chart.paddingRight = this.props.paddingRight;
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv15" style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default StatiChart15;
