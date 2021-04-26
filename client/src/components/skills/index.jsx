import React, { Component } from 'react';
import './skills.css'

class Skills extends Component {
    render() { 
        return (  
            <div>
                <div className="card card-block d-flex skill-card">
                    <div className="card-body ">
                    <div className="card-title font-weight-bold align-items-center d-flex justify-content-center">
                        {this.props.skillName}
                    </div>
                        <span className="score-text align-items-center d-flex justify-content-center">{this.props.skillScore}</span>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Skills;