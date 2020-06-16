import React from "react";
import Nav from '../components/Nav';
import '../../sass/Layout.scss'
import { Link, NavLink, WithRouter } from "react-router-dom";

export const Layout = props => {
    return (<div>
            <Nav/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1>News.net</h1>
                        {props.children}
                    </div>
                </div>
                <Footer/>
            </div>
        </div>)
 };

function Footer (){
    return <footer>
        <div className="row">
            <Link to="/archives">
                <button className="btn btn-danger">archives</button>
            </Link>
            <Link to="/archives/some-other-articles" className="btn btn-warning">archives (some other
                articles)</Link>
            <Link to="/settings?name=netflix">
                <button className="btn btn-success">settings</button>
            </Link>
            <div className="col-lg-12">
                <p>Copyright &copy; KillerNews.net</p>
            </div>
        </div>
    </footer>
}
