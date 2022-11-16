function render() {
    if (resizeCanvasToDisplaySize(gl.canvas)) {gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);}
    scene.key_controller();

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let proj = scene.projectionMatrix()
    let view = scene.camera.getViewMatrix()

    function bindFrameBufferNull(){
        // draw room to the canvas projecting the depth texture into the room
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(.7, .7, .7, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    if(scene.shadows.enable){
        const lightWorldMatrix = m4.lookAt(
            light.position,       // position
            light.direction.map(l =>  -l),      // target
            [0, 1, 0],              // up
        );

        const lightProjectionMatrix = m4.perspective(
            degToRad(scene.shadows.fov),
            scene.shadows.projWidth / scene.shadows.projHeight,
            0.5,                        // near
            scene.shadows.zFarProj);     // far

        let sharedUniforms = {
            u_view: m4.inverse(lightWorldMatrix),                  // View Matrix
            u_projection: lightProjectionMatrix,                   // Projection Matrix
            u_bias: scene.shadows.bias,
            u_textureMatrix: m4.identity(),
            u_projectedTexture: scene.shadows.depthTexture,
            u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
        };

        // draw to the depth texture
        gl.bindFramebuffer(gl.FRAMEBUFFER, scene.shadows.depthFramebuffer);
        gl.viewport(0, 0, scene.shadows.depthTextureSize, scene.shadows.depthTextureSize);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        scene.mesh_list.forEach(m => {
            m.render(gl, scene.shadows.colorProgramInfo, sharedUniforms);
        });

        bindFrameBufferNull()

        let textureMatrix = m4.identity();
        textureMatrix = m4.translate(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = m4.scale(textureMatrix, 0.5, 0.5, 0.5);
        textureMatrix = m4.multiply(textureMatrix, lightProjectionMatrix);
        textureMatrix = m4.multiply(textureMatrix, m4.inverse(lightWorldMatrix));


        sharedUniforms = {
            u_view: scene.camera.getViewMatrix(),
            u_projection: proj,
            u_bias: scene.shadows.bias,
            u_textureMatrix: textureMatrix,
            u_projectedTexture: scene.shadows.depthTexture,
            u_reverseLightDirection: lightWorldMatrix.slice(8, 11),
            u_worldCameraPosition: scene.camera.getPosition(),
            u_lightPosition: light.position,
            u_lightColor: light.color,
        };

        scene.mesh_list.forEach(m => {
            m.render(gl, scene.shadows.textureProgramInfo, sharedUniforms);
        });

        if (scene.shadows.showFrustum){
            gl.useProgram(scene.shadows.colorProgramInfo.program);
            const cubeLinesBufferInfo = webglUtils.createBufferInfoFromArrays(gl, {
                position: [
                    -1, -1, -1,
                    1, -1, -1,
                    -1,  1, -1,
                    1,  1, -1,
                    -1, -1,  1,
                    1, -1,  1,
                    -1,  1,  1,
                    1,  1,  1,
                ],
                indices: [
                    0, 1,
                    1, 3,
                    3, 2,
                    2, 0,

                    4, 5,
                    5, 7,
                    7, 6,
                    6, 4,

                    0, 4,
                    1, 5,
                    3, 7,
                    2, 6,
                ],
            });

            webglUtils.setBuffersAndAttributes(gl, scene.shadows.colorProgramInfo, cubeLinesBufferInfo);

            const mat = m4.multiply(lightWorldMatrix, m4.inverse(lightProjectionMatrix));

            webglUtils.setUniforms(scene.shadows.colorProgramInfo, {
                u_color: [1, 1, 1, 1],
                u_view: view,
                u_projection: proj,
                u_world: mat,
            });

            webglUtils.drawBufferInfo(gl, cubeLinesBufferInfo, gl.LINES);
        }

    }else{
        bindFrameBufferNull()

        const sharedUniforms = {
            u_ambientLight: [0.1, 0.1, 0.1],                          // Ambient
            u_lightDirection: m4.normalize(light.direction),          // Light Direction
            u_lightColor: light.color,                                // Light Color
            u_view: scene.camera.getViewMatrix(),                     // View Matrix
            u_projection: scene.projectionMatrix(),                   // Projection Matrix
            u_viewWorldPosition: scene.camera.getPosition(),          // Camera position
            u_lightPosition: (light.position),
            u_lightDirection: (light.direction),
        };

        scene.mesh_list.forEach(m => {
            m.render(gl, program, sharedUniforms);
        });
    }

    requestAnimationFrame(render);
}