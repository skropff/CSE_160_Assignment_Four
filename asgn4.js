



/*
var VSHADER_SOURCE = `
  attribute vec4 aPosition;
  attribute vec3 v_normal;
  uniform vec3 light;
  //varying vec3 f_normal;
  uniform mat4 u_ModelMatrix; // Add this matrix
//varying float v_Lighting;
	varying vec3 v_NormalDir;
	varying vec3 v_LightDir;
	varying vec3 v_Position;
  
    void main() { 
		gl_Position = u_ModelMatrix * aPosition;
		gl_PointSize = 5.0; // Make the dots big enough to see!
		f_normal = v_normal;
		//v_Lighting = dot(v_normal, light);
		v_NormalDir = v_normal;
		v_LightDir = light;
		v_Position = vec3(aPosition);
	}
	`
// Fragment shader program
/*
var FSHADER_SOURCE = `
  void main() { gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0); } // Blue
 `*/

 /*
`precision mediump float;
  uniform vec4 u_FragColor;  // uniform変数
  uniform bool u_myBoolean;
  varying vec3 f_normal;
  varying vec3 v_NormalDir;
	varying vec3 v_LightDir;
  void main() {
  /*
	float v_Lighting = dot(v_NormalDir, v_LightDir);\n' + 
	if (!u_myBoolean) {'+
    gl_FragColor = gl_FragColor = v_Lighting * u_FragColor;\n' +
	} + 
	else { +
	gl_FragColor = gl_FragColor = v_Lighting * vec4(f_normal, 1.0);' +
	} +
	*/
	// 1. Setup vectors
	/*
    vec3 normal = normalize(v_Normal);
    vec3 lightDir = normalize(u_LightPos - v_Position);
    vec3 viewDir = normalize(u_ViewPos - v_Position);

    // 2. Ambient Component (Low constant light)
    float ambientStrength = 0.2;
    vec3 ambient = ambientStrength * u_FragColor.rgb;

    // 3. Diffuse Component (Matte light)
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * u_FragColor.rgb;

    // 4. Specular Component (The Shiny Spot)
    float specularStrength = 0.5;
    vec3 reflectDir = reflect(-lightDir, normal); 
    // The '32.0' is the shininess. Higher = smaller, sharper highlight.
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = specularStrength * spec * vec3(1.0, 1.0, 1.0); // White highlight

    // 5. Final Result
    gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
  };
  `
  */
  /*
  `
precision mediump float;
uniform vec4 u_FragColor;
uniform bool u_myBoolean;
uniform vec3 u_ViewPos; // Add this to your JS: gl.getUniformLocation...

varying vec3 v_NormalDir;
varying vec3 v_Position;
varying vec3 v_LightDir;

uniform bool is_light_on;

void main() {
    // 1. Setup vectors
    vec3 normal = normalize(v_NormalDir);
    vec3 lightDir = normalize(v_LightDir); 
    vec3 viewDir = normalize(u_ViewPos - v_Position);

    // 2. Ambient (Basic background light)
    float ambientStrength = 0.2;
    vec3 ambient = ambientStrength * u_FragColor.rgb;

    // 3. Diffuse (Matte light)
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * u_FragColor.rgb;

    // 4. Specular (The Shiny Spot)
    float specularStrength = 0.5;
    vec3 reflectDir = reflect(-lightDir, normal); 
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = specularStrength * spec * vec3(1.0, 1.0, 1.0);

    // 5. Final Result
    if (u_myBoolean) {
        gl_FragColor = vec4(normal, 1.0); // Debug normals
    } else {
        gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
    }
}
`;
*/
/*
var FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
uniform bool u_myBoolean;
uniform vec3 u_ViewPos;

varying vec3 v_NormalDir;
varying vec3 v_Position;
varying vec3 v_LightDir;

uniform bool is_light_on;

void main() {
    // 1. Setup and Normalize vectors
    vec3 normal = normalize(v_NormalDir);
    vec3 lightDir = normalize(v_LightDir); 
    vec3 viewDir = normalize(u_ViewPos - v_Position);

    // 2. Determine the Base Color (The logic you requested)
    vec3 baseColor;
    if (u_myBoolean) {
        // If true, apply lighting to the normal visualization
        baseColor = normal; 
    } else {
        // If false, apply lighting to the uniform fragment color
        baseColor = u_FragColor.rgb;
    }

    // 3. Ambient Component
    float ambientStrength = 0.2;
    vec3 ambient = ambientStrength * baseColor;

    // 4. Diffuse Component
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 diffuse = diff * baseColor;

    // 5. Specular Component (The Shiny Spot)
    float specularStrength = 0.5;
    vec3 reflectDir = reflect(-lightDir, normal); 
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    vec3 specular = specularStrength * spec * vec3(1.0, 1.0, 1.0);

    // 6. Final Result
    // Lighting is now applied to whichever baseColor was chosen above
	if (is_light_on) {
		gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
	}
	else {
		gl_FragColor = baseColor;
	}
}
`;
*/
/*
var VSHADER_SOURCE = `
  attribute vec4 aPosition;
  attribute vec3 v_normal;
  uniform vec3 light;
  uniform mat4 u_ModelMatrix;

  varying vec3 v_NormalDir;
  varying vec3 v_LightDir;
  varying vec3 v_Position;
  // removed f_normal because it wasn't used in fragment
  
  void main() { 
    gl_Position = u_ModelMatrix * aPosition;
    gl_PointSize = 5.0;

    // Pass values to fragment shader
    v_NormalDir = v_normal; 
    v_LightDir = light;
    v_Position = vec3(u_ModelMatrix * aPosition); // Position in world space
  }
`; // Added semicolon and closing backtick here
*/
/*
var FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
uniform bool u_myBoolean;
uniform bool is_light_on;
uniform vec3 u_ViewPos;

varying vec3 v_NormalDir;
varying vec3 v_LightDir;
varying vec3 v_Position;

void main() {
    vec3 normal = normalize(v_NormalDir);
    vec3 lightDir = normalize(v_LightDir); 
    vec3 viewDir = normalize(u_ViewPos - v_Position);

    vec3 baseColor;
    if (u_myBoolean) {
        baseColor = normal; 
    } else {
        baseColor = u_FragColor.rgb;
    }

    if (is_light_on) {
        // Ambient
        float ambientStrength = 0.2;
        vec3 ambient = ambientStrength * baseColor;

        // Diffuse
        float diff = max(dot(normal, lightDir), 0.0);
.        vec3 diffuse = diff * baseColor;

        // Specular
        float specularStrength = 0.5;
        vec3 reflectDir = reflect(-lightDir, normal); 
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
        vec3 specular = specularStrength * spec * vec3(1.0, 1.0, 1.0);

        gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
    } else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}
`;
*/
/*
var FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
uniform bool u_myBoolean;
uniform bool is_light_on;
uniform vec3 u_ViewPos;

// --- Spotlight Uniforms ---
uniform vec3 u_SpotDir;      // The direction the spotlight is pointing
uniform float u_CosCutoff;   // Cosine of the inner angle (e.g., cos(15 degrees))
uniform float u_CosOuter;    // Cosine of the outer angle for soft edges

varying vec3 v_NormalDir;
varying vec3 v_LightDir;
varying vec3 v_Position;

void main() {
    vec3 normal = normalize(v_NormalDir);
    vec3 lightDir = normalize(v_LightDir); 
    vec3 viewDir = normalize(u_ViewPos - v_Position);

    // 1. Determine Base Color
    vec3 baseColor = u_myBoolean ? normal : u_FragColor.rgb;

    if (is_light_on) {
        // 2. Spotlight Math
        // We compare the vector from the light to the surface ( -lightDir )
        // against the direction the spotlight is facing ( u_SpotDir ).
        float dotSpot = dot(-lightDir, normalize(u_SpotDir));
        
        // Calculate intensity based on the angle (smoothstep creates soft edges)
        float spotFactor = smoothstep(u_CosOuter, u_CosCutoff, dotSpot);

        // 3. Standard Lighting Components
        float ambientStrength = 0.2;
        vec3 ambient = ambientStrength * baseColor;

        float diff = max(dot(normal, lightDir), 0.0);
        vec3 diffuse = diff * baseColor;

        float specularStrength = 0.5;
        vec3 reflectDir = reflect(-lightDir, normal); 
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
        vec3 specular = specularStrength * spec * vec3(1.0, 1.0, 1.0);

        // 4. Combine
        // Ambient stays on (background light), but Diffuse and Specular are multiplied by spotFactor
        vec3 finalColor = ambient + (diffuse + specular) * spotFactor;
        
		gl_FragColor = vec4(finalColor, 1.0);
    } else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}
`;
*/
/*
var VSHADER_SOURCE = `
  attribute vec4 aPosition;
  attribute vec3 v_normal;
  uniform vec3 light;           // This is our Point Light Position
  uniform mat4 u_ModelMatrix;

  varying vec3 v_NormalDir;
  varying vec3 v_Position;
  varying vec3 v_PointLightDir; // Calculated direction for Phong Point Light
  
  void main() { 
    vec4 worldPos = u_ModelMatrix * aPosition;
    gl_Position = worldPos;
    gl_PointSize = 5.0;

    v_NormalDir = v_normal; 
    v_Position = vec3(worldPos);

    // Calculate Point Light Direction here (Vertex Shader)
    v_PointLightDir = normalize(light - v_Position);
  }
`;
*/
/*
var VSHADER_SOURCE = `
  attribute vec4 aPosition;
  attribute vec3 v_normal;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_ProjMatrix;    // ADD THIS
  uniform mat4 u_ViewMatrix;    // ADD THIS
  uniform mat4 u_NormalMatrix; // Add this!

  uniform vec3 light;
  varying vec3 v_NormalDir;
  varying vec3 v_Position;
  varying vec3 v_PointLightDir;
  
  void main() { 
    // Multiply matrices in this specific order
    vec4 worldPos = u_ModelMatrix * aPosition;
    gl_Position = u_ProjMatrix * u_ViewMatrix * worldPos;

    v_NormalDir = v_normal; 
    v_Position = vec3(worldPos);
    v_PointLightDir = normalize(light - v_Position);
  }
`;
*/
/*
import { setupWebGL, connectVariablesToGLSL, projectionMatrix, viewMatrix, camera, stats } from "Setup.js";
import Model from "Model.js";
import { Matrix4 } from "../lib/cuon-matrix.js";
*/
// Add this to your existing globals
globalThis.teapot = null; 




