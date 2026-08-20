# FabriScan — Fabric Defect Detection

![FabriScan](https://img.shields.io/badge/FabriScan-ready-blue) ![License](https://img.shields.io/badge/license-private-lightgrey)
Team: Ersovin · Model: EfficientNet-B0 · Tech: FastAPI, React

---

## About

FabriScan is a prototype application for automatic fabric defect detection. The project contains:

- Backend: FastAPI + PyTorch for model inference.
- Frontend: React + TypeScript (Vite) for user interface — image upload/capture and prediction display.

Model used: EfficientNet-B0 (pretrained / fine-tuned). The model file is not included in this repository (`backend/model/best_model.pth`).

## Requirements

- Docker & Docker Compose (optional, recommended for consistent environment)
- Python 3.10+ (if running backend without Docker)
- Node.js 18+ / npm (if running frontend without Docker)

See "Run with Docker" below for Docker instructions.

## Run (Development, without Docker)

1. Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
# FabriScan — Fabric Defect Detection

![FabriScan](https://img.shields.io/badge/FabriScan-ready-blue) ![License](https://img.shields.io/badge/license-private-lightgrey)
Team: Ersovin · Model: EfficientNet-B0 · Tech: FastAPI, React

---

This repository contains a prototype for fabric defect detection. It is designed to be simple to run locally or in Docker for demonstrations and evaluation.

Features

- Image upload and camera capture UI (React + Vite)
- FastAPI backend serving PyTorch model for inference
- Ready-to-use Docker setup for quick deployment

Repository layout

- `backend/` — FastAPI service and model artifacts
- `frontend/` — Vite + React user interface
- `docker-compose.yml` — compose file to run both services together

Quick start (recommended)

```bash
docker-compose up --build -d

# frontend: http://localhost:5173
# backend:  http://localhost:8000
```

Development (without Docker)

- See `backend/README.md` and `frontend/README.md` for individual service development instructions.

Model files

- Place `best_model.pth` and `class_names.json` inside `backend/model/` before running predictions. These files are intentionally excluded from the repository.
- For large model files use Git LFS or host externally and mount into the container at runtime.

Contributing

- Use Conventional Commits for changes: `feat:`, `fix:`, `docs:`.

License

Private — for competition use only.
---

Last updated: 2026-08-20
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
├── README.md
└── .dockerignore
```

## License

Private — for competition use only.

---


## Commit dan Kontribusi

Kami menggunakan format Conventional Commits untuk menjaga konsistensi.
# FabriScan — Fabric Defect Detection

![FabriScan](https://img.shields.io/badge/FabriScan-ready-blue) ![License](https://img.shields.io/badge/license-private-lightgrey)
Team: Ersovin · Model: EfficientNet-B0 · Tech: FastAPI, React

---

FabriScan is a prototype for automatic fabric defect detection. The repo includes a frontend UI and a FastAPI backend that serves a PyTorch model.

Repository layout

- `backend/` — FastAPI service + model artifacts
- `frontend/` — Vite + React UI
- `docker-compose.yml` — run both services together

Quick start (Docker, recommended):

```bash
docker-compose up --build -d
```

Open the frontend at: http://localhost:5173
Backend API: http://localhost:8000

Development (no Docker):

- See `backend/README.md` and `frontend/README.md` for development instructions for each service.

Model files

- Place `best_model.pth` and `class_names.json` inside `backend/model/` before running predictions. These files are not included in the repository.
- For large model files (>100 MB) use Git LFS or host externally and mount into the container at runtime.

Contributing

- Use Conventional Commits: `feat:`, `fix:`, `docs:`.

License

Private — for competition use only.
docker-compose down
