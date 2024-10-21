import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import Europe from 'dan-images/Europe.png';

am4core.useTheme(am4themesAnimated);

class Chart2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/prop-types,react/destructuring-assignment
            Datas: this.props.info.chartData,
            // eslint-disable-next-line react/prop-types,react/destructuring-assignment,react/no-unused-state
            Header: this.props.info.Header,
            // eslint-disable-next-line react/prop-types,react/destructuring-assignment
            Xcolumn: this.props.info.Xcolumn,
            // eslint-disable-next-line react/prop-types,react/destructuring-assignment
            Ycolumn: this.props.info.Ycolumn,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ Datas: nextProps.chartData });
        console.log('Component received new props', nextProps);
    }

    componentDidMount() {
        const chart = am4core.create('chartdiv2', am4charts.XYChart);
        chart.scrollbarX = new am4core.Scrollbar();

        const sortedArray = this.state.Datas?.sort(function(a, b) { return a.value - b.value; });
        chart.data = sortedArray;
        const ycol = "value";
        const xcol = "pair";
        /*
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

         */

        for (let i = 0; i < chart.data?.length; i += 1) {
            const key = (chart.data[i]?.pair);
            switch(key) {
                case 'USD':
                    chart.data[i].pair = 'United States';
                    chart.data[i].pair2 = key;
                    break;
                case 'EUR':
                    chart.data[i].pair = 'Europe';
                    break;
                case 'GBP':
                    chart.data[i].pair = 'United Kingdom';
                    break;
                case 'AUD':
                    chart.data[i].pair = 'Austria';
                    break;
                case 'CAD':
                    chart.data[i].pair = 'Canada';
                    break;
                case 'JPY':
                    chart.data[i].pair = 'Japan';
                    break;
                case 'NZD':
                    chart.data[i].pair = 'New Zealand';
                    break;
                case 'CHF':
                    chart.data[i].pair = 'Switzerland';
                    break;
                default:
                // code block
            }
             // progress
        }

        // Create axes
        const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = xcol;
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.tooltip.disabled = false;
        categoryAxis.renderer.labels.template.fill = am4core.color("#707070");

        var image = new am4core.Image();
        image.horizontalCenter = "middle";
        image.width = 20;
        image.height = 20;
        image.verticalCenter = "middle";
        image.adapter.add("href", (href, target)=>{
            let category = target.dataItem.category;
            if(category){
                if (category === "Europe" ) return Europe;
                else return "https://www.amcharts.com/wp-content/uploads/flags/" + category.split(" ").join("-").toLowerCase() + ".svg";
            }
            return href;
        });
        categoryAxis.dataItems.template.bullet = image;

        const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.renderer.minWidth = 50;
        valueAxis.min = 0;
        valueAxis.cursorTooltipEnabled = false;
        valueAxis.renderer.labels.template.fill = am4core.color("#707070");


        // Create series
        const series = chart.series.push(new am4charts.ColumnSeries());
        series.sequencedInterpolation = true;
        series.dataFields.valueY = ycol;
        series.dataFields.categoryX = xcol;
        // series.tooltipText = '[{categoryX}: bold]{valueY}[/]';
        series.columns.template.strokeWidth = 0;

        series.tooltip.pointerOrientation = 'vertical';

        series.columns.template.column.cornerRadiusTopLeft = 10;
        series.columns.template.column.cornerRadiusTopRight = 10;
        series.columns.template.column.fillOpacity = 1;

        // on hover, make corner radiuses bigger
        const hoverState = series.columns.template.column.states.create('hover');
        hoverState.properties.cornerRadiusTopLeft = 0;
        hoverState.properties.cornerRadiusTopRight = 0;
        hoverState.properties.fillOpacity = 1;

        series.columns.template.adapter.add('fill', (fill, target) => chart.colors.getIndex(target.dataItem.index));

        // Cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = 'panX';
        chart.exporting.menu = new am4core.ExportMenu();
        this.chart = chart;
        console.log(chart.data)
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        return (
            <div id="chartdiv2" style={{ width: '100%', height: '400px' }} />
        );
    }
}

export default Chart2;

const data = [{
    "country": "USA",
    "value": 2025
}, {
    "country": "China",
    "value": 1882
}, {
    "country": "Japan",
    "value": 1809
}, {
    "country": "Germany",
    "value": 1322
}, {
    "country": "UK",
    "value": 1122
}, {
    "country": "France",
    "value": 1114
}, {
    "country": "India",
    "value": 984
}, {
    "country": "Spain",
    "value": 711
}, {
    "country": "Netherlands",
    "value": 665
}, {
    "country": "Russia",
    "value": 580
}, {
    "country": "South Korea",
    "value": 443
}, {
    "country": "Canada",
    "value": 441
}];