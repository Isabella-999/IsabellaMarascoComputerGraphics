function Shadows(){
    // Obj containing all variables used for shadows
    let shadow = [];

    // Program used to draw from the light perspective
    shadow.colorProgramInfo = webglUtils.createProgramInfo(gl, ['color-vertex-shader', 'color-fragment-shader']);

    // Program used to draw from the camera perspective
    shadow.textureProgramInfo = webglUtils.createProgramInfo(gl, ['vertex-shader-3d', 'fragment-shader-3d']);

    // Shadow map texture
    shadow.depthTexture = gl.createTexture();
    shadow.depthTextureSize = 2048; // Texture resolution
    gl.bindTexture(gl.TEXTURE_2D, shadow.depthTexture);
    gl.texImage2D(
        gl.TEXTURE_2D,                 // target
        0,                             // mip level
        gl.DEPTH_COMPONENT,            // internal format
        shadow.depthTextureSize,       // width
        shadow.depthTextureSize,       // height
        0,                             // border
        gl.DEPTH_COMPONENT,            // format
        gl.UNSIGNED_INT,               // type
        null);                         // models
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    shadow.depthFramebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, shadow.depthFramebuffer);
    gl.framebufferTexture2D(
        gl.FRAMEBUFFER,            // target
        gl.DEPTH_ATTACHMENT,       // attachment point
        gl.TEXTURE_2D,             // texture target
        shadow.depthTexture,       // texture
        0);                       // mip level

    // Shadow settings
    
    shadow.enable = false;
    shadow.fov = 90;
    shadow.projWidth = 3;
    shadow.projHeight = 1;
    shadow.zFarProj = 25;
    shadow.bias = -0.0001;
    shadow.showFrustum = false;

    return shadow;
}