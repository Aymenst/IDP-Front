import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class StatiChart11 extends React.Component {
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
    const chart = am4core.create('chartdiv11', am4charts.XYChart);
    chart.exporting.menu = new am4core.ExportMenu();

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

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = xcol;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;

    // eslint-disable-next-line no-unused-vars
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());


    // Create series
    function createSeries(field, name, category) {
      const series = chart.series.push(new am4charts.LineSeries());
      series.dummyData = {
        field
      };
      series.dataFields.valueY = field + '_hi';
      series.dataFields.openValueY = field + '_low';
      series.dataFields.categoryX = category;
      series.name = name;
      series.tooltipText = '[font-size: 18]{name}[/]\n{categoryX}: [bold]{' + field + '}[/]';
      series.strokeWidth = 1;
      series.fillOpacity = 1;
      series.tensionX = 0.8;

      return series;
    }
    if (ycol !== '') createSeries(ycol, ycol.toUpperCase(), xcol);
    if (serie1 !== '') createSeries(serie1, serie1.toUpperCase(), xcol);
    if (serie2 !== '') createSeries(serie2, serie2.toUpperCase(), xcol);

    // Legend
    chart.legend = new am4charts.Legend();
    chart.legend.itemContainers.template.togglable = false;
    chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.default;
    chart.legend.position = 'right';
    chart.legend.reverseOrder = true;

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.maxTooltipDistance = 0;

    // Responsive
    chart.responsive.enabled = true;
    chart.responsive.useDefault = false;
    chart.responsive.rules.push({
      relevant: am4core.ResponsiveBreakpoints.widthL,
      state(target, stateId) {
        if (target instanceof am4charts.Legend) {
          const state = target.states.create(stateId);
          state.properties.position = 'bottom';
          return state;
        }
        return null;
      }
    });

    // Prepare data for the river-stacked series
    // eslint-disable-next-line no-use-before-define
    chart.events.on('beforedatavalidated', updateData);
    function updateData() {
      const { data } = chart;
      if (data.length === 0) {
        return;
      }

      for (let i = 0; i < data.length; i += 1) {
        const row = data[i];
        let sum = 0;

        // Calculate open and close values
        chart.series.each((series) => {
          const { field } = series.dummyData;
          const val = Number(row[field]);
          row[field + '_low'] = sum;
          row[field + '_hi'] = sum + val;
          sum += val;
        });

        // Adjust values so they are centered
        const offset = sum / 2;
        chart.series.each((series) => {
          const { field } = series.dummyData;
          row[field + '_low'] -= offset;
          row[field + '_hi'] -= offset;
        });
      }
    }
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
      <div id="chartdiv11" style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default StatiChart11;
