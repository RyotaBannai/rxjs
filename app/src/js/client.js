import React from "react";
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store'

import {Layout} from "./parts/Layout";
import {Pokemon} from "./pages/Pokemon";
import {Playground} from "./pages/Playground";

const app = document.getElementById('app');

const App = _ => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Route exact path="/" component={Pokemon} />
                <Route exact path="/pg" component={Playground} />
            </Layout>
        </Router>
    </Provider>
);
ReactDOM.render(<App />, app);

