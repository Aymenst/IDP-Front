import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet';
// app/containers/Pages/Users/LoginV2.js
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from '@material-ui/core/styles';
import {LoginFormV2} from 'dan-components';
import logo from 'dan-images/logo2.png';
import styles from 'dan-components/Forms/user-jss';
import {connect} from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import {isExpired} from 'react-jwt';
import {postLogin} from '../../../redux/actions/auth';
import AuthService from "../../Services/AuthService";
import {Alert} from "@material-ui/lab";


const redirectToDashboard = (roles) => {
    window.location.href = '/app';
    return;
    switch (roles[0]) {
        case 'ADMIN':
            window.location.href = '/app';
            break;
        /*
        case 'STOCK':
            window.location.href = '/app/stock-dashboard';
            break;
        */
        default:
            console.log('UNKNOWN ROLE');
            window.location.href = '/app'; // ADDED JUST FOR TESTING TEMPLATE COMPONENTS
    }
};

function LoginV2(props) {
    const [error, setError] = useState('');
    const submitForm = values => {
        AuthService.login({email: values.get('email'), password: values.get('password')}).then(response => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            redirectToDashboard(response.data.user.roles);
        }).catch(error => {
            setError(error?.response?.data?.error);
        });
    };

    const title = brand.name + ' - Login';
    const description = brand.desc;
    // eslint-disable-next-line react/prop-types
    const {classes, auth} = props;

    useEffect(() => {
        const AUTH_TOKEN = localStorage.getItem('token');
        const AUTH_USER = JSON.parse(localStorage.getItem('user'));
        if (AUTH_TOKEN && !isExpired(AUTH_TOKEN) && AUTH_USER) {
            redirectToDashboard(AUTH_USER.roles);
        } else {
            console.log('token expired');
        }
    }, []);


    return (
        <div className={classes.rootFull}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta property="og:title" content={title}/>
                <meta property="og:description" content={description}/>
                <meta property="twitter:title" content={title}/>
                <meta property="twitter:description" content={description}/>
            </Helmet>
            <Snackbar
                onClose={() => setError('')}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={error !== ''}
                autoHideDuration={4000}
            >
                <Alert severity="error" action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={() => setError('')}><CloseIcon/></IconButton>]}>{error}</Alert>
            </Snackbar>
            <div className={classes.containerSide}>
                <Hidden smDown>
                    <div className={classes.opening}>
                        <div>
                            <img src={logo} width={440} height={440} />
                        </div>
                        <Typography variant="h4" component="h1" className={classes.opening} gutterBottom>
                            Welcome to IDP Platform
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.opening}>
                            Please sign in to continue
                        </Typography>
                    </div>
                </Hidden>
                <div className={classes.sideFormWrap}>
                    <LoginFormV2 onSubmit={(values) => submitForm(values)}/>
                </div>
            </div>
        </div>
    );
}

LoginV2.propTypes = {
    classes: PropTypes.object.isRequired,
};

const reducerAuth = 'auth';
const LoginV2Init = connect(state => ({
    auth: state.getIn([reducerAuth]),
}), {
    postLogin
})(LoginV2);

export default withStyles(styles)(LoginV2Init);
