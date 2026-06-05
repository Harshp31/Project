import numpy as np
from data.dataset_generate import generate_binary_data
from src.model import LogisticRegressionfromScratch
from sklearn.linear_model import LogisticRegression

def main():
    print('Genrating dataset....')
    X, y = generate_binary_data(num_samples=1000)
    
    #1:- Train Custom model
    print('\n--Training Custom Logistic Regression Model--')
    my_model = LogisticRegressionfromScratch(learning_rate=0.1, num_iterations=1000)
    my_model.fit(X, y)
    
    
    #Generate predictions and calculate accuracy
    my_predictions = my_model.predict(X)
    my_accuracy = np.mean(my_predictions == y)
    print(f"Custom Model Accuracy: {my_accuracy * 100:.2f}%")
    
    #2: Train the scikit-learn model for comparison
    print("\n--Training Scikit-learn Logistic Regression Model--")
    sk_model = LogisticRegression()
    sk_model.fit(X, y)
    
    sk_predictions = sk_model.predict(X)
    sl_accuracy = np.mean(sk_predictions == y)
    print(f"Scikit-learn Model Accuracy: {sl_accuracy * 100:.2f}%")
    
if __name__ == "__main__":
    main() 
    
    