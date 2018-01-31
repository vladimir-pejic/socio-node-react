import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// Import pages
import About from '../pages/About.jsx'
import Login from '../users/Login.jsx'


export default class Navigation extends React.Component {

    render() {
        return(
            <Router>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                            </li>
                        </ul>
                        <form className="navbar-nav mr-auto form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <ul className="navbar-nav nav justify-content-end">
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Log in</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link">Log out</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Route path="/about" component={About}/>
                <Route path="/login" component={Login}/>
            </div>
            </Router>
        )
    }

}