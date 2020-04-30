import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "startbootstrap-scrolling-nav/css/scrolling-nav.css";


import Navbar           from "./components/navbar.component"
import LoginComponent   from "./components/login.component"
import landingComponent from "./components/landing.component"
import userList         from "./components/userList.component"
import userCreate       from "./components/userCreate.component"
import userProfile      from "./components/userProfile.component.jsx"




class App extends Component {
  constructor(props){
    super(props)
    this.state =
    {
      isLoggedIn: false,
      user: null
    }
  }




  render()
  {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <br/>
            <Route path="/" exact component={landingComponent} />
            <Route path="/login" component={LoginComponent}/>
            <Route path="/lookingforlooters" component={userList} />
            <Route path="/newlooter" component={userCreate} />
            <Route path="/looter/:id" component={userProfile} />
        </Router>

      </div>
    );
}}

export default App;
