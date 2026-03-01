//import { Matrix4 } from "../lib/cuon-matrix";

// prettier-ignore
/*
export default class Model {
    constructor(gl, filePath) {
        this.filePath = filePath;
        this.color = [1, 1, 1, 1];
        this.matrix = new Matrix4();

        this.isFullyLoaded = false;

        this.getFileContent().then(() => {
            console.log(this.modelData);
        });
        this.vertexBuffer = gl.createBuffer();
        this.normalBuffer = gl.createBuffer();
    }

    parseModel(fileContent) {
        //console.log(fileContent);
        const lines = fileContent.split("\n");
        const allVertices = [];
        const allNormals = [];

        const unpackedVerts = [];
        const unpackedNormals = [];

        for (let i = 0; i < lines.length; i = i + 1) {
            const line = lines[i];
            const tokens = line.split(" ");
            if (tokens[0] == 'v') {
                allVertices.push(parseFloat(tokens[1]), parseFloat(tokens[2]), 
                parseFloat(tokens[3]));
            }
            else if (tokens[0] == "vn") {
                allNormals.push(parseFloat(tokens[1]), parseFloat(tokens[2]), 
                parseFloat(tokens[3]));
            }
            else if (tokens[0] == "f") {
                for (const face of [tokens[1], tokens[2], tokens[3]]) {
                    const indices = face.split("//");
                    const vertexIndex = (parseInt(indices[0]) - 1) * 3;
                    const normalIndex =  (parseInt(indices[1]) - 1) * 3;

                    unpackedVerts.push(
                        allVertices[vertexIndex],
                        allVertices[vertexIndex + 1],
                        allVertices[vertexIndex + 2]
                    );

                    unpackedNormals.push(
                        allNormals[normalIndex], 
                        allNormals[normalIndex + 1],
                        allNormals[normalIndex + 2]
                    )
                }
            }
        }
        //console.log("all vertices: ", allVertices);
        //console.log("all normals: ", allNormals);
        this.modelData = {
            vertices: new Float32Array(unpackedVerts),
            normals: new Float32Array(unpackedNormals)
        }

        this.isFullyLoaded = true;
    }

    render(gl, program) {
        if (!this.isFullyLoaded) return;



        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.modelData.vertices, gl.DYNAMIC_DRAW);
        gl.vertexAttribPointer(program.a_Position, 3, gl.FLOAT, false, 
            0, 0
        );
       // gl.enableVertexAttribAttribArray(program.a_Position);
       gl.enableVertexAttribArray(program.a_Position);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.modelData.normals, 
            gl.DYNAMIC_DRAW
        );
        gl.vertexAttribPointer(program.a_Normal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(program.a_Normal);

        gl.uniformMatrix4fv(program.u_ModelMatrix, false, this.matrix.elements);
        gl.uniform4fv(program.u_FragColor, this.color);

        let normalMatrix = new Matrix4().setInverseOf(this.matrix);
        normalMatrix.transpose();
        gl.uniformMatrix4fv(program.u_NormalMatrix, false, normalMatrix.elements);

        gl.drawArrays(gl.TRIANGLES, 0, this.modelData.vertices/length);

    }
    */
class Model {
        constructor(gl, filePath) {
            this.gl = gl; // Store gl for use in parseModel
            this.filePath = filePath;
            this.color = [1, 1, 1, 1];
            this.matrix = new Matrix4();
            this.normalMatrix = new Matrix4(); // Reuse this to save memory
    
            this.isFullyLoaded = false;
    
            this.vertexBuffer = gl.createBuffer();
            this.normalBuffer = gl.createBuffer(); // Fixed typo 'BUffer'
    
            this.getFileContent();
        }
    
        parseModel(fileContent) {
            const lines = fileContent.split("\n");
            const allVertices = [];
            const allNormals = [];
            const unpackedVerts = [];
            const unpackedNormals = [];
    
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line || line.startsWith('#')) continue; // Skip empty lines/comments
    
