import React, { Component } from "react";
import "./userdetails.css";
import Skills from '../skills';
import { css } from "@emotion/react";
import {getUserDetails} from '../../dataService';
import MoonLoader from "react-spinners/MoonLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class UserDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      location: '',
      university: '',
      fullName: '',
      followers: '',
      following: '',
      rank: '',
      votes: '',
      cs: '',
      ss: '',
      as: '',
      skills: [],
      currentUser: JSON.parse(localStorage.accessToken).user,
      loading: true
    };
  }
  componentDidMount() {
    this.getDetails = this.getDetails(this);
  }
  async getDetails() {
    const id = (new URL(window.location.href)).pathname.split('/')[2]
    const token = JSON.parse(localStorage.getItem('accessToken')).accessToken
    await getUserDetails(token, id).then((result) => {
            this.setState({
                userId: result.data._id,
                location: result.data.location,
                fullName: result.data.fullName,
                university: result.data.university,
                followers: result.data.followers.length,
                following: result.data.following.length,
                rank: result.data.rank,
                votes: result.data.votes,
                cs: result.data.challengesSolved,
                ss: result.data.solutionSubmitted,
                sa: result.data.solutionAccepted,
                skills: [
                  {id: Math.random().toString(36).substring(2, 7), name:'JavaScript', score: result.data.javascript},
                  {id: Math.random().toString(36).substring(2, 7), name:'C++', score: result.data.cpp},
                  {id: Math.random().toString(36).substring(2, 7), name:'Algorithem', score: result.data.algorithms},
                  {id: Math.random().toString(36).substring(2, 7), name:'Data Structure', score: result.data.dataStructure},
                  {id: Math.random().toString(36).substring(2, 7), name:'Java', score: result.data.java},
                  {id: Math.random().toString(36).substring(2, 7), name:'Python', score: result.data.python},
                  {id: Math.random().toString(36).substring(2, 7), name:'HTML', score: result.data.html}
                ],
                loading: false
            })
        })
  }
  render() {
    return (
      <div>
        <div className={this.state.loading? 'sweet-loading': ''}>
          <MoonLoader css={override} size={150} color={"#123abc"} loading={this.state.loading} />
        </div>
        <div className="card mt-4 main-card-user-detail">
          <div className="row">
            <div className="col-md-2 col-sm-12 bg-c-lite-green p-2">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="Admin"
                className="rounded-circle"
                width="150"
              />
            </div>
            <div className="col-md-5 col-sm-12 p-2">
              <h4>{this.state.fullName}</h4>
              <div className="row">
                <div className="col-lg-4">
                  <i className="fa fa-map-marker">{this.state.location}</i>
                </div>
                <div className="col-lg-6">
                  <i className="fa fa-graduation-cap">{this.state.university}</i>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  {this.state.followers} <span className="badge badge-secondary">Followers</span>
                </div>
                <div className="col-lg-6">
                {this.state.following} <span className="badge badge-secondary">Following</span>
                </div>
              </div>
              <div className="row">
                  <div className="col-lg-6">
                        <div className="rank-container">
                            Rank: <span className="rank-text">{this.state.rank}</span>
                        </div>
                  </div>
                  <div className="col-lg-6">
                        <div className="rank-container">
                            Votes: <span className="rank-text">{this.state.votes}</span>
                        </div>
                  </div>
              </div>
            </div>
            <div className="col-md-5 col-sm-12 p-2">
              <div>
                <label htmlFor="cs">Challenges solved: </label>
                <span id="cs">{this.state.cs}</span>
              </div>
              <div>
                <label htmlFor="ss">Solutions submitted: </label>
                <span id="ss">{this.state.ss}</span>
              </div>
              <div>
                <label htmlFor="sa">Solutions accepted: </label>
                <span id="sa">{this.state.sa}</span>
              </div>
              {this.state.currentUser._id !== this.state.userId ? (
                              <div className="row">
                              <div className="col-sm-6">
                                <button type="button" className="btn btn-primary">
                                <i className="fa fa-plus" aria-hidden="true"></i> Follow
                                </button>
                              </div>
                              <div className="col-sm-6">            
                                    <button type="button" className="btn btn-primary">
                                    <i className="fa fa-arrow-up" aria-hidden="true"></i> Upvote
                                    </button>
                              </div>
                          </div>
              ) : ("")}


            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3>Skills</h3>
          <div className="row">
            {this.state.skills.map(skill => <div className="col-md-4 col-sm-6">
              <Skills key={skill.id} skillName={skill.name} skillScore={skill.score}/></div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetails;
