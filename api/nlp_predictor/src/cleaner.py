# -*- coding: utf-8 -*-
"""
@Author  : Eric dos Santos (ericshantos13@gmail.com)
Module for preprocessing and cleaning Portuguese text data using spaCy.
"""

import spacy
from unidecode import unidecode

class TextPreprocessor:
    """
    Abstract base class for text preprocessing.
    Subclasses should implement the `clean` method.
    """

    def clean(self, text: str) -> str:
        """
        Cleans the input text.

        Args:
            text (str): Raw input text.

        Returns:
            str: Cleaned text.
        
        Raises:
            NotImplementedError: If the method is not implemented in the subclass.
        """
        raise NotImplementedError


class TextCleaner(TextPreprocessor):
    """
    Cleans and preprocesses Portuguese text using spaCy.
    Removes stopwords and punctuation, and applies lemmatization and accent normalization.
    """

    def __init__(self):
        """
        Initializes the TextCleaner with the Portuguese spaCy model.
        """
        self.nlp = spacy.load("pt_core_news_sm")

    def clean(self, text: str) -> str:
        """
        Processes and cleans the given text.

        Steps:
            - Tokenizes the text.
            - Removes stopwords and punctuation.
            - Applies lemmatization.
            - Removes accents from lemmatized tokens.

        Args:
            text (str): Raw input text.

        Returns:
            str: Cleaned and normalized text.
        """
        doc = self.nlp(text)
        tokens = [unidecode(token.lemma_) for token in doc if not token.is_stop and not token.is_punct]
        return ' '.join(tokens)
