# 🌐 Networking Recipes

Python scripts for network programming, socket communication, and networked applications.

## 📋 Recipes

### Socket Programming
**Path:** `sockets/`
Basic socket client/server implementation.

```bash
cd sockets

# Terminal 1 - Server
python server.py

# Terminal 2 - Client
python client.py
```

### Chat Application
**Path:** `chat-app/`
Multi-client chat server and client.

```bash
cd "chat-app"

# Terminal 1 - Server
python server.py

# Terminal 2+ - Clients
python client.py
```

### Electronics Algorithms
**Path:** `electronics/`
Electronics-related algorithms and calculations.

```bash
cd electronics
python main.py
```

## 📦 Common Dependencies

```bash
# Networking (built-in)
# Most networking uses standard library

# Async networking
pip install asyncio

# Websockets
pip install websockets
```

## 🎯 Prerequisites

- Python 3.7+
- Network understanding (TCP/UDP)
- For chat apps: Multiple terminal windows
- Port availability (some scripts use specific ports)

## 📚 Concepts Covered

- Socket programming (TCP/UDP)
- Client-server architecture
- Multi-threading for concurrent clients
- Protocol design
- Data serialization
- Network error handling

## 🔗 Related Categories

- [Web](../web/) - HTTP networking
- [Games](../games/) - Multiplayer games
