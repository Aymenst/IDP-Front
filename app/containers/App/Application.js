import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { decodeToken, isExpired } from 'react-jwt';
import axios from 'axios';
import { ThemeContext } from './ThemeWrapper';
import Dashboard from '../Templates/Dashboard';
import {
  BlankPage,
  Error,
  HelpSupport,
  NotFound,
  UsersPage,
  Data,
  MainPage,
  Profile,
  Template
} from '../pageListAsync';
import { getClients } from '../../redux/actions/clients';

let user = 'Anonymous';

const setAuth = () => {
  const AUTH_TOKEN = localStorage.getItem('token');
  if (AUTH_TOKEN && !isExpired(AUTH_TOKEN)) {
    axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
    user = decodeToken(AUTH_TOKEN).sub;
  } else {
    console.log('token expired');
  }
};

function Application(props) {
  useEffect(() => {
    const AUTH_TOKEN = localStorage.getItem('token');
    if (AUTH_TOKEN && !isExpired(AUTH_TOKEN)) {
      axios.defaults.headers.common.Authorization = `Bearer ${AUTH_TOKEN}`;
    } else {
      console.log('token expired');
      window.location.href = '/login'; // FALLBACK TO LOGIN
    }
  });
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>

        { /* Home */}
        <Route exact path="/app" component={MainPage} />
        <Route path="/app/users" component={UsersPage} />
        <Route exact path="/app/profile" component={Profile} />
        <Route exact path="/app/data" component={Data} />
        <Route exact path="/app/template" component={Template} />

        { /* Pages */ }
        <Route path="/app/pages/blank-page" component={BlankPage} />
        <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} />
        <Route path="/app/pages/help-support" component={HelpSupport} />
        { /* Default */ }
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired
};

export default Application;
