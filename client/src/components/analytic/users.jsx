import React, { Component } from 'react';
import Chart from "react-apexcharts";
import './analytic.css'
import {getTotalUsers} from '../../dataService';
import 'react-toastify/dist/ReactToastify.css';import { css } from "@emotion/react";
import MoonLoader from "react-spinners/MoonLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class UsersRatio extends Component {
    constructor(props) {
        super(props)
        this.state ={
            options: {
                chart: {
                  type: 'bar'
                },
                xaxis: {
                    categories: ['Total Users', 'Active Users']
                  }
              },
              series: [
                {
                    name: 'Users',
                    data: [0, 0]
                  }
              ],
              loading: true
        }
    }
    componentDidMount() {
        
        this.getTotalUsers = this.getTotalUsers(this);
      }
    getTotalUsers = async () => {
        const token = JSON.parse(localStorage.getItem('accessToken')).accessToken
        await getTotalUsers(token).then((result) => {
          this.setState({
            series: [
                {
                    name: 'Users',
                    data: [result.data.totalUsers, result.data.activeUsers]
                  }
              ],
              loading: false
           })
        })
      }
    
      
    render() {
        return ( 
            <div className="card chart-container">
                <div className="card-body">
                  <div className={this.state.loading? 'sweet-loading': ''}>
                      <MoonLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />
                  </div>
                  <Chart options={this.state.options} series={this.state.series} type={this.state.options.chart.type} width="500"/>
                </div>
            </div>
         );
    }
}
 
export default UsersRatio;