var VSHADER_SOURCE = `
attribute vec4 aPosition;
attribute vec3 v_normal;
uniform mat4 u_ModelMatrix;
uniform mat4 u_ProjMatrix;
uniform mat4 u_ViewMatrix;
uniform mat4 u_NormalMatrix; // Transformation for normals

uniform vec3 light; // Point Light Position
varying vec3 v_NormalDir;
varying vec3 v_Position;
varying vec3 v_PointLightDir;
  
void main() { 
  vec4 worldPos = u_ModelMatrix * aPosition;
  gl_Position = u_ProjMatrix * u_ViewMatrix * worldPos;

  // Transform normal by NormalMatrix to handle scaling/rotation
  v_NormalDir = normalize(vec3(u_NormalMatrix * vec4(v_normal, 0.0))); 
  v_Position = vec3(worldPos);
  v_PointLightDir = normalize(light - v_Position);
}
`
/*
var FSHADER_SOURCE = `
precision mediump float;
uniform vec4 u_FragColor;
uniform bool u_myBoolean;
uniform bool is_light_on;
uniform vec3 u_ViewPos;

// --- Spotlight Uniforms ---
uniform vec3 u_SpotLightPos; // Position of the Spotlight source
uniform vec3 u_SpotDir;      // The direction the spotlight is pointing
uniform float u_CosCutoff;   
uniform float u_CosOuter;    

varying vec3 v_NormalDir;
varying vec3 v_Position;
varying vec3 v_PointLightDir; // Direction from Vertex Shader (Phong Point Light)

void main() {
	/*
    vec3 normal = normalize(v_NormalDir);
    vec3 viewDir = normalize(u_ViewPos - v_Position);
    vec3 baseColor = u_myBoolean ? normal : u_FragColor.rgb;
	*/
	
	// Inside main() of FSHADER_SOURCE
	/*
vec3 normal = normalize(v_NormalDir);
// Calculate Point Light direction PER-FRAGMENT for smooth shading
vec3 lightDir = normalize(light - v_Position); 

float pointDiff = max(dot(normal, lightDir), 0.0);
vec3 pointDiffuse = pointDiff * baseColor;


    if (is_light_on) {
        // --- 1. PHONG POINT LIGHT (Calculated using v_PointLightDir) ---
        float ambientStrength = 0.2;
        vec3 ambient = ambientStrength * baseColor;

        float pointDiff = max(dot(normal, v_PointLightDir), 0.0);
        vec3 pointDiffuse = pointDiff * baseColor;

        float specularStrength = 0.5;
        vec3 reflectDirPoint = reflect(-v_PointLightDir, normal); 
        float pointSpec = pow(max(dot(viewDir, reflectDirPoint), 0.0), 32.0);
        vec3 pointSpecular = specularStrength * pointSpec * vec3(1.0, 1.0, 1.0);

        vec3 pointLightFinal = ambient + pointDiffuse + pointSpecular;

        // --- 2. SPOTLIGHT (Calculated in Fragment) ---
        vec3 spotLightDir = normalize(u_SpotLightPos - v_Position);
        
        // Spotlight cone logic
        float dotSpot = dot(-spotLightDir, normalize(u_SpotDir));
        float spotFactor = smoothstep(u_CosOuter, u_CosCutoff, dotSpot);

        float spotDiff = max(dot(normal, spotLightDir), 0.0);
        vec3 spotDiffuse = (spotDiff * baseColor) * spotFactor;
        
        // Optional: Specular for spotlight
        vec3 reflectDirSpot = reflect(-spotLightDir, normal);
        float spotSpec = pow(max(dot(viewDir, reflectDirSpot), 0.0), 32.0);
        vec3 spotSpecular = (specularStrength * spotSpec * vec3(1.0)) * spotFactor;

        // --- 3. FINAL COMBINATION ---
        // We add both light results together
        gl_FragColor = vec4(pointLightFinal + spotDiffuse + spotSpecular, 1.0);
    } else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}
`;
*/
/*
var FSHADER_SOURCE = ` precision mediump float;
uniform vec4 u_FragColor;
uniform bool u_myBoolean;
uniform bool is_light_on;
uniform vec3 u_ViewPos;
uniform vec3 light; // MUST declare this to use it in fragment

uniform vec3 u_SpotLightPos; 
uniform vec3 u_SpotDir;      
uniform float u_CosCutoff;   
uniform float u_CosOuter;    

varying vec3 v_NormalDir;
varying vec3 v_Position;
varying vec3 v_PointLightDir;

void main() {
    // 1. Define base variables correctly
    vec3 normal = normalize(v_NormalDir);
    vec3 viewDir = normalize(u_ViewPos - v_Position);
    vec3 baseColor = u_myBoolean ? normal : u_FragColor.rgb;

    if (is_light_on) {
        // --- 1. PHONG POINT LIGHT ---
        float ambientStrength = 0.2;
        vec3 ambient = ambientStrength * baseColor;

        // Use v_PointLightDir passed from vertex shader
        float pointDiff = max(dot(normal, v_PointLightDir), 0.0);
        vec3 pointDiffuse = pointDiff * baseColor;

        float specularStrength = 0.5;
        vec3 reflectDirPoint = reflect(-v_PointLightDir, normal); 
        float pointSpec = pow(max(dot(viewDir, reflectDirPoint), 0.0), 32.0);
        vec3 pointSpecular = specularStrength * pointSpec * vec3(1.0);

        vec3 pointLightFinal = ambient + pointDiffuse + pointSpecular;

        // --- 2. SPOTLIGHT ---
        vec3 spotLightDir = normalize(u_SpotLightPos - v_Position);
        float dotSpot = dot(-spotLightDir, normalize(u_SpotDir));
        float spotFactor = smoothstep(u_CosOuter, u_CosCutoff, dotSpot);

        float spotDiff = max(dot(normal, spotLightDir), 0.0);
        vec3 spotDiffuse = (spotDiff * baseColor) * spotFactor;
        
        vec3 reflectDirSpot = reflect(-spotLightDir, normal);
        float spotSpec = pow(max(dot(viewDir, reflectDirSpot), 0.0), 32.0);
        vec3 spotSpecular = (specularStrength * spotSpec * vec3(1.0)) * spotFactor;

        gl_FragColor = vec4(pointLightFinal + spotDiffuse + spotSpecular, 1.0);
    } else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}
`
*/

