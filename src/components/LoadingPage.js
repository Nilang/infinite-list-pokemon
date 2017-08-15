import React from 'react';
import PropTypes from 'prop-types';
import {
  ProgressBar,
  Panel
  } from 'react-bootstrap';

const Loading = (props) => {
  return(
    <Panel>
      <h3 className="loading_title">Pokedex</h3>
      <p>We are getting ready...</p>
      <ProgressBar active now={props.progress} />
    </Panel>
  );
};

Loading.propTypes = {
  progress: PropTypes.number.isRequired
};

export default Loading;
