import React, { Component } from 'react';
import Chart from "react-apexcharts";
import {getUserDevices} from '../../dataService';
import './analytic.css'
class Devices extends Component {
  constructor(props) {
    super(props)
    this.state ={
      options: {
        chart: {
          type: 'pie'
        },
        labels: ['Desktop', 'Tablet', 'Mobile']
      },
      series: [0, 0, 0]
    }
}
componentDidMount() {
    
    this.getTotalUsers = this.getUserDevices(this);
  }
  getUserDevices = async () => {
    await getUserDevices(this.token).then((result) => {
        this.setState({
          series: [result.data.desktop, result.data.tablat, result.data.mobile]
         })
    })
  }
  render() {
    return ( 
        <div className="card chart-container">
            <div className="card-body">
                <Chart options={this.state.options} series={this.state.series} type={this.state.options.chart.type} width="500"/>
            </div>
        </div>
     );
  }
}
 
export default Devices;