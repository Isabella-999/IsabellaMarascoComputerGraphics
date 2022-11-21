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

/*function canvas2DController(){
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
    //image.src = './models/controllerImg.jpg';

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
*/



// Canvas 2d 

//draw text
function makeTextCanvas() {
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    
    ctx.font = "15px hidef";
    //ctx.fillStyle = "black";

    makeKeyCanvas();
    return ctx.canvas;
}


//draw buttons
function makeKeyCanvas() {
    ctx.clearRect(0, 0, width, height);

    var buttons = [];
    buttons.push(makeButton(1, 40,100, 30, 30, 'S', '#21e6e3', 'black', 'black', function () { camera.moveForward(-0.1); }))
    buttons.push(makeButton(2, 40, 20, 30, 30, 'W', '21e6e3', 'black', 'black', function () { camera.moveForward(0.1); }))
    buttons.push(makeButton(3, 75, 60, 30, 30, 'D', '21e6e3', 'black', 'black', function () { camera.moveRight(0.1); }))
    buttons.push(makeButton(4, 5, 60, 30, 30, 'E', '21e6e3', 'black', 'black', function () { camera.moveRight(-0.1); }))
    //buttons.push(makeButton(5, 10, 0, 50, 20, 'Reset', '21e6e3', 'black', 'black', function () { camera.getPosition(); }))

    drawAll();
    cameraCanvas.addEventListener("click", function (e) {
        console.log(e);
        if (ctx.isPointInPath(buttons[0], e.offsetX, e.offsetY)) {
            scene.camera.moveForward(-0.1);
        }
        if (ctx.isPointInPath(buttons[1], e.offsetX, e.offsetY)) {
            scene.camera.moveForward(0.1);
        }
        if (ctx.isPointInPath(buttons[2], e.offsetX, e.offsetY)) {
            scene.camera.moveRight(0.1);
        }
        if (ctx.isPointInPath(buttons[3], e.offsetX, e.offsetY)) {
            scene.camera.moveRight(-0.1);
        }
        if (ctx.isPointInPath(buttons[4], e.offsetX, e.offsetY)) {
            scene.camera.reset();
        }
    });

    cameraCanvas.addEventListener('touchstart', function (e) {
        if (ctx.isPointInPath(buttons[0], e.offsetX, e.offsetY)) {
            scene.camera.moveForward(-0.1);
        }
        if (ctx.isPointInPath(buttons[1], e.offsetX, e.offsetY)) {
            scene.camera.moveForward(0.1);
        }
        if (ctx.isPointInPath(buttons[2], e.offsetX, e.offsetY)) {
            scene.camera.moveRight(0.1);
        }
        if (ctx.isPointInPath(buttons[3], e.offsetX, e.offsetY)) {
            scene.camera.moveRight(-0.1);
        }
        if (ctx.isPointInPath(buttons[4], e.offsetX, e.offsetY)) {
            scene.camera.reset();
        }
    });

    function makeButton(id, x, y, w, h, label, fill, stroke, labelcolor, clickFn, releaseFn) {
        var button = new Path2D();
        button.rect(x, y, w, h);
        button.x = x;
        button.y = y;
        button.w = w;
        button.h = h;
        button.id = id;
        button.label = label;
        button.fill = fill;
        button.stroke = stroke;
        button.labelcolor = labelcolor;
        button.clickFn = clickFn;
        button.releaseFn = releaseFn;
        return button;
    }

    function drawAll() {
        for (var i = 0; i < buttons.length; i++) {
            drawButton(buttons[i], false);
        }
    }

    function drawButton(b, isDown) {
        ctx.clearRect(b.x - 1, b.y - 1, b.w + 2, b.h + 2);
        ctx.fillStyle = b.fill;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = b.stroke;
        ctx.strokeRect(b.x, b.y, b.w, b.h);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = b.labelcolor;
        ctx.fillText(b.label, b.x + b.w / 2, b.y + b.h / 2);
        if (isDown) {
            ctx.beginPath();
            ctx.moveTo(b.x, b.y + b.h);
            ctx.lineTo(b.x, b.y);
            ctx.lineTo(b.x + b.w, b.y);
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
}
