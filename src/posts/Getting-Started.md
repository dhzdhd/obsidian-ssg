# Getting Started

## About OpenGL

### About

- OpenGL is considered as an API but is actually in fact, a specification maintained by the Khronos Group which contains information about functions to manipulate graphics and images.
- The GPU manufacturers are the ones who implement the specification specifically for the GPU and hence, driver updates are very important to avoid implementation related bugs.
- [OpenGL Spec](https://www.opengl.org/registry/doc/glspec33.core.20100311.withchanges.pdf)

### Core v/s Immediate mode

- Original spec was focused on immediate mode a.k.a an easy-to-use API that was abstracted away from the inner workings of the functionalities.
- From 3.2 onwards, to improve customisability and flexibility, OpenGL switched to a core-profile mode that forces us to use modern practices.
- 3.3 versions exist but all future versions of OpenGL starting from 3.3 add extra useful features to OpenGL without changing OpenGL's core mechanics.

### Extensions

- Whenever a graphics company comes up with a new technique or a new large optimization for rendering this is often found in an extension implemented in the drivers.
- This way, a graphics developer can still use these new rendering techniques without having to wait for OpenGL to include the functionality

```c++ copy showLineNumbers /ext/#v
if(GL_ARB_extension_name) {
    // Do cool new and modern stuff supported by hardware
} else {
    // Extension not supported: do it the old way
}
```

### State machine

- OpenGL is by itself a large state machine: a collection of variables that define how OpenGL should currently operate.
- The state of OpenGL is commonly referred to as the OpenGL context.
- When using OpenGL, we often change its state by setting some options, manipulating some buffers and then render using the current context.
- When working in OpenGL we will come across several state-changing functions that change the context and several state-using functions that perform some operations based on the current state of OpenGL.

### Objects

- OpenGL libraries are written in C
- Due to translation problems, OpenGL has the object abstraction.
- An object in OpenGL is a collection of options that represents a subset of OpenGL's state.
```c copy
struct object_name {
    float  option1;
    int    option2;
    char[] name;
};

struct OpenGL_Context {  // Using obj in the context
  	...
  	object_name* object_Window_Target;
  	...
};

// Create object
unsigned int objectId = 0;
glGenObject(1, &objectId);
// Bind/assign object to context
glBindObject(GL_WINDOW_TARGET, objectId);
// Set options of object currently bound to GL_WINDOW_TARGET
glSetObjectOption(GL_WINDOW_TARGET, GL_OPTION_WINDOW_WIDTH,  800);
glSetObjectOption(GL_WINDOW_TARGET, GL_OPTION_WINDOW_HEIGHT, 600);
// Set context target back to default
glBindObject(GL_WINDOW_TARGET, 0);
```
- We first create an object and store a reference to it as an id
- Then we bind the object (using its id) to the target location of the context (the location of the example window object target is defined as `GL_WINDOW_TARGET`)
- Next we set the window options and finally we un-bind the object by setting the current object id of the window target to `0`.
- The options we set are stored in the object referenced by `objectId` and restored as soon as we bind the object back to `GL_WINDOW_TARGET`

## Creating a window

- The first thing we need to do is to create an OpenGL context and an application window to draw in.
- Libraries like GLFW, SDL, SFML, GLUT all provide us with OS specific implementations of background window management and the OpenGL context.
- [About toolkits](https://www.khronos.org/opengl/wiki/Related_toolkits_and_APIs)

### GLFW

- We compile GLFW from source so that it is tailored to our system/compiler.
- We use the CMake build system to generate project files from source.
- Edit the lib & include directories in Visual Studio config and add the compiled library and include directory to it. This includes -
	- `glfw3.lib`
	- `include` directory contents in the GLFW source code
- Finally, link the files by adding `glfw3.lib` and `opengl32.lib` to the additional dependencies in the `Linker>Input` tab
- We also add the `GLAD` library to retrieve the location of OpenGL platform specific driver functions. The compiled contents can be obtained from [link](https://glad.dav1d.de)
	- Add the `include` directory files to the `include` folder in the project that was setup before and add the `glad.c` file to the project as a existing item.

### Hello Window

- We initialize GLFW with `glfwInit` and then configure it with `glfwWindowHint` which takes a window hint which is a enum prefixed by `GLFW_` and a value.
- Create a window with `glfwCreateWindow` and use `glfwMakeContextCurrent` to make the context of our window the main context on the current thread. (one ctx per thread)
- We initialize GLAD before calling OpenGL functions
- Set the viewport for rendering which can be smaller than the main window by `glViewport`

### Render loops

- Create a render loop using a simple `while` construct that keeps running till we ask GLFW to stop.
- `glfwPollEvents` checks for event triggers, updates window state and calls callback functions defined.
- `glfwSwapBuffers` swaps color buffer used to render and outputs to screen
	- When the app draws in a single buffer it might lead to flickering issues as the output image is not drawn in an instant but pixel by pixel.
	- Thus, windowing apps use double buffers where the front contains the final output image and all the rendering commands and drawn to the back. These are then swapped.
- Every event update and drawing occurs in the render loop.
- At the start of frame we want to clear the screen using `glClear`. Otherwise we would still see the results from the previous frame

## Drawing triangles

### Intro

- In OpenGL everything is in 3D space, but the screen or window is a 2D array of pixels so a large part of OpenGL's work is about transforming all 3D coordinates to 2D pixels that fit on your screen.
- The process of transforming 3D coordinates to 2D pixels is managed by the graphics pipeline of OpenGL which is composed of 2 stages.
	- The first transforms your 3D coordinates into 2D coordinates
	- The second part transforms the 2D coordinates into actual coloured pixels.
- This pipeline consists of several steps that can be run in parallel on the GPU.
- For each step the pipeline runs small programs called **shaders** that are run on the GPU. Shaders are written in **OpenGL Shading Language (GLSL)**
- ![[Pasted image 20231211131800.png]]

### Graphics Pipeline

- As input, we pass 3D coordinates in an array where each coordinate represents a **vertex**. The vertex data is repr as vertex attributes
- To let OpenGL know what to do with these coords, we pass hints/**primitives** which specify if the data has to be rendered as a collection of points/line/triangles etc
- **Vertex Shader** takes as input a single vertex, does processing on the attributes and transforms the coords
- The output is optionally passed to a **geometry shader**. This takes a collection of vertices and generates shapes by emitting new vertices.
- The **primitive assembly** takes all vertices and assembles into the primitive shape
- **Rasterization** maps the primitives to corresponding pixels resulting in fragments. **Clipping** is performed to remove the fragments that are out of the viewport.
- **Fragment shader** calculates the final color of the pixel and other OpenGL effects like lighting, shadows etc
- The **alpha test and blending stage** checks the depth value of the fragment and checks if its in front/behind other objects. It also checks alpha values and blends objects accordingly. The final color of the pixel may vary from the fragment shader calculation.

### Vertex input

- OpenGL does not transform all 3D coords to 2D pixels but only processes those that are in a specific range of -1 to 1 on all axes which are the **normalized device coordinates**
- For a triangle -
```c++
float vertices[] = {
    -0.5f, -0.5f, 0.0f,
     0.5f, -0.5f, 0.0f,
     0.0f,  0.5f, 0.0f
};
```
- Unlike screen coords, y axis point up and (0, 0) is in the center of the graph.
- The normalized coords are transformed to screen-space coordinates via the viewport transform.
- Memory in the GPU should be created where we store vertex data. **Vertex buffer objects** store a large number of vertices in GPU memory where batch updates can be made as sending data to the GPU is slow.
- The GPU can manage buffer data in the following ways
	- `GL_STREAM_DRAW` - data set once, used a few times
	- `GL_STATIC_DRAW` - data set once, used many times
	- `GL_DYNAMIC_DRAW` - data changed a lot

### Vertex shader

- GLSL file starts with the version declaration
- We now declare all input vertex attributes with `in`. GLSL has 1 vector datatype with varying number of floats from 1 to 4 based on the suffix.
- We also specifically set the location of the variable using `layout`
- The 4th component of the vector (w axis) is not used as a position in space but for **perspective division**
- To set output of the shader, we assign the data to `gl_Position` which is inbuilt
```c
#version 330 core
layout (location = 0) in vec3 aPos;

void main()
{
    gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);
}
```

### Compiling the shader

- For OpenGL to use the shader, it has to be dynamically compiled at runtime
- Create a shader object - `glCreateShader`, attach the shader code to it and compile it

### Fragment shader

- Colors are represented in RGBA
- OpenGL accepts colors in the range - 0.0 to 1.0
- The fragment shader only requires one output variable and that is a vector of size 4 that defines the final color output

### Shader program

- The compiled shaders now have to be linked to the shader program object for use in rendering.
- The activated shader program's shaders will be used when we issue render calls.
- When linking the shaders into a program it links the outputs of each shader to the inputs of the next shader.
- The object can be activated by calling `glUseProgram`.
- Delete shader objects after linking as they are no longer needed

### Linking vertex attributes

- OpenGL does not yet know how to interpret the data in memory or how it should connect vertex data to the shader attributes.
- Vertex shader allows us to specify input in the form of attributes. We should thus specify how OpenGL should interpret vertex data before rendering
- ![[vertex_attribute_pointer.png]]
	- Position data stored as 4 byte floats
	- It is a contiguous array
	- First value = beginning of buffer
- With this, we tell OpenGL how to interpret vertex data using `glVertexAttribPointer`
	- First param = which attribute to configure that is, the x value in  `layout (location = x)` in the shader code.
	- Fourth specifies if we want data to be normalized
	- Fifth is the stride or the space b/w attributes which is usually `3 * sizeof(float)`. It can also be left as 0 where OpenGL determines it as a contiguous array.
	- Sixth is the offset which is usually 0
- Each vertex attribute takes its data from memory managed by a VBO and which VBO it takes its data from is determined by the VBO currently bound to `GL_ARRAY_BUFFER` when calling `glVertexAttribPointer`.
- We should now enable the attributes which are disabled by default with `glEnableVertexAttribArray`
- This should be done in a loop but all the buffer binding and management becomes cumbersome and thus we introduce state.

### Vertex Array Object

- VAO can be bound and any subsequent calls will be stored in it
- We only have to configure attr pointers once and bind the corresponding VAO while drawing
- ![[vertex_array_objects.png]]
- VAO stores -
	- Calls to `glEnableVertexAttribArray` or the disable counterpart
	- Vertex attr configs
	- VBO's associated with attributes
- Usually when you have multiple objects you want to draw, you first generate/configure all the VAOs (and thus the required VBO and attribute pointers) and store those for later use.
- The moment we want to draw one of our objects, we take the corresponding VAO, bind it, then draw the object and unbind the VAO again.

### Drawing

- OpenGL provides us with `glDrawArrays` to draw primitives

### Element Buffer Objects

- When drawing a rectangle, we need 2 triangles and we see that some vertices overlap. These are redundant and have a perf cost.
- We store only unique vertices and specify the order in which to draw
- EBO is a buffer like VBO that stores indices using which OpenGL decides what vertices to draw - **indexed drawing**.
```c
// Specify rect vertices instead of 2 triangles
float vertices[] = {
     0.5f,  0.5f, 0.0f,
     0.5f, -0.5f, 0.0f,
    -0.5f, -0.5f, 0.0f,
    -0.5f,  0.5f, 0.0f
};
unsigned int indices[] = {  // Note that we start from 0!
    0, 1, 3,   // First triangle
    1, 2, 3    // Second triangle
};
```
- Add a EBO after VBO, with buffer type - `GL_ELEMENT_ARRAY_BUFFER`
- Instead of `glDrawArrays`, EBO uses `glDrawElements`
- Just like VBO, EBO is binded into the buffer with `glBufferData` and VAO can also keep track of EBO object bindings
- The `glDrawElements` function takes its indices from the EBO currently bound to the `GL_ELEMENT_ARRAY_BUFFER` target
- To draw in wireframe mode, we change the polygon mode in OpenGL with - `glPolygonMode`

### Summary

- A breakdown on all the functions called for buffer management -
	- **`glGenVertexArrays`:**Creates a new VAO object and stores an ID for it.
	- **`glBindVertexArray`:**Binds the VAO with the given ID,making it the active VAO.
	- **`glGenBuffers`:**Creates a new VBO object and stores an ID for it.
	- **`glBindBuffer`:**Binds the VBO with the given ID to the specified buffer type.
	- **`glBufferData`:**Copies the provided data (vertices in this case) into the currently bound VBO.
	- **`glVertexAttribPointer`:**Associates the currently bound VBO with a specific vertex attribute index and specifies how to interpret its data.
	- **`glEnableVertexAttribArray`:**Enables the specified vertex attribute index so that it will be used by the shaders. it **retrieves the currently bound VBO from the global state** and stores the association of that VBO with the specified vertex attribute index in the VAO's state. **This is how the VAO knows which VBO to use and how to interpret its data.**
- In summary, the VAO holds pointers to VBOs and information about how to interpret their data, but it doesn't store the actual data itself. This separation allows you to use multiple VAOs with the same VBO or multiple VBOs with the same VAO, depending on your needs.
