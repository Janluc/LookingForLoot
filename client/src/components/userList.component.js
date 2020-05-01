import React, {Component} from 'react'
import axios from 'axios';


const User = props => 
(
    <tr data-aos="fade">
        <td>{props.user.profile.inGameName}</td>
        <td>{props.user.profile.preferredGame}</td>
        <td>{props.user.profile.typeOfGamer}</td>
    </tr>
)

export default class UserList extends Component 
{
    constructor(props)
    {
        super(props)

        this.state = 
        {
            users: [],
            gameSearch: "",
            typeOfGamer: ""
        };
    }

    componentDidMount()
    {
        axios.get("/users")
        .then(res => 
        {
            if (res.status === 200)
                this.setState({users: res.data})
        })
    }

    onChangeGameSearch      = (e) => this.setState({gameSearch: e.target.value})
    onTypeOfGamerSearch     = (e) => this.setState ({typeOfGamer: e.target.value})
    
    listUsers = () => {
        return this.state.users.map(currentUser => 
        {
            if (currentUser.lfg === true)
            {
                if (this.state.gameSearch != "" && this.state.typeOfGamer === "" && currentUser.profile.preferredGame.toLocaleLowerCase().includes(this.state.gameSearch.toLocaleLowerCase()))
                    return <User user={currentUser}/>
                
                else if (currentUser.profile.typeOfGamer === this.state.typeOfGamer)
                {
                    if (currentUser.profile.preferredGame.toLocaleLowerCase().includes(this.state.gameSearch.toLocaleLowerCase()))
                        return <User user={currentUser}/>
                }
                
                else if (this.state.gameSearch === "" && this.state.typeOfGamer === "")
                    return <User user={currentUser}  />
            }
        })
    }

    render()
    {
        return(
            <div className="container">
                <h4 className="mt-3">Filter</h4>
                <div class ="input-group mt-1 mb-3">
                    
                    <input type="text"
                            placeholder="Name of Game"
                        onChange={this.onChangeGameSearch}
                        value={this.state.gameSearch}
                        />

                    <select className="ml-3"
                            onChange={this.onTypeOfGamerSearch} 
                            value={this.state.typeOfGamer}>
                        <option value="">Type of Gamer</option>
                        <option value="Casual">Casual</option>
                        <option value="HardCore">HardCore</option>
                        <option value="Semi-Casual">Semi-Casual/HardCore</option>
                    </select>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">In Game Name</th>
                        <th scope="col">Game</th>
                        <th scope="col">Type of Gamer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.listUsers()}
                    </tbody>
                </table>
            </div>

        )
    }

}