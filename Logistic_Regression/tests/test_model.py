import numpy as np
from src.model import LogisticRegression

def test_model_shapes():
    
    #Creates fake data for testing the model: 10 smaples, 3 features
    X_fake = np.random.rand(10, 3)  # 10 samples, 3 features
    Y_fake = np.random.rand(0, 2, size=10)
    
    model = LogisticRegression()
    model.fit(X_fake, Y_fake)
    
    assert model.weights.shape == (3,)
    assert isinstance(model.bias, float) or isinstance(model.bias, np.float64)
    assert model.predict(X_fake).shape == (10,)