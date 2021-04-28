import React, { Component } from 'react';
import Devices from './devices';
import LatestUsers from './latestUsers';
import RankUsers from './rankUsers';
import UsersRatio from './users';

class Analytics extends Component {

  render() {
    return ( 
        <div className="mb-4">
          <div className="row">
            <div className="col-md-6 col-sm-12 mt-4">
              <UsersRatio/>
            </div>
            <div className="col-md-6 col-sm-12 mt-4">
              <Devices/>
            </div>
            <div className="col-md-6 col-sm-12 mt-4">
              <RankUsers/>
            </div>
            <div className="col-md-6 col-sm-12 mt-4">
              <LatestUsers/>
            </div>
          </div>
        </div>
     );
    }
}
 
export default Analytics;