var FSHADER_SOURCE =  /*`
precision mediump float;
uniform vec4 u_FragColor;
uniform bool u_myBoolean;
uniform bool is_light_on;
uniform vec3 u_ViewPos;
uniform vec3 light;           // Point Light Position (Must be declared here)

// --- Spotlight Uniforms ---
uniform vec3 u_SpotLightPos; 
uniform vec3 u_SpotDir;      
uniform float u_CosCutoff;   
uniform float u_CosOuter;    

varying vec3 v_NormalDir;
varying vec3 v_Position;
varying vec3 v_PointLightDir; 

void main() {
    // 1. Setup Base Vectors
    vec3 normal = normalize(v_NormalDir);
    vec3 viewDir = normalize(u_ViewPos - v_Position);
    
    // If u_myBoolean is true, show normals as colors, else show fragment color
    vec3 baseColor = u_myBoolean ? (normal * 0.5 + 0.5) : u_FragColor.rgb;

    if (is_light_on) {
        // --- 1. PHONG POINT LIGHT ---
        float ambientStrength = 0.4; // Increased from 0.2 to fix dimness
        vec3 ambient = ambientStrength * baseColor;

        float pointDiff = max(dot(normal, v_PointLightDir), 0.0);
        vec3 pointDiffuse = pointDiff * baseColor;

        float specularStrength = 0.8; // Increased for shinier highlights
        vec3 reflectDirPoint = reflect(-v_PointLightDir, normal); 
        float pointSpec = pow(max(dot(viewDir, reflectDirPoint), 0.0), 64.0);
        vec3 pointSpecular = specularStrength * pointSpec * vec3(1.0, 1.0, 1.0);

        vec3 pointLightFinal = ambient + pointDiffuse + pointSpecular;

        // --- 2. SPOTLIGHT ---
        vec3 spotLightDir = normalize(u_SpotLightPos - v_Position);
        
        // Spotlight cone logic
        float dotSpot = dot(-spotLightDir, normalize(u_SpotDir));
        float spotFactor = smoothstep(u_CosOuter, u_CosCutoff, dotSpot);

        float spotDiff = max(dot(normal, spotLightDir), 0.0);
        vec3 spotDiffuse = (spotDiff * baseColor) * spotFactor;
        
        vec3 reflectDirSpot = reflect(-spotLightDir, normal);
        float spotSpec = pow(max(dot(viewDir, reflectDirSpot), 0.0), 64.0);
        vec3 spotSpecular = (specularStrength * spotSpec * vec3(1.0)) * spotFactor;

        // --- 3. FINAL COMBINATION ---
        gl_FragColor = vec4(pointLightFinal + spotDiffuse + spotSpecular, 1.0);
    } else {
        gl_FragColor = vec4(baseColor, 1.0);
    }
}
`
*/
`
precision mediump float;
uniform vec4 u_FragColor;
uniform bool u_myBoolean;
uniform bool is_light_on; // Controlled by gl.uniform1i
uniform vec3 u_ViewPos;
uniform vec3 light;

uniform vec3 u_SpotLightPos; 
uniform vec3 u_SpotDir;      
uniform float u_CosCutoff;   
uniform float u_CosOuter;    

varying vec3 v_NormalDir;
varying vec3 v_Position;
varying vec3 v_PointLightDir; 

uniform vec3 u_LightColor;     // New: RGB for Point Light

void main() {
    // Re-normalize here because interpolation changes length
    vec3 normal = normalize(v_NormalDir);
    vec3 viewDir = normalize(u_ViewPos - v_Position);
    
    // Toggle between Normal Colors and Base Color
    vec3 baseColor = u_myBoolean ? (normal * 0.5 + 0.5) : u_FragColor.rgb;

    if (is_light_on) {
        // --- 1. PHONG POINT LIGHT ---
        float ambientStrength = 0.3;
        vec3 ambient = ambientStrength * baseColor;

        float pointDiff = max(dot(normal, v_PointLightDir), 0.0);
        vec3 pointDiffuse = pointDiff * baseColor * u_LightColor;;

        float specularStrength = 0.5;
        vec3 reflectDirPoint = reflect(-v_PointLightDir, normal); 
        //float pointSpec = pow(max(dot(viewDir, reflectDirPoint), 0.0), 32.0);
		float pointSpec = pow(max(dot(viewDir, reflectDirPoint), 0.0), 10.0);
        vec3 pointSpecular = specularStrength * pointSpec * vec3(1.0) * u_LightColor;

        // --- 2. SPOTLIGHT ---
        vec3 spotLightDir = normalize(u_SpotLightPos - v_Position);
        float dotSpot = dot(-spotLightDir, normalize(u_SpotDir));
        float spotFactor = smoothstep(u_CosOuter, u_CosCutoff, dotSpot);

        float spotDiff = max(dot(normal, spotLightDir), 0.0);
        vec3 spotDiffuse = (spotDiff * baseColor) * spotFactor;
        
        vec3 reflectDirSpot = reflect(-spotLightDir, normal);
        float spotSpec = pow(max(dot(viewDir, reflectDirSpot), 0.0), 32.0);
        vec3 spotSpecular = (specularStrength * spotSpec * vec3(1.0)) * spotFactor;

        gl_FragColor = vec4(ambient + pointDiffuse + pointSpecular + spotDiffuse + spotSpecular, 1.0);
    } else {
        // Light is OFF: Show only the base color (unlit)
        gl_FragColor = vec4(baseColor, 1.0);
    }
}
`



