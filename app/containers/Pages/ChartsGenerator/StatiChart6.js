import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class StatiChart6 extends React.Component {
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
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Serie2: this.props.info.Serie2
    };
  }

  componentDidMount() {
    /* Chart code */
    // Create chart instance
    const chart = am4core.create('chartdiv6', am4charts.XYChart);

    // eslint-disable-next-line react/destructuring-assignment
    chart.data = this.state.Datas;
    // eslint-disable-next-line react/destructuring-assignment
    const ycol = this.state.Ycolumn;
    // eslint-disable-next-line react/destructuring-assignment
    const xcol = this.state.Xcolumn;
    // eslint-disable-next-line react/destructuring-assignment
    const serie1 = this.state.Serie1;
    // eslint-disable-next-line react/destructuring-assignment
    const serie2 = this.state.Serie2;
    // Add data
    /*    chart.data = [{
      date: '2013-01-16',
      market1: 71,
      market2: 75,
      sales1: 5,
      sales2: 8
    }]; */

    // Create axes
    // eslint-disable-next-line no-unused-vars
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.grid.template.location = 0;
    // dateAxis.renderer.minGridDistance = 30;

    const valueAxis1 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis1.title.text = ycol;

    const valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.title.text = serie1;
    valueAxis2.renderer.opposite = true;
    valueAxis2.renderer.grid.template.disabled = true;

    // Create series
    const series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = ycol;
    series1.dataFields.dateX = xcol;
    series1.yAxis = valueAxis1;
    series1.name = ycol.toUpperCase();
    // eslint-disable-next-line no-template-curly-in-string
    series1.tooltipText = '{name}\n[bold font-size: 20]${valueY}M[/]';
    series1.fill = chart.colors.getIndex(0);
    series1.strokeWidth = 0;
    series1.clustered = false;
    series1.columns.template.width = am4core.percent(40);

    const series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = serie1;
    series2.dataFields.dateX = xcol;
    series2.yAxis = valueAxis1;
    series2.name = serie1.toUpperCase();
    // eslint-disable-next-line no-template-curly-in-string
    series2.tooltipText = '{name}\n[bold font-size: 20]${valueY}M[/]';
    series2.fill = chart.colors.getIndex(0).lighten(0.5);
    series2.strokeWidth = 0;
    series2.clustered = false;
    series2.toBack();

    const series3 = chart.series.push(new am4charts.LineSeries());
    series3.dataFields.valueY = serie2;
    series3.dataFields.dateX = xcol;
    series3.name = serie2.toUpperCase();
    series3.strokeWidth = 2;
    series3.tensionX = 0.7;
    series3.yAxis = valueAxis2;
    series3.tooltipText = '{name}\n[bold font-size: 20]{valueY}[/]';

    const bullet3 = series3.bullets.push(new am4charts.CircleBullet());
    bullet3.circle.radius = 3;
    bullet3.circle.strokeWidth = 2;
    bullet3.circle.fill = am4core.color('#fff');

    /*    const series4 = chart.series.push(new am4charts.LineSeries());
    series4.dataFields.valueY = 'market2';
    series4.dataFields.dateX = xcol;
    series4.name = 'Market Days ALL';
    series4.strokeWidth = 2;
    series4.tensionX = 0.7;
    series4.yAxis = valueAxis2;
    series4.tooltipText = '{name}\n[bold font-size: 20]{valueY}[/]';
    series4.stroke = chart.colors.getIndex(0).lighten(0.5);
    series4.strokeDasharray = '3,3';

    const bullet4 = series4.bullets.push(new am4charts.CircleBullet());
    bullet4.circle.radius = 3;
    bullet4.circle.strokeWidth = 2;
    bullet4.circle.fill = am4core.color('#fff'); */

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // Add legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';

    // Add scrollbar
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series1);
    chart.scrollbarX.series.push(series3);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    chart.exporting.menu = new am4core.ExportMenu();

    this.chart = chart;
  }

  componentDidUpdate(oldProps) {
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    if (oldProps.paddingRight !== this.props.paddingRight) {
      // eslint-disable-next-line react/destructuring-assignment,react/prop-types
      this.chart.paddingRight = this.props.paddingRight;
    }
  }

  render() {
    return (
      <div
        id="chartdiv6"
        style={{ width: '100%', height: '400px' }}
      />
    );
  }
}

export default StatiChart6;
