import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class StatiChart13 extends React.Component {
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
    const chart = am4core.create('chartdiv13', am4charts.RadarChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

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

    chart.radius = am4core.percent(100);

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = xcol;
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.renderer.tooltipLocation = 0.5;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.labels.template.disabled = true;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.labels.template.horizontalCenter = 'left';
    valueAxis.renderer.grid.template.disabled = true;

    const series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.name = ycol.toUpperCase();
    series1.dataFields.categoryX = xcol;
    series1.dataFields.valueY = ycol;
    series1.stroke = am4core.color('#ffffff');
    series1.columns.template.strokeOpacity = 0.2;
    series1.stacked = true;
    series1.sequencedInterpolation = true;
    series1.columns.template.width = am4core.percent(100);
    series1.columns.template.tooltipText = '{valueY}';

    const series2 = chart.series.push(series1.clone());
    series2.name = serie1.toUpperCase();
    series2.fill = chart.colors.next();
    series2.dataFields.valueY = serie1;

    const series3 = chart.series.push(series1.clone());
    series3.name = serie2.toUpperCase();
    series3.fill = chart.colors.next();

    series3.dataFields.valueY = serie2;

    const series4 = chart.series.push(series1.clone());
    series4.name = 'Series 4';
    series4.fill = chart.colors.next();
    series4.dataFields.valueY = 'value4';

    chart.seriesContainer.zIndex = -1;

    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.exportable = false;
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.exportable = false;

    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.xAxis = categoryAxis;
    chart.cursor.fullWidthXLine = true;
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineX.fillOpacity = 0.1;
    chart.cursor.lineX.fill = am4core.color('#000000');
    chart.exporting.menu = new am4core.ExportMenu();

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
      <div id="chartdiv13" style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default StatiChart13;
