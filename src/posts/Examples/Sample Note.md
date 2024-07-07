# Transformations & Coordinate Systems

## Transformations

### Intro

- We can try and move objects by modifying vertices and re-configuring buffers per frame but this is costly and cumbersome
- Instead we use matrices

### Vectors & Matrices

- If we want to visualize vectors as positions, we use the position vector that originates from the origin
- The unit vector is of unit length in any direction. Calculating the unit vector of a given vector (dividing by magnitude) is called **normalizing** the vector
- The dot product is the component wise multiplication of vectors and is also the product of magnitude of vectors with the cosine of the angle between them
- The cross product is defined in the 3D space only and produces a orthogonal vector given 2 vectors. Refer to [link](https://en.wikipedia.org/wiki/Cross_product#Computing) for calculation
- The dot product in matrices is basically common matrix multiplication where $A_{a, b} \cdot B_{b, c} = C_{a, c}$
- A vector is basically a $N \times 1$ matrix and hence can be multiplied with matrices to give transformations
	- Identity matrix $I$ does an identity transform
	- Scale matrix is basically $I$ but each 1 can be a different value based on how much you want each axes to scale
	- Translation matrix is used to alter the position of the vector. For a 3D vector, it is the top 3 values of the 4th column as that results in each component being added to the corresponding value.
	- Rotation matrix
		- Rotations in 3D are specified with an angle and a rotation axis
		- Rotations are done with a combination of cosine and sine
		- An example of a rotation about X axis$$\begin{bmatrix} \color{red}1 & \color{red}0 & \color{red}0 & \color{red}0 \\ \color{green}0 & \color{green}{\cos \theta} & - \color{green}{\sin \theta} & \color{green}0 \\ \color{blue}0 & \color{blue}{\sin \theta} & \color{blue}{\cos \theta} & \color{blue}0 \\ \color{purple}0 & \color{purple}0 & \color{purple}0 & \color{purple}1 \end{bmatrix} \cdot \begin{pmatrix} x \\ y \\ z \\ 1 \end{pmatrix} = \begin{pmatrix} x \\ \color{green}{\cos \theta} \cdot y - \color{green}{\sin \theta} \cdot z \\ \color{blue}{\sin \theta} \cdot y + \color{blue}{\cos \theta} \cdot z \\ 1 \end{pmatrix}$$
		- To rotate about a 3D axis, rotate around X, then Y and lastly Z, however this produces a gimbal lock. Another better way is to create an arbitrary unit axis and rotate about it $$\begin{bmatrix} \cos \theta + \color{red}{R_x}^2(1 - \cos \theta) & \color{red}{R_x}\color{green}{R_y}(1 - \cos \theta) - \color{blue}{R_z} \sin \theta & \color{red}{R_x}\color{blue}{R_z}(1 - \cos \theta) + \color{green}{R_y} \sin \theta & 0 \\ \color{green}{R_y}\color{red}{R_x} (1 - \cos \theta) + \color{blue}{R_z} \sin \theta & \cos \theta + \color{green}{R_y}^2(1 - \cos \theta) & \color{green}{R_y}\color{blue}{R_z}(1 - \cos \theta) - \color{red}{R_x} \sin \theta & 0 \\ \color{blue}{R_z}\color{red}{R_x}(1 - \cos \theta) - \color{green}{R_y} \sin \theta & \color{blue}{R_z}\color{green}{R_y}(1 - \cos \theta) + \color{red}{R_x} \sin \theta & \cos \theta + \color{blue}{R_z}^2(1 - \cos \theta) & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$
		- This too does not solve the problem entirely and the solution is to use quaternions.
- We can combine several transforms with matrix multiplication. The rightmost in multiplication is first applied to the vector. A recommended order is scaling -> rotation -> translation
- All of these can be implemented using `glm` and the matrices can be sent to the shaders with `uniform`'s with type `mat4`
- If the `uniform`'s have to be changed frequently, put them in the loop

## Coordinate Systems

### Intro

- As we know, GL expects all vertices to be normalized. What we do in practice is send coords in a range we specify and normalize it in vertex shader - normalized device coords (NDC).
- The process of creating NDC involves many intermediate coord system reprs due to ease of operation/calculation
- The coord systems of importance are
	- Local space (or Object space)
	- World space
	- View space (or Eye space)
	- Clip space
	- Screen space

### Transformation matrices

- To transform to a new coord system, we use the **model**, **view** and the **projection** matrices.
- These are then processed into **world, view and clip** coords and eventually to **screen** coords.
	1. Local coords - coords of object relative to local origin
	2. World space coords - transform the local to world space which involves a larger world, relative to world origin
	3. View space coords - transform to view space such that each object is as seen from the camera
	4. Clip coords - clip the screen from -1 to 1 and determine what is shown
	5. Screen coords - a viewport transform, converts -1 to 1 to range defined by `glViewport`

### Local space

- Coord space local to object
- Example: The center of a cube - as shown in a new blender file

### World space

- All objects are positioned w.r.t world origin of (0,0,0)
