import React, { Component } from 'react';
import Devices from './devices';
import LatestUsers from './latestUsers';
import RankUsers from './rankUsers';
import UsersRatio from './users';
import * as DataService from '../../dataService';

class Analytics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getLatestUser: [],
      getTopUsers: [],
      getTotalUsers:[],
      getUserDevices:[]
    }
  }
  componentDidMount() {
    this.getLatestUser = this.getLatestUser(this);
    this.getTopUsers = this.getTopUsers(this);
    this.getUserDevices = this.getUserDevices(this);
  }
  token = JSON.parse(localStorage.getItem('accessToken')).accessToken;

  getLatestUser = async () => {
    await DataService.getLatestUser(this.token).then((result) => {
      this.setState({getLatestUser: result.data })
    })
  }
  getTopUsers = async () => {
    await DataService.getTopUsers(this.token).then((result) => {
      this.setState({getTopUsers: result.data })
    })
  }
  getUserDevices = async () => {
    await DataService.getUserDevices(this.token).then((result) => {
      this.setState({getUserDevices: result.data })
    })
  }
  
  render() {
    return ( 
        <div className="mb-4">
          <div className="row">
            <div className="col-md-6 col-sm-12 mt-4">
              <UsersRatio getTotalUser={this.state.getTotalUsers}/>
            </div>
            <div className="col-md-6 col-sm-12 mt-4">
              <Devices getUserDevices={this.state.getUserDevices}/>
            </div>
            <div className="col-md-6 col-sm-12 mt-4">
              <RankUsers getTopUsers={this.state.getTopUsers}/>
            </div>
            <div className="col-md-6 col-sm-12 mt-4">
              <LatestUsers getLatestUser={this.state.getLatestUser}/>
            </div>
          </div>
        </div>
     );
    }
}
 
export default Analytics;