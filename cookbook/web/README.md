# 🌐 Web Recipes

Python scripts for web scraping, API interactions, and web automation.

## 📋 Recipes

### NASA APOD Fetcher
**Path:** `nasa-apod/`
Fetches NASA's Astronomy Picture of the Day using the NASA API.

```bash
cd "nasa-apod"
pip install requests
python run.py
```

### Weather Scraper
**Path:** `weather-scraper/`
Scrapes weather data from weather websites.

```bash
cd "weather-scraper"
pip install requests beautifulsoup4
python weather.py
```

### Instagram Monitor
**Path:** `insta-monitor/`
Monitor Instagram activity and data.

```bash
cd "insta-monitor"
pip install requests
python insta_datafetcher.py
```

### Async Downloader
**Path:** `async-downloader/`
Asynchronous file downloader using aiohttp.

```bash
cd "async-downloader"
pip install -r requirements.txt
python main.py
```

## 📦 Common Dependencies

```bash
# Web scraping
pip install requests beautifulsoup4

# Async operations
pip install aiohttp

# API interactions
pip install pydantic
```

## 🎯 Prerequisites

- Python 3.7+
- Internet connection for APIs
- API keys (where required)

## 📚 Concepts Covered

- HTTP requests (GET, POST)
- API authentication
- HTML parsing
- Async/await patterns
- Rate limiting
- Error handling

## 🔗 Related Categories

- [Automation](../automation/) - Web automation tasks
- [Data](../data/) - Data processing from web sources
