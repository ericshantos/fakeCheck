# -*- coding: utf-8 -*-
"""
@Author  : Eric dos Santos (ericshantos13@gmail.com)
Package initialization for setting up modules and logging configuration.

This file defines the modules that will be available when the package is imported,
sets up logging configurations, and suppresses TensorFlow warnings.
"""

import tensorflow as tf
import sys
import logging
import os

from .cleaner import TextCleaner
from .model_loader import ModelLoader
from .predictor import Predictor

# Configure logging to output warnings and errors to stderr
logging.basicConfig(stream=sys.stderr, level=logging.WARNING)

# Set TensorFlow logging level to ERROR to suppress unnecessary logs
tf.get_logger().setLevel('ERROR')

# Set the environment variable to suppress TensorFlow debug information
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# Author information for the package
__author__ = "Eric Santos <https://www.github.com/ericshantos>"

# Define the modules that will be accessible when the package is imported
__all__ = ["TextCleaner", "ModelLoader", "Predictor"]
