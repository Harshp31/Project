import numpy as np
from src.activation import sigmoid

class LogisticRegressionfromScratch:
    def __init__(self, learning_rate: float = 0.01, num_iterations: int = 1000):
        self.lr = learning_rate
        self.epochs = num_iterations
        self.weight = None
        self.bias = None
        
    def fit(self, X: np.ndarray, Y: np.ndarray) -> list:
        num_samples, num_features = X.shape
        #training proess
        #Intialize wights 
        self.weight = np.zeros(num_features)
        self.bias = 0.0
        loss_history = []
        
        #Gradient descent(optimization)
        for i in range(self.epochs):
            #Forward pass 
            #It predicts models raw predictions (linear model) and the applies the sigmoid function to get the predicted probabilities.
            linear_model = np.dot(X, self.weight) + self.bias  #np.dot is used to perform matrix multiplication between the input data X and the weight vector self.weight, and then adds the bias term self.bias to each element of the resulting array. mathematically, Z = X.W + b.
            predictions = sigmoid(linear_model)  #The sigmoid function is applied to the linear model to get the predicted probabilities.
            
            
            #vectorized derivative(compute gradients) of the loss function with respect to weights and bias 
            error = predictions - Y #The error is calculated as the difference between the predicted probabilities and the actual labels Y.
            dw = (1 / num_samples) * np.dot(X.T, error) #The gradient with respect to the weights is calculated using the dot product of the transpose of the input data X and the error, scaled by the number of samples.
            db = (1 / num_samples) * np.sum(error)
            
            #Parameter update
            self.weight -= self.lr * dw #
            self.bias -= self.lr * db
            
        return loss_history
    
    def predict_probability(self, X: np.ndarray) -> np.ndarray:
        linear_model = np.dot(X, self.weight) + self.bias
        return sigmoid(linear_model)

    def predict(self, X:np.ndarray, threshold: float = 0.5) -> np.ndarray:
        probabilities = self.predict_probability(X)
        return np.where(probabilities >= threshold, 1, 0).astype(int)
    
    
            
        
         
