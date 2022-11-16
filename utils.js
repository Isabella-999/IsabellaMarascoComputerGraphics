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

function add_dat_gui(scene){
    let gui = new dat.gui.GUI({autoPlace: false});

    scene['Toggle shadows'] = function () {
        scene.toggle_shadows()
    };
    gui.add(scene, 'Toggle shadows');

    let light_folder = gui.addFolder('Light');

    let light_position =  light_folder.addFolder('Position');
    light_position.add(light.position, 0).min(-10).max(10).step(0.25);
    light_position.add(light.position, 1).min(0).max(10).step(0.25);
    light_position.add(light.position, 2).min(-10).max(10).step(0.25);

    let light_direction =  light_folder.addFolder('Direction');
    light_direction.add(light.direction, 0).min(-10).max(10).step(0.25);
    light_direction.add(light.direction, 1).min(-10).max(10).step(0.25);
    light_direction.add(light.direction, 2).min(-10).max(10).step(0.25);

    let light_color =  light_folder.addFolder('Color');
    light_color.add(light.color, 0).min(0.1).max(1).step(0.05);
    light_color.add(light.color, 1).min(0.1).max(1).step(0.05);
    light_color.add(light.color, 2).min(0.1).max(1).step(0.05);


    document.getElementById("gui").append(gui.domElement)
}


function canvas2DController(){
    let canvas = document.getElementById("canvas2d");
    let context = canvas.getContext("2d");

    const forward = new Path2D()
    forward.rect(25,0,39,39)
    forward.closePath()

    const backward = new Path2D()
    backward.rect(25,60,39,39)
    backward.closePath()

    const left = new Path2D()
    left.rect(0,30,39,39)
    left.closePath()

    const right = new Path2D()
    right.rect(64,30,39,39)
    right.closePath()

    const up = new Path2D()
    up.rect(110,10,45,25)
    up.closePath()

    const down = new Path2D()
    down.rect(110,65,45,25)
    down.closePath()

    context.font = '35px serif';
    context.fillText('UP', 180, 60);
    context.fillText('Down', 180, 120);

    const image = new Image(150, 150);
    image.onload=function (){
        context.drawImage(this,  0, 0, image.width, image.height);
    }
    image.src = './models/controllerImg.jpg';

    function getXY(canvas, event){ //adjust mouse click to canvas coordinates
        const rect = canvas.getBoundingClientRect()
        const y = event.pageY - rect.top
        const x = event.pageX - rect.left

        return {x:x, y:y}
    }

    function touchDown(e){
        const XY = getXY(canvas, e)
        //use the shape models to determine if there is a collision
        if(context.isPointInPath(forward, XY.x, XY.y)) {
            scene.keys["w"]=true;
        }
        if(context.isPointInPath(backward, XY.x, XY.y)) {
            scene.keys["s"]=true;
        }
        if(context.isPointInPath(left, XY.x, XY.y)) {
            scene.keys["a"]=true;
        }
        if(context.isPointInPath(right, XY.x, XY.y)) {
            scene.keys["d"]=true;
        }
        if(context.isPointInPath(up, XY.x, XY.y)) {
            scene.keys["q"]=true;
        }
        if(context.isPointInPath(down, XY.x, XY.y)) {
            scene.keys["e"]=true;
        }
    }

    function touchUp(){
        scene.keys["w"]=false;
        scene.keys["a"]=false;
        scene.keys["s"]=false;
        scene.keys["d"]=false;
        scene.keys["q"]=false;
        scene.keys["e"]=false;
    }

    canvas.addEventListener('touchstart',touchDown,false);
    canvas.addEventListener('touchend',touchUp,false);
    canvas.onmousedown=touchDown;
    canvas.onmouseup=touchUp;
}






