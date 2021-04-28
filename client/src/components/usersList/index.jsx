import React, { Component } from 'react';
import { getUserList } from '../../dataService';
import UserItem from '../userItem';
import './userList.css';
import {deleteUser} from '../../dataService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

class UsersList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            usersList: []
        }
        
        
    }
    notify = (msg) => {
        toast.success(msg,{
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    componentDidMount() {
        this.getUsers = this.getUsers(this);
    }
     
    async getUsers() {
        await getUserList(this.props.token).then((result) => {
            this.setState({
                usersList: result.data
            })
        })
    }
    deleteUser = async (id) => {
        const token = JSON.parse(localStorage.getItem('accessToken')).accessToken
        const userList = this.state.usersList.filter(user => user._id !== id)
        await deleteUser(token, id).then((result) => {
          if(result.status) {
            this.setState({usersList: userList})
            this.notify('User deleted successfully');
          }
        })
      }
    render() { 
        return (
            <div className="user-list">
                {console.log(this.state.usersList)}
                {this.state.usersList.map(user =>
                    <UserItem key={user._id} name={user.fullName} onDelete={this.deleteUser} userId={user._id}/>)}
            </div>
        );
    }
}
 
export default UsersList;