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
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend API: http://localhost:8000

Jika ingin menggunakan Docker, lihat bagian "Jalankan dengan Docker" di bawah.

## Menjalankan (Tanpa Docker — development)

1. Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend API: http://localhost:8000

## API Utama

Endpoint: `POST /predict`

- Body: `multipart/form-data`
- Field: `file` (gambar JPG/PNG/WebP)

Contoh cURL:

```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@/path/to/image.jpg"
```

Contoh respons:

```json
{
  "predicted_class": "defect free",
  "confidence": 92.3,
  "is_defect": false
}
```


## Run with Docker (recommended for GitHub/CI)

Docker files are included: `backend/Dockerfile`, `frontend/Dockerfile`, and `docker-compose.yml` at repository root.

1. Build and run:

```bash
docker-compose up --build -d
```

2. View logs:

```bash
docker-compose logs -f
```

3. Stop and remove:

```bash
docker-compose down
```

Notes:
- The frontend is served by Nginx inside the container on port 80 and mapped to host port `5173` to match the development setup.
- To mount the model directory (if the model is not stored in the repo), add a volume mapping to `docker-compose.yml` for the backend service:

```yaml
services:
  backend:
    volumes:
      - ./backend/model:/app/model:ro
```

## Troubleshooting & Tips

- Camera preview blank: check browser camera permissions and close other apps using the camera.
- Model not found: ensure `backend/model/best_model.pth` exists before running (or mount it as a volume).
- CORS: check CORS settings in `backend/main.py` if the frontend cannot access the API.
- Large model files: if the model file size >100 MB, consider using Git LFS or avoid committing the model; provide instructions to obtain it instead.

## Including the Model in GitHub

Options:

1. Do not commit the model; provide download instructions in the README and mount the model directory when running Docker.
2. If you must commit a large model file, use Git LFS:

```bash
git lfs install
git lfs track "backend/model/*.pth"
git add .gitattributes
```

## Commit & Contribution

Use Conventional Commits format:

```
feat: new feature
fix: bug fix
docs: documentation update
```

## Project Structure (summary)

```
Ersovin - Fabriscan/
├── backend/                # FastAPI app and PyTorch model
│   ├── main.py
│   ├── requirements.txt
│   └── model/              # place best_model.pth here or mount it at runtime
├── frontend/               # Vite + React + TypeScript
│   ├── src/
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
