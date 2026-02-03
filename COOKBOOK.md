# 🧪 Python Cookbook - Practical Recipes for Everyday Coding

> A curated collection of copy-paste Python examples organized by real-world use cases. Each recipe is ready to run, well-documented, and designed for practical application.

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/mk-knight23/58-starter-python-examples.git
cd 58-starter-python-examples

# Browse recipes by category
cd cookbook/web  # or automation, games, gui, etc.

# Install category dependencies
pip install -r requirements.txt

# Run any recipe
python recipe_name.py
```

---

## 📖 Recipe Categories

### 🌐 [Web Recipes](cookbook/web/)
Web scraping, API interactions, and web automation
- NASA APOD fetcher
- Weather scraper
- Instagram tools
- Async downloader

### 🤖 [Automation Recipes](cookbook/automation/)
Automate repetitive tasks and file management
- File organizer
- Downloads organizer
- Call reminders
- Wallpaper manager

### 📊 [Data Recipes](cookbook/data/)
Data processing, analysis, and algorithms
- Sorting algorithms
- Compression analysis
- Linear algebra
- Machine learning basics

### 🎮 [Games Recipes](cookbook/games/)
Python games and interactive applications
- Pong
- Snake Water Gun
- Checker
- Brickout

### 🖥️ [GUI Recipes](cookbook/gui/)
Graphical user interface applications
- Currency converter
- Notepad
- Password generator
- UI apps

### 🌐 [Networking Recipes](cookbook/networking/)
Network programming and communication
- Socket programming
- Chat application
- Electronics algorithms

### 🎬 [Media Recipes](cookbook/media/)
Image, video, audio, and PDF processing
- PDF operations
- PDF to audiobook
- Video operations
- QR code generator
- Face detection

### 🛠️ [Utils Recipes](cookbook/utils/)
Utility libraries and helper scripts
- Bank management system
- Translator
- Puzzle solver
- Test generator

### 📚 [Skills](skills/) - Structured Learning
Organized tutorials for learning Python concepts
- **Basics** - Variables, loops, functions, recursion
- **Algorithms** - Sorting, searching with visualizations
- **Projects** - Complete multi-file projects

---

## 🍳 How to Use This Cookbook

### By Category
Browse categories on the left to find recipes for your domain (web, automation, games, etc.)

### By Difficulty
Each recipe includes a difficulty rating:
- 🔰 **Beginner** - New to Python? Start here
- 🎯 **Intermediate** - Familiar with basics
- 🚀 **Advanced** - Complex implementations

### By Problem
Search the codebase for keywords:
```bash
# Find recipes that use a specific library
grep -r "import requests" cookbook/

# Find recipes by keyword
grep -r "scrape" cookbook/
```

---

## 📦 Recipe Format

Each recipe follows this structure:

```python
"""
RECIPE: Recipe Name
CATEGORY: Category Name
DIFFICULTY: beginner/intermediate/advanced
TIME: Estimated completion time

DESCRIPTION:
Brief description of what this recipe does.

PREREQUISITES:
- Python 3.x
- Package names

OUTPUT:
Description of expected output
"""

# Imports with type hints
import requests
from typing import Optional, Dict, List

def main() -> None:
    """Main execution function."""
    # Recipe implementation here
    pass

if __name__ == "__main__":
    main()
```

---

## 🛠️ Setup & Installation

### Option 1: Global Setup
```bash
# Install all category dependencies
pip install -r cookbook/web/requirements.txt
pip install -r cookbook/automation/requirements.txt
# ... and so on for other categories
```

### Option 2: Virtual Environment (Recommended)
```bash
# Create virtual environment
python -m venv venv

# Activate (Linux/Mac)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate

# Install dependencies for your category
pip install -r cookbook/web/requirements.txt
```

### Option 3: Per-Category Environments
```bash
# Create separate environment for each category
python -m venv venv-web
source venv-web/bin/activate
pip install -r cookbook/web/requirements.txt
```

---

## 🎯 Common Patterns

### CLI Arguments
Many recipes accept command-line arguments:
```bash
python recipe.py --help  # See usage
python recipe.py --input file.txt --output result.txt
```

### Configuration
Some recipes use config files or environment variables:
```bash
# Create .env file
cp .env.example .env

# Edit with your settings
nano .env

# Run recipe
python recipe.py
```

### Error Handling
All recipes include proper error handling:
```python
try:
    result = risky_operation()
except SpecificError as e:
    print(f"Error: {e}")
    sys.exit(1)
```

---

## 📚 Learning Path

### Absolute Beginner
1. Start with [Skills/Basics](skills/basics/)
2. Try [Automation](cookbook/automation/) recipes
3. Explore [Utils](cookbook/utils/)

### Web Developer
1. [Web](cookbook/web/) - Scraping & APIs
2. [Networking](cookbook/networking/) - Sockets & protocols
3. [Automation](cookbook/automation/) - Web automation

### Data Scientist
1. [Data](cookbook/data/) - Algorithms & processing
2. [Skills/Algorithms](skills/algorithms/) - Sorting & searching
3. [Utils](cookbook/utils/) - Analysis tools

### Game Developer
1. [Games](cookbook/games/) - Game implementations
2. [GUI](cookbook/gui/) - Graphical interfaces
3. [Media](cookbook/media/) - Graphics & sound

---

## 🤝 Contributing

Have a recipe to share? Follow these steps:

1. **Fork the repository**
2. **Create a new recipe** following the recipe format
3. **Add type hints** and docstrings
4. **Include requirements** in category requirements.txt
5. **Test thoroughly** on multiple platforms
6. **Submit pull request** with description

### Recipe Template
```python
"""
RECIPE: Your Recipe Name
CATEGORY: Category
DIFFICULTY: beginner
TIME: 15 minutes

DESCRIPTION:
One-line description of what this recipe does.

PREREQUISITES:
- Python 3.7+
- Package names

OUTPUT:
Description of expected output or result
"""

# Standard library imports
import sys
from pathlib import Path
from typing import List, Optional

# Third-party imports
import package_name

def main() -> None:
    """Main execution function."""
    # Implementation here
    pass

if __name__ == "__main__":
    main()
```

---

## 📊 Recipe Index

| Recipe | Category | Difficulty | Time | Tags |
|--------|----------|------------|------|------|
| NASA APOD | Web | Beginner | 5 min | api, space |
| File Organizer | Automation | Beginner | 10 min | files, automation |
| Bubble Sort | Data | Beginner | 15 min | algorithm, sorting |
| Pong Game | Games | Intermediate | 30 min | pygame, game |
| Currency Converter | GUI | Intermediate | 20 min | qt, finance |
| Socket Server | Networking | Intermediate | 25 min | network, tcp |
| PDF to Audio | Media | Advanced | 20 min | pdf, tts |

---

## 🔗 Resources

### Python Documentation
- [Official Python Docs](https://docs.python.org/3/)
- [Python Standard Library](https://docs.python.org/3/library/)

### Learning Resources
- [Python.org Tutorial](https://docs.python.org/3/tutorial/)
- [Real Python](https://realpython.com/)
- [Awesome Python](https://awesome-python.com/)

### Package Installation
```bash
pip install package_name
pip list  # Show installed packages
pip show package_name  # Package info
```

---

## 📄 License

MIT License - Feel free to use these recipes in your projects!

---

## 🙏 Acknowledgments

- Contributors who've submitted recipes
- The Python community
- Open source package maintainers

---

*Built because everyone needs a good recipe collection. Happy cooking! 🧑‍🍳*
