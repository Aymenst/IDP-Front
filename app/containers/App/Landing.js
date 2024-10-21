import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Corporate from '../Templates/Corporate';
import {HomePage, Login, LoginV2, LoginV3} from '../pageListAsync';

function Landing() {
  return (
    <Corporate>
      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>
    </Corporate>
  );
}

export default Landing;
