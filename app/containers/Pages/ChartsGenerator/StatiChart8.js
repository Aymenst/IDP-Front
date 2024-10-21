import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class StatiChart8 extends React.Component {
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
    const chart = am4core.create('chartdiv8', am4charts.RadarChart);

    // Add data
    // eslint-disable-next-line react/destructuring-assignment
    chart.data = this.state.Datas;
    // eslint-disable-next-line react/destructuring-assignment
    const ycol = this.state.Ycolumn;
    // eslint-disable-next-line react/destructuring-assignment
    const xcol = this.state.Xcolumn;
    // eslint-disable-next-line react/destructuring-assignment
    const serie1 = this.state.Serie1;

    chart.padding(0, 0, 0, 0);
    chart.radarContainer.dy = 50;
    chart.innerRadius = am4core.percent(50);
    chart.radius = am4core.percent(100);
    chart.zoomOutButton.padding(20, 20, 20, 20);
    chart.zoomOutButton.margin(20, 20, 20, 20);
    chart.zoomOutButton.background.cornerRadius(40, 40, 40, 40);
    chart.zoomOutButton.valign = 'bottom';

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = xcol;
    categoryAxis.renderer.labels.template.location = 0.5;
    categoryAxis.mouseEnabled = false;

    const categoryAxisRenderer = categoryAxis.renderer;
    categoryAxisRenderer.cellStartLocation = 0;
    categoryAxisRenderer.tooltipLocation = 0.5;
    categoryAxisRenderer.grid.template.disabled = true;
    categoryAxisRenderer.ticks.template.disabled = true;

    categoryAxisRenderer.axisFills.template.fill = am4core.color('#e8e8e8');
    categoryAxisRenderer.axisFills.template.fillOpacity = 0.2;
    categoryAxisRenderer.axisFills.template.location = -0.5;
    categoryAxisRenderer.line.disabled = true;
    categoryAxisRenderer.tooltip.disabled = true;
    categoryAxis.renderer.labels.template.disabled = true;

    categoryAxis.adapter.add('maxZoomFactor', (maxZoomFactor, target) => target.dataItems.length / 5);

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    const valueAxisRenderer = valueAxis.renderer;

    valueAxisRenderer.line.disabled = true;
    valueAxisRenderer.grid.template.disabled = true;
    valueAxisRenderer.ticks.template.disabled = true;
    valueAxis.min = 0;
    valueAxis.renderer.tooltip.disabled = true;

    const series1 = chart.series.push(new am4charts.RadarSeries());
    series1.name = ycol.toUpperCase();
    series1.dataFields.categoryX = xcol;
    series1.dataFields.valueY = ycol;
    series1.stacked = true;
    series1.fillOpacity = 0.5;
    series1.fill = chart.colors.getIndex(0);
    series1.strokeOpacity = 0;
    series1.dataItems.template.locations.categoryX = 0.5;
    series1.sequencedInterpolation = true;
    series1.sequencedInterpolationDelay = 50;

    const series2 = chart.series.push(new am4charts.RadarSeries());
    series2.name = serie1.toUpperCase();
    series2.dataFields.categoryX = xcol;
    series2.dataFields.valueY = serie1;
    series2.stacked = true;
    series2.fillOpacity = 0.5;
    series2.fill = chart.colors.getIndex(1);
    series2.stacked = true;
    series2.strokeOpacity = 0;
    series2.dataItems.template.locations.categoryX = 0.5;
    series2.sequencedInterpolation = true;
    series2.sequencedInterpolationDelay = 50;
    // eslint-disable-next-line no-template-curly-in-string
    series2.tooltipText = '[bold]{categoryX}[/]\nTotal: ${valueY.total} \nOverseas: ${value1}';
    series2.tooltip.pointerOrientation = 'vertical';
    series2.tooltip.label.fill = am4core.color('#ffffff');
    series2.tooltip.label.fontSize = '0.8em';
    series2.tooltip.autoTextColor = false;

    chart.seriesContainer.zIndex = -1;
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;
    chart.scrollbarX.exportable = false;
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.exportable = false;

    chart.padding(0, 0, 0, 0);

    chart.scrollbarY.padding(20, 0, 20, 0);
    chart.scrollbarX.padding(0, 20, 0, 80);

    chart.scrollbarY.background.padding(20, 0, 20, 0);
    chart.scrollbarX.background.padding(0, 20, 0, 80);


    chart.cursor = new am4charts.RadarCursor();
    chart.cursor.lineX.strokeOpacity = 1;
    chart.cursor.lineY.strokeOpacity = 0;
    chart.cursor.lineX.stroke = chart.colors.getIndex(1);
    chart.cursor.innerRadius = am4core.percent(30);
    chart.cursor.radius = am4core.percent(50);
    chart.cursor.selection.fill = chart.colors.getIndex(1);

    const bullet = series2.bullets.create();
    bullet.fill = am4core.color('#000000');
    bullet.strokeOpacity = 0;
    bullet.locationX = 0.5;


    const line = bullet.createChild(am4core.Line);
    line.x2 = -100;
    line.x1 = 0;
    line.y1 = 0;
    line.y1 = 0;
    line.strokeOpacity = 1;

    line.stroke = am4core.color('#000000');
    line.strokeDasharray = '2,3';
    line.strokeOpacity = 0.4;


    const bulletValueLabel = bullet.createChild(am4core.Label);
    bulletValueLabel.text = "{valueY.total.formatNumber('$#.0')}";
    bulletValueLabel.verticalCenter = 'middle';
    bulletValueLabel.horizontalCenter = 'right';
    bulletValueLabel.dy = -3;

    const label = bullet.createChild(am4core.Label);
    label.text = '{categoryX}';
    label.verticalCenter = 'middle';
    label.paddingLeft = 20;

    valueAxis.calculateTotals = true;


    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.radarContainer;
    chart.legend.width = 110;
    chart.legend.horizontalCenter = 'middle';
    chart.legend.markers.template.width = 22;
    chart.legend.markers.template.height = 18;
    chart.legend.markers.template.dy = 2;
    chart.legend.labels.template.fontSize = '0.7em';
    chart.legend.dy = 20;
    chart.legend.dx = -9;

    chart.legend.itemContainers.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    const itemHoverState = chart.legend.itemContainers.template.states.create('hover');
    itemHoverState.properties.dx = 5;

    const title = chart.radarContainer.createChild(am4core.Label);
    title.text = 'test';
    title.fontSize = '1.2em';
    title.verticalCenter = 'bottom';
    title.textAlign = 'middle';
    title.horizontalCenter = 'middle';
    title.fontWeigth = '800';

    chart.maskBullets = false;

    const circle = bullet.createChild(am4core.Circle);
    circle.radius = 2;
    const hoverState = circle.states.create('hover');

    hoverState.properties.scale = 5;

    bullet.events.on('positionchanged', (event) => {
      event.target.children.getIndex(0).invalidate();
      event.target.children.getIndex(1).invalidatePosition();
    });


    bullet.adapter.add('dx', (dx, target) => {
      const angle = categoryAxis.getAngle(target.dataItem, 'categoryX', 0.5);
      return 20 * am4core.math.cos(angle);
    });

    bullet.adapter.add('dy', (dy, target) => {
      const angle = categoryAxis.getAngle(target.dataItem, 'categoryX', 0.5);
      return 20 * am4core.math.sin(angle);
    });

    bullet.adapter.add('rotation', (dy, target) => {
      const angle = Math.min(chart.endAngle, Math.max(chart.startAngle, categoryAxis.getAngle(target.dataItem, 'categoryX', 0.5)));
      return angle;
    });


    line.adapter.add('x2', (x2, target) => {
      const { dataItem } = target;
      if (dataItem) {
        const position = valueAxis.valueToPosition(dataItem.values.valueY.value + dataItem.values.valueY.stack);
        return -(position * valueAxis.axisFullLength + 35);
      }
      return 0;
    });


    bulletValueLabel.adapter.add('dx', (dx, target) => {
      const { dataItem } = target;

      if (dataItem) {
        const position = valueAxis.valueToPosition(dataItem.values.valueY.value + dataItem.values.valueY.stack);
        return -(position * valueAxis.axisFullLength + 40);
      }
      return 0;
    });


    chart.seriesContainer.zIndex = 10;
    categoryAxis.zIndex = 11;
    valueAxis.zIndex = 12;

    chart.radarContainer.zIndex = 20;


    let previousBullets = [];
    series2.events.on('tooltipshownat', (event) => {
      const { dataItem } = event;

      for (let i = 0; i < previousBullets.length; i += 1) {
        previousBullets[i].isHover = false;
      }

      previousBullets = [];

      const itemBullet = dataItem.bullets.getKey(bullet.uid);

      for (let i = 0; i < itemBullet.children.length; i += 1) {
        const sprite = itemBullet.children.getIndex(i);
        sprite.isHover = true;
        previousBullets.push(sprite);
      }
    });

    series2.tooltip.events.on('visibilitychanged', () => {
      if (!series2.tooltip.visible) {
        for (let i = 0; i < previousBullets.length; i += 1) {
          previousBullets[i].isHover = false;
        }
      }
    });

    chart.events.on('maxsizechanged', () => {
      if (chart.pixelInnerRadius < 200) {
        title.disabled = true;
        chart.legend.verticalCenter = 'middle';
        chart.legend.dy = 0;
      } else {
        title.disabled = false;
        chart.legend.verticalCenter = 'top';
        chart.legend.dy = 20;
      }
    });
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
      <div id="chartdiv8" style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default StatiChart8;
