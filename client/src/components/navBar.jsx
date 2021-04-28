import React, { Component } from 'react';
import { Redirect } from 'react-router';

class Navbar extends Component {
    render() { 
        return (
            <nav className="navbar navbar-dark bg-dark text-white">
                <div className="container-fluid">
                    <h5>Navbar</h5>
                    <form className="d-flex">
                        {window.location.pathname !== '/analytics' ? ( 
                        <a href='/analytics' className="no-decoration mr-5 p2">
                            <i className="fa fa-bar-chart fa-2x" aria-hidden="true"></i>
                        </a>
                        ) : (
                             <a href='/' className="no-decoration mr-5 p2">
                             <i className="fa fa-home fa-2x" aria-hidden="true"></i>
                         </a>
                        )}
                       
                        <a href='/' onClick={() => {
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