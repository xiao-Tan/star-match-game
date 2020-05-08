import React from 'react';
import utils from '../math-utils';

//extracting StarDisplay components
const StarDisplay = (props) => {
  return (
    <React.Fragment>
      {utils.range(1, props.stars).map((starId) => (
        <div key={starId} className="star" />
      ))}
    </React.Fragment>
  );
};

export default StarDisplay;
