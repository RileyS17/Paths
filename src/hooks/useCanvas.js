import { useRef, useEffect } from 'react'

export const canvasWidth = window.innerWidth - 30;
export const canvasHeight = window.innerHeight - 75;

let frameCount = 0;
const FPS_INTERVAL = 1000 / 60; //60FPS cap
let then = Date.now()

const useCanvas = (draw, getGraphData, setSuccess) => {

	const canvasRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		let animationFrameId;
		canvas.width = window.innerWidth - 30;
		canvas.height = window.innerHeight - 75;

		const render = () => {
			const now = Date.now();
			const elapsed = now - then;
			if (elapsed > FPS_INTERVAL) {
				then = now - (elapsed % FPS_INTERVAL);
				frameCount++;
				let { vertexList, edgeList, mouseXy, clickXy } = getGraphData();
				if (draw(context, frameCount, vertexList, edgeList, mouseXy, clickXy)) { setSuccess() }
			}
			animationFrameId = window.requestAnimationFrame(render);
		}
		render()

		return () => {
			window.cancelAnimationFrame(animationFrameId);
		}
	}, [draw, getGraphData, setSuccess])

	return [canvasRef];
}

export default useCanvas;