globalThis.shapes = [];
globalThis.colors = [];
globalThis.rotation = 0;
globalThis.leg_position = true;
globalThis.dimensions = [];
globalThis.body_types = [];
globalThis.tail_up = true;
globalThis.last_x = 0;
globalThis.last_y = 0;
globalThis.light_x = 1;
globalThis.light_y = 0;
globalThis.light_z = 0;
globalThis.angle = 0;
globalThis.light_setting = false;

globalThis.first = true;

function toRadian(degrees) {
    return degrees * (Math.PI / 180);
}

 /*
function 	main()		{
		globalThis.light_x = Math.cos(globalThis.angle);
		globalThis.light_y = Math.sin(globalThis.angle);
	 var canvas = document.getElementById('webgl');
  // Get the rendering context for WebGL
if (globalThis.first) {
	 var gl = getWebGLContext(canvas);
	 globalThis.gl = gl;
	 gl.enable(gl.DEPTH_TEST);
     if (!gl) {
		console.log('Failed to get the rendering context for WebGL');
		return;
	 }

  // Initialize shaders
     if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
		console.log('Failed to intialize shaders.');
		return;
	}
	
  
  
}

// Example: Pointing straight down, with a 20-degree inner cone and 25-degree outer cone
let spotDir = [0.0, -1.0, 0.0]; 
let innerAngle = Math.cos(toRadian(20));
let outerAngle = Math.cos(toRadian(25));

globalThis.gl.uniform3fv(globalThis.gl.getUniformLocation(globalThis.gl.program, "u_SpotDir"), spotDir);
globalThis.gl.uniform1f(globalThis.gl.getUniformLocation(globalThis.gl.program, "u_CosCutoff"), innerAngle);
globalThis.gl.uniform1f(globalThis.gl.getUniformLocation(globalThis.gl.program, "u_CosOuter"), outerAngle);


var u_FragColor = globalThis.gl.getUniformLocation(globalThis.gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

globalThis.first = false;


  const u_ModelMatrix = globalThis.gl.getUniformLocation(globalThis.gl.program, 'u_ModelMatrix');
const u_myBoolean = globalThis.gl.getUniformLocation(globalThis.gl.program, 'u_myBoolean');
const is_light_on = globalThis.gl.getUniformLocation(globalThis.gl.program, "is_light_on");

const modelMatrix = new Matrix4(); // Identity

modelMatrix.setScale(0.5, 0.5, 0.5); 

globalThis.gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

normal_setting = document.getElementById("normal on/off");

if (normal_setting.valueAsNumber) {
	globalThis.gl.uniform1i(u_myBoolean, 1); // Set to 1 to show Normal colors
}
else {
	globalThis.gl.uniform1i(u_myBoolean, 0);
}


light_on_off = document.getElementById("light on/off");

if (light_on_off.valueAsNumber) {
	globalThis.gl.uniform1i(is_light_on, 1); // Set to 1 to show Normal colors
}
else {
	globalThis.gl.uniform1i(is_light_on, 0);
}
/*
if (normal_setting.valueAsNumber) {
	globalThis.gl.uniform1i(u_myBoolean, 1); // Set to 1 to show Normal colors
}
else {
	globalThis.gl.uniform1i(u_myBoolean, 0);
}
*/

//globalThis.gl.uniform4f(u_FragColor, 1, 1, 0, 1);
	
  // Code to run once the user has released the slider handle


	
 
//const floatSize = sphere.BYTES_PER_ELEMENT; // 4 bytes


// Clear current shapes
//globalThis.shapes = [];

 //const sphere = createSphere(1, 32, 32, 1, 0, 0); // Radius 1, Red

//globalThis.shapes.push(sphere);

/*
// --- GOAT PARTS (Offset by Z=1.5 and Y=0.5 to clear the sphere) ---

// 1. BODY (Shifted to Z=1.5, Y=0.5)
// xMin, yMin, zMin, xLen, yLen, zLen
globalThis.shapes.push(createRectPrism(-0.25, 0.3, 1.1, 0.5, 0.4, 0.8));

// 2. HEAD (In front of the body)
globalThis.shapes.push(createRectPrism(-0.15, 0.6, 1.8, 0.3, 0.3, 0.4));

// 3. LEGS (Shifted to match body)
let leg_y = -0.1, leg_z_front = 1.8, leg_z_back = 1.1;
let leg_w = 0.08, leg_h = 0.4, leg_d = 0.08;

globalThis.shapes.push(createRectPrism(-0.2, leg_y, leg_z_front, leg_w, leg_h, leg_d));  // FL
globalThis.shapes.push(createRectPrism(0.12, leg_y, leg_z_front, leg_w, leg_h, leg_d));  // FR
globalThis.shapes.push(createRectPrism(-0.2, leg_y, leg_z_back, leg_w, leg_h, leg_d));   // BL
globalThis.shapes.push(createRectPrism(0.12, leg_y, leg_z_back, leg_w, leg_h, leg_d));   // BR

// 4. TAIL (At the back of the body)
globalThis.shapes.push(createRectPrism(-0.05, 0.6, 1.0, 0.1, 0.2, 0.1));

// 5. HORNS
globalThis.shapes.push(createRectPrism(-0.12, 0.9, 1.9, 0.05, 0.2, 0.05));
globalThis.shapes.push(createRectPrism(0.07, 0.9, 1.9, 0.05, 0.2, 0.05));


/*

// 1. BODY
let body = createRectPrism(-0.25, -0.2, -0.4, 0.5, 0.4, 0.8);
globalThis.shapes.push(body);

// 2. HEAD
let head = createRectPrism(-0.15, 0.1, 0.3, 0.3, 0.3, 0.4);
globalThis.shapes.push(head);

// 3. LEGS (4 legs)
let leg_x = -0.2, leg_y = -0.6, leg_z = 0.3;
let leg_w = 0.08, leg_h = 0.4, leg_d = 0.08;

globalThis.shapes.push(createRectPrism(leg_x, leg_y, leg_z, leg_w, leg_h, leg_d)); // FL
globalThis.shapes.push(createRectPrism(-leg_x-leg_w, leg_y, leg_z, leg_w, leg_h, leg_d)); // FR
globalThis.shapes.push(createRectPrism(leg_x, leg_y, -leg_z, leg_w, leg_h, leg_d)); // BL
globalThis.shapes.push(createRectPrism(-leg_x-leg_w, leg_y, -leg_z, leg_w, leg_h, leg_d)); // BR

// 4. TAIL
let tail = createRectPrism(-0.05, 0.1, -0.5, 0.1, 0.2, 0.1);
globalThis.shapes.push(tail);

// 5. HORNS (Red)
let horn1 = createRectPrism(-0.12, 0.4, 0.4, 0.05, 0.2, 0.05);
let horn2 = createRectPrism(0.07, 0.4, 0.4, 0.05, 0.2, 0.05);
globalThis.shapes.push(horn1);
globalThis.shapes.push(horn2);

*/
// --- NEW GOAT COORDINATES (Shifted to be in front of and beside the sphere) ---
/*
// 1. BODY (Shifted to X=0.3, Z=0.6 to be in front of the sphere's edge)
// xMin, yMin, zMin, xLen, yLen, zLen
globalThis.shapes.push(createRectPrism(0.3, 0.0, 0.6, 0.4, 0.3, 0.5));

// 2. HEAD (Further forward at Z=1.0)
globalThis.shapes.push(createRectPrism(0.35, 0.25, 0.9, 0.25, 0.25, 0.25));

// 3. LEGS (Adjusted to match new body position)
let leg_y = -0.3, leg_z_front = 0.9, leg_z_back = 0.6;
let leg_w = 0.06, leg_h = 0.3, leg_d = 0.06;

globalThis.shapes.push(createRectPrism(0.32, leg_y, leg_z_front, leg_w, leg_h, leg_d));  // FL
globalThis.shapes.push(createRectPrism(0.62, leg_y, leg_z_front, leg_w, leg_h, leg_d));  // FR
globalThis.shapes.push(createRectPrism(0.32, leg_y, leg_z_back, leg_w, leg_h, leg_d));   // BL
globalThis.shapes.push(createRectPrism(0.62, leg_y, leg_z_back, leg_w, leg_h, leg_d));   // BR

// 4. TAIL (At the back of the new body position)
globalThis.shapes.push(createRectPrism(0.47, 0.2, 0.55, 0.06, 0.15, 0.06));

// 5. HORNS
globalThis.shapes.push(createRectPrism(0.37, 0.5, 0.95, 0.04, 0.15, 0.04));
globalThis.shapes.push(createRectPrism(0.54, 0.5, 0.95, 0.04, 0.15, 0.04));
*/

