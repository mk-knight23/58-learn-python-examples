# 🤖 Automation Recipes

Python scripts to automate repetitive tasks and file management.

## 📋 Recipes

### File Organizer
**Path:** `file-organizer/`
Automatically organizes files into folders by extension.

```bash
cd file-organizer
python rearrange-files.py
```

### Downloads Organizer
**Path:** `downloads-organizer/`
Keeps your downloads folder clean by organizing files.

```bash
cd "downloads-organizer"
python organizer.py
```

### Call Reminders
**Path:** `call-reminders/`
Automated scheduled call reminder system.

```bash
cd "call-reminders"
python reminder.py
```

### Wallpaper Manager
**Path:** `wallpaper-manager/`
Automatically change desktop wallpapers.

```bash
cd "wallpaper-manager"
python wallpaper_extract.py
```

### Character Counter
**Path:** `char-counter/`
Count characters in various ways.

```bash
cd "char-counter"
python counter.py
```

## 📦 Common Dependencies

```bash
# File operations (built-in)
# No external dependencies needed for most recipes

# GUI automation (if needed)
pip install pyautogui

# Scheduling
pip install schedule
```

## 🎯 Prerequisites

- Python 3.6+
- Appropriate file system permissions

## 📚 Concepts Covered

- File system operations (os, pathlib, shutil)
- Scheduled tasks
- File pattern matching
- Cross-platform path handling
- Automation best practices

## 🔗 Related Categories

- [Web](../web/) - Web automation
- [Utils](../utils/) - Utility functions
