import React, {useEffect, useState} from 'react';
import {Switch, Route, BrowserRouter, useHistory} from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Auth from './Auth';
import Application from './Application';
import ThemeWrapper from './ThemeWrapper';
import {LoginV2} from "../pageListAsync";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
    const [confirmOpen, setConfirmOpen] = useState(true);
    const history = useHistory();
    return (
        <ThemeWrapper>
            <BrowserRouter getUserConfirmation={(message, callback) => {
            }}>
                <Switch>
                    <Route path="/" exact component={Auth}/>
                    <Route path="/app" component={Application}/>
                    <Route component={Auth}/>
                    <Route component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </ThemeWrapper>
    );
}

export default App;