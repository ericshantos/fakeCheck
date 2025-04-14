# -*- coding: utf-8 -*-
"""
@Author  : Eric dos Santos (ericshantos13@gmail.com)
Main module for running the fake news prediction pipeline.
"""

import json
import sys
import traceback
from core import TextCleaner, ModelLoader, Predictor
from config import TOKENIZER_PATH, MODEL_PATH

def main():
    """
    Entry point for the prediction pipeline.

    Reads input JSON from stdin containing a "text" field,
    preprocesses the text, loads model and tokenizer, performs prediction,
    and prints the result as JSON to stdout.

    On error, prints the traceback to stderr and exits with code 1.
    """
    try:
        input_data = sys.stdin.read()
        data = json.loads(input_data)
        text = data["text"]

        cleaner = TextCleaner()
        model_loader = ModelLoader(MODEL_PATH, TOKENIZER_PATH)
        predictor = Predictor(model_loader.model, model_loader.tokenizer)

        cleaned = cleaner.clean(text)
        result = predictor.predict(cleaned)

        print(json.dumps({"result": result}))

    except Exception as e:
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
