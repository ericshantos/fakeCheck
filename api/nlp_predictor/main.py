# -*- coding: utf-8 -*-
"""
@Author  : Eric dos Santos (ericshantos13@gmail.com)
Main module for running the fake news prediction pipeline over network connections.
"""

import socket
from src import predict_fake_news

HOST = '0.0.0.0'  # IP address to listen on all interfaces
PORT = 9000        # Port on which the server will listen for incoming connections

def start_server() -> None:
    """
    Starts the TCP server and listens for incoming connections.

    This function sets up a server that listens on the specified port. When a connection
    is made, it receives the news article, runs the prediction pipeline, and returns the
    result to the client.

    It runs continuously, accepting and processing requests until manually terminated.
    """
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))  # Bind the server to the host and port
        s.listen()            # Enable the server to listen for incoming connections
        print(f"Listening on port {PORT}")
        
        while True:
            conn, _ = s.accept()  # Accept a new connection
            with conn:
                data = conn.recv(4096).decode('utf-8')  # Receive data from the client
                
                # If no data is received, continue to the next iteration
                if not data:
                    continue
                
                # Process the received data through the fake news prediction pipeline
                result = predict_fake_news(data)
                
                # Send the prediction result back to the client
                conn.sendall(str(result).encode('utf-8'))

if __name__ == "__main__":
    start_server()
