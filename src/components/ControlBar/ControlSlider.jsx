import React, {useState} from 'react';
import './ControlSlider.css'

const ControlSlider = (props) => {
    const [value, setValue] = useState(5);

    const handleChange = (e) => {
        setValue(e.target.value);
        props.onNumVertChange(e.target.value);
    }
    return (
        <div className="controlSlider_main">
            <div className="sliderText">{value}</div>
            <div className="sliderDiv">
                <input type="range" min="4" max="17" value={value} className="slider" onChange={handleChange} />
            </div>
        </div>
    );
};

export default ControlSlider;