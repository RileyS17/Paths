import React from 'react';
import './ControlBar.css'
import ControlButton from './ControlButton'
import ControlSlider from './ControlSlider'

const ControlBar = (props) => {
    return (
        <header className="controlBar">
            <nav className="controlBar_nav">
                <ControlSlider onNumVertChange={props.onNumVertChange}/>
                <ControlButton name="New" clickFunc={props.genGraphFunc}/>
                <ControlButton name="Reset" clickFunc={props.softReset}/>
                <ControlButton name="Help" clickFunc={props.openHelp}/>
                <ControlButton name="Settings"/>
            </nav>
        </header>
    );
};

export default ControlBar;