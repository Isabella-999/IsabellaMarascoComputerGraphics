let canvas = document.getElementById("canvas");

let gl = canvas.getContext("webgl");

if (!gl) {
    alert("WebGL not supported!");
    throw new Error("WebGL not supported!");
}
if (!gl.getExtension('WEBGL_depth_texture')) {
    throw new Error('need WEBGL_depth_texture');
}
gl.enable(gl.DEPTH_TEST);

let program = webglUtils.createProgramInfo(gl, ["base-vertex-shader", "base-fragment-shader"]);


//light used for the room
let light = {
    position: [0,8.8,0],
    direction : [-1,1,0],
    color : [1.0, 1.0, 1.0],
};

//insert object
let obj_list = [];

let bed = []
bed.path = "./obj/bed/bed.obj"
bed.mtl = "./obj/bed/bed.mtl"
bed.position = [0, 0, 1]

let room = []
room.path = "./obj/room/room.obj"
room.mtl = "./obj/room/room.mtl"
room.position = [0, 0, 0]

let brain = []
brain.path = "./obj/brain/brain.obj"
brain.mtl = "./obj/brain/brain.mtl"
brain.position = [0, 0, 4]
brain.rotate = true;

let orologio = []
orologio.path = "./obj/orologio/orologio.obj"
orologio.mtl = "./obj/orologio/orologio.mtl"
orologio.position = [0, 0, 0]

let lampadario = []
lampadario.path = "./obj/lampadario/lampadario.obj"
lampadario.mtl = "./obj/lampadario/lampadario.mtl"
lampadario.position = [0, 0, 0]

let calendario = []
calendario.path = "./obj/calendario/calendario.obj"
calendario.mtl = "./obj/calendario/calendario.mtl"
calendario.position = [0, 0, 0]

let cestino = []
cestino.path = "./obj/cestino/cestino.obj"
cestino.mtl = "./obj/cestino/cestino.mtl"
cestino.position = [0, 0, 0]

let portaOggetti = []
portaOggetti.path = "./obj/portaOggetti/portaOggetti.obj"
portaOggetti.mtl = "./obj/portaOggetti/portaOggetti.mtl"
portaOggetti.position = [0, 0, 0]

obj_list.push(bed);
obj_list.push(room);
obj_list.push(brain);
obj_list.push(orologio);
obj_list.push(lampadario);
obj_list.push(calendario);
obj_list.push(cestino);
obj_list.push(portaOggetti);

let scene = new Room(obj_list);
window.addEventListener('keydown', (e) => {scene.keys[e.key] = true;});
window.addEventListener('keyup', (e) => {scene.keys[e.key] = false;});

mouse = [];
function mouseDown(e) {
    mouse.drag = true;
    mouse.old_x = e.pageX;
    mouse.old_y = e.pageY;
    e.preventDefault();
}
function mouseUp(){
    mouse.drag=false;
}

function mouseMove(e) {
    if (!mouse.drag){
        return false;
    }
    let dX=-(e.pageX-mouse.old_x)*2*Math.PI/canvas.width;
    scene.camera.rotate(-dX * 0.2);
    let dY=-(e.pageY-mouse.old_y)*2*Math.PI/canvas.height;
    scene.camera.rotateUp(-dY * 0.2);

    mouse.old_x=e.pageX;
    mouse.old_y=e.pageY;
    e.preventDefault();
}

canvas.addEventListener('touchstart',mouseDown,false);
canvas.addEventListener('touchmove',mouseMove,false);
canvas.addEventListener('touchend',mouseUp,false);
canvas.addEventListener('touchend',mouseUp,false);
canvas.addEventListener('mouseout',mouseUp,false);
canvas.onmousedown=mouseDown;
canvas.onmouseup=mouseUp;
canvas.mouseout=mouseUp;
canvas.onmousemove=mouseMove;

 //create check function 
 function check() {
    document.getElementById('shadows');
    scene.shadows.enable = !scene.shadows.enable;
  }

// add event to checkbox #shadow
document.getElementById('shadows').addEventListener('change', check);

// Canvas 2d context
let cameraCanvas = document.getElementById('canvas2d');
ctx = cameraCanvas.getContext('2d');

let cameraColumn = document.getElementById('canvas_column');
let width = cameraColumn.getBoundingClientRect().width;
let height = cameraColumn.getBoundingClientRect().height;
makeTextCanvas(width, height);


function degToRad(d) {
    return d * Math.PI / 180;
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}

function resizeCanvasToDisplaySize(canvas) {
    // Lookup the size the browser is displaying the canvas in CSS pixels.
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Check if the canvas is not the same size.
    const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;

    if (needResize) {
        // Make the canvas the same size
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }

    return needResize;
}

render(scene);




