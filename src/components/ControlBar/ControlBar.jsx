import React from 'react';
import './ControlBar.css'
import ControlButton from './ControlButton'
import ControlSlider from './ControlSlider'

const ControlBar = (props) => {
    return (
        <header className="controlBar">
            <nav className="controlBar_nav">
                <button className="difficulty_tag">Difficulty</button>
                <ControlSlider onNumVertChange={props.onNumVertChange}/>
                <ControlButton name="New" clickFunc={props.genGraphFunc}/>
                <ControlButton name="Reset" clickFunc={props.softReset}/>
                <ControlButton name="Help" clickFunc={props.openHelp}/>
                
            </nav>
        </header>
    );
};

export default ControlBar;