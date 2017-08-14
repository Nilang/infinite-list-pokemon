import React from 'react';

import {
  ListGroup,
  Panel,
  ProgressBar,
  Well
  } from 'react-bootstrap';

// App Component
import ListGroup2Item from './ListGroup2Item';

const Loading = () => {
  return(
    <Well>
      <ListGroup>
        <ListGroup2Item label="ID" value={'...'}/>
        <ListGroup2Item label="Name" value={'...'}/>
        <ListGroup2Item label="Height" value={'...'}/>
        <ListGroup2Item label="Weight" value={'...'}/>
        <ListGroup2Item label="Base Experience" value={'...'}/>
      </ListGroup>
      <ProgressBar active now={100} />
    </Well>
  );
};

export default Loading;
