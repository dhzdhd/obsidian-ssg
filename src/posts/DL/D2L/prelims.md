```python
import torch
import pandas as pd
import numpy as np
from matplotlib_inline import backend_inline
import matplotlib.pyplot as plt
from d2l import torch as d2l
```

## Data manipulation


```python
# Tensor data struct used (like ndarray but has automatic differentiation & GPU)
t = torch.arange(12, dtype=torch.float32)

```


```python
# Count
t.numel()

```




    12




```python
t.shape

```




    torch.Size([12])




```python
a = t.reshape((3, 4))  # Can set any one to -1 to infer
a.shape
```




    torch.Size([3, 4])




```python
z = torch.zeros((2, 3, 4))

```


```python
r = torch.randn(3, 4)  # Normal dist
```


```python
# Indexing
a[0]

```




    tensor([0., 1., 2., 3.])




```python
a[1, 2]

```




    tensor(6.)




```python
a[0:1, 1:2]

```




    tensor([[1.]])




```python
torch.exp(a)  # Elementwise broadcast
```




    tensor([[1.0000e+00, 2.7183e+00, 7.3891e+00, 2.0086e+01],
            [5.4598e+01, 1.4841e+02, 4.0343e+02, 1.0966e+03],
            [2.9810e+03, 8.1031e+03, 2.2026e+04, 5.9874e+04]])




```python
a + r  # Elementwise but needs same shape
```




    tensor([[ 0.7874,  2.0269,  1.2039,  2.9390],
            [ 3.2477,  5.0193,  7.0820,  6.9646],
            [ 6.9737,  8.5228,  9.5798, 13.2534]])




```python
# Concatenating
torch.cat((a, r), dim=0)

```




    tensor([[ 0.0000,  1.0000,  2.0000,  3.0000],
            [ 4.0000,  5.0000,  6.0000,  7.0000],
            [ 8.0000,  9.0000, 10.0000, 11.0000],
            [ 0.7874,  1.0269, -0.7961, -0.0610],
            [-0.7523,  0.0193,  1.0820, -0.0354],
            [-1.0263, -0.4772, -0.4202,  2.2534]])




```python
torch.cat((a, r), dim=1)  # Concat along 1st dim
```




    tensor([[ 0.0000,  1.0000,  2.0000,  3.0000,  0.7874,  1.0269, -0.7961, -0.0610],
            [ 4.0000,  5.0000,  6.0000,  7.0000, -0.7523,  0.0193,  1.0820, -0.0354],
            [ 8.0000,  9.0000, 10.0000, 11.0000, -1.0263, -0.4772, -0.4202,  2.2534]])




```python
a == r

```




    tensor([[False, False, False, False],
            [False, False, False, False],
            [False, False, False, False]])




```python
a.sum()

```




    tensor(66.)




```python
# Broadcasting with diff shapes
a = torch.arange(3).reshape((3, 1))
b = torch.arange(2).reshape((1, 2))
a, b

```




    (tensor([[0],
             [1],
             [2]]),
     tensor([[0, 1]]))




```python
a + b

```




    tensor([[0, 1],
            [1, 2],
            [2, 3]])




```python
# Saving memory
Z = torch.zeros_like(z)
print("id(Z):", id(Z))
Z[:] = z + r
print("id(Z):", id(Z))  # Same address = memory saved

# Try for inplace updates rather than new vars
```

    id(Z): 1947579140752
    id(Z): 1947579140752



```python
# Conversion
new = a.numpy()

```


```python
torch.from_numpy(new)

```




    tensor([[0],
            [1],
            [2]])




```python
a[1].item()  # To scalar
```




    1



## Data Preprocessing


```python
df = pd.DataFrame(
    {
        "NumRooms": [np.NaN, 2, 4, np.NaN],
        "RoofType": [np.NaN, np.NaN, "Slate", np.NaN],
        "Price": [127500, 106000, 178100, 140000],
    }
)
```


