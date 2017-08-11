import React, { Component, ExecutionEnvironment } from 'react';

// App Component
import StarWarsPost from '../components/StarWarsPost'

export default class Home extends Component {

  constructor(){
    super();
    this.state = {
      peoples: [],
      next: ""
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  requestPeople = (targetUrl) => {
    fetch(targetUrl)
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        responseData.results.map((people, index) => {
          this.state.peoples.push(people);
        });
        this.setState({
          peoples: this.state.peoples,
          next: responseData.next
         });
      });
  };

  componentDidMount(){
    this.requestPeople('https://swapi.co/api/people/');
    window.addEventListener("scroll", this.handleScroll);
  };

  componentWillUnmount(){
    window.removeEventListener("scroll", this.handleScroll);
  };

  handleScroll(){
    const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      // Bottom reached
      console.log('Bottom reached');
      this.requestPeople(this.state.next);
    } else {
      // Not yet

    }
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
              var lastid;
              if (index === (this.state.peoples.length - 1)){
                lastid = "lastChild"
              }
              return(
                <StarWarsPost
                  lid = {lastid}
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