// --- "SAFE ZONE" GOAT (Beside the sphere, within Z -0.5 to 0.5) ---

/*
// 1. BODY (Shifted Right: X=0.6, Centered Z: -0.2 to 0.3)
globalThis.shapes.push(createRectPrism(0.5, -0.2, -0.2, 0.4, 0.3, 0.5));

// 2. HEAD (Slightly higher and forward)
globalThis.shapes.push(createRectPrism(0.55, 0.1, 0.3, 0.2, 0.2, 0.2));

// 3. LEGS (Matching the body)
let leg_y = -0.5, leg_zf = 0.2, leg_zb = -0.2;
globalThis.shapes.push(createRectPrism(0.52, leg_y, leg_zf, 0.05, 0.3, 0.05)); // FL
globalThis.shapes.push(createRectPrism(0.82, leg_y, leg_zf, 0.05, 0.3, 0.05)); // FR
globalThis.shapes.push(createRectPrism(0.52, leg_y, leg_zb, 0.05, 0.3, 0.05)); // BL
globalThis.shapes.push(createRectPrism(0.82, leg_y, leg_zb, 0.05, 0.3, 0.05)); // BR

// 4. HORNS
globalThis.shapes.push(createRectPrism(0.58, 0.3, 0.35, 0.03, 0.1, 0.03));
globalThis.shapes.push(createRectPrism(0.69, 0.3, 0.35, 0.03, 0.1, 0.03));



globalThis.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Black background
globalThis.gl.clear(globalThis.gl.COLOR_BUFFER_BIT | globalThis.gl.DEPTH_BUFFER_BIT);

for (let i = 0; i < globalThis.shapes.length; i = i + 1) {
	
const positionBuffer = globalThis.gl.createBuffer();

// 1. Bind your buffer
globalThis.gl.bindBuffer(globalThis.gl.ARRAY_BUFFER, positionBuffer);
globalThis.gl.bufferData(globalThis.gl.ARRAY_BUFFER, globalThis.shapes[i].positions, globalThis.gl.STATIC_DRAW);


const indexBuffer = globalThis.gl.createBuffer();
globalThis.gl.bindBuffer(globalThis.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
globalThis.gl.bufferData(globalThis.gl.ELEMENT_ARRAY_BUFFER, globalThis.shapes[i].indices, globalThis.gl.STATIC_DRAW);


const FSIZE = Float32Array.BYTES_PER_ELEMENT;

var aPosition = globalThis.gl.getAttribLocation(globalThis.gl.program, 'aPosition');
		var v_normal = globalThis.gl.getAttribLocation(globalThis.gl.program, "v_normal");
//var light = globalThis.gl.getAttribLocation(globalThis.gl.program, "light");
		
		globalThis.gl.vertexAttribPointer(aPosition, 3, globalThis.gl.FLOAT, false, 6 * FSIZE, 0);
		globalThis.gl.enableVertexAttribArray(aPosition);
	
		globalThis.gl.vertexAttribPointer(v_normal, 3, globalThis.gl.FLOAT, false, 6 * FSIZE, 3 * FSIZE);
		globalThis.gl.enableVertexAttribArray(v_normal);
		
		var u_LightPos = globalThis.gl.getUniformLocation(globalThis.gl.program, 'light');
		globalThis.gl.uniform3f(u_LightPos, globalThis.light_x, globalThis.light_y, globalThis.light_z);
  
  /*
		globalThis.gl.vertexAttribPointer(light, 3, globalThis.gl.FLOAT, false, 9 * FSIZE, 6 * FSIZE);
		globalThis.gl.enableVertexAttribArray(light);
*/

// 2. Spotlight Source Position (NEW)
//var u_SpotLightPos = globalThis.gl.getUniformLocation(globalThis.gl.program, 'u_SpotLightPos');
//globalThis.gl.uniform3f(u_SpotLightPos, 0.0, 2.0, 2.0); // Fixed position for the spotlight source