```python
# For missing data
# If categorical, NaN considered as a category
# If numerical, mean is taken
inputs, targets = df.iloc[:, 0:2], df.iloc[:, 2]
inputs = pd.get_dummies(inputs, dummy_na=True)
inputs
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>NumRooms</th>
      <th>RoofType_Slate</th>
      <th>RoofType_nan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>NaN</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2.0</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4.0</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>3</th>
      <td>NaN</td>
      <td>False</td>
      <td>True</td>
    </tr>
  </tbody>
</table>
</div>




```python
inputs = inputs.fillna(inputs.mean())
inputs
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>NumRooms</th>
      <th>RoofType_Slate</th>
      <th>RoofType_nan</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>3.0</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2.0</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>2</th>
      <td>4.0</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>3</th>
      <td>3.0</td>
      <td>False</td>
      <td>True</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Convert to tensor
X = torch.tensor(inputs.to_numpy(dtype=float))
y = torch.tensor(targets.to_numpy(dtype=float))
X, y
```




    (tensor([[3., 0., 1.],
             [2., 0., 1.],
             [4., 1., 0.],
             [3., 0., 1.]], dtype=torch.float64),
     tensor([127500., 106000., 178100., 140000.], dtype=torch.float64))



## Linear Algebra


```python
# Scalars
x = torch.tensor(3.0)
y = torch.tensor(2.0)
x + y, x - y, x * y, x / y
```




    (tensor(5.), tensor(1.), tensor(6.), tensor(1.5000))




```python
# Vectors
x = torch.arange(3)
x
```




    tensor([0, 1, 2])




```python
x[2] # x subscript 2
```




    tensor(2)




```python
x.numel()
```




    3




```python
# Matrices
A = torch.arange(6).reshape((2, 3))
A
```




    tensor([[0, 1, 2],
            [3, 4, 5]])




```python
A.T
```




    tensor([[0, 3],
            [1, 4],
            [2, 5]])




```python
# Tensor
torch.arange(24).reshape(2, 3, 4)
```




    tensor([[[ 0,  1,  2,  3],
             [ 4,  5,  6,  7],
             [ 8,  9, 10, 11]],
    
            [[12, 13, 14, 15],
             [16, 17, 18, 19],
             [20, 21, 22, 23]]])




```python
A = torch.arange(6, dtype=torch.float32).reshape(2, 3)
B = A.clone()  # Assign a copy of A to B by allocating new memory
A * B # Hadamard (elementwise) product
```




    tensor([[ 0.,  1.,  4.],
            [ 9., 16., 25.]])




```python
a = 2
a + A
```




    tensor([[2., 3., 4.],
            [5., 6., 7.]])




```python
# Reduction
A.sum()
```




    tensor(15.)




```python
A.sum(axis=0)
```




    tensor([3., 5., 7.])




```python
A.sum(axis=1)
```




    tensor([ 3., 12.])




```python
A.sum(axis=1, keepdim=True)
```




    tensor([[ 3.],
            [12.]])



### Dot product
Given two vectors $\mathbf{x}, \mathbf{y} \in \mathbb{R}^d$, their dot product $x^Ty$ (or $\langle \mathbf{x}, \mathbf{y} \rangle$) is a sum over the products of the elements at the same position: $\mathbf{x}^\top \mathbf{y} = \sum_{i=1}^{d} x_i y_i$.

Also $x \cdot y = xycos\theta$


```python
x = torch.randn(3, dtype=torch.float32)
y = torch.ones(3, dtype = torch.float32)
x, y, torch.dot(x, y), x @ y
```




    (tensor([0.1991, 1.1635, 0.5849]),
     tensor([1., 1., 1.]),
     tensor(1.9475),
     tensor(1.9475))



### Matrix-Vector product
$$\begin{split}\mathbf{A}=
\begin{bmatrix}
\mathbf{a}^\top_{1} \\
\mathbf{a}^\top_{2} \\
\vdots \\
\mathbf{a}^\top_m \\
\end{bmatrix},\end{split}$$
where each $\mathbf{a}^\top_{i} \in \mathbb{R}^n$
 is a row vector representing the ${i^{th}}$
 row of the matrix $A$
 $$\begin{split}\mathbf{A}\mathbf{x}
= \begin{bmatrix}
\mathbf{a}^\top_{1} \\
\mathbf{a}^\top_{2} \\
\vdots \\
\mathbf{a}^\top_m \\
\end{bmatrix}\mathbf{x}
= \begin{bmatrix}
 \mathbf{a}^\top_{1} \mathbf{x}  \\
 \mathbf{a}^\top_{2} \mathbf{x} \\
\vdots\\
 \mathbf{a}^\top_{m} \mathbf{x}\\
\end{bmatrix}.\end{split}$$

We can think of multiplication with a matrix
$\mathbf{A}\in \mathbb{R}^{m \times n}$
as a transformation that projects vectors
from $\mathbb{R}^{n}$ to $\mathbb{R}^{m}$.
These transformations are remarkably useful.
For example, we can represent rotations
as multiplications by certain square matrices.
Matrix-vector products also describe 
the key calculation involved in computing
the outputs of each layer in a neural network
given the outputs from the previous layer.


```python
A.shape, x.shape, torch.mv(A, x), A @ x
```




    (torch.Size([2, 3]),
     torch.Size([3]),
     tensor([2.3333, 8.1758]),
     tensor([2.3333, 8.1758]))



### Matrix-Matrix product
Say that we have two matrices 
$\mathbf{A} \in \mathbb{R}^{n \times k}$ 
and $\mathbf{B} \in \mathbb{R}^{k \times m}$:

$$\mathbf{A}=\begin{bmatrix}
 a_{11} & a_{12} & \cdots & a_{1k} \\
 a_{21} & a_{22} & \cdots & a_{2k} \\
\vdots & \vdots & \ddots & \vdots \\
 a_{n1} & a_{n2} & \cdots & a_{nk} \\
\end{bmatrix},\quad
\mathbf{B}=\begin{bmatrix}
 b_{11} & b_{12} & \cdots & b_{1m} \\
 b_{21} & b_{22} & \cdots & b_{2m} \\
\vdots & \vdots & \ddots & \vdots \\
 b_{k1} & b_{k2} & \cdots & b_{km} \\
\end{bmatrix}.$$


Let $\mathbf{a}^\top_{i} \in \mathbb{R}^k$ denote 
the row vector representing the $i^\mathrm{th}$ row 
of the matrix $\mathbf{A}$
and let $\mathbf{b}_{j} \in \mathbb{R}^k$ denote 
the column vector from the $j^\mathrm{th}$ column 
of the matrix $\mathbf{B}$:

$$\mathbf{A}=
\begin{bmatrix}
\mathbf{a}^\top_{1} \\
\mathbf{a}^\top_{2} \\
\vdots \\
\mathbf{a}^\top_n \\
\end{bmatrix},
\quad \mathbf{B}=\begin{bmatrix}
 \mathbf{b}_{1} & \mathbf{b}_{2} & \cdots & \mathbf{b}_{m} \\
\end{bmatrix}.
$$


To form the matrix product $\mathbf{C} \in \mathbb{R}^{n \times m}$,
we simply compute each element $c_{ij}$
as the dot product between 
the $i^{\mathrm{th}}$ row of $\mathbf{A}$
and the $j^{\mathrm{th}}$ column of $\mathbf{B}$,
i.e., $\mathbf{a}^\top_i \mathbf{b}_j$:

$$\mathbf{C} = \mathbf{AB} = \begin{bmatrix}
\mathbf{a}^\top_{1} \\
\mathbf{a}^\top_{2} \\
\vdots \\
\mathbf{a}^\top_n \\
\end{bmatrix}
\begin{bmatrix}
 \mathbf{b}_{1} & \mathbf{b}_{2} & \cdots & \mathbf{b}_{m} \\
\end{bmatrix}
= \begin{bmatrix}
\mathbf{a}^\top_{1} \mathbf{b}_1 & \mathbf{a}^\top_{1}\mathbf{b}_2& \cdots & \mathbf{a}^\top_{1} \mathbf{b}_m \\
 \mathbf{a}^\top_{2}\mathbf{b}_1 & \mathbf{a}^\top_{2} \mathbf{b}_2 & \cdots & \mathbf{a}^\top_{2} \mathbf{b}_m \\
 \vdots & \vdots & \ddots &\vdots\\
\mathbf{a}^\top_{n} \mathbf{b}_1 & \mathbf{a}^\top_{n}\mathbf{b}_2& \cdots& \mathbf{a}^\top_{n} \mathbf{b}_m
\end{bmatrix}.
$$

[**We can think of the matrix-matrix multiplication $\mathbf{AB}$
as performing $m$ matrix-vector products 
or $m \times n$ dot products 
and stitching the results together 
to form an $n \times m$ matrix.**]


```python
B = torch.ones(3, 4)
torch.mm(A, B), A @ B
```




    (tensor([[ 3.,  3.,  3.,  3.],
             [12., 12., 12., 12.]]),
     tensor([[ 3.,  3.,  3.,  3.],
             [12., 12., 12., 12.]]))



### Norm
The norm of a vector tells us how big it is. For instance, the $\ell_2$
 norm measures the (Euclidean) length of a vector. Here, we are employing a notion of size that concerns the magnitude of a vector’s components (not its dimensionality).

 A norm is a function $\| \cdot \|$ that maps a vector
to a scalar and satisfies the following three properties:

1. Given any vector $\mathbf{x}$, if we scale (all elements of) the vector 
   by a scalar $\alpha \in \mathbb{R}$, its norm scales accordingly:
   $$\|\alpha \mathbf{x}\| = |\alpha| \|\mathbf{x}\|.$$
2. For any vectors $\mathbf{x}$ and $\mathbf{y}$:
   norms satisfy the triangle inequality:
   $$\|\mathbf{x} + \mathbf{y}\| \leq \|\mathbf{x}\| + \|\mathbf{y}\|.$$
3. The norm of a vector is nonnegative and it only vanishes if the vector is zero:
   $$\|\mathbf{x}\| > 0 \text{ for all } \mathbf{x} \neq 0.$$

Many functions are valid norms and different norms 
encode different notions of size. 
The Euclidean norm that we all learned in elementary school geometry
when calculating the hypotenuse of right triangle
is the square root of the sum of squares of a vector's elements.
Formally, this is called [**the $\ell_2$ *norm***] and expressed as

**$$\|\mathbf{x}\|_2 = \sqrt{\sum_{i=1}^n x_i^2}.$$**

The $\ell_1$ norm is the Manhattan distance

The $\ell_p$ norm is the general Minkowski form of distance, given by $$\|\mathbf{x}\|_p = \left(\sum_{i=1}^n \left|x_i \right|^p \right)^{1/p}$$

Matrices use the spectral norm

or now, we introduce the Frobenius (similar to $\ell_2$) norm, which is much easier to compute and defined as the square root of the sum of the squares of a matrix’s elements
$$\|\mathbf{X}\|_F = \sqrt{\sum_{i=1}^m \sum_{j=1}^n x_{ij}^2}$$


```python
u = torch.tensor([3.0, -4.0])
torch.norm
torch.linalg.norm(u)
```




    tensor(5.)



## Calculus

The limiting procedure leads to both differential calculus and integral calculus (Section 22.5). The former can tell us how to increase or decrease a function value by manipulating its arguments. This comes in handy for the optimization problems that we face in deep learning, where we repeatedly update our parameters in order to decrease the loss function.

### Derivative
Put simply, a derivative is the rate of change in a function with respect to changes in its arguments. Derivatives can tell us how rapidly a loss function would increase or decrease were we to increase or decrease each parameter by an infinitesimally small amount.
$$f'(x) = \lim_{h \rightarrow 0} \frac{f(x+h) - f(x)}{h}.$$
 Not all functions are differentiable, including many that we wish to optimize, including accuracy and the area under the receiving operating characteristic (AUC). However, because computing the derivative of the loss is a crucial step in nearly all algorithms for training deep neural networks, we often optimize a differentiable surrogate instead.


```python
f = lambda x: 3 * x ** 2 - 4 * x

