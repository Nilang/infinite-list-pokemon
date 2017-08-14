import React from 'react';

import {
  Panel,
  ProgressBar
  } from 'react-bootstrap';

const Loading = () => {
  return(
    <Panel>
      <ProgressBar active now={100} />
    </Panel>
  );
};

export default Loading;