// Move camera further back to see both the sphere and the new goat position
/*
var u_ViewPos = globalThis.gl.getUniformLocation(globalThis.gl.program, 'u_ViewPos');
globalThis.gl.uniform3f(u_ViewPos, 0.0, 1.0, 6.0); // Camera at Z=6, slightly higher


var u_SpotLightPos = globalThis.gl.getUniformLocation(globalThis.gl.program, 'u_SpotLightPos');
globalThis.gl.uniform3f(u_SpotLightPos, 0.0, 3.0, 3.0); // Source moved to stay above the goat

var u_SpotDir = globalThis.gl.getUniformLocation(globalThis.gl.program, 'u_SpotDir');
globalThis.gl.uniform3f(u_SpotDir, 0.0, -1.0, -0.5); // Pointing down and slightly forward


// 3. View Position (NEW - Necessary for Specular highlights)
//var u_ViewPos = globalThis.gl.getUniformLocation(globalThis.gl.program, 'u_ViewPos');
//globalThis.gl.uniform3f(u_ViewPos, 0.0, 0.0, 5.0); // Assuming camera is at Z=5
// 4. Draw as points


if (aPosition < 0 || v_normal < 0) {
  console.log('Failed to get the storage location of attributes');
  return;
}

//const vertexCount = sphere.length / 6; 
//gl.drawArrays(gl.POINTS, 0, vertexCount);

globalThis.gl.drawElements(globalThis.gl.TRIANGLES, globalThis.shapes[i].indices.length, globalThis.gl.UNSIGNED_SHORT, 0);

}

globalThis.angle = globalThis.angle + 0.1;
requestAnimationFrame(main);
}
*/
function main() {
    var canvas = document.getElementById('webgl');
    
	
	if (!globalThis.first) {
		gl = globalThis.gl;
}
    // --- INITIALIZATION (Run Once) ---
    if (globalThis.first) {
		
        var gl = getWebGLContext(canvas);
        globalThis.gl = gl;
        if (!gl) return;
        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) return;

        gl.enable(gl.DEPTH_TEST);
		
		 // 2. Load the OBJ File using the Model class
    globalThis.teapot = new Model(gl, "teapot.obj");
        
        // Create buffers ONCE to prevent memory leaks
        globalThis.buffer_pos = gl.createBuffer();
        globalThis.buffer_idx = gl.createBuffer();

        // --- DEFINE SHAPES ---
        globalThis.shapes = [];
		
		
        
        // 1. Sphere at the center (Z=0)
        globalThis.shapes.push(createSphere(0.6, 32, 32));
		/*

        // 2. Goat Body (Slightly behind sphere at Z=1.1 to 1.9)
        globalThis.shapes.push(createRectPrism(-0.25, 0.3, 1.1, 0.5, 0.4, 0.8));
        
        // 3. Goat Head
        globalThis.shapes.push(createRectPrism(-0.15, 0.6, 1.8, 0.3, 0.3, 0.4));
        
        // 4. Legs
        let ly = -0.1, lzf = 1.8, lzb = 1.1, lw = 0.08, lh = 0.4;
        globalThis.shapes.push(createRectPrism(-0.2, ly, lzf, lw, lh, 0.08)); // FL
        globalThis.shapes.push(createRectPrism(0.12, ly, lzf, lw, lh, 0.08)); // FR
        globalThis.shapes.push(createRectPrism(-0.2, ly, lzb, lw, lh, 0.08)); // BL
        globalThis.shapes.push(createRectPrism(0.12, ly, lzb, lw, lh, 0.08)); // BR

        // 5. Horns
        globalThis.shapes.push(createRectPrism(-0.12, 0.9, 1.9, 0.05, 0.2, 0.05));
        globalThis.shapes.push(createRectPrism(0.07, 0.9, 1.9, 0.05, 0.2, 0.05));

        globalThis.first = false;
		*/
		// --- UPDATED GOAT (Beside Sphere, No Overlap) ---
globalThis.shapes = [];

/*
// 1. Sphere (Radius 0.6, at origin)
globalThis.shapes.push(createSphere(0.6, 32, 32));

// 2. Body (Shifted Right: xMin = 0.7 to clear the sphere's 0.6 radius)
// xMin, yMin, zMin, xLen, yLen, zLen
globalThis.shapes.push(createRectPrism(0.7, -0.2, -0.3, 0.6, 0.4, 0.8));

// 3. Head (In front of the body)
globalThis.shapes.push(createRectPrism(0.85, 0.15, 0.4, 0.3, 0.3, 0.35));
*/
globalThis.shapes.push(createSphere(0.4, 32, 32));



// Goat shifted to X = 1.0 (Clears the sphere's 0.4 radius)
// Body: xMin=0.7, yMin=-0.2, zMin=-0.2, xLen=0.6, yLen=0.4, zLen=0.4
globalThis.shapes.push(createRectPrism(0.7, -0.2, -0.2, 0.6, 0.4, 0.4));

// Head: Shifted further right to X=1.3
globalThis.shapes.push(createRectPrism(1.3, 0.0, -0.1, 0.3, 0.3, 0.2));
// 4. Legs (Adjusted to new Body X and Z)
//let leg_y = -0.6, lzf = 0.4, lzb = -0.3, lw = 0.08, lh = 0.4;
//globalThis.shapes.push(createRectPrism(0.75, leg_y, lzf, lw, lh, 0.08)); // Front Left
//globalThis.shapes.push(createRectPrism(1.15, leg_y, lzf, lw, lh, 0.08)); // Front Right
//globalThis.shapes.push(createRectPrism(0.75, leg_y, lzb, lw, lh, 0.08)); // Back Left
//globalThis.shapes.push(createRectPrism(1.15, leg_y, lzb, lw, lh, 0.08)); // Back Right

// 5. Horns
//globalThis.shapes.push(createRectPrism(0.88, 0.45, 0.5, 0.05, 0.2, 0.05));
//globalThis.shapes.push(createRectPrism(1.07, 0.45, 0.5, 0.05, 0.2, 0.05));

// Left Horn
globalThis.shapes.push(createRectPrism(1.35, 0.3, -0.05, 0.05, 0.2, 0.05)); 
// Right Horn
globalThis.shapes.push(createRectPrism(1.50, 0.3, -0.05, 0.05, 0.2, 0.05));

// --- 4. Legs (Connected to Body at Y = -0.2) ---
let ly = -0.6; // Bottom of leg
let lw = 0.1;  // Width
let lh = 0.4;  // Height (reaches up to -0.2)
let ld = 0.1;  // Depth

// Front Legs (Z = 0.1)
globalThis.shapes.push(createRectPrism(0.7, ly, 0.1, lw, lh, ld));  // Front Left
globalThis.shapes.push(createRectPrism(1.2, ly, 0.1, lw, lh, ld));  // Front Right

// Back Legs (Z = -0.2)
globalThis.shapes.push(createRectPrism(0.7, ly, -0.2, lw, lh, ld)); // Back Left
globalThis.shapes.push(createRectPrism(1.2, ly, -0.2, lw, lh, ld)); // Back Right

// Body is X:0.7 to 1.3, Y:-0.2 to 0.2, Z:-0.2 to 0.2
// Tail: 
// xMin: 0.95 (Centers a 0.1 wide tail on the 1.0 body center)
// yMin: 0.0  (Starts at the vertical middle of the body)
// zMin: -0.4 (Starts at -0.4 and has a length of 0.2, so it ends at -0.2, touching the body)
// xLen: 0.1, yLen: 0.1, zLen: 0.2
//globalThis.shapes.push(createRectPrism(0.95, 0.0, -0.4, 0.1, 0.1, 0.2)); 




//globalThis.shapes.push(createRectPrism(0.95, 0.0, -0.35, 0.1, 0.1, 0.2));

//TAIL
//globalThis.shapes.push(createRectPrism(0.95, 0.0, -0.4, 0.1, 0.1, 0.2));

// Body is X:0.7 to 1.3, Y:-0.2 to 0.2, Z:-0.2 to 0.2
// Tail: Centered on body X(1.0), top-back corner
// xMin=0.95, yMin=0.1, zMin=0.2, xLen=0.1, yLen=0.1, zLen=0.3
//globalThis.shapes.push(createRectPrism(0.95, 0.1, 0.2, 0.1, 0.1, 0.3)); 
// Body is Z: -0.2 to 0.2. 
// Tail: Start at the back edge (-0.2) an3d go backwards to -0.4
//globalThis.shapes.push(createRectPrism(0.95, 0.1, -0.4, 0.1, 0.1, 0.2)); 
// Body is X: 0.7 to 1.3, Y: -0.2 to 0.2, Z: -0.2 to 0.2
// Tail: xMin=0.5 (sticks out 0.2 units), yMin=0.0, zMin=-0.1, xLen=0.2, yLen=0.1, zLen=0.1
//globalThis.shapes.push(createRectPrism(0.5, 0.0, -0.1, 0.2, 0.1, 0.1)); 

// Body starts at X=0.7. 
// Tail xMin=0.4, xLen=0.3. This ends the tail at X=0.7 (Perfect Connection)
//globalThis.shapes.push(createRectPrism(0.4, 0.0, -0.05, 0.3, 0.1, 0.1)); 
// Body is X:0.7 to 1.3, Y:-0.2 to 0.2, Z:-0.2 to 0.2
// "Detached" Tail: Placed at X=0.0 (directly in front of camera), 
// Y=0.5 (floating above the ground), Z=1.0 (very close to camera)
//globalThis.shapes.push(createRectPrism(0.0, 0.5, 1.0, 0.4, 0.1, 0.1)); 

// Body is roughly X:0.7 to 1.3, Z:-0.2 to 0.2
// This tail is shifted to the left (X=0.4) and forward (Z=0.3)
// It will look "detached" but it will definitely be visible.
//globalThis.shapes.push(createRectPrism(0.4, 0.2, 0.3, 0.2, 0.2, 0.2)); 
// Body Back Edge: Z = -0.2, Body Top Edge: Y = 0.2, Body Center: X = 1.0
// Tail: xMin=0.95, yMin=0.15, zMin=-0.4, xLen=0.1, yLen=0.1, zLen=0.2
//globalThis.shapes.push(createRectPrism(0.95, 0.15, -0.4, 0.1, 0.1, 0.2)); 
// Body is X:0.7-1.3, Y:-0.2-0.2, Z:-0.2-0.2. 
// Head is at X=1.3 (Front). Tail must be at Z=-0.2 (Back).
// xMin=0.95 (centered), yMin=0.15 (near top), zMin=-0.5 (sticks out 0.3 units)
//globalThis.shapes.push(createRectPrism(0.95, 0.15, -0.5, 0.1, 0.1, 0.3)); 
// Head is at X=1.3 (Front). Body is X:0.7 to 1.3.
// Tail must be at X=0.7 (The Back).
// xMin=0.4 (Starts at 0.4 and is 0.3 wide, ending at 0.7 to touch the body)
// yMin=0.1 (Top-back corner), zMin=-0.05 (Centered on Z)
globalThis.shapes.push(createRectPrism(0.4, 0.1, -0.05, 0.3, 0.1, 0.1)); 




    }
	

    // --- CAMERA & LIGHTING MATH ---
	globalThis.slider = document.getElementById("start").valueAsNumber;
    globalThis.angle += 0.1;
    globalThis.light_x = Math.cos(globalThis.angle + toRadian(globalThis.slider)) * 2;
    globalThis.light_z = Math.sin(globalThis.angle + toRadian(globalThis.slider)) * 2;
	
	if (!globalThis.first) {
		globalThis.shapes.pop();
	}
	lightCube = createCube(0.1, [globalThis.light_x, globalThis.light_y, globalThis.light_z], [1, 0, 0]); 
	globalThis.shapes.push(lightCube);


    const u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
    const u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
    const u_ViewPos = gl.getUniformLocation(gl.program, 'u_ViewPos');
    const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    const is_light_on = gl.getUniformLocation(gl.program, "is_light_on");

    const projMatrix = new Matrix4();
    const viewMatrix = new Matrix4();
    const modelMatrix = new Matrix4();

    // Camera at Z=8 looking at the goat (Z=1.5)
    projMatrix.setPerspective(30, canvas.width / canvas.height, 0.1, 100.0);
    viewMatrix.setLookAt(0, 2, 8, 0, 0, 1.5, 0, 1, 0);
    modelMatrix.setIdentity(); // Scale 1.0 so we see the true coordinates

    gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);
    gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
    gl.uniform3f(u_ViewPos, 0, 2, 8); // Must match setLookAt eye position
    //gl.uniform1i(is_light_on, 1);
    gl.uniform4f(u_FragColor, 1.0, 0.9, 0.0, 1.0); // Gold/Yellow Goat

    // --- DRAWING ---
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const FSIZE = Float32Array.BYTES_PER_ELEMENT;
    const aPosition = gl.getAttribLocation(gl.program, 'aPosition');
    const v_normal = gl.getAttribLocation(gl.program, 'v_normal');
	
	
	    // --- 1. Point Light Update (Moving Light) ---
    var u_LightPos = gl.getUniformLocation(gl.program, 'light');
    gl.uniform3f(u_LightPos, globalThis.light_x, 2.0, globalThis.light_z);

    // --- 2. Spotlight Update (Fixed Light above the Goat) ---
    gl.uniform3f(gl.getUniformLocation(gl.program, 'u_SpotLightPos'), 1.0, 3.0, 0.0);
    gl.uniform3f(gl.getUniformLocation(gl.program, 'u_SpotDir'), 0.0, -1.0, 0.0);
    // 15 degree inner cone, 25 degree outer cone
    gl.uniform1f(gl.getUniformLocation(gl.program, 'u_CosCutoff'), Math.cos(toRadian(15)));
    gl.uniform1f(gl.getUniformLocation(gl.program, 'u_CosOuter'), Math.cos(toRadian(25)));

    // --- 3. Finish Initialization (IMPORTANT: Do this at the end of the "first" block) ---
    globalThis.first = false; 


    for (let i = 0; i < globalThis.shapes.length; i++) {
		// Inside your main loop
const modelMatrix = new Matrix4();
modelMatrix.setScale(0.5, 0.5, 0.5); // Your scale
// ... other rotations ...

/*
const normalMatrix = new Matrix4();
normalMatrix.setInverseOf(modelMatrix);
normalMatrix.transpose();
*/
//const u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
//gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

        gl.bindBuffer(gl.ARRAY_BUFFER, globalThis.buffer_pos);
        gl.bufferData(gl.ARRAY_BUFFER, globalThis.shapes[i].positions, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, globalThis.buffer_idx);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, globalThis.shapes[i].indices, gl.STATIC_DRAW);

        gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 6 * FSIZE, 0);
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(v_normal, 3, gl.FLOAT, false, 6 * FSIZE, 3 * FSIZE);
        gl.enableVertexAttribArray(v_normal);
		
		
		// --- Inside your main loop where you set uniforms ---

