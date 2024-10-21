import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class StatiChart9 extends React.Component {
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
    const chart = am4core.create('chartdiv9', am4charts.XYChart);
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

    // chart.dateFormatter.inputDateFormat = 'yyyy';
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;
    dateAxis.baseInterval = {
      // eslint-disable-next-line react/destructuring-assignment
      timeUnit: xcol,
      count: 1
    };

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    if (ycol !== '') {
      const series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = xcol;
      series.name = ycol.toUpperCase();
      series.dataFields.valueY = ycol;
      // series.tooltipHTML = "<img src='https://www.amcharts.com/lib/3/images/car.png' style='vertical-align:bottom; margin-right: 10px; width:28px; height:21px;'><span style='font-size:14px; color:#000000;'><b>{valueY.value}</b></span>";
      series.tooltipText = '[#000]{valueY.value}[/]';
      series.tooltip.background.fill = am4core.color('#FFF');
      series.tooltip.getStrokeFromObject = true;
      series.tooltip.background.strokeWidth = 3;
      series.tooltip.getFillFromObject = false;
      series.fillOpacity = 0.6;
      series.strokeWidth = 2;
      series.stacked = true;
    }

    if (serie1 !== '') {
      const series2 = chart.series.push(new am4charts.LineSeries());
      series2.name = serie1.toUpperCase();
      series2.dataFields.dateX = xcol;
      // eslint-disable-next-line react/destructuring-assignment
      series2.dataFields.valueY = serie1;
      series2.tooltipText = '[#000]{valueY.value}[/]';
      series2.tooltip.background.fill = am4core.color('#FFF');
      series2.tooltip.getFillFromObject = false;
      series2.tooltip.getStrokeFromObject = true;
      series2.tooltip.background.strokeWidth = 3;
      series2.sequencedInterpolation = true;
      series2.fillOpacity = 0.6;
      series2.stacked = true;
      series2.strokeWidth = 2;
    }

    if (serie2 !== '') {
      const series3 = chart.series.push(new am4charts.LineSeries());
      series3.name = serie2.toUpperCase();
      series3.dataFields.dateX = xcol;
      series3.dataFields.valueY = serie2;
      series3.tooltipText = '[#000]{valueY.value}[/]';
      series3.tooltip.background.fill = am4core.color('#FFF');
      series3.tooltip.getFillFromObject = false;
      series3.tooltip.getStrokeFromObject = true;
      series3.tooltip.background.strokeWidth = 3;
      series3.sequencedInterpolation = true;
      series3.fillOpacity = 0.6;
      series3.stacked = true;
      series3.strokeWidth = 2;
    }

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.scrollbarX = new am4core.Scrollbar();

    // Add a legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';

    /*    // axis ranges
    const range = dateAxis.axisRanges.create();
    range.date = new Date(2001, 0, 1);
    range.endDate = new Date(2003, 0, 1);
    range.axisFill.fill = chart.colors.getIndex(7);
    range.axisFill.fillOpacity = 0.2;

    range.label.text = 'Fines for speeding increased';
    range.label.inside = true;
    range.label.rotation = 90;
    range.label.horizontalCenter = 'right';
    range.label.verticalCenter = 'bottom';

    const range2 = dateAxis.axisRanges.create();
    range2.date = new Date(2007, 0, 1);
    range2.grid.stroke = chart.colors.getIndex(7);
    range2.grid.strokeOpacity = 0.6;
    range2.grid.strokeDasharray = '5,2';


    range2.label.text = 'Motorcycle fee introduced';
    range2.label.inside = true;
    range2.label.rotation = 90;
    range2.label.horizontalCenter = 'right';
    range2.label.verticalCenter = 'bottom'; */

    chart.exporting.menu = new am4core.ExportMenu();
    this.chart = chart;
  }

  // eslint-disable-next-line react/sort-comp
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
      this.setState = ({
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        Datas: this.props.info.Datas,
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        Header: this.props.info.Header,
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        Xcolumn: this.props.info.Xcolumn,
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        Ycolumn: this.props.info.Ycolumn
      });
    }
  }

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  componentWillReceiveProps(props) {
    console.log(props);
    this.setState = ({
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Datas: this.props.info.Datas,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Header: this.props.info.Header,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Xcolumn: this.props.info.Xcolumn,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Ycolumn: this.props.info.Ycolumn,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Serie1: this.props.info.Serie1,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Serie2: this.props.info.Serie2
    });
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
      <div id="chartdiv9" style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default StatiChart9;
