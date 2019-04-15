import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from "react-router-dom";

import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import CallbackPage from "./pages/callback";
import Auth from './components/Auth';

function App() {
    return (
        <div className="App container">
            <Auth>
                <div className="jumbotron">
                <Router>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/dashboard" component={DashboardPage}/>
                        <Route path="/callback" component={CallbackPage}/>
                    </Switch>
                </Router>
                </div>
            </Auth>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
