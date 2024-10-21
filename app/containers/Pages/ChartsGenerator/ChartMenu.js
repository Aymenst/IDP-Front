import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import PieChartIcon from '@material-ui/icons/PieChart';
import PaletteIcon from '@material-ui/icons/Palette';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import { ContentDivider } from '../../../components/Divider';
import PopUpTool from './PopUpTool';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={4}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 5,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  input: {
    height: 60,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const plotTypes = [
    {
      value: 'P1',
      label: 'Pie Chart ',
      Desc: ' Pie charts are widely used in various fields to represent the proportion of different classifications, and to compare various classifications by the arc.\n'
        + 'The pie chart is not suitable for multiple series of data, because as the series increase, each slice becomes smaller, and finally the size distinction is not obvious.',
    },
    {
      value: 'P2',
      label: 'Line Chart ',
      Desc: ' A line chart is used to show the change of data over a continuous time interval or time span. It is characterized by a tendency to reflect things as they change over time or ordered categories.',
    },
    {
      value: 'P3',
      label: 'Column Chart',
      Desc: ' Column charts use vertical columns to show numerical comparisons between categories, and the number of columns should not be too large (the labels of the axis may appear incomplete if there are too many columns).',
    },
    {
      value: 'P4',
      label: 'Map',
      Desc: ' A regional map is a map that uses color to represent the distribution of a certain range of values on a map partition.',
    },
    {
      value: 'P5',
      label: 'Bart Chart Race ',
      Desc: ' The scatter plot shows two variables in the form of points on a rectangular coordinate system. The position of the point is determined by the value of the variable. By observing the distribution of the data points, we can infer the correlation between the variables.',
    },
    {
      value: 'P6',
      label: 'Bar Chart',
      Desc: ' Bar charts are similar to column charts, but the number of bars can be relatively large. Compared with the column chart, the positions of its two axes are changed.',
    },
    {
      value: 'P7',
      label: 'Population Pyramid & Map',
      Desc: 'Also called an “age-sex-pyramid”, is a graphical illustration that shows the distribution of various age groups in a population linked with a map (great interactive visual, lets viewers easily analyze the data across regions)',
    },
    {
      value: 'P8',
      label: 'Stacked area radar',
      Desc: ' chart which can be used almost in every case of comparison. It is two-dimensional, but while y-axis looks familiar, x-axis takes the form of a polygon with a number of vertexes equal to the number of ticks, or categories.',
    },
    {
      value: 'P9',
      label: 'Area Chart',
      Desc: ' The area chart is formed on the basis of the line chart. It fills the area between the polyline and the axis in the line chart with color. The filling of the color can better highlight the trend information.',
    },
    {
      value: 'P10',
      label: 'Clustered Column Chart',
      Desc: ' Click on the legend items to show/hide series.',
    },
    {
      value: 'P11',
      label: 'Stream / ThemeRiver Chart',
      Desc: 'A streamgraph, or stream graph, is a type of stacked area graph which is displaced around a central axis, resulting in a flowing, organic shape.',
    },
    {
      value: 'P12',
      label: 'Bubble Chart',
      Desc: ' A bubble chart is a multivariatechart that is a variant of a scatter plot. Except for the values of the variables represented by the X and Y axes, the area of each bubble represents the third value.',
    },
    {
      value: 'P13',
      label: 'Radar Chart ',
      Desc: ' Radar charts are used to compare multiple quantized variables, such as seeing which variables have similar values, or if there are extreme values. They also help to observe which variables in the data set have higher or lower values. Radar charts are suitable for demonstrating job performance.',
    },
    {
      value: 'P14',
      label: ' Chart With Gaps In Data',
      Desc: '  Chart With Gaps is used to display data that contains gaps. Each step represents a portion of the total going through it.',
    },
    {
      value: 'P15',
      label: 'Range araa Chart ',
      Desc: ' Range Chart is a type of area chart where rather than starting on the axis, the area is represented by the space between two values. Useful for displaying ranges of values, such as between minimum and maximum prices over a timespan.',
    },
  ];
  const tables = [];
  const axes = [
    {
      value: 'C0',
      label: '  ',
    },
    {
      value: 'C1',
      label: ' X-Axes ',
    },
    {
      value: 'C2',
      label: ' Y-Axes ',
    },
    {
      value: 'C3',
      label: ' Z-Axes ',
    },
  ];
  const positions = [
    {
      value: 'left',
      label: 'left',
    },
    {
      value: 'right',
      label: 'right',
    },
    {
      value: 'center',
      label: 'center',
    },
  ];
  const ppositions = [
    {
      value: '0',
      label: '',
    },
    {
      value: '1',
      label: 'Up',
    },
    {
      value: '2',
      label: 'Down',
    },
  ];
  const infos = [
    {
      value: 'C1',
      label: 'Title',
    },
    {
      value: 'C2',
      label: 'Legend',
    },
    {
      value: 'C3',
      label: 'Description',
    },
  ];

  const [serie1, setSerie1] = React.useState('');
  const handleChange8 = (event) => {
    setSerie1(event.target.value);
  };
  const [serie2, setSerie2] = React.useState('');
  const handleChange9 = (event) => {
    setSerie2(event.target.value);
  };
  const [column, setcolumn] = React.useState('');
  const handleChange2 = (event) => {
    setcolumn(event.target.value);
  };
  const [plotType, setplotType] = React.useState('P1');
  const handleChange1 = (event) => {
    setplotType(event.target.value);
  };
  const [columnsss, setcolumnsss] = React.useState('');
  const handleChange0 = (event) => {
    setcolumnsss(event.target.value);
  };
  const [position, setposition] = React.useState('');
  const handleChange3 = (event) => {
    setposition(event.target.value);
  };
  const [pposition, setpposition] = React.useState('C0');
  const handleChange4 = (event) => {
    setpposition(event.target.value);
  };
  const [info, setinfo] = React.useState('C1');
  const handleChange5 = (event) => {
    setinfo(event.target.value);
  };
  const [axe, setaxe] = React.useState('C0');
  const handleChange6 = (event) => {
    setaxe(event.target.value);
  };
  const [title, setTitle] = React.useState('');
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const [legend, setLegend] = React.useState('');
  const handleLegend = (event) => {
    setLegend(event.target.value);
  };
  const [desc, setDesc] = React.useState('');
  const handleDesc = (event) => {
    setDesc(event.target.value);
  };

  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const columns = props.info.Header;
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const columnss = props.info.Header;
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const series = props.info.Header;
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const series2 = props.info.Header;
  // eslint-disable-next-line react/destructuring-assignment,react/prop-types
  const thisTable = props.info.Table;
  if (thisTable) {
    const c = {
      value: thisTable.toLowerCase(), label: thisTable.toUpperCase()
    };
    tables.push(c);
  }
  const [table, setTable] = React.useState(thisTable.toLowerCase());
  const handleChange7 = (event) => {
    setTable(event.target.value);
  };

  const prop = {
    Titre: title, Legende: legend, Descrip: desc, Colone1: info, position1: position
  };
  const setTitreChange = () => {
    // eslint-disable-next-line react/prop-types
    props.parentCallback(prop);
  };

  const setInfos = () => {
    // eslint-disable-next-line react/prop-types
    props.parentCallback(prop);
  };

  const handleChartConfig = () => {
    const chartConfig = {
      CharType: plotType, DataTable: table, Xcolumn: column, Ycolumn: columnsss, Serie1: serie1, Serie2: serie2
    };
    // eslint-disable-next-line react/prop-types
    props.parentCallback2(chartConfig);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" size="small">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Info" icon={<SpeakerNotesIcon />} {...a11yProps(0)} />
          <Tab label="Chart Settings" icon={<PieChartIcon />} {...a11yProps(1)} />
          <Tab label=" Design " icon={<PaletteIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Typography component="div">
          <Grid container spacing={1} alignContent="center">
            <Grid item xs={12}>
              <br />
              <TextField
                className={classes.root}
                label=" Chart Title "
                variant="outlined"
                placeholder=" Covid-19 in africa 2020 "
                value={title}
                onChange={handleTitle}
              />
            </Grid>
            <Grid item xs={12}>
              <br />
              <TextField
                className={classes.root}
                label=" Legend "
                aria-setsize="100"
                variant="outlined"
                placeholder=" "
                multiline
                rowsMax={2}
                value={legend}
                onChange={handleLegend}
              />
              <br />
            </Grid>
            <Grid item xs={12}>
              <br />
              <TextField
                className={classes.root}
                label=" Description "
                variant="outlined"
                placeholder=" Add some description about the chart"
                multiline
                rowsMax={4}
                value={desc}
                onChange={handleDesc}
              />
              <br />
            </Grid>
          </Grid>
          <br />
          <Grid item xs={12}>
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" size="small" />}
              label=" Show Description"
            />
            <br />
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" size="small" />}
              fontSize="small"
              label="Show Legend"
            />
          </Grid>
        </Typography>
        <ContentDivider />
        <div align="center">
          <Button size="small">Cancel</Button>
          <Button color="primary" size="small" onClick={setTitreChange}>
            Apply
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography component="div">
          <Grid container spacing={1} alignContent="center">
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                align="center"
                select
                label="Select Chart Type"
                value={plotType}
                onChange={handleChange1}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {plotTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={11}>
                        {option.label}
                        <br />
                      </Grid>
                      <Grid item xs={1}>
                        <Tooltip title={option.Desc} placement="bottom-start" className={classes.noMaxWidth}>
                          <VisibilityIcon size="small" />
                        </Tooltip>
                        <br />
                      </Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </TextField>
              <br />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                align="center"
                select
                label="Select Data Table"
                value={table}
                onChange={handleChange7}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {tables.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Grid item xs={11}>
                      {option.label}
                      <br />
                    </Grid>
                  </MenuItem>
                ))}
              </TextField>
              <br />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.root}
                align="center"
                select
                label=" X-Axis column"
                value={column}
                onChange={handleChange2}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {columns.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.root}
                align="center"
                select
                label=" Y-Axis column"
                value={columnsss}
                onChange={handleChange0}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {columnss.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.root}
                align="center"
                select
                label=" Serie 1"
                value={serie1}
                onChange={handleChange8}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {series.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.root}
                align="center"
                select
                label=" Serie 2"
                value={serie2}
                onChange={handleChange9}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {series2.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid className={classes.root}>
              <br />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" size="small" />}
                label=" Invert Chart"
              />
              <br />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" size="small" />}
                fontSize="small"
                label=" Show Background names"
              />
              <br />
              <FormControlLabel
                value="end"
                control={<Checkbox color="primary" size="small" />}
                fontSize="small"
                label=" Agregate Data"
              />
            </Grid>
          </Grid>
        </Typography>
        <ContentDivider />
        <div align="center">
          <Button size="small">Cancel</Button>
          <Button size="small" color="primary" onClick={handleChartConfig}>
            Apply
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div>
          <div>
            <Grid container spacing={1} alignContent="center">
              <Grid item xs={6}>
                <Typography className={classes.pos} color="textPrimary" component="div">
                  <TextField
                    className={classes.root}
                    align="center"
                    select
                    label=" Field"
                    value={info}
                    onChange={handleChange5}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {infos.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.pos} color="textPrimary" component="div">
                  <TextField
                    className={classes.root}
                    align="center"
                    select
                    label=" Position"
                    value={position}
                    onChange={handleChange3}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {positions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.pos} color="textSecondary" component="div">
                  <br />
                  <PopUpTool />
                </Typography>
              </Grid>
            </Grid>
            <ContentDivider />
            <Grid container spacing={1} alignContent="center">
              <Grid item xs={6}>
                <Typography className={classes.pos} color="textPrimary" component="div">
                  <TextField
                    className={classes.root}
                    align="center"
                    select
                    label=" Axis"
                    value={axe}
                    onChange={handleChange6}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {axes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.pos} color="textPrimary" component="div">
                  <TextField
                    className={classes.root}
                    align="center"
                    select
                    label=" Position"
                    value={pposition}
                    onChange={handleChange4}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  >
                    {ppositions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.pos} color="textSecondary" component="div">
                  <br />
                  <PopUpTool />
                </Typography>
              </Grid>
            </Grid>
          </div>
          <ContentDivider />
          <div align="center">
            <Button size="small">Cancel</Button>
            <Button
              color="primary"
              size="small"
              onClick={setInfos}
            >
              Apply
            </Button>
          </div>
        </div>
      </TabPanel>
    </div>
  );
}
