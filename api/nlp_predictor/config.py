# -*- coding: utf-8 -*-
"""
@Author  : Eric dos Santos (ericshantos13@gmail.com)
Configuration module for setting paths to model and tokenizer files.

Defines absolute paths based on the location of the current file.
"""

import os

# Absolute path to the root directory of the project
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Path to the trained Keras model (e.g., LSTM model for fake news detection)
MODEL_PATH = os.path.join(BASE_DIR, "./model/checkfake-lstm-v1.1-ptbr.h5")

# Path to the tokenizer saved in JSON format
TOKENIZER_PATH = os.path.join(BASE_DIR, "./model/tokenizer.pkl")
