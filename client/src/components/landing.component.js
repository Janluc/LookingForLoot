import React, {Component} from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();


export default class Landing extends Component 
{
    render()
    {
        return(
            <div>
                <header className="bg-primary text-white">
                    <div className="container text-center">
                    <h1>Looking for Loot!</h1>
                    <p className="lead">Meet other players that are looking for groups!</p>
                    </div>
                </header>

                <section id="about">
                    <div className="container">
                    <div className="row" data-aos="fade-right">
                        <div className="col-lg-8 mx-auto">
                        <h2>Meet people!</h2>
                        <p className="lead">
                            Create an account and get started looking for players!
                        </p>
                        <ul>
                            <li>Find people that are playing the same game as you</li>
                            <li>Learn the availability of other players and find one that matches you!</li>
                            <li>Casual or Hardcore, find the perfect group and get that loot!</li>

                        </ul>
                        </div>
                    </div>
                    </div>
                </section>
                
                <footer className="py-5 bg-dark">
                    <div className="container">
                    </div>
                
                </footer>

            </div>
        )
    }

}