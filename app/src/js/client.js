import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store'

import {Layout} from "./pages/Layout";
import {Main} from "./pages/Main";
const app = document.getElementById('app');

const App = _ => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Route exact path="/" component={Main} />
            </Layout>
        </Router>
    </Provider>
);
ReactDOM.render(<App />, app);

