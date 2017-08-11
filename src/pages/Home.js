import React, { Component } from 'react';
import Axios from 'axios';

// App Component
import StarWarsPost from '../components/StarWarsPost'

export default class Home extends Component {

  constructor(){
    super();
    this.state = {
      peoples: []
    };
  }

  componentDidMount(){
    var targetUrl = 'https://swapi.co/api/people/';
    fetch(targetUrl)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        this.setState({ peoples: responseData.results })
      });
  }

  render(){
    return(
      <div>
        <div className="header">
          Header
        </div>
        <div className="body">
          <div className="list_container">
            {this.state.peoples.map((people, index) => {
              return(
                <StarWarsPost
                  name={people.name}
                  gender={people.gender}
                  birth_year={people.birth_year}
                  />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
};
