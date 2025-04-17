# -*- coding: utf-8 -*-
"""
@Author  : Eric dos Santos (ericshantos13@gmail.com)
Package initialization for setting up modules, logging configuration, and suppressing TensorFlow warnings.

This file is responsible for:
- Importing and initializing the core modules of the package: `TextCleaner`, `ModelLoader`, and `Predictor`.
- Configuring logging to display warnings and errors to stderr.
- Setting the TensorFlow logging level to `ERROR` to suppress unnecessary logs.
- Defining the modules available for import when the package is used.
- Setting environment variables to suppress TensorFlow debug information.

The following components are available to be imported from this package:
- `TextCleaner`: A module for cleaning and preprocessing text data.
- `ModelLoader`: A module for loading a pre-trained model and tokenizer.
- `Predictor`: A module for making predictions using a trained model.
"""

import sys, logging, os, traceback
import tensorflow as tf
from typing import Union

from .cleaner import TextCleaner
from .model_loader import ModelLoader
from .predictor import Predictor
from config import MODEL_PATH, TOKENIZER_PATH

# Configure logging to output warnings and errors to stderr
logging.basicConfig(stream=sys.stderr, level=logging.WARNING)

# Set TensorFlow logging level to ERROR to suppress unnecessary logs
tf.get_logger().setLevel('ERROR')

# Set the environment variable to suppress TensorFlow debug information
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# Author information for the package
__author__ = "Eric Santos <https://www.github.com/ericshantos>"

# Define the modules that will be accessible when the package is imported
__all__ = ["TextCleaner", "ModelLoader", "Predictor"]

def predict_fake_news(text: str) -> Union[float, int]:
    """
    Predicts the likelihood that a given news article is fake.

    This function performs the following steps:
    1. Cleans the input text using the `TextCleaner` class.
    2. Loads a pre-trained model and tokenizer using the `ModelLoader` class.
    3. Makes a prediction using the `Predictor` class based on the cleaned text.

    Args:
        text (str): Raw text of the news article to be evaluated.

    Returns:
        float | int: A probability score (as a float) or class label (as an integer)
        indicating whether the news is fake. The exact return type depends on
        the implementation of the `Predictor.predict` method.
    """
    try:
        # Initialize the text cleaner for preprocessing
        cleaner = TextCleaner()

        # Load the trained model and tokenizer
        model_loader = ModelLoader(MODEL_PATH, TOKENIZER_PATH)

        # Create a predictor using the loaded model and tokenizer
        predictor = Predictor(model_loader.model, model_loader.tokenizer)

        # Clean the input text
        cleaned = cleaner.clean(text)

        # Return the prediction result
        return predictor.predict(cleaned)

    except Exception as e:
        # Log the exception details with traceback
        logging.error("An error occurred during fake news prediction: %s", str(e))
        traceback.print_exc(file=sys.stderr)

        # exit with a non-zero status to indicate failure
        sys.exit(1)
