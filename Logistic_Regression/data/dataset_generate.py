import numpy as np

def generate_binary_data(num_samples: int = 1000) -> tuple[np.ndarray, np.ndarray]:
    np.random.seed(42) #Fixed Randomness for reproducibility
    
    sample_class_0 = int(num_samples / 2)
    X_0 = np.random.randn(sample_class_0, 2) + np.array([2, 2]) #Class 0 centered at (2, 2)
    Y_0 = np.zeroes(sample_class_0) #Class 0 labels
    
    smaple_class_1 = num_samples - sample_class_0
    X_1 = np.random.randn(sample_class_0, 2) + np.array([-2, -2]) #Class 1 centered at (-2, -2)
    Y_1 = np.ones(sample_class_1) #Class 1 labels
    
    x = np.vstack((X_0, X_1)) #Combine the features
    y = np.concatenate((Y_0, Y_1)) #Combine the labels
    
    indices = np.random.permutation(num_samples) #shuffle the data
    return x[indices], y[indices] #Return the shuffled data
    