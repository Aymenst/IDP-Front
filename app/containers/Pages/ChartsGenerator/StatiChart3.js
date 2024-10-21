import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class StatiChart3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Datas: this.props.info.Datas,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment,react/no-unused-state
      Header: this.props.info.Header,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Xcolumn: this.props.info.Xcolumn,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Ycolumn: this.props.info.Ycolumn,
    };
  }

  componentDidMount() {
    const chart = am4core.create('chartdiv3', am4charts.XYChart);
    // eslint-disable-next-line react/destructuring-assignment
    chart.data = this.state.Datas;
    // eslint-disable-next-line react/destructuring-assignment
    const ycol = this.state.Ycolumn;
    // eslint-disable-next-line react/destructuring-assignment
    const xcol = this.state.Xcolumn;

    let total = 0;
    for (let i = 0; i < chart.data.length; i += 1) {
      // eslint-disable-next-line react/destructuring-assignment
      const value = Number(chart.data[i][ycol]);
      total += value;
    }

    let sum = 0;
    for (let i = 0; i < chart.data.length; i += 1) {
      const value = Number(chart.data[i][ycol]);
      sum += value;
      chart.data[i].progresss = sum / total * 100; // progress
    }

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = xcol;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.tooltip.disabled = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.min = 0;
    valueAxis.cursorTooltipEnabled = false;

    // Create series
    const series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = ycol;
    series.dataFields.categoryX = xcol;
    series.tooltipText = '[{categoryX}: bold]{valueY}[/]';
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = 'vertical';

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    const hoverState = series.columns.template.column.states.create('hover');
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add('fill', (fill, target) => chart.colors.getIndex(target.dataItem.index));

    /*    const paretoValueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    paretoValueAxis.renderer.opposite = true;
    paretoValueAxis.min = 0;
    paretoValueAxis.max = 100;
    paretoValueAxis.strictMinMax = true;
    paretoValueAxis.renderer.grid.template.disabled = true;
    paretoValueAxis.numberFormatter = new am4core.NumberFormatter();
    paretoValueAxis.numberFormatter.numberFormat = "#'%'";
    paretoValueAxis.cursorTooltipEnabled = false;

    const paretoSeries = chart.series.push(new am4charts.LineSeries());
    paretoSeries.dataFields.valueY = 'progress';
    paretoSeries.dataFields.categoryX = xcol;
    paretoSeries.yAxis = paretoValueAxis;
    paretoSeries.tooltipText = "Progress: {valueY.formatNumber('#.0')}%[/]";
    paretoSeries.bullets.push(new am4charts.CircleBullet());
    paretoSeries.strokeWidth = 2;
    paretoSeries.stroke = new am4core.InterfaceColorSet().getFor('alternativeBackground');
    paretoSeries.strokeOpacity = 0.5; */

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = 'panX';
    chart.exporting.menu = new am4core.ExportMenu();
    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv3" style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default StatiChart3;
