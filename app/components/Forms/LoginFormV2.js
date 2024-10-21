import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import {NavLink} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.png';
import styles from './user-jss';
import {TextFieldRedux, CheckboxRedux} from './ReduxFormMUI';

// validation functions
const required = value => (value === null ? 'Required' : undefined);
const email = value => (
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email'
        : undefined
);

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
    return <NavLink to={props.to} {...props} innerRef={ref}/>; // eslint-disable-line
});

function LoginFormV2(props) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(show => !show);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const {
        classes,
        handleSubmit,
        pristine,
        submitting,
        deco
    } = props;

    // className={classes.brand}
    return (
        <Paper className={classNames(classes.sideWrap, deco && classes.petal)}>
            <div className={classes.topBar}>
                <NavLink to="/">
                    <img src={logo} width={120} height={120} alt={brand.name} />
                </NavLink>
            </div>
            <Typography variant="h4" className={classes.title} gutterBottom>
                Sign In
            </Typography>
            <section className={classes.pageFormSideWrap}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <FormControl className={classes.formControl}>
                            <Field
                                name="email"
                                component={TextFieldRedux}
                                placeholder="account@gmail.com"
                                label="Email"
                                required
                                validate={[required, email]}
                                className={classes.field}
                            />
                        </FormControl>
                    </div>
                    <div>
                        <FormControl className={classes.formControl}>
                            <Field
                                name="password"
                                component={TextFieldRedux}
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                required
                                validate={required}
                                className={classes.field}
                            />
                        </FormControl>
                    </div>
                    <div className={classes.btnArea}>
                        <Button variant="contained" fullWidth color="primary" size="large" type="submit">
                            Continue
                            <ArrowForward className={classNames(classes.rightIcon, classes.iconSmall)}
                                          disabled={submitting || pristine}/>
                        </Button>
                    </div>
                </form>
            </section>
        </Paper>
    );
}

LoginFormV2.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    deco: PropTypes.bool.isRequired,
};

const LoginFormReduxed = reduxForm({
    form: 'immutableExample',
    enableReinitialize: true,
})(LoginFormV2);

const reducerLogin = 'login';
const reducerUi = 'ui';
const reducerAuth = 'auth';
const FormInit = connect(
    state => ({
        force: state,
        initialValues: state.getIn([reducerLogin, 'usersLogin']),
        deco: state.getIn([reducerUi, 'decoration']),
        auth: state.getIn([reducerAuth]),
    }),
)(LoginFormReduxed);

export default withStyles(styles)(FormInit);
