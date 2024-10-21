import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import { PapperBlock } from 'dan-components';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { ExportToCsv } from 'export-to-csv';
import StatiChart from './StatiChart';
import StatiChart2 from './StatiChart2';
import StatiChart3 from './StatiChart3';
import StatiChart4 from './StatiChart4';
import StatiChart5 from './StatiChart5';
import StatiChart6 from './StatiChart6';
import StatiChart7 from './StatiChart7';
import StatiChart8 from './StatiChart8';
import StatiChart9 from './StatiChart9';
import StatiChart10 from './StatiChart10';
import StatiChart11 from './StatiChart11';
import StatiChart12 from './StatiChart12';
import StatiChart13 from './StatiChart13';
import StatiChart14 from './StatiChart14';
import StatiChart15 from './StatiChart15';
import { ContentDivider } from '../../../components/Divider';
import ScrollableTabsButtonForce from './ChartMenu';
import ToolBar from './ToolBar';
import ImportService from '../ImportService';


class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.setTitle = this.setTitle.bind(this);
    this.state = {
      Title: '',
      Legend: '',
      Description: '',
      Column1: '',
      Position1: '',
      Datas: [],
      Header: [],
      Table: '',
      CharType: '',
      Xcolumn: '',
      Ycolumn: '',
      Serie1: '',
      Serie2: '',
      bool: false,
      success: false,
      refresh: false
    };
  }

  setTitle = (prop) => {
    this.setState({
      Title: prop.Titre, Legend: prop.Legende, Description: prop.Descrip, Column1: prop.Colone1, Position1: prop.position1
    });
  }

  setChartConfig = (prop) => {
    this.setState({
      CharType: prop.CharType, Table: prop.DataTable, Xcolumn: prop.Xcolumn, Ycolumn: prop.Ycolumn, Serie1: prop.Serie1, Serie2: prop.Serie2, bool: true
    });
  }

  setButton = (prop) => {
   /* if (prop === 'save') {
      const data = {
        // eslint-disable-next-line react/destructuring-assignment
        title: this.state.Title, legend: this.state.Legend, description: this.state.Description, table: this.state.Table, chartType: this.state.CharType, xcolumn: this.state.Xcolumn, ycolumn: this.state.Ycolumn, serie1: this.state.Serie1, serie2: this.state.Serie2
      };
      const user = localStorage.getItem('User');
      ImportService.saveChartConfig(data, user)
        .then(result => {
          if (result.data === true) {
            this.setState({ success: true });
          } else {
            this.setState({ success: false });
          }
        });
    }
    if (prop === 'add' || prop === 'Delete') {
      this.setState({
        Title: '',
        Legend: '',
        Description: '',
        Column1: '',
        Position1: '',
        Datas: [],
        Header: [],
        Table: '',
        CharType: '',
        Xcolumn: '',
        Ycolumn: '',
        Serie1: '',
        Serie2: '',
        bool: false,
        success: true,
        refresh: true
      });
    }
    if (prop === 'download') {
      this.setState({ success: true });
      const options = {
        useKeysAsHeaders: true,
        removeNewLines: false,
        // showTitle: true
      };
      const csvExporter = new ExportToCsv(options);
      // eslint-disable-next-line react/destructuring-assignment
      csvExporter.generateCsv(this.state.Datas);
    }
    if (prop === 'edit') {
      const newState = {
        // eslint-disable-next-line react/destructuring-assignment
        Datas: this.state.Datas, Header: this.state.Header, Table: this.state.Table
      };
      // eslint-disable-next-line react/destructuring-assignment,react/prop-types
      this.props.history.push('/app/data-preparation', newState);
    }
      */
  }


  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ success: false });
  };


  render() {
    let position;
    let position2;
    let position3;
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.Column1 === 'C1') {
      // eslint-disable-next-line react/destructuring-assignment
      position = this.state.Position1;
    }
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.Column1 === 'C2') {
      // eslint-disable-next-line react/destructuring-assignment
      position2 = this.state.Position1;
    }
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.Column1 === 'C3') {
      // eslint-disable-next-line react/destructuring-assignment
      position3 = this.state.Position1;
    }
    const title = brand.name + '- Chart Construction';
    const description = brand.desc;
    let chart;
    if (this.state.bool) {
      if (this.state.CharType === 'P1') {
        chart = <StatiChart info={this.state} />;
      }
      if (this.state.CharType === 'P2') {
        chart = <StatiChart2 info={this.state} />;
      }
      if (this.state.CharType === 'P3') {
        chart = <StatiChart3 info={this.state} />;
      }
      if (this.state.CharType === 'P4') {
        chart = <StatiChart4 info={this.state} />;
      }
      if (this.state.CharType === 'P5') {
        chart = <StatiChart5 info={this.state} />;
      }
      if (this.state.CharType === 'P6') {
        chart = <StatiChart6 info={this.state} />;
      }
      if (this.state.CharType === 'P7') {
        chart = <StatiChart7 info={this.state} />;
      }
      if (this.state.CharType === 'P8') {
        chart = <StatiChart8 info={this.state} />;
      }
      if (this.state.CharType === 'P9') {
        chart = <StatiChart9 info={this.state} />;
      }
      if (this.state.CharType === 'P10') {
        chart = <StatiChart10 info={this.state} />;
      }
      if (this.state.CharType === 'P11') {
        chart = <StatiChart11 info={this.state} />;
      }
      if (this.state.CharType === 'P12') {
        chart = <StatiChart12 info={this.state} />;
      }
      if (this.state.CharType === 'P13') {
        chart = <StatiChart13 info={this.state} />;
      }
      if (this.state.CharType === 'P14') {
        chart = <StatiChart14 info={this.state} />;
      }
      if (this.state.CharType === 'P15') {
        chart = <StatiChart15 info={this.state} />;
      }
    }
    if (this.props.location.state !== null && !this.state.refresh) {
      if (this.props?.location?.state?.Datas !== null) this.state.Datas = this.props?.location?.state?.Datas;
      if (this.props?.location?.state?.Table !== null) this.state.Table = this.props?.location?.state?.Table;
    }

    let message;
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.success === true) {
      message = (
        // eslint-disable-next-line react/destructuring-assignment
        <Snackbar open={this.state.success} autoHideDuration={5000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="success" color="info">
            Operation Succeeded !
          </Alert>
        </Snackbar>
      );
    } else {
      message = (
        // eslint-disable-next-line react/destructuring-assignment
        <Snackbar open={this.state.success} autoHideDuration={5000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error">
            Operation Failed !
          </Alert>
        </Snackbar>
      );
    }

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title=" Visualizations " icon="md-stats" desc="The practice of translating information into a visual context, to identify patterns, trends and outliers in large data sets.">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <div align="center">
                <ToolBar buttonCall={this.setButton} />
                <ContentDivider />
              </div>
            </Grid>
            <br />
            <Grid item xs={3}>
              <div>
                <br />
                <ScrollableTabsButtonForce info={this.state} parentCallback={this.setTitle} parentCallback2={this.setChartConfig} />
              </div>
            </Grid>
            <Grid item xs={9}>
              <div>
                <div align={position}><h1>{this.state.Title}</h1></div>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    {chart}
                  </Grid>
                </Grid>
                <div align={position2}><h6>{this.state.Legend}</h6></div>
                <div align={position3}><strong>{this.state.Description}</strong></div>
                <br />
                <br />
              </div>
            </Grid>
          </Grid>
          {message}
        </PapperBlock>
      </div>
    );
  }
}

export default Chart;