import React, { useState } from "react";
import { loginUser } from "../../dataService";
import './login.css'
import PropTypes from 'prop-types';

const Login = ({setToken}) => {
const [email, setUserName] = useState();
const [password, setPassword] = useState();

const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
        email,
        password
    })
    setToken(token)
}
    return (
      <div className="login-main">
        <p className="sign" align="center">
          Sign in
        </p>
        <form className="form1" onSubmit={handleSubmit}>
          <input
            className="un"
            type="text"
            align="center"
            placeholder="Username"
            onChange={e => setUserName(e.target.value)}
          />
          <input
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="submit" align="center">
            Sign in
          </button>
          <p className="forgot" align="center">
            <a href="/register">Create an account</a>
          </p>
        </form>
      </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;
