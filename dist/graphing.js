/* editable stuff */

const HARDCODED_X_ZOOM = 30;
const HARDCODED_Y_ZOOM = 30;

const predefined = []

/* stack overflow ez */
let searchParams = new URLSearchParams(window.location.search)
if (searchParams.has('stdgraph') && searchParams.get('stdgraph') != '') {
    let param = searchParams.get('stdgraph')
    let func = new Function(`return (x) => ${param.replace(/\^/g,"+")};`)();
    predefined.push(func)
} else {
    predefined.push(x => Math.sin(x))
}

/* actual code */

class Graph {
    constructor(f, color) {
        this.f = f;
        this.color = color || `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
        this.lastX;
        this.lastY;
    }
}

const graphsToRender = [new Graph(_ => 0, 'white'), new Graph(x => 1e4*x, 'white')]
predefined.forEach((func) => {
    graphsToRender.push(new Graph(func))
})

/* html elements */

const canvas = document.getElementById('canvas')
const xZoomInput = document.getElementById('xZoom')
const yZoomInput = document.getElementById('yZoom')
const insertGraphInput = document.getElementById('insertGraph')
const insertGraphButton = document.getElementById('insertGraphButton')

/* context */

const ctx = canvas.getContext('2d');

/* defining variables */

let xZoom = HARDCODED_X_ZOOM;
let yZoom = HARDCODED_Y_ZOOM;
let xOffset = 2;
let yOffset = 2;
let height = window.innerHeight;
let width = window.innerWidth;

/* define functions */

const plotGraph = (x, graph) => {

    ctx.beginPath();

    ctx.strokeStyle = graph.color

    ctx.moveTo(graph.lastX, graph.lastY);
    ctx.lineTo(
        (x * xZoom + width * 0.5) + xOffset, 
        (graph.f(x) * yZoom + height * 0.5) + yOffset
    );

    graph.lastX = (x * xZoom + width * 0.5) + xOffset;
    graph.lastY = (graph.f(x) * yZoom + height * 0.5) + yOffset;

    ctx.stroke();
    ctx.closePath();

}

const refresh = () => {

    height = window.innerHeight;
    width = window.innerWidth;

    canvas.height = height;
    canvas.width = width;

    xZoom = (xZoomInput.value || 1) * HARDCODED_X_ZOOM;
    yZoom = (yZoomInput.value || 1) * HARDCODED_Y_ZOOM;
    ctx.clearRect(-10000, -10000, 10000, 10000);
    ctx.lineWidth = 3;

    graphsToRender.forEach((graph) => {
        for (x = -width; x < width; x+=0.5) {
            plotGraph(x, graph);
        }
        graph.lastX = null;
        graph.lastY = null;
    })
}

const redefineOffset = (e) => {

    let rect = canvas.getBoundingClientRect();
    xOffset -= e.clientX - rect.left - width * 0.5;
    yOffset += e.clientY - rect.top - height * 0.5;

    xOffset = Math.min(Math.max(-10000 + width * 0.5, xOffset), 10000 - width * 0.5);
    yOffset = Math.min(Math.max(-10000 + height * 0.5, yOffset), 10000 - height * 0.5);

    refresh();
}

const insertGraph = () => {
    try {
        insertGraphInput.style.color = 'black';
        insertGraphInput.style.fontWeight = 'normal';

        const func = new Function(`return (x) => ${insertGraphInput.value};`)();
        const graph = new Graph(func)
        graphsToRender.push(graph)
        refresh()
    } catch (error) {
        insertGraphInput.style.color = 'red';
        insertGraphInput.style.fontWeight = 'bold';
        console.log(error)
    }
}

/* connect stuff */

window.onresize = refresh;
canvas.onclick = redefineOffset;
xZoomInput.oninput = refresh;
yZoomInput.oninput = refresh;
insertGraphButton.onclick = insertGraph;
refresh();