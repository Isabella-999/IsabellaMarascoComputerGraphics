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

let light = {
    position: [10,5,2],
    direction : [1,1,1],
    color : [1.0, 1.0, 1.0],
};

//insert object
let obj_list = [];

/*let provaTot=[]
provaTot.path = "./obj/provaTot/provaTot.obj";
provaTot.mtl = "./obj/provaTot/provaTot.mtl";
provaTot.position = [0,0,0];

obj_list.push(provaTot);*/
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
brain.position = [0, 0, 3]
brain.rotate = true;

let orologio = []
orologio.path = "./obj/orologio/orologio.obj"
orologio.mtl = "./obj/orologio/orologio.mtl"
orologio.position = [0, 0, 0]

let vetro = []
vetro.path = "./obj/vetro/vetro.obj"
vetro.mtl = "./obj/vetro/vetro.mtl"
vetro.position = [0, 0, 0]

let lampadario = []
lampadario.path = "./obj/lampadario/lampadario.obj"
lampadario.mtl = "./obj/lampadario/lampadario.mtl"
lampadario.position = [0, 0, 0]

let calendario = []
calendario.path = "./obj/calendario/calendario.obj"
calendario.mtl = "./obj/calendario/calendario.mtl"
calendario.position = [0, 0, 0]

let vetro1 = []
vetro1.path = "./obj/vetro1/vetro1.obj"
vetro1.mtl = "./obj/vetro1/vetro1.mtl"
vetro1.position = [0, 0, 0]

obj_list.push(bed);
obj_list.push(room);
obj_list.push(brain);
//obj_list.push(orologio);
//obj_list.push(vetro);
//obj_list.push(lampadario);
//obj_list.push(calendario);
//obj_list.push(vetro1);


let scene = new Room(obj_list);
window.addEventListener('keydown', (e) => {scene.keys[e.key] = true;});
window.addEventListener('keyup', (e) => {scene.keys[e.key] = false;});

canvas2DController()
add_dat_gui(scene);

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


render(scene);







