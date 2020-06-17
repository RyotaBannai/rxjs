import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store'

import {Layout} from "./parts/Layout";
import {Main} from "./pages/Main";
import {Info} from "./pages/Info";

const app = document.getElementById('app');

const App = _ => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Route exact path="/" component={Main} />
                <Route exact path="/info" component={Info} />
            </Layout>
        </Router>
    </Provider>
);
ReactDOM.render(<App />, app);