// 1. Fix the Normal Matrix (This fixes the "normals off" issue)
let normalMatrix = new Matrix4();
normalMatrix.setInverseOf(modelMatrix);
normalMatrix.transpose();
let u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);

// 2. Fix the Light Toggle (Ensure it's an integer 0 or 1)
let light_on_off = document.getElementById("light on/off");
let is_light_on = gl.getUniformLocation(gl.program, "is_light_on");
// Check value and force it to 1 or 0
gl.uniform1i(is_light_on, light_on_off.valueAsNumber ? 1 : 0); 

// 3. Fix the Normal Toggle
let normal_setting = document.getElementById("normal on/off");
let u_myBoolean = gl.getUniformLocation(gl.program, 'u_myBoolean');
gl.uniform1i(u_myBoolean, normal_setting.valueAsNumber ? 1 : 0);

let r = document.getElementById("red").valueAsNumber;
let g = document.getElementById("green").valueAsNumber;
let b = document.getElementById("blue").valueAsNumber;


var u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');

gl.uniform3f(u_LightColor, r, g, b);


        gl.drawElements(gl.TRIANGLES, globalThis.shapes[i].indices.length, gl.UNSIGNED_SHORT, 0);
    }
	/*
	if (globalThis.teapot && globalThis.teapot.isFullyLoaded) {
    // We must pass an object that has the locations to teapot.render
    let shaderVars = { aPosition, v_normal }; 
    globalThis.teapot.matrix.setTranslate(-1.5, 0, 0);
    globalThis.teapot.render(gl, shaderVars); 
	*/
	// Inside main() after the goat/sphere loop
if (globalThis.teapot && globalThis.teapot.isFullyLoaded) {
    globalThis.teapot.color = [0.0, 1.0, 0.0, 1.0]; // Set to Green
    
    // Position the teapot to the left of the sphere (X = -1.5)
    let teapotMatrix = new Matrix4();
    teapotMatrix.setTranslate(-1.5, 0.0, 0.0);
//0.3, 0.3, 0.3	
    teapotMatrix.scale(0.2, 0.2, 0.2); // Scale down to fit the scene
    globalThis.teapot.matrix = teapotMatrix;

    // Use YOUR current program
    globalThis.teapot.render(gl, gl.program); 
}



    requestAnimationFrame(main);
}




