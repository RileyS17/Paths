import React from 'react';
import './ControlButton.css'

const ControlButton = (props) => {
    return (
        <button className="controlButton" onClick={props.clickFunc}>
            {props.name}
        </button>
    );
};

export default ControlButton;