for h in 10.0 ** np.arange(-1, -6, -1):
    print(f'h={h:.5f}, numerical limit={(f(1+h)-f(1))/h:.5f}')
```

    h=0.10000, numerical limit=2.30000
    h=0.01000, numerical limit=2.03000
    h=0.00100, numerical limit=2.00300
    h=0.00010, numerical limit=2.00030
    h=0.00001, numerical limit=2.00003


$$ f'(x) = y' = \frac{dy}{dx} = \frac{df}{dx} = \frac{d}{dx} f(x) = Df(x) = D_x f(x)$$


```python
backend_inline.set_matplotlib_formats('svg')
x = np.arange(0, 3, 0.1)

fig = plt.figure(figsize=(3.5, 2.5))
p = fig.subplots(1, 1)

p.set_xscale('linear')
p.set_yscale('linear')
p.set_xlabel('x')
p.set_ylabel('f(x)')
p.legend(['f(x)', 'Tangent line (x=1)'])
p.grid(color='lightblue')
p.plot(x, f(x))
p.plot(x, 2 * x - 3, linestyle='dashed')
```




    [<matplotlib.lines.Line2D at 0x1c57d564190>]




    
![svg](./prelims_files/prelims_54_1.svg)
    


### Partial derivatives & Gradient
$$\frac{\partial y}{\partial x_i} = \lim_{h \rightarrow 0} \frac{f(x_1, \ldots, x_{i-1}, x_i+h, x_{i+1}, \ldots, x_n) - f(x_1, \ldots, x_i, \ldots, x_n)}{h}.$$
$$\frac{\partial y}{\partial x_i} = \frac{\partial f}{\partial x_i} = \partial_{x_i} f = \partial_i f = f_{x_i} = f_i = D_i f = D_{x_i} f.$$

We can concatenate partial derivatives of a multivariate function with respect to all its variables to obtain a vector that is called the gradient of the function
$$\nabla_{\mathbf{x}} f(\mathbf{x}) = \left[\partial_{x_1} f(\mathbf{x}), \partial_{x_2} f(\mathbf{x}), \ldots
\partial_{x_n} f(\mathbf{x})\right]^\top.$$

When there is no ambiguity,
$\nabla_{\mathbf{x}} f(\mathbf{x})$ 
is typically replaced 
by $\nabla f(\mathbf{x})$.
The following rules come in handy 
for differentiating multivariate functions:

* For all $\mathbf{A} \in \mathbb{R}^{m \times n}$ we have $\nabla_{\mathbf{x}} \mathbf{A} \mathbf{x} = \mathbf{A}^\top$ and $\nabla_{\mathbf{x}} \mathbf{x}^\top \mathbf{A}  = \mathbf{A}$.
* For square matrices $\mathbf{A} \in \mathbb{R}^{n \times n}$ we have that $\nabla_{\mathbf{x}} \mathbf{x}^\top \mathbf{A} \mathbf{x}  = (\mathbf{A} + \mathbf{A}^\top)\mathbf{x}$ and in particular
$\nabla_{\mathbf{x}} \|\mathbf{x} \|^2 = \nabla_{\mathbf{x}} \mathbf{x}^\top \mathbf{x} = 2\mathbf{x}$.

Similarly, for any matrix $\mathbf{X}$, 
we have $\nabla_{\mathbf{X}} \|\mathbf{X} \|_F^2 = 2\mathbf{X}$. 

### Chain rule
$$\frac{dy}{dx} = \frac{dy}{du} \frac{du}{dx}.$$

Turning back to multivariate functions,
suppose that $y = f(\mathbf{u})$ has variables
$u_1, u_2, \ldots, u_m$, 
where each $u_i = g_i(\mathbf{x})$ 
has variables $x_1, x_2, \ldots, x_n$,
i.e.,  $\mathbf{u} = g(\mathbf{x})$.
Then the chain rule states that

$$\frac{\partial y}{\partial x_{i}} = \frac{\partial y}{\partial u_{1}} \frac{\partial u_{1}}{\partial x_{i}} + \frac{\partial y}{\partial u_{2}} \frac{\partial u_{2}}{\partial x_{i}} + \ldots + \frac{\partial y}{\partial u_{m}} \frac{\partial u_{m}}{\partial x_{i}} \text{ and thus } \nabla_{\mathbf{x}} y =  \mathbf{A} \nabla_{\mathbf{u}} y,$$

where $\mathbf{A} \in \mathbb{R}^{n \times m}$ is a *matrix*
that contains the derivative of vector $\mathbf{u}$
with respect to vector $\mathbf{x}$.
Thus, evaluating the gradient requires 
computing a vector-matrix product. 

## Automatic differentiation
As we pass data through each successive function, the framework builds a computational graph that tracks how each value depends on others. To calculate derivatives, automatic differentiation works backwards through this graph applying the chain rule. The computational algorithm for applying the chain rule in this fashion is called backpropagation.


```python
x = torch.arange(4.0)
x
```




    tensor([0., 1., 2., 3.])




```python
# Can also create x = torch.arange(4.0, requires_grad=True)
x.requires_grad_(True)
x.grad  # The gradient is None by default
```


```python

```
