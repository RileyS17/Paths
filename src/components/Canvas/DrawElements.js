// Draw functions for all possible vertex states
export const defaultVertex = (ctx, x, y) => {
    ctx.fillStyle = '#2b2b2b'
    ctx.arc(x, y, 12, 0, 2*Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = '#000000'
    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.fill()
}

export const activeVertex = (ctx, x, y, frameCount) => {
    ctx.fillStyle = '#f7e9c8';
    let angle = (2*Math.PI/180)*(frameCount%180);
    ctx.arc(x, y, 12, angle, angle+Math.PI);
    ctx.fill()
    ctx.beginPath()
    ctx.fillStyle = '#ffa500';
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill()
}

export const pastVertex = (ctx, x, y) => {
    ctx.fillStyle = '#f7e9c8'
    ctx.arc(x, y, 11, 0, 2*Math.PI);
    ctx.fill()
    ctx.beginPath()
    ctx.fillStyle = '#0ccef5'
    ctx.arc(x, y, 10, 0, 2*Math.PI);
    ctx.fill()
}

export const hoverVertex = (ctx, x, y, frameCount) => {
    ctx.fillStyle = '#f7e9c8'
    ctx.arc(x, y, 10+Math.sin(frameCount*0.085)**2, 0, 2*Math.PI);
    ctx.fill()
}

export const possibleVertex = (ctx, x, y, frameCount) => {
    ctx.fillStyle = '#faeb48'
    ctx.arc(x, y, 10+Math.sin(frameCount*0.05)**2, 0, 2*Math.PI);
    ctx.fill()
}

// Draw functions for all possible edge states
export const defaultEdge = (ctx, edge) => {
    ctx.beginPath()
    ctx.moveTo(edge.start.xy[0]+15, edge.start.xy[1]+15)
    ctx.lineTo(edge.end.xy[0]+15, edge.end.xy[1]+15)
    ctx.strokeStyle = '#080808';
    ctx.lineWidth = 2;
    ctx.stroke();
}

export const possibleEdge = (ctx, edge) => {
    ctx.beginPath()
    ctx.moveTo(edge.start.xy[0]+15, edge.start.xy[1]+15)
    ctx.lineTo(edge.end.xy[0]+15, edge.end.xy[1]+15)
    ctx.strokeStyle = '#d4a20d';
    ctx.lineWidth = 2;
    ctx.stroke();
}

export const pastEdge = (ctx, edge) => {
    ctx.beginPath()
    ctx.moveTo(edge.start.xy[0]+15, edge.start.xy[1]+15)
    ctx.lineTo(edge.end.xy[0]+15, edge.end.xy[1]+15)
    ctx.strokeStyle = '#006187';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath()
    ctx.moveTo(edge.start.xy[0]+15, edge.start.xy[1]+15)
    ctx.lineTo(edge.end.xy[0]+15, edge.end.xy[1]+15)
    ctx.strokeStyle = '#09a3e0';
    ctx.lineWidth = 2;
    ctx.stroke();
}