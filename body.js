leg_x = -0.4;
	 leg_y = -1;
	 leg_z = -0.8;
	 x_length = 0.1;
	 y_length = 0.7;
	 z_length = 0.1;
	//leg = createRectPrism(-0.4, -1, -0.8, 0.1, 0.7, 0.1);
	leg = createRectPrism(leg_x, leg_y, leg_z, x_length, y_length, z_length);
	globalThis.dimensions.push([leg_y + y_length, leg_z + 0.5 * z_length]);
	draw_prism(leg, gl, [0, 1, 0, 1], u_FragColor, "leg");
	leg = createRectPrism(-leg_x, leg_y, leg_z, -x_length, y_length, z_length);
	globalThis.dimensions.push([-(leg_y  + y_length), leg_z + 0.5 * z_length]);
	draw_prism(leg, gl, [0, 1, 0, 1], u_FragColor, "leg");
	leg = createRectPrism(-leg_x, leg_y, -leg_z, -x_length, y_length, -z_length);
	globalThis.dimensions.push([-(leg_y  + y_length), -(leg_z + 0.5 * z_length)]);
	draw_prism(leg, gl, [0, 1, 0, 1], u_FragColor, "leg");
	//leg = createRectPrism(leg_x, leg_y, -leg_z, x_length, y_length, -z_length);
	for (let i = 0; i < 4; i = i + 1) {
		leg = createRectPrism(leg_x, leg_y + 0.25 * y_length * i, -leg_z, x_length, 0.25 * y_length, -z_length);
		globalThis.dimensions.push([leg_y + y_length, -(leg_z + 0.5 * z_length)]);
		draw_prism(leg, gl, [0, 1, 0, 1], u_FragColor, "leg_section");
	}

tail = createRectPrism(-0.1, 0.3, -0.8, 0.1, 0.4, -0.1);
	 draw_prism(tail, gl, [0, 1, 0, 1], u_FragColor, "tail");
	 
horn1 = createPyramid(-0.075, 0.3, 0.8, 0.05, 0.3);
	 draw_prism(horn1, gl, [1, 0, 0, 1], u_FragColor, "pyramid");
	 
	 horn2 = createPyramid(-0.025, 0.3, 0.8, 0.05, 0.3);
	 draw_prism(horn2, gl, [1, 0, 0, 1], u_FragColor, "pyramid");


function createRectPrism(xMin, yMin, zMin, xLen, yLen, zLen) {
    const xMax = xMin + xLen;
    const yMax = yMin + yLen;
    const zMax = zMin + zLen;

    // Define 36 vertices (6 faces, 2 triangles per face)
    // Each vertex is x, y, z
    const vertices = new Float32Array([
        // Front face
        xMin, yMin, zMax, xMax, yMin, zMax, xMax, yMax, zMax,
        xMin, yMin, zMax, xMax, yMax, zMax, xMin, yMax, zMax,
        // Back face
        xMin, yMin, zMin, xMax, yMin, zMin, xMax, yMax, zMin,
        xMin, yMin, zMin, xMax, yMax, zMin, xMin, yMax, zMin,
        // Top face
        xMin, yMax, zMin, xMax, yMax, zMin, xMax, yMax, zMax,
        xMin, yMax, zMin, xMax, yMax, zMax, xMin, yMax, zMax,
        // Bottom face
        xMin, yMin, zMin, xMax, yMin, zMin, xMax, yMin, zMax,
        xMin, yMin, zMin, xMax, yMin, zMax, xMin, yMin, zMax,
        // Right face
        xMax, yMin, zMin, xMax, yMax, zMin, xMax, yMax, zMax,
        xMax, yMin, zMin, xMax, yMax, zMax, xMax, yMin, zMax,
        // Left face
        xMin, yMin, zMin, xMin, yMax, zMin, xMin, yMax, zMax,
        xMin, yMin, zMin, xMin, yMax, zMax, xMin, yMin, zMax
    ]);

    return vertices;
}