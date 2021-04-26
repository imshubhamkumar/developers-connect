import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './registration.css'
import SignUpForm from './signUpForm';
import FormValidators from './validator';
import { signUpUser } from '../../dataService';
const validateSignUpForm = FormValidators.validateSignUpForm;
const zxcvbn = require('zxcvbn');

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            educationLavel: [
                {name:'Some High School'},
                {name:'High School Diploma / GED'},
                {name:'Some college'},
                {name:'Associate degree'},
                {name:'Bachelor\'s degree'},
                {name:'Master\'s degree or Higher'}
            ],
            errors: {},
          user: {
            fullName: '',
            email: '',
            password: '',
            education: '',
            location: '',
            university: '',
            cs: '',
            ss: '',
            sa: '',
            ds: 0,
            algo: 0,
            cpp: 0,
            html: 0,
            java: 0,
            js: 0,
            py: 0,
            deviceType: this.getDeviceType()
          },
          btnTxt: "show",
          type: "password",
          score: "0"
         }
         this.pwMask = this.pwMask.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.validateForm = this.validateForm.bind(this);
         this.pwHandleChange = this.pwHandleChange.bind(this);
         this.submitSignup = this.submitSignup.bind(this);
         this.getDeviceType = this.getDeviceType(this);
    }


     handleChange(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
    
        this.setState({
          user
        });
      }
    
      pwHandleChange(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
    
        this.setState({
          user
        });
    
        if (event.target.value === "") {
          this.setState(state =>
            Object.assign({}, state, {
              score: "null"
            })
          );
        } else {
          var pw = zxcvbn(event.target.value);
          this.setState(state =>
            Object.assign({}, state, {
              score: pw.score + 1
            })
          );
        }
      }

      async submitSignup(user) {
        const params = { 
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            location: user.location,
            education: user.education,
            university: user.university,
            cs: user.cs,
            ss: user.ss,
            sa: user.sa,
            ds: user.ds,
            algo: user.algo,
            cpp: user.cpp,
            html: user.html,
            java: user.java,
            js: user.js,
            py: user.py,
            deviceType: user.deviceType
        }
        await signUpUser(params).then((result) =>{
          if(result.status) {
            <Redirect to="/login"/>
          }
        })
      }

      getDeviceType() {
        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
          return "tablet";
        }
        if (
          /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
          )
        ) {
          return "mobile";
        }
        return "desktop";
      };

     validateForm(event) {
        event.preventDefault();
        var payload = validateSignUpForm(this.state.user);
        if (payload.success) {
          this.setState({
            errors: {}
          });
          var user = {
            fullName: this.state.user.fullName,
            email: this.state.user.email,
            password: this.state.user.password,
            location: this.state.user.location,
            education: this.state.user.education,
            university: this.state.user.university,
            cs: this.state.user.cs,
            ss: this.state.user.ss,
            sa: this.state.user.sa,
            ds: this.state.user.ds,
            algo: this.state.user.algo,
            cpp: this.state.user.cpp,
            html: this.state.user.html,
            java: this.state.user.java,
            js: this.state.user.js,
            py: this.state.user.py,
            deviceType: this.state.user.deviceType
          };
          this.submitSignup(user);
        } else {
          const errors = payload.errors;
          this.setState({
            errors
          });
        }
      }
      pwMask(event) {
        event.preventDefault();
        this.setState(state =>
          Object.assign({}, state, {
            type: this.state.type === "password" ? "input" : "password",
            btnTxt: this.state.btnTxt === "show" ? "hide" : "show"
          })
        );
      }
    render() { 
        return (
        <div>
            <SignUpForm
            onSubmit={this.validateForm}
            onChange={this.handleChange}
            onPwChange={this.pwHandleChange}
            errors={this.state.errors}
            user={this.state.user}
            score={this.state.score}
            btnTxt={this.state.btnTxt}
            type={this.state.type}
            pwMask={this.pwMask}
            />
      </div>
          );
    }
}
 
export default SignUp;