# -*- coding: utf-8 -*-
"""
@Author  : Eric dos Santos (ericshantos13@gmail.com)
Module responsible for making predictions using a trained deep learning model.
"""

import logging, socket, threading
from ..core import NewsClassifier

class ServerLauncher:
    def __init__(self, classifier: NewsClassifier, HOST: str, PORT: int):
        self.classifier = classifier
        self.host = HOST
        self.port = PORT
    
    def handle_connection(self, conn: socket.socket) -> None:
        with conn:
            try:
                data = conn.recv(4096).decode('utf-8')
                if not data:
                    return
                result = self.classifier.predict(data)
                conn.sendall(str(result).encode('utf-8'))
            except Exception as e:
                logging.error(f"[ERROR] Error handling connection: {e}")   

    def init(self) -> None:
        """
        Starts the TCP server and listens for incoming connections.

        This function sets up a server that listens on the specified port. When a connection
        is made, it receives the news article, runs the prediction pipeline, and returns the
        result to the client.

        It runs continuously, accepting and processing requests until manually terminated.
        """
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                s.bind((self.host, self.port))
                s.listen()
                logging.info(f"Listening on {self.host}:{self.port}")

                while True:
                    conn, _ = s.accept()
                    threading.Thread(target=self.handle_connection, args=(conn,)).start()
        except Exception as e:
            logging.error(f"[CRITICAL] Server failed to start: {e}")     
