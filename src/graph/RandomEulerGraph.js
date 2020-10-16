import Vertex from './Vertex';

// Generate random number between min and max, inclusive
const genRandom = (minimum, maximum) => {
    return minimum + (Math.floor(Math.random()*(maximum-minimum+1)));
}

// Generate sequence of degrees that conform to Euler's Path
const genDegreeSequence = (totalNumber, hasOddNumbers) => {
    let oddNumber = null;
    let oddCounter = 0;
    if (hasOddNumbers === true) {
        oddNumber = (genRandom(1, Math.floor(totalNumber / 2) - 1) * 2) + 1;
        oddCounter = 2;
    }
    let sequence = [];
    for (let i = 0; i < totalNumber; i++) {
        let degree = 0;
        if (oddCounter > 0) {
            degree = oddNumber;
            oddCounter--;
        }
        else {
            degree = (genRandom(1, Math.ceil(totalNumber / 2) - 1) * 2);
        }
        sequence.push(degree);
    }
    return sequence;
}

// Generate edges in pairs {start: V1, end: V2}
const generateEdges = (degreeSequence, vertices) => {
    const counter = [];
    for (let i = 0; i<degreeSequence.length; i++) {
        counter.push({id: i, remainingConnections: degreeSequence[i]});
    }
    counter.sort((a, b) => { return b.remainingConnections - a.remainingConnections });

    let edges = [];
    for (let x = 0; x < counter.length; x++) {
        for (let y = counter[0].remainingConnections; y>0; y--) {
            counter[y].remainingConnections--;
            edges.push({ start: vertices[counter[0].id], end: vertices[counter[y].id], currentState: 0 });
        }
        counter[0].remainingConnections = 0;
        counter.sort((a, b) => { return b.remainingConnections - a.remainingConnections });
    }

    const sum = degreeSequence.reduce((a, b) => a + b, 0);
    if (edges.length !== sum/2 || counter[counter.length-1] < 0) { 
        edges = [-1];
    }
    return edges;
}

export const checkDistance = (pointA, pointB) => {
    return Math.sqrt(Math.pow(Math.abs(pointA[0]-pointB[0]), 2) + Math.pow(Math.abs(pointA[1]-pointB[1]), 2));
};

// Generates integer coordinates [x, y] for each vertex in vertices
const generateCoords = (vertices, size) => {
    let history = [];
    for (let i = 0; i < vertices.length; i++) {
        let coordinates = null;
        while (true) {
            coordinates = [genRandom(0, size[0]-45), genRandom(0, size[1]-40)];
            let tooClose = false;
            for (let j = 0; j<history.length; j++) {
                let distance = checkDistance(coordinates, history[j])
                if (distance < 50) { tooClose = true }
            }
            if (tooClose === false) { 
                history.push(coordinates);
                break;
            }
        }
        vertices[i].xy = coordinates;
    }
}

// Overall function, generates entire graph.
// Returns set of vertices V, and set of edges E => [V, E]
const RandomEulerGraph = (numberOfVertices, canvasSize) => {
    const odd = Math.random() >= 0.5;
    const vertexList = [...Array(numberOfVertices).keys()].map(z => new Vertex(z));
    let degreeSequence = null;
    let edgeList = [-1];
    while (edgeList[0] === -1) {
        degreeSequence = genDegreeSequence(numberOfVertices, odd).sort((a, b) => { return b - a });
        edgeList = generateEdges(degreeSequence, vertexList);
    }
    generateCoords(vertexList, canvasSize);
    return [vertexList, edgeList];
}

export default RandomEulerGraph;