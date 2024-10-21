import React from 'react';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import Europe from 'dan-images/Europe.png';

am4core.useTheme(am4themesAnimated);

class Chart extends React.Component {
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
        const chart = am4core.create('chartdiv4', am4charts.PieChart3D);

        // const sortedArray = this.state.Datas?.sort(function(a, b) { return a.value - b.value; });
        chart.data = this.state?.Datas;
        const ycol = "value";
        const xcol = "pair";

        chart.innerRadius = 100;

        var series = chart.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = ycol;
        series.dataFields.category = xcol;
        series.ticks.template.disabled = true;
        series.labels.template.disabled = true;
        series.slices.template.cursorDownStyle = am4core.MouseCursorStyle.grabbing;
        chart.legend = new am4charts.Legend();
        chart.legend.labels.template.fill = '#707070';
        chart.legend.valueLabels.template.fill = '#707070';

        /*
        // Add and configure Series
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = ycol;
        pieSeries.dataFields.category = xcol;
        pieSeries.innerRadius = am4core.percent(50);


        let rgm = new am4core.RadialGradientModifier();
        rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, - 0.5);
        pieSeries.slices.template.fillModifier = rgm;
        pieSeries.slices.template.strokeModifier = rgm;
        pieSeries.slices.template.strokeOpacity = 0.4;
        pieSeries.slices.template.strokeWidth = 0;

        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";

         */
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
            <div id="chartdiv4" style={{ width: '100%', height: '400px' }} />
        );
    }
}

export default Chart;

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