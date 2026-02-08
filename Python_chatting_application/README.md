# Python Chat Application

A simple real-time chat application built with Python and Socket.IO.

## Features

- Real-time messaging
- Multi-user support
- Simple GUI interface
- Real-time message synchronization

## Tech Stack

- **Python 3.8+**
- **Networking**: Socket.IO
- **GUI**: Tkinter/PyQt
- **Protocol**: WebSocket

## Installation

1. Navigate to the project directory:
   ```bash
   cd Python_chatting_application
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

   Or individually:
   ```bash
   pip install python-socketio flask-cors
   ```

## Usage

1. Start the server:
   ```bash
   python server.py
   ```

2. Start the client:
   ```bash
   python client.py
   ```

3. Connect multiple clients to chat

## Configuration

- Server runs on `localhost:5000`
- Default port can be modified in server.py
- Client connects automatically to the server

## Requirements

- Python 3.8 or higher
- Network access for multiple clients

## License

MIT
