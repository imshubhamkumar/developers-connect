import React, { Component } from "react";
import "../../App.css";
import "./userItem.css";

class UserItem extends Component {
  constructor(props) {
    super(props)
    this.state={
      url: `details/${props.userId}`
    }
  }

  
  
  render() {
    return (
      <div>
          <div className="card main-card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-10">
              <a href={this.state.url} className="remove-underline">
              <div className="row">
                  <div className="col-md-2">
                    <div className="user-img">
                        <span className="avatar gd-primary">
                            <img
                                src="https://img.icons8.com/color/48/000000/administrator-male.png"
                                alt="."
                            />
                        </span>
                    </div>
                </div>
                  <div className="col-md-8">
                    <div className="user-item-name remove-underline">
                        <h5>{this.props.name}</h5>
                    </div>
                </div>
              </div>
              </a>
              </div>
              
                <div className="col-md-2 user-item-name">
                  <i className="fa fa-trash fa-2x" aria-hidden="true" onClick={() => this.props.onDelete(this.props.userId)}></i>
                </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default UserItem;
