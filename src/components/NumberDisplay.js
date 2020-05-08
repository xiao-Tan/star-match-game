import React from 'react';

//extracting NumberDisplay components
const NumberDisplay = (props) => {
  return (
    <React.Fragment>
      <button
        className="number"
        style={{ backgroundColor: colors[props.status] }}
        onClick={() => props.onClick(props.number, props.status)}
      >
        {props.number}
      </button>
    </React.Fragment>
  );
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

export default NumberDisplay;
