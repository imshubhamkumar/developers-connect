import React from 'react';
import './App.css';
import Navbar from './components/navBar';
import UserList from './components/usersList';
import useToken from "./components/app/userToken";
import Login from './components/login';
import {Switch, Route} from 'react-router-dom';
import Register from './components/registration';
import UserDetails from './components/userDetails';
import Analytics from './components/analytic';
import { toast } from 'react-toastify';
import jwt from 'jsonwebtoken';
import 'react-toastify/dist/ReactToastify.css';
import env from './config/env';
toast.configure();
function App() {
  const {token, setToken} = useToken();
  if(!token) {
    return (
      <Switch>
        <Route exact path={['/login', '/']}>
          <Login setToken={setToken}/>
        </Route>
        <Route exact path='/register' component={Register}/>
        
        <Route path="*" component={() => "404 NOT FOUND"} />
      </Switch>
    )
  } else {
    jwt.verify(JSON.parse(localStorage.accessToken).accessToken, env.SCERET,(err, data) => {
      if (err) {
        localStorage.clear();
        window.location.href='/'
      }
    })
    const currentUser= JSON.parse(localStorage.accessToken).user;
    return (
      <React.Fragment>
        <Navbar/>
        <main className="container">
          <Switch>
          <Route exact path='/'>
            <UserList token={token}/>
          </Route>
          <Route exact path='/details/:id'>
            <UserDetails/>
          </Route>
          {currentUser.userType === 'admin' ? (<Route exact path='/analytics'>
            <Analytics/>
          </Route>) : (<Route path="*" component={() => "Access forbidden"} />)}
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
