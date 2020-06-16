import React from "react";
import { Link, NavLink, WithRouter } from "react-router-dom";

export default function Layout () {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">
                <img src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30"
                     className="d-inline-block align-top" alt="" />
                    Bootstrap</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact to="/" activeClassName="active" >
                            <div className="nav-link">Featured <span className="sr-only">(current)</span></div>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/archives" activeClassName="active">
                            <div className="nav-link" >Archives</div>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/settings" activeClassName="active">
                            <div className="nav-link">Settings</div>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/add" activeClassName="active">
                            <div className="nav-link">Add Article</div>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/user" activeClassName="active">
                            <div className="nav-link">User</div>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/disabled" activeClassName="active">
                            <div className="nav-link disabled">Disabled</div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )

}

