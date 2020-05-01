import React, {Component} from 'react'
import axios from 'axios'
import './custom.css'



export default class UserProfile extends Component 
{

    constructor(props) 
    {
        super(props);
        this.state = 
        {
            username: '',
            description: '',
            inGameName: '',
            gamesPlayed: '',
            typeOfGamer: '',
            preferredGame: '',
            lfg: false,
            editMode: false,
            formVisible: false
        }
    }

    async componentDidMount()
    {
        axios.get("/users/" + this.props.match.params.id)
        .then(res => 
        {
            if (res.status === 200)
            {
                this.setState({
                    username:       res.data.username,
                    description:    res.data.profile.description,
                    inGameName:     res.data.profile.inGameName,
                    typeOfGamer:    res.data.profile.typeOfGamer,
                    preferredGame:  res.data.profile.preferredGame,
                    lfg:            res.data.lfg
                })
            }
        })
    }
    
    setEdit                 = ()  => this.setState({editMode:true})
    onChangeInGameName      = (e) => this.setState({inGameName: e.target.value})
    onChangeDescription     = (e) => this.setState({description: e.target.value})
    onChangeTypeOfGamer     = (e) => this.setState({typeOfGamer: e.target.value})
    onChangePreferredGame   = (e) => this.setState({preferredGame: e.target.value})
    onChangeLFG             = (e) => this.setState({lfg: !this.state.lfg})
    
    toggleForm = ()  => this.setState(prevState => ({ formVisible: !prevState.formVisible}))
    
    onSubmit = (e) => 
    {
        e.preventDefault()
        
        const User = 
        {
            description:    this.state.description,
            inGameName:     this.state.inGameName,
            typeOfGamer:    this.state.typeOfGamer,
            preferredGame:  this.state.preferredGame,
            lfg:            this.state.lfg
        }

        axios.put("/users/edit/" + this.props.match.params.id, User)
        .then(res => console.log(res.data))

        this.setState({formVisible: false})
    }



    render()
    {
        const idOwner = window.sessionStorage.getItem("id")

        if(idOwner === this.props.match.params.id )
        {
                return(
                
                    <div>
                        <div className="jumbotron"></div>
                        <div className="container">
                            <form onSubmit={this.onSubmit}>
                            <br/>
                            <div className="row">
                                <div className="col-2 border-right">
                                    
                                    <p>{this.state.description}</p>
                                        <textarea className ={this.state.formVisible ? "form-control profileForm" : "form-control profileFormhidden"} 
                                            onChange={this.onChangeDescription} 
                                            value={this.state.description}
                                            rows="10">
                                        </textarea>

                                </div>
            
                                <div className="col-10">
                                    <div className="row">
                                        <div className="col-12 text-center mb-5">
                                            <h1>{this.state.username}</h1>
                                        </div>
                                    </div>
                                    <a className="float-right" onClick={this.toggleForm} href="#">Edit</a>
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <h3>Type Of Gamer</h3>
                                            <h5>{this.state.typeOfGamer}</h5>
                                            <select className={this.state.formVisible ? "form-control mt-2 mb-2 profileForm" : "form-control mt-2 mb-2 profileFormhidden"} 
                                                onChange={this.onChangeTypeOfGamer} 
                                                value={this.state.typeOfGamer}>

                                                <option value="Casual">Casual</option>
                                                <option value="HardCore">HardCore</option>
                                                <option value="Semi-Casual">Semi-Casual/HardCore</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="border container">
                                        <div className="row">
                                            <div className="col-12 text-center">
                                                <h3>Game Info</h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <h3>Currently Playing</h3>
                                                <h5>{this.state.preferredGame}</h5>
                                                    <input className={this.state.formVisible ? "m-2 form-control profileForm" : "form-control profileFormhidden"} 
                                                        onChange={this.onChangePreferredGame} 
                                                        value={this.state.preferredGame}
                                                    />
                                            </div>
                                        </div>
                
                                        <div className="row">
                                            <div className="col-12">
                                                <h3>In-Game Name</h3>
                                                <h5>{this.state.inGameName}</h5>
                                                <input className={this.state.formVisible ? "m-2 form-control profileForm" : "form-control profileFormhidden"} 
                                                    type="text" 
                                                    onChange={this.onChangeInGameName} 
                                                    value={this.state.inGameName} 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 text-center  ">
                                            <h3>LFL?</h3>
                                            {this.state.lfg ?
                                            <h6>Yes!</h6> : <h6>No :(</h6>}

                                            <input className={this.state.formVisible ? "form-control profileForm" : "form-control profileFormhidden"} 
                                                type="checkbox" 
                                                onChange={this.onChangeLFG} 
                                                checked={this.state.lfg} 
                                            />
                                                
                                            <input  className={this.state.formVisible ? "btn btn-danger profileForm float-right" : "btn btn-danger float-right profileFormhidden"} 
                                                type="submit" 
                                                value="Edit" 
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>


                            </form>

                        </div>
                    </div>
                )
            } else {
                return(
                <div className="container">
                    <br/>
                    <div className="row">
                        <div className="col-2 border-right">
                            <h2 className="text-wrap">{this.state.username}</h2>
                            <p>{this.state.description}</p>
                        </div>

                        <div className="col-10">
                            <div className="row">
                                <div className="col-12 text-center mb-3">
                                    <h3>Type Of Gamer</h3>
                                    <h5>{this.state.typeOfGamer}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <h3>Currently Playing</h3>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 text-center">
                                    <h3>In-Game Name</h3>
                                    <h5>{this.state.inGameName}</h5>

                                </div>
                            </div>
                                <div className="row">
                                    <div className="col-12 text-center  ">
                                        <h3>LFL?</h3>
                                        {this.state.lfg ?
                                            <h2>Yes!</h2> : <h2>No :(</h2>}
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>)
            }
    }

}