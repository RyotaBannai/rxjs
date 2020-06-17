import React from "react";
import Nav from './Nav';
import '../../sass/Layout.scss'

export const Layout = props => {
    return (<div>
            <Nav/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>Playground</h1>
                        {props.children}
                    </div>
                </div>
            </div>
        </div>)
 };

