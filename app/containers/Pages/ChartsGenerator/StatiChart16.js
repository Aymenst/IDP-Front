import React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themesAnimated);

class StatiChart16 extends React.Component {
  componentDidMount() {
    const chart = am4core.create('chartdiv16', am4charts.XYChart);
    chart.exporting.menu = new am4core.ExportMenu();

    // Add data
    chart.data = [
      {
        year: '1896', uk: 7, ussr: 0, russia: 0, usa: 20, china: 0
      },
      {
        year: '1900', uk: 78, ussr: 0, russia: 0, usa: 55, china: 0
      },
      {
        year: '1904', uk: 2, ussr: 0, russia: 0, usa: 394, china: 0
      },
      {
        year: '1908', uk: 347, ussr: 0, russia: 0, usa: 63, china: 0
      },
      {
        year: '1912', uk: 160, ussr: 0, russia: 0, usa: 101, china: 0
      },
      {
        year: '1916', uk: 0, ussr: 0, russia: 0, usa: 0, china: 0
      },
      {
        year: '1920', uk: 107, ussr: 0, russia: 0, usa: 193, china: 0
      },
      {
        year: '1924', uk: 66, ussr: 0, russia: 0, usa: 198, china: 0
      },
      {
        year: '1928', uk: 55, ussr: 0, russia: 0, usa: 84, china: 0
      },
      {
        year: '1932', uk: 34, ussr: 0, russia: 0, usa: 181, china: 0
      },
      {
        year: '1936', uk: 36, ussr: 0, russia: 0, usa: 92, china: 0
      },
      {
        year: '1940', uk: 0, ussr: 0, russia: 0, usa: 0, china: 0
      },
      {
        year: '1944', uk: 0, ussr: 0, russia: 0, usa: 0, china: 0
      },
      {
        year: '1948', uk: 56, ussr: 0, russia: 0, usa: 148, china: 0
      },
      {
        year: '1952', uk: 31, ussr: 117, russia: 0, usa: 130, china: 0
      },
      {
        year: '1956', uk: 45, ussr: 169, russia: 0, usa: 118, china: 0
      },
      {
        year: '1960', uk: 28, ussr: 169, russia: 0, usa: 112, china: 0
      },
      {
        year: '1964', uk: 28, ussr: 174, russia: 0, usa: 150, china: 0
      },
      {
        year: '1968', uk: 18, ussr: 188, russia: 0, usa: 149, china: 0
      },
      {
        year: '1972', uk: 29, ussr: 211, russia: 0, usa: 155, china: 0
      },
      {
        year: '1976', uk: 32, ussr: 285, russia: 0, usa: 155, china: 0
      },
      {
        year: '1980', uk: 45, ussr: 442, russia: 0, usa: 0, china: 0
      },
      {
        year: '1984', uk: 72, ussr: 0, russia: 0, usa: 333, china: 76
      },
      {
        year: '1988', uk: 53, ussr: 294, russia: 0, usa: 193, china: 53
      },
      {
        year: '1992', uk: 50, ussr: 0, russia: 0, usa: 224, china: 83
      },
      {
        year: '1996', uk: 26, ussr: 0, russia: 115, usa: 260, china: 110
      },
      {
        year: '2000', uk: 55, ussr: 0, russia: 188, usa: 248, china: 79
      },
      {
        year: '2004', uk: 57, ussr: 0, russia: 192, usa: 264, china: 94
      },
      {
        year: '2008', uk: 77, ussr: 0, russia: 143, usa: 315, china: 184
      }
    ];

    // Create axes
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'year';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;

    // eslint-disable-next-line no-unused-vars
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());


    // Create series
    function createSeries(field, name) {
      const series = chart.series.push(new am4charts.LineSeries());
      series.dummyData = {
        field
      };
      series.dataFields.valueY = field + '_hi';
      series.dataFields.openValueY = field + '_low';
      series.dataFields.categoryX = 'year';
      series.name = name;
      series.tooltipText = '[font-size: 18]{name}[/]\n{categoryX}: [bold]{' + field + '}[/]';
      series.strokeWidth = 1;
      series.fillOpacity = 1;
      series.tensionX = 0.8;

      return series;
    }

    createSeries('uk', 'United Kingdom');
    createSeries('ussr', 'Spain');
    createSeries('russia', 'Russia');
    createSeries('usa', 'United States');
    createSeries('china', 'China');

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
      <div id="chartdiv16" style={{ width: '100%', height: '400px' }} />
    );
  }
}

export default StatiChart16;
