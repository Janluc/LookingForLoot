import React, {Component} from 'react'
import axios from 'axios'


export default class UserCreate extends Component 
{
    constructor(props){
        super(props);

        this.state =
        {
            username: '',
            password: '',
            description: '',
            typeOfGamer: 'Casual'
            
        }
    }

    onChangeUsername    = (e) => this.setState({username: e.target.value})
    onChangePassword    = (e) => this.setState({password: e.target.value})
    onChangeDescription = (e) => this.setState({description: e.target.value})
    onChangeTypeOfGamer = (e) => this.setState({typeOfGamer: e.target.value})

    onSubmit = (e) =>
    {
        e.preventDefault()
        const User =
        {
            username:       this.state.username,
            password:       this.state.password,
            description:    this.state.description,
            typeOfGamer:    this.state.typeOfGamer
        }
        axios.post("http://localhost:5000/users/new", User)
        .then(res => 
        {
            if(res.status === 200)
            {
                window.sessionStorage.setItem("isAuthenticated", true)
                window.sessionStorage.setItem("username", res.data.username )
                window.sessionStorage.setItem("id", res.data._id)
                window.location = "/lookingforlooters"
            }
        })
    }



    render()
    {
        return(
            <div className="container">
                <br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input onChange={this.onChangeUsername} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" />
                        <small id="emailHelp" className="form-text text-muted">Make a unique username</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input onChange={this.onChangePassword} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <textarea onChange={this.onChangeDescription} className="form-control" name="" id=""rows="3"></textarea>
                        <small className="form-text text-muted">Enter a Description about yourself!</small>
                    </div>
                    <div className="form-group">
                    <select onChange={this.onChangeTypeOfGamer}className="form-control form-control-s">
                        <option value="Casual">Casual</option>
                        <option value="HardCore">HardCore</option>
                        <option value="Semi-Casual">Semi-Casual/HardCore</option>
                    </select>
                    </div>
                    
                    <input type="submit" value="Submit"  className="btn btn-primary" />
                    </form>
            </div>
        )
    }

}