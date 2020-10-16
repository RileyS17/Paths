import {checkDistance} from '../../graph/RandomEulerGraph';
import {defaultVertex, hoverVertex, pastVertex, activeVertex, possibleVertex, defaultEdge, possibleEdge, pastEdge} from './DrawElements';

let currentActive = null;
let vertexHistory = {};
let listOfPossibleVertecies = {}; // Each Obj = {Vertex.id: x, Edge: y}
let hasStarted = false;
let hasWon = false;


export const resetGraphStatus = () => {
    currentActive = null;
    vertexHistory = {};
    listOfPossibleVertecies = {};
    hasStarted = false;
    hasWon = false;
};

const checkEdgePosibilties = (currentVertex, edgeList) => {
    // Loop through vertex list
    listOfPossibleVertecies = {};
    for (let i = 0; i<edgeList.length; i++) {
        if (edgeList[i].start === currentVertex) { 
            if (edgeList[i].currentState === 0) {
                listOfPossibleVertecies[edgeList[i].end.id] = edgeList[i];
                edgeList[i].currentState = 1;
            }
        }
        if (edgeList[i].end === currentVertex) {
            if (edgeList[i].currentState === 0) {
                listOfPossibleVertecies[edgeList[i].start.id] = edgeList[i];
                edgeList[i].currentState = 1;
            }
        }
    }
};

export const draw = (ctx, frameCount, vertexList, edgeList, mouseXy, clickXy) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#141414';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draws edges
    let totalUsedEdges = 0;
    for (let i = 0; i<edgeList.length; i++) {
        switch(edgeList[i].currentState) {
            case 1:
                possibleEdge(ctx, edgeList[i]);
                break;
            case 2:
                totalUsedEdges++;
                pastEdge(ctx, edgeList[i]);
                break;
            case 0:
                defaultEdge(ctx, edgeList[i]);
                break;
            default:
                defaultEdge(ctx, edgeList[i]);
        }
    }
    if (totalUsedEdges === edgeList.length) {
        hasWon = true;
    }

    // Draws vertices
    for (let i = 0; i<vertexList.length; i++) {
        ctx.beginPath()
        const targetX = vertexList[i].xy[0]+15;
        const targetY = vertexList[i].xy[1]+15;
        // If vertex is currently active
        if (vertexList[i] === currentActive) {
            activeVertex(ctx, targetX, targetY, frameCount);
        }
        // If vertex will become currently active
        else if (checkDistance([targetX, targetY], [clickXy[0], clickXy[1]]) <= 13 && (listOfPossibleVertecies[vertexList[i].id] || !hasStarted)) {
            // eslint-disable-next-line
            Object.keys(listOfPossibleVertecies).forEach((key) => {
                listOfPossibleVertecies[key].currentState = 0;
            });
            if (listOfPossibleVertecies[vertexList[i].id]) { listOfPossibleVertecies[vertexList[i].id].currentState = 2; }
            listOfPossibleVertecies = {};
            currentActive = vertexList[i];
            vertexHistory[[targetX, targetY]] = true;
            activeVertex(ctx, targetX, targetY, frameCount);
            checkEdgePosibilties(vertexList[i], edgeList);
            if (!hasStarted) { hasStarted = true }
        }
        // If mouse hovering over vertex
        else if (checkDistance([targetX, targetY], [mouseXy[0], mouseXy[1]]) <= 13) {
            hoverVertex(ctx, targetX, targetY, frameCount);
        }
        // If the vertex is a valid selection from current active
        else if (listOfPossibleVertecies[vertexList[i].id] || !hasStarted) {
            possibleVertex(ctx,targetX, targetY, frameCount);
        }
        // If vertex has been activated
        else if (vertexHistory[[targetX, targetY]]) {
            pastVertex(ctx, targetX, targetY);
        }
        // Otherwise vertex untouched
        else {
            defaultVertex(ctx, targetX, targetY);
        }
    }
    if (hasWon) { return true }
};