function createSphere(radius, segments, stacks) {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];

  for (let i = 0; i <= stacks; i++) {
    const v = i / stacks;
    const phi = v * Math.PI; // Latitude angle (0 to PI)

    for (let j = 0; j <= segments; j++) {
      const u = j / segments;
      const theta = u * 2 * Math.PI; // Longitude angle (0 to 2*PI)

      // Convert spherical to cartesian coordinates
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.cos(phi);
      const z = Math.sin(theta) * Math.sin(phi);

      positions.push(radius * x, radius * y, radius * z, x, y, z);
      normals.push(x, y, z); // Normal for a sphere at origin is just the normalized position
      uvs.push(u, v);
    }
  }

  // Generate indices for triangles
  for (let i = 0; i < stacks; i++) {
    for (let j = 0; j < segments; j++) {
      const first = i * (segments + 1) + j;
      const second = first + segments + 1;

      // Two triangles per rectangular segment (quad)
      indices.push(first, second, first + 1);
      indices.push(second, second + 1, first + 1);
    }
  }
  return {
    positions: new Float32Array(positions),
    indices: new Uint16Array(indices)
  };
  //return new Float32Array(positions);
/*
  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    uvs: new Float32Array(uvs),
    indices: new Uint16Array(indices)
  };
  */
}
/*
function createCube(size, colors) {
  // size: half-length of a side (e.g., 0.5)
  // colors: an object like {front: [r,g,b], back: [r,g,b], ...}
  
  const s = size;
  const positions = [];
  const indices = [];

  // Define the 6 faces. 
  // Each face: 4 vertices (Pos X, Y, Z,  Normal X, Y, Z)
  const faceData = [
    // Front face (Normal: 0, 0, 1)
    { pos: [-s,-s, s,  s,-s, s,  s, s, s, -s, s, s], norm: [0, 0, 1] },
    // Back face (Normal: 0, 0, -1)
    { pos: [-s,-s,-s, -s, s,-s,  s, s,-s,  s,-s,-s], norm: [0, 0, -1] },
    // Top face (Normal: 0, 1, 0)
    { pos: [-s, s, s,  s, s, s,  s, s,-s, -s, s,-s], norm: [0, 1, 0] },
    // Bottom face (Normal: 0, -1, 0)
    { pos: [-s,-s, s, -s,-s,-s,  s,-s,-s,  s,-s, s], norm: [0, -1, 0] },
    // Right face (Normal: 1, 0, 0)
    { pos: [ s,-s, s,  s,-s,-s,  s, s,-s,  s, s, s], norm: [1, 0, 0] },
    // Left face (Normal: -1, 0, 0)
    { pos: [-s,-s, s, -s, s, s, -s, s,-s, -s,-s,-s], norm: [-1, 0, 0] }
  ];

  faceData.forEach((face, i) => {
    const startIdx = i * 4;
    
    // Push 4 vertices per face
    for (let v = 0; v < 4; v++) {
      // Add Position (x, y, z)
      positions.push(face.pos[v*3], face.pos[v*3+1], face.pos[v*3+2]);
      // Add Normal (nx, ny, nz)
      positions.push(face.norm[0], face.norm[1], face.norm[2]);
    }

    // Two triangles per face (standard CCW winding)
    indices.push(startIdx, startIdx + 1, startIdx + 2);
    indices.push(startIdx, startIdx + 2, startIdx + 3);
  });

  return {
    positions: new Float32Array(positions),
    indices: new Uint16Array(indices)
  };
}
*/

function createCube(size, center, colors) {
  // size: half-length of a side (e.g., 0.5)
  // center: array [x, y, z] (e.g., [0, 2, 0])
  // colors: an object like {front: [r,g,b], back: [r,g,b], ...}
  
  const s = size;
  const cx = center[0];
  const cy = center[1];
  const cz = center[2];
  
  const positions = [];
  const indices = [];

  const faceData = [
    // Front face (Normal: 0, 0, 1)
    { pos: [-s,-s, s,  s,-s, s,  s, s, s, -s, s, s], norm: [0, 0, 1] },
    // Back face (Normal: 0, 0, -1)
    { pos: [-s,-s,-s, -s, s,-s,  s, s,-s,  s,-s,-s], norm: [0, 0, -1] },
    // Top face (Normal: 0, 1, 0)
    { pos: [-s, s, s,  s, s, s,  s, s,-s, -s, s,-s], norm: [0, 1, 0] },
    // Bottom face (Normal: 0, -1, 0)
    { pos: [-s,-s, s, -s,-s,-s,  s,-s,-s,  s,-s, s], norm: [0, -1, 0] },
    // Right face (Normal: 1, 0, 0)
    { pos: [ s,-s, s,  s,-s,-s,  s, s,-s,  s, s, s], norm: [1, 0, 0] },
    // Left face (Normal: -1, 0, 0)
    { pos: [-s,-s, s, -s, s, s, -s, s,-s, -s,-s,-s], norm: [-1, 0, 0] }
  ];

  faceData.forEach((face, i) => {
    const startIdx = i * 4;
    
    for (let v = 0; v < 4; v++) {
      // Add Position (x, y, z) + Center Offset (cx, cy, cz)
      positions.push(face.pos[v*3] + cx, face.pos[v*3+1] + cy, face.pos[v*3+2] + cz);
      
      // Add Normal (nx, ny, nz) - Normals do not get shifted by position
      positions.push(face.norm[0], face.norm[1], face.norm[2]);
    }

    indices.push(startIdx, startIdx + 1, startIdx + 2);
    indices.push(startIdx, startIdx + 2, startIdx + 3);
  });

  return {
    positions: new Float32Array(positions),
    indices: new Uint16Array(indices)
  };
}


function createRectPrism(xMin, yMin, zMin, xLen, yLen, zLen) {
    const xMax = xMin + xLen;
    const yMax = yMin + yLen;
    const zMax = zMin + zLen;

    const positions = [];
    const indices = [];

    // Helper to add 4 vertices and 2 triangles for a face
    function addFace(v1, v2, v3, v4, nx, ny, nz) {
        const start = positions.length / 6;
        // Push Pos(3) + Normal(3) for each vertex
        [v1, v2, v3, v4].forEach(v => {
            positions.push(v[0], v[1], v[2], nx, ny, nz);
        });
        indices.push(start, start + 1, start + 2, start, start + 2, start + 3);
    }

    // Front, Back, Top, Bottom, Right, Left
    addFace([xMin,yMin,zMax],[xMax,yMin,zMax],[xMax,yMax,zMax],[xMin,yMax,zMax], 0,0,1);
    addFace([xMin,yMin,zMin],[xMax,yMin,zMin],[xMax,yMax,zMin],[xMin,yMax,zMin], 0,0,-1);
    addFace([xMin,yMax,zMin],[xMax,yMax,zMin],[xMax,yMax,zMax],[xMin,yMax,zMax], 0,1,0);
    addFace([xMin,yMin,zMin],[xMax,yMin,zMin],[xMax,yMin,zMax],[xMin,yMin,zMax], 0,-1,0);
    addFace([xMax,yMin,zMin],[xMax,yMax,zMin],[xMax,yMax,zMax],[xMax,yMin,zMax], 1,0,0);
    addFace([xMin,yMin,zMin],[xMin,yMax,zMin],[xMin,yMax,zMax],[xMin,yMin,zMax], -1,0,0);

    return { 
        positions: new Float32Array(positions), 
        indices: new Uint16Array(indices) 
    };
}

