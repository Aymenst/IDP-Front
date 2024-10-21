import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import am4themesMaterial from '@amcharts/amcharts4/themes/material';
import { PropTypes } from 'prop-types';

class StatiChartID extends React.Component {
  componentDidMount() {
    this.initChart();
  }

  componentWillUnmount() {
    if (this.chart._super) {
      this.chart.dispose();
    }
  }

  initChart() {
    const { chartId } = this.props;
    am4core.useTheme(am4themesMaterial);
    am4core.useTheme(am4themesAnimated);
    this.chart = am4core.create(chartId, am4charts.XYChart);
    this.chart.scrollbarX = new am4core.Scrollbar();
    this.chart.data = [{
      country: 'USA',
      visits: 3025
    }, {
      country: 'China',
      visits: 1882
    }, {
      country: 'Japan',
      visits: 1809
    }, {
      country: 'Germany',
      visits: 1322
    }, {
      country: 'UK',
      visits: 1122
    }, {
      country: 'France',
      visits: 1114
    }, {
      country: 'India',
      visits: 984
    }, {
      country: 'Spain',
      visits: 711
    }];
    const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'country';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = 'right';
    categoryAxis.renderer.labels.template.verticalCenter = 'middle';
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    const series = this.chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = 'visits';
    series.dataFields.categoryX = 'country';
    series.tooltipText = '[{categoryX}: bold]{valueY}[/]';
    series.columns.template.strokeWidth = 0;
    series.tooltip.pointerOrientation = 'vertical';
    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;
    const hoverState = series.columns.template.column.states.create('hover');
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add('fill', (fill, target) => (
      this.chart.colors.getIndex(target.dataItem.index)));
    this.chart.cursor = new am4charts.XYCursor();
  }

  render() {
    const { chartId } = this.props;
    return (
      <div
        id={chartId}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          padding: '20px',
          margin: '30px 20px',
          boxSizing: 'border-box',
          border: '2px solid #000'
        }}
      />
    );
  }
}
StatiChartID.propTypes = {
  chartId: PropTypes.string.isRequired,
};
export default StatiChartID;
