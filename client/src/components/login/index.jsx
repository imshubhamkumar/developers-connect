import React, { useState } from "react";
import { loginUser } from "../../dataService";
import './login.css'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const Login = ({setToken}) => {
const [email, setUserName] = useState();
const [password, setPassword] = useState();

const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
        email,
        password
    })
    if (!token.status) {
      notify(token.errors, 'error', 'top-center', false, true)
    } else {
      notify(token.message, 'success', 'bottom-right', '5000', false)
    }
    setToken(token)
}
const notify = (msg, type, location, timer, progressBar) => {
  toast[type](msg,{
      position: location,
      autoClose: timer,
      hideProgressBar: progressBar,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
  });
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
