# -*- coding: utf-8 -*-
"""
@Author  : Eric dos Santos (ericshantos13@gmail.com)
Module responsible for loading dependencies required for prediction.
"""

from tensorflow.keras.models import load_model
import pickle

class ModelLoader:
    """
    Loads a trained Keras model and its corresponding tokenizer.
    """

    def __init__(self, model_path: str, tokenizer_path: str):
        """
        Initializes the ModelLoader by loading the model and tokenizer.

        Args:
            model_path (str): Path to the saved Keras model (HDF5 format or SavedModel directory).
            tokenizer_path (str): Path to the tokenizer saved in JSON format.
        """
        self.model = load_model(model_path)
        with open(tokenizer_path, "rb") as f:
            self.tokenizer = pickle.load(f)
