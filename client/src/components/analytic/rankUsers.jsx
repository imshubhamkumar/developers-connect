import React, { Component } from 'react';
import {getTopUsers} from '../../dataService';
import 'react-toastify/dist/ReactToastify.css';import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class RankUsers extends Component {
    constructor(props) {
        super(props)
        this.state ={
            rankUsers: [],
            loading: true
        }
    }
    componentDidMount() {
        
        this.getTopUsers = this.getTopUsers(this);
      }
      getTopUsers = async () => {
          const token = JSON.parse(localStorage.getItem('accessToken')).accessToken
          await getTopUsers(token).then((result) => {
          this.setState({rankUsers: result.data,
            loading: false })
          })
    }
      render() {
          return ( 
              <div className='card chart-container'>
                  <div className="card-header">
                      <h4>Top 10 Hackers</h4>
                  </div>
                  <div className='card-body'>
                    <div className={this.state.loading? 'sweet-loading': ''}>
                        <MoonLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />
                    </div>
                      <div className="table-responsive">
                          <table className="table">
                              <thead className="thead-dark">
                              <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Education</th>
                                  <th scope="col">Location</th>
                                  <th scope="col">Total Score</th>
                                  <th scope="col">Device</th>
                              </tr>
                          </thead>
                              <tbody>
                              {this.state.rankUsers.map((user, index) => 
                                  <tr>
                                      <th scope="row">{index + 1}</th>
                                      <td>{user.fullName}</td>
                                      <td>{user.email}</td>
                                      <td>{user.university}</td>
                                      <td>{user.location}</td>
                                      <td>{user.percentile}</td>
                                      <td>{user.deviceType}</td>
                                  </tr>)}
                              </tbody>
                          </table>
                      </div>
                  </div>
              </div>
          );
      }
}
 
export default RankUsers;