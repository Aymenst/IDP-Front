import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class StatiChart10 extends React.Component {
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
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Serie1: this.props.info.Serie1,
      // eslint-disable-next-line react/prop-types,react/destructuring-assignment
      Serie2: this.props.info.Serie2
    };
  }

  componentDidMount() {
    const chart = am4core.create('chartdiv10', am4charts.XYChart);
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
    chart.colors.step = 2;

    chart.legend = new am4charts.Legend();
    chart.legend.position = 'top';
    chart.legend.paddingBottom = 20;
    chart.legend.labels.template.maxWidth = 95;
    chart.exporting.menu = new am4core.ExportMenu();

    const xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    // eslint-disable-next-line react/destructuring-assignment
    xAxis.dataFields.category = this.state.Xcolumn;
    xAxis.renderer.cellStartLocation = 0.1;
    xAxis.renderer.cellEndLocation = 0.9;
    xAxis.renderer.grid.template.location = 0;

    const yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.min = 0;
    function arrangeColumns() {
      const series = chart.series.getIndex(0);

      const w = 1 - xAxis.renderer.cellStartLocation - (1 - xAxis.renderer.cellEndLocation);
      if (series.dataItems.length > 1) {
        const x0 = xAxis.getX(series.dataItems.getIndex(0), 'categoryX');
        const x1 = xAxis.getX(series.dataItems.getIndex(1), 'categoryX');
        const delta = ((x1 - x0) / chart.series.length) * w;
        if (am4core.isNumber(delta)) {
          const middle = chart.series.length / 2;

          let newIndex = 0;
          // eslint-disable-next-line no-shadow
          chart.series.each((series) => {
            if (!series.isHidden && !series.isHiding) {
              // eslint-disable-next-line no-param-reassign
              series.dummyData = newIndex;
              newIndex += 1;
            } else {
              // eslint-disable-next-line no-param-reassign
              series.dummyData = chart.series.indexOf(series);
            }
          });
          const visibleCount = newIndex;
          const newMiddle = visibleCount / 2;

          // eslint-disable-next-line no-shadow
          chart.series.each((series) => {
            const trueIndex = chart.series.indexOf(series);
            // eslint-disable-next-line no-shadow
            const newIndex = series.dummyData;

            const dx = (newIndex - trueIndex + middle - newMiddle) * delta;

            series.animate({ property: 'dx', to: dx }, series.interpolationDuration, series.interpolationEasing);
            series.bulletsContainer.animate({ property: 'dx', to: dx }, series.interpolationDuration, series.interpolationEasing);
          });
        }
      }
    }
    function createSeries(value, name, category) {
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = value;
      series.dataFields.categoryX = category;
      series.name = name;

      // eslint-disable-next-line no-use-before-define
      series.events.on('hidden', arrangeColumns);
      // eslint-disable-next-line no-use-before-define
      series.events.on('shown', arrangeColumns);

      const bullet = series.bullets.push(new am4charts.LabelBullet());
      bullet.interactionsEnabled = false;
      bullet.dy = 30;
      bullet.label.text = '{valueY}';
      bullet.label.fill = am4core.color('#ffffff');

      return series;
    }

    if (ycol !== '') createSeries(ycol, ycol.toUpperCase(), xcol);
    if (serie1 !== '') createSeries(serie1, serie1.toUpperCase(), xcol);
    if (serie2 !== '') createSeries(serie2, serie2.toUpperCase(), xcol);
  }

  // eslint-disable-next-line react/sort-comp
  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
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
    // eslint-disable-next-line react/destructuring-assignment
    // const ycol = this.state.Ycolumn;
    // eslint-disable-next-line react/destructuring-assignment
    // const xcol = this.state.Xcolumn;
    // eslint-disable-next-line react/destructuring-assignment
    // const serie1 = this.state.Serie1;
    // eslint-disable-next-line react/destructuring-assignment
    // const serie2 = this.state.Serie2;

    // if (ycol !== '') this.chart.createSeries(ycol, ycol.toUpperCase(), xcol);
    // if (serie1 !== '') this.chart.createSeries(serie1, serie1.toUpperCase(), xcol);
    // if (serie2 !== '') this.chart.createSeries(serie2, serie2.toUpperCase(), xcol);
  }

  componentDidUpdate(oldProps) {
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    if (oldProps.paddingRight !== this.props.paddingRight) {
      // eslint-disable-next-line react/destructuring-assignment,react/prop-types
      this.chart.paddingRight = this.props.paddingRight;
    }
    console.log(oldProps);
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

  render() {
    return (
      <div id="chartdiv10" style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default StatiChart10;
