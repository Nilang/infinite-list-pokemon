// Library
import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'react-bootstrap';

// not found is component called when the route didn't find match path.
const NotFound = () => {
  return(
    <Jumbotron>
      <h1>Page not found!</h1>
      <p>Maybe you type it wrong, check again bro.</p>
      <p><Link to="/" className="btn primary">Back to Home</Link></p>
    </Jumbotron>
  );
}

export default NotFound;
