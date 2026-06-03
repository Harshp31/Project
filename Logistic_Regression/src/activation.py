# In this file, we handles the non-linear transformation of the data.
import numpy as np

def sigmoid(z: np.ndarray) -> np.ndarray:
    return 1 / (1 + np.exp(-z))  #np.exp is the exponential function, which is used to calculate the sigmoid function element-wise to the entire array. 


