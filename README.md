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

This repository contains a small prototype for fabric defect detection:

- `backend/` — FastAPI app that loads a PyTorch model and exposes a `/predict` endpoint.
- `frontend/` — Vite + React app for uploading/capturing images and displaying predictions.

See the service-level READMEs for detailed development and run instructions:

- backend: backend/README.md
- frontend: frontend/README.md

Quick start (Docker, recommended):

```bash
docker-compose up --build -d
```

Open the frontend at `http://localhost:5173`. The backend API is available at `http://localhost:8000`.

Run locally (without Docker):

1. Backend (development):

```bash
cd backend
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. Frontend (development):

```bash
cd frontend
npm install
npm run dev
```

Notes:
- The `backend/model/` directory should contain `best_model.pth` and `class_names.json`. These files are not included in the repo by default.
- Large model files (>100 MB): use Git LFS or host the model externally and mount it into the container at runtime.

Including model with Git LFS (example):

```bash
git lfs install
git lfs track "backend/model/*.pth"
git add .gitattributes
```

Project structure (summary):

```
Ersovin - Fabriscan/
├── backend/
├── frontend/
├── docker-compose.yml
├── README.md
└── .dockerignore
```

License: Private — for competition use only.

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

Last updated: 2026-08-20
---

Last updated: 2026-08-20

## Commit dan Kontribusi

Kami menggunakan format Conventional Commits untuk menjaga konsistensi.

Gunakan:

```
feat: fitur baru atau perbaikan fungsi
fix: perbaikan bug
docs: pembaruan dokumentasi
```

Contoh:

```
feat: tambah preview kamera dan tombol capture
fix: koreksi respons API
docs: terjemahkan README ke Bahasa Indonesia
```

## Lisensi

Private — hanya untuk keperluan kompetisi.

---

## Docker (GitHub-ready)

Panduan singkat untuk menjalankan aplikasi menggunakan Docker dan `docker-compose`. File `docker-compose.yml` sudah tersedia di repository root.

- Backend: image dibangun dari `./backend` dan menjalankan FastAPI di port `8000`.
- Frontend: image dibangun dari `./frontend` dan disajikan oleh `nginx` (dipetakan ke host port `5173`).

Perintah cepat (di root repository):

```bash
# Build & start (detached)
docker-compose up --build -d

# Lihat log
docker-compose logs -f

# Stop & remove
docker-compose down
```

Catatan untuk GitHub:
- Pastikan `README.md` dan `docker-compose.yml` ada di repository utama saat push ke GitHub (sudah termasuk).
- Jika `backend/model/best_model.pth` berukuran besar (>100 MB) pertimbangkan menggunakan Git LFS, atau jangan commit model ke repo dan mount file sebagai volume saat menjalankan container (contoh di bawah).

Contoh mount model saat development (opsional) — tambahkan bagian `volumes` di `docker-compose.yml` untuk `backend`:

```yaml
services:
  backend:
    volumes:
      - ./backend/model:/app/model:ro
```

Atau build image yang menyertakan model jika file sudah ada di repository.

Tips untuk publikasi GitHub:
- Jika model tidak disertakan, tambahkan instruksi pada `README.md` tentang cara mendapatkan model (link/download) dan langkah menaruhnya di `backend/model` sebelum menjalankan `docker-compose up`.
- Jika model besar, gunakan `git lfs` dan tambahkan instruksi singkat: `git lfs install && git lfs track "backend/model/*.pth"`.

Jika mau, saya bisa menambahkan contoh `workflow` GitHub Actions untuk otomatis build image dan push ke registry.

---

Last updated: 2026-08-20