                const tokens = line.split(/\s+/); // Split by any whitespace
                
                if (tokens[0] === 'v') {
                    allVertices.push(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]));
                } 
                else if (tokens[0] === "vn") {
                    allNormals.push(parseFloat(tokens[1]), parseFloat(tokens[2]), parseFloat(tokens[3]));
                } 
                else if (tokens[0] === "f") {
                    // Process faces (assuming triangles)
                    for (let j = 1; j <= 3; j++) {
                        const parts = tokens[j].split("/");
                        // Vertex index is usually first, Normal index is usually third (v/vt/vn)
                        const vIdx = (parseInt(parts[0]) - 1) * 3;
                        const nIdx = (parseInt(parts[parts.length - 1]) - 1) * 3;
    
                        unpackedVerts.push(allVertices[vIdx], allVertices[vIdx + 1], allVertices[vIdx + 2]);
                        unpackedNormals.push(allNormals[nIdx], allNormals[nIdx + 1], allNormals[nIdx + 2]);
                    }
                }
            }
    
            this.modelData = {
                vertices: new Float32Array(unpackedVerts),
                normals: new Float32Array(unpackedNormals)
            };
    
            // UPLOAD DATA ONCE HERE
            const gl = this.gl;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.modelData.vertices, gl.STATIC_DRAW);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.modelData.normals, gl.STATIC_DRAW);
    
            this.isFullyLoaded = true;
        }
    /*
        render(gl, program) {
            if (!this.isFullyLoaded) return;
    
            // Position Attribute
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.vertexAttribPointer(program.a_Position, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(program.a_Position);
    
            // Normal Attribute
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
            gl.vertexAttribPointer(program.a_Normal, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(program.a_Normal);
    
            // Uniforms
            gl.uniformMatrix4fv(program.u_ModelMatrix, false, this.matrix.elements);
            gl.uniform4fv(program.u_FragColor, this.color);
    
            // Normal Matrix calculation
            this.normalMatrix.setInverseOf(this.matrix);
            this.normalMatrix.transpose();
            gl.uniformMatrix4fv(program.u_NormalMatrix, false, this.normalMatrix.elements);
    
            // Final Draw Call
            gl.drawArrays(gl.TRIANGLES, 0, this.modelData.vertices.length / 3);
        }
		*/
		render(gl, program) {
    if (!this.isFullyLoaded) return;

    // FIX: Look up the actual attribute locations from YOUR shader
    const aPosition = gl.getAttribLocation(gl.program, 'aPosition');
    const v_normal = gl.getAttribLocation(gl.program, 'v_normal');

    // Position Attribute (Stride 0 for OBJ)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    // Normal Attribute (Stride 0 for OBJ)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(v_normal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(v_normal);

    // Uniforms: Match your asgn4.js names
    gl.uniformMatrix4fv(gl.getUniformLocation(gl.program, 'u_ModelMatrix'), false, this.matrix.elements);
    gl.uniform4fv(gl.getUniformLocation(gl.program, 'u_FragColor'), new Float32Array(this.color));

    // Normal Matrix: Required for Point/Spotlight rotation
    this.normalMatrix.setInverseOf(this.matrix);
    this.normalMatrix.transpose();
    gl.uniformMatrix4fv(gl.getUniformLocation(gl.program, 'u_NormalMatrix'), false, this.normalMatrix.elements);

    gl.drawArrays(gl.TRIANGLES, 0, this.modelData.vertices.length / 3);
}

        


    async getFileContent() {
        try {
            const response = await fetch(this.filePath);
            if (!response.ok) throw new Error(`Could not load file "${this.filePath}". Are you sure the file name/path are correct?`);

            const fileContent = await response.text();
            this.parseModel(fileContent);
        } catch (e) {
            throw new Error(`Something went wrong when loading ${this.filePath}. Error: ${e}`);
        }
    }
}
