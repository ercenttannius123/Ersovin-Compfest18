# FabriScan — Fabric Defect Detection

![FabriScan](https://img.shields.io/badge/FabriScan-ready-blue) ![License](https://img.shields.io/badge/license-private-lightgrey)

Team: Ersovin · Model: EfficientNet-B0 · Frameworks: FastAPI, React

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [API Example](#api-example)
- [Troubleshooting](#troubleshooting)
- [Contributing & Commits](#contributing--commits)
- [License](#license)

---

## About

FabriScan is a prototype application for automated fabric defect detection. It combines a PyTorch model served via FastAPI and a React frontend for image capture & inference.

## Features

- Upload or capture fabric images from camera
- On-device preview and capture flow in frontend
- REST API for prediction with confidence scores

## Project Structure

```
Ersovin - Fabriscan/
├── backend/                # FastAPI app, model loader, requirements
│   ├── main.py
│   └── model/
├── frontend/               # Vite + React + TypeScript
│   └── src/
├── .gitignore
└── README.md               # This file
```

> Note: `backend/model/best_model.pth` and `kaggle.json` are NOT included in the repo.

## Quick Start

Start backend (dev):

```bash
cd backend
python -m venv .venv
# macOS / Linux
source .venv/bin/activate
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Start frontend (dev):

```bash
cd frontend
npm install
npm run dev
```

Open the frontend at: `http://localhost:5173` and backend at `http://localhost:8000`.

## API Example

Endpoint: `POST /predict` — multipart form `file` (image)

Example curl:

```bash
curl -X POST "http://localhost:8000/predict" \
	-F "file=@/path/to/image.jpg"
```

Example response:

```json
{
	"class": "hole",
	"confidence": 92.3
}
```

## Troubleshooting

- Camera preview shows blank/white: allow camera permission, close other apps using the camera, reload page.
- Model load errors: ensure `backend/model/best_model.pth` exists and PyTorch version matches.
- CORS: if frontend cannot reach backend, check CORS settings in `backend/main.py` and allowed origins.

## Contributing & Commits

We follow a lightweight Conventional Commits style. Use `feat:` for feature work.

Examples:

```
feat: add camera UI improvements
fix: correct confidence display
docs: update README
```

Team: Ersovin — semua kontribusi dicantumkan atas nama tim.

If you want commits normalized, I can run a small script to rewrite older messages (careful: rewriting history).

## License

Private — for competition use only.

---

Last updated: 2026-07-28
