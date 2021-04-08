/* editable stuff */

const HARDCODED_X_ZOOM = 30;
const HARDCODED_Y_ZOOM = 30;

/* actual code */

class Graph {
    public f: Function;
    public color: string;
    public lastX = 0;
    public lastY = 0;
    constructor(f: Function, color?: string) {
        this.f = f;
        this.color = color || `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    }
}

const graphsToRender = [new Graph((_: any) => 0, 'white'), new Graph((x: number) => 1e4*x, 'white')]

/* html elements */

const canvas = <HTMLCanvasElement> document.getElementById('canvas')
const xZoomInput = <HTMLInputElement> document.getElementById('xZoom')
const yZoomInput = <HTMLInputElement> document.getElementById('yZoom')
const insertGraphInput = <HTMLInputElement> document.getElementById('insertGraph')
const insertGraphButton = <HTMLInputElement> document.getElementById('insertGraphButton')

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

const plotGraph = (x: number, graph: Graph) => {

    ctx!.beginPath();

    ctx!.strokeStyle = graph.color

    ctx!.moveTo(graph.lastX, graph.lastY);
    ctx!.lineTo(
        (x * xZoom + width * 0.5) + xOffset, 
        (graph.f(x) * yZoom + height * 0.5) + yOffset
    );

    graph.lastX = (x * xZoom + width * 0.5) + xOffset;
    graph.lastY = (graph.f(x) * yZoom + height * 0.5) + yOffset;

    ctx!.stroke();
    ctx!.closePath();

}

const refresh = () => {

    height = window.innerHeight;
    width = window.innerWidth;

    canvas.height = height;
    canvas.width = width;

    xZoom = (parseInt(xZoomInput!.value) || 1) * HARDCODED_X_ZOOM;
    yZoom = (parseInt(yZoomInput!.value) || 1) * HARDCODED_Y_ZOOM;
    ctx!.clearRect(-10000, -10000, 10000, 10000);
    ctx!.lineWidth = 3;

    graphsToRender.forEach((graph) => {
        for (let x = -width; x < width; x+=0.5) {
            plotGraph(x, graph);
        }
        graph.lastX = 1e5;
        graph.lastY = 1e5;
    })
}

const redefineOffset = (event: MouseEvent) => {

    let rect = canvas.getBoundingClientRect();
    xOffset -= event.clientX - rect.left - width * 0.5;
    yOffset += event.clientY - rect.top - height * 0.5;

    xOffset = Math.min(Math.max(-10000 + width * 0.5, xOffset), 10000 - width * 0.5);
    yOffset = Math.min(Math.max(-10000 + height * 0.5, yOffset), 10000 - height * 0.5);

    refresh();
}

const insertGraph = () => {
    try {
        insertGraphInput!.style.color = 'black';
        insertGraphInput!.style.fontWeight = 'normal';

        const func = new Function(`return (x) => ${insertGraphInput!.value};`)();
        const graph = new Graph(func)
        graphsToRender.push(graph)
        refresh()
    } catch (error) {
        insertGraphInput!.style.color = 'red';
        insertGraphInput!.style.fontWeight = 'bold';
        console.log(error)
    }
}

/* connect stuff */

window.addEventListener('resize', refresh);
canvas.addEventListener('click', redefineOffset);
xZoomInput.addEventListener('click', refresh);
yZoomInput.addEventListener('click', refresh)
insertGraphButton.addEventListener('click', insertGraph);
refresh();