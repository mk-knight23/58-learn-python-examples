# 🎬 Media Recipes

Python scripts for image, video, audio, and PDF processing.

## 📋 Recipes

### PDF Operations
**Path:** `pdf/`
Various PDF manipulation operations.

```bash
cd pdf
pip install -r requirements.txt
python pdf_ops.py
```

### PDF to Audiobook
**Path:** `pdf-to-audio/`
Convert PDF text to audio files.

```bash
cd "pdf-to-audio"
python audiobook_gen.py
```

### Text to Audio
**Path:** `text-to-audio/`
Convert text strings to speech.

```bash
cd text-to-audio
python main.py
```

### Video Operations
**Path:** `video-ops/`
Video processing including timelapse and slow-motion.

```bash
cd video-ops

# Timelapse
python timelapse.py

# Slow motion
python slow-motion.py
```

### Image Downloader
**Path:** `image-downloader/`
Bulk download images from URLs.

```bash
cd image-downloader
pip install -r requirements.txt
python main.py
```

### Voice Repeater
**Path:** `voice-repeater/`
Record and repeat voice audio.

```bash
cd voice-repeater
python main.py
```

### QR Code Generator
**Path:** `qr-generator/`
Generate QR codes for text/URLs.

```bash
cd qr-generator
pip install qrcode
python generate.py
```

### Face Fun
**Path:** `face-fun/`
Face detection and mustache overlay (OpenCV Haar Cascade).

```bash
cd face-fun
pip install opencv-python
python main.py
```

## 📦 Common Dependencies

```bash
# PDF processing
pip install PyPDF2 fpdf

# Image processing
pip install Pillow

# Video processing
pip install opencv-python

# Audio processing
pip install pydub pygame

# QR codes
pip install qrcode[pil]

# Text-to-speech
pip install pyttsx3 gTTS
```

## 🎯 Prerequisites

- Python 3.7+
- Media files for processing
- Microphone (for voice/ audio recording)
- Camera (for face detection)

## 📚 Concepts Covered

- PDF reading/writing
- Image manipulation
- Video processing
- Audio synthesis
- Computer vision (Haar Cascades)
- QR code generation
- Text-to-speech

## 🔗 Related Categories

- [Web](../web/) - Media downloading
- [Automation](../automation/) - Media file organization
