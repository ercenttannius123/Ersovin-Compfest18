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
