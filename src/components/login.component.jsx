import React, {Component} from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'


export default class Login extends Component 
{

    constructor(props)
    {
        super(props);

        this.state =
        {
            username: '',
            password: '',
            errorMessage:''
        }
    }

    onChangeUsername = (e) => this.setState({username: e.target.value})
    onChangePassword = (e) => this.setState({password: e.target.value})

    onSubmit = (e) =>
    {
        e.preventDefault();
        const logIn =
        {
            username: this.state.username,
            password: this.state.password
        }

        axios.post("http://localhost:5000/users/login", logIn)
        .then(res => 
        {
            if(res.status === 200)
            {
                window.sessionStorage.setItem("isAuthenticated", true)
                window.sessionStorage.setItem("username", res.data.username )
                window.sessionStorage.setItem("id", res.data._id)
                window.location = "/lookingforlooters"
            }
            throw "error"
        })
        .catch((err) =>
        {
            this.setState({
                username:"",
                password:"",
                errorMessage: "cannot log in"
            })
        })
    
    }

    render()
    {
        const isAuth = window.sessionStorage.getItem("isAuthenticated")

        if(isAuth)
            return <Redirect to="/" />
        return(
            <div className="container">
                <br/>
                <form onSubmit ={this.onSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" 
                               className="form-control border-top-0 border-right-0"
                               value ={this.state.username} 
                               onChange ={this.onChangeUsername}
                               placeholder="Enter Username" />

                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" 
                        className="form-control" 
                        id="exampleInputPassword1"
                        value={this.state.password}
                        onChange = {this.onChangePassword} 
                        placeholder="Password" />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Log In!" />
                    </form>

                    <p>{this.state.errorMessage}</p>
            </div>
        )
    }
}