import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class StatiChart5 extends React.Component {
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
    am4core.useTheme(am4themesAnimated);
    const chart = am4core.create('chartdiv5', am4charts.XYChart);
    chart.padding(40, 40, 40, 40);

    // eslint-disable-next-line react/destructuring-assignment
    const ycol = this.state.Ycolumn;
    // eslint-disable-next-line react/destructuring-assignment
    const xcol = this.state.Xcolumn;
    // eslint-disable-next-line react/destructuring-assignment
    const serie1 = this.state.Serie1;

    chart.numberFormatter.bigNumberPrefixes = [
      { number: 1e+3, suffix: 'K' },
      { number: 1e+6, suffix: 'M' },
      { number: 1e+9, suffix: 'B' }
    ];

    const label = chart.plotContainer.createChild(am4core.Label);
    label.x = am4core.percent(97);
    label.y = am4core.percent(95);
    label.horizontalCenter = 'right';
    label.verticalCenter = 'middle';
    label.dx = -15;
    label.fontSize = 50;

    const playButton = chart.plotContainer.createChild(am4core.PlayButton);
    playButton.x = am4core.percent(97);
    playButton.y = am4core.percent(95);
    playButton.dy = -2;
    playButton.verticalCenter = 'middle';
    playButton.events.on('toggled', (event) => {
      if (event.target.isActive) {
        // eslint-disable-next-line no-use-before-define
        play();
      } else {
        // eslint-disable-next-line no-use-before-define
        stop();
      }
    });

    const stepDuration = 4000;

    const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = xcol;
    categoryAxis.renderer.minGridDistance = 1;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.rangeChangeEasing = am4core.ease.linear;
    valueAxis.rangeChangeDuration = stepDuration;
    valueAxis.extraMax = 0.1;

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryY = xcol;
    series.dataFields.valueX = ycol;
    series.tooltipText = '{valueX.value}';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusBottomRight = 5;
    series.columns.template.column.cornerRadiusTopRight = 5;
    series.interpolationDuration = stepDuration;
    series.interpolationEasing = am4core.ease.linear;

    const labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.horizontalCenter = 'right';
    labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
    labelBullet.label.textAlign = 'end';
    labelBullet.label.dx = -10;

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add('fill', (fill, target) => chart.colors.getIndex(target.dataItem.index));

    let year = 2003;
    label.text = year.toString();

    let interval;

    function play() {
      interval = setInterval(() => {
        // eslint-disable-next-line no-use-before-define
        nextYear();
      }, stepDuration);
      // eslint-disable-next-line no-use-before-define
      nextYear();
    }

    function stop() {
      if (interval) {
        clearInterval(interval);
      }
    }

    function nextYear() {
      year += 1;

      if (year > 2018) {
        year = 2003;
      }

      // eslint-disable-next-line no-use-before-define
      const newData = chart.data[serie1];
      let itemsWithNonZero = 0;
      for (let i = 0; i < chart.data.length; i += 1) {
        chart.data[i][serie1] = newData[i][serie1];
        if (chart.data[i][serie1] > 0) {
          itemsWithNonZero += 1;
        }
      }

      if (year === 2003) {
        series.interpolationDuration = stepDuration / 4;
        valueAxis.rangeChangeDuration = stepDuration / 4;
      } else {
        series.interpolationDuration = stepDuration;
        valueAxis.rangeChangeDuration = stepDuration;
      }

      chart.invalidateRawData();
      label.text = year.toString();

      categoryAxis.zoom({ start: 0, end: itemsWithNonZero / categoryAxis.dataItems.length });
    }


    categoryAxis.sortBySeries = series;

    // eslint-disable-next-line react/destructuring-assignment
    chart.data = this.state.Datas;

    series.events.on('inited', () => {
      setTimeout(() => {
        playButton.isActive = true; // this starts interval
      }, 2000);
    });

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
      <div id="chartdiv5" style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default StatiChart5;
