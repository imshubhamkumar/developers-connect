import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {logout} from '../dataService';

class Navbar extends Component {
    state = {
        currentUser: JSON.parse(localStorage.accessToken).user
    }
    render() { 
        return (
            <nav className="navbar navbar-dark bg-dark text-white">
                <div className="container-fluid">
                    <h5>Navbar</h5>
                    <form className="d-flex">
                        {this.state.currentUser.userType === 'admin' ? (
                            window.location.pathname !== '/analytics' ? ( 
                                <a href='/analytics' className="no-decoration mr-5 p2">
                                    <i className="fa fa-bar-chart fa-2x" aria-hidden="true"></i>
                                </a>
                                ) : (
                                        <a href='/' className="no-decoration mr-5 p2">
                                            <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                                        </a>
                                    )): ('')}

                       
                        <a href='/' onClick={() => {
                            logout(this.state.currentUser._id)
                            localStorage.clear()
                            return <Redirect to='/' push={true} />
                        }} className="btn btn-outline-success" type="submit"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
                    </form>
                </div>
            </nav>
        );
    }
}
 
export default Navbar;