import React from 'react';
import useCanvas, { canvasHeight, canvasWidth } from '../../hooks/useCanvas';

const Canvas = (props) => {
    const { draw, graphData, setSuccess } = props;
    const [canvasRef] = useCanvas(draw, graphData, setSuccess);

    return (<canvas ref={canvasRef} />);
};

export const getWindow = () => {
    return [canvasWidth, canvasHeight];
};

export default Canvas;