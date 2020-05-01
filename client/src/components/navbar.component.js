import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default class Navbar extends Component 
{
    constructor(props)
    {
        super(props);

        this.state = {nav: false}
    }

    onLogout = (e) => 
    {
        axios.get("/users/logout")
        .then(res => 
        {
            if (res.status === 200)
            {
                window.sessionStorage.clear()
                window.location ="/"
            }
        })
    }

    toggleCollapse = () => this.setState(prevState => ({ nav: !prevState.nav}))

    render()
    {
        const isAuth = window.sessionStorage.getItem("isAuthenticated");
        const username = window.sessionStorage.getItem("username");
        const id = window.sessionStorage.getItem("id")

        const profile = "/looter/" + id


        if(isAuth)
        {
            return(
            <div className="mb-4">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                    <div className="container">
                    <Link className="navbar-brand" to="/lookingforlooters" >Looking4Loot</Link>
                    <button className="navbar-toggler" type="button" onClick={this.toggleCollapse} >
                            <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={this.state.nav ? "navbar-collapse" : "navbar-collapse collapse"} id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={this.onLogout}>Logout</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={profile} onClick={this.toggleCollapse}>{username}</Link>
                        </li>
                        </ul>
                    </div>
                    </div>
                </nav>
                
            </div>
        )} else{
            return(
                <div className="mb-4">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                        <div className="container">
                        <Link className="navbar-brand" to="/">Looking4Loot</Link>
                        <button className="navbar-toggler" type="button" onClick={this.toggleCollapse} >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={this.state.nav ? "navbar-collapse" : "navbar-collapse collapse"} id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/login" onClick={this.toggleCollapse}>Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/newlooter" onClick={this.toggleCollapse}>Sign Up</Link>
                             </li>
                            </ul>
                        </div>
                        </div>
                    </nav>
                    
                </div>
            )
        }
    }

}