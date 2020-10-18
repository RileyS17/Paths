import React, {useState} from 'react';
import "./App.css";
import ControlBar from './components/ControlBar/ControlBar';
import Canvas, {getWindow} from './components/Canvas/Canvas';
import RandomEulerGraph from './graph/RandomEulerGraph';
import {draw, resetGraphStatus} from './components/Canvas/DrawLogic';
import Modal from 'react-modal';

Modal.setAppElement('#root');
let canceledWin = false;

let numberOfVertecies = 5;
const handleNumVertChange = (val) => {
	numberOfVertecies = parseInt(val, 10);
}

let vertexList, edgeList;
const genGraph = () => {
	[vertexList, edgeList] = RandomEulerGraph(numberOfVertecies, getWindow());
	resetGraphStatus();
	canceledWin = false;
};
genGraph();

const softResetGraph = () => {
	resetGraphStatus();
	for (let i=0; i<edgeList.length; i++) {
		edgeList[i].currentState = 0;
	}
	mouseXy = [0, 0];
	clickXy = [0, 0]; 
}

let mouseXy = [0, 0];
let clickXy = [0, 0]; 
const App = () => {
	const getMouseCoords = (e) => {
		mouseXy = [e.clientX-20, e.clientY-65];
	}
	const getCoordsOnClick = (e) => {
		clickXy = [e.clientX-20, e.clientY-65];
	}
	const getGraphData = () => {
		return {vertexList, edgeList, mouseXy, clickXy};
	};

	const [helpIsOpen, setHelpIsOpen] = useState(false);
	const openHelpModal = () => {
		setHelpIsOpen(true);
	}

	const [successIsOpen, setSuccessIsOpen] = useState(false);
	const openSuccessModal = () => {
		if (!canceledWin) { setSuccessIsOpen(true) }
	}
	return (
		<div className="main">
			<Modal 
				className="help_modal_content"
				overlayClassName="help_modal_overlay"
				isOpen={helpIsOpen} 
				onRequestClose={()=>setHelpIsOpen(false)}
			>
				<div className="help_modal_header">
					<div className="help_modal_header_text">Help</div>
					<button className="help_modal_close" onClick={()=>setHelpIsOpen(false)}>X</button>
				</div>
				<div className="help_modal_text">
					The goal is to connect all of the dots, using all of the given paths. You're not allowed to reuse any paths. Click on any point to get started!<br /><br />
					Possible paths are highlighted orange, used paths are blue, and unavailable paths are black. <br />
					<ul> The 'New' button generates a new set of paths. </ul>
					<ul> The 'Reset' button resets the current puzzle to it's starting state. </ul>
					<ul> The slider is used to choose the number of points. </ul><br />
					If you're having any sizing issues, try refreshing the page.
				</div>
			</Modal>
			<Modal
				className="success_modal_content"
				overlayClassName="success_modal_overlay"
				isOpen={successIsOpen}
				onRequestClose={()=> { canceledWin = true; setSuccessIsOpen(false);}}
			>
				<div className="maybe">
					<div className="success_modal_top">Success!</div>
					<div className="success_modal_question">Start new puzzle?</div>
					<div className="success_modal_new">
						<button className="success_modal_button" onClick={() => {genGraph(); setSuccessIsOpen(false)}}>New Puzzle</button>
					</div>
				</div>
			</Modal>
			<ControlBar genGraphFunc={genGraph} onNumVertChange={handleNumVertChange} softReset={softResetGraph} openHelp={(openHelpModal)}/>
			<div className="main_canvas" onMouseMove={getMouseCoords} onClick={getCoordsOnClick}>
				<main className="canvas">
					<Canvas draw={draw} graphData={getGraphData} setSuccess={openSuccessModal}/>
				</main>
			</div>
		</div>
	)
}

export default App;
