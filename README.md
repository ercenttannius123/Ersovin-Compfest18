# FabriScan — Deteksi Cacat Kain

![FabriScan](https://img.shields.io/badge/FabriScan-ready-blue) ![License](https://img.shields.io/badge/license-private-lightgrey)
Tim: Ersovin · Model: EfficientNet-B0 · Teknologi: FastAPI, React

---

## Tentang

FabriScan adalah prototipe aplikasi untuk mendeteksi cacat pada kain secara otomatis. Aplikasi ini terdiri dari:

- Backend: FastAPI + PyTorch untuk inferensi model.
- Frontend: React + TypeScript (Vite) untuk antarmuka pengguna — unggah/capture gambar dan menampilkan hasil.

Model yang digunakan: EfficientNet-B0 (pretrained / fine-tuned) — file model tidak termasuk di repo (`backend/model/best_model.pth`).

## Fitur

- Unggah gambar atau ambil foto langsung dari kamera
- Preview kamera dan tombol capture yang jelas
- Prediksi kelas cacat kain dengan nilai confidence
- Backend API FastAPI untuk inferensi
- Frontend React + TypeScript untuk interaksi pengguna

## Struktur Proyek

```
Ersovin - Fabriscan/
├── backend/                # FastAPI app dan model PyTorch
│   ├── main.py
│   ├── requirements.txt
│   └── model/
├── frontend/               # Vite + React + TypeScript
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md               # File ini
```

> Catatan: `backend/model/best_model.pth` dan `kaggle.json` tidak disertakan di repositori.

## Persyaratan

- Docker & Docker Compose (opsional, direkomendasikan untuk menjalankan di lingkungan konsisten)
- Python 3.10+ (untuk menjalankan backend tanpa Docker)
- Node.js 18+ / npm (untuk menjalankan frontend tanpa Docker)

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

## Jalankan dengan Docker (direkomendasikan untuk GitHub/CI)

Semua file Docker sudah ditambahkan: `backend/Dockerfile`, `frontend/Dockerfile`, dan `docker-compose.yml` di root.

1. Build dan jalankan:

```bash
docker-compose up --build -d
```

2. Periksa log:

```bash
docker-compose logs -f
```

3. Stop dan remove:

```bash
docker-compose down
```

Catatan:
- Frontend disajikan oleh Nginx pada container port 80, dipetakan ke host `5173` agar konsisten dengan pengaturan development.
- Jika ingin mount model (tidak menyertakan file model di repo), tambahkan volume pada `docker-compose.yml`:

```yaml
services:
  backend:
    volumes:
      - ./backend/model:/app/model:ro
```

## Troubleshooting & Tips

- Preview kamera kosong: periksa izin kamera di browser, tutup aplikasi lain yang mengakses kamera.
- Model tidak ditemukan: pastikan `backend/model/best_model.pth` berada di folder tersebut sebelum menjalankan (atau mount sebagai volume).
- CORS: periksa konfigurasi CORS di `backend/main.py` jika frontend gagal mengakses API.
- Model besar: jika ukuran file model >100 MB, gunakan Git LFS atau jangan commit model — tambahkan instruksi bagaimana mendapatkannya.

## Menyertakan Model di GitHub

Opsi:

1. Jangan commit model; tambahkan instruksi download di README dan mount sebagai volume saat menjalankan Docker.
2. Jika ingin commit model dan ukurannya besar, gunakan Git LFS:

```bash
git lfs install
git lfs track "backend/model/*.pth"
git add .gitattributes
```

## Commit & Kontribusi

Gunakan format Conventional Commits:

```
feat: fitur baru
fix: perbaikan bug
docs: pembaruan dokumentasi
```

## Struktur Proyek (ringkasan)

```
Ersovin - Fabriscan/
├── backend/                # FastAPI app dan model PyTorch
│   ├── main.py
│   ├── requirements.txt
│   └── model/              # letakkan best_model.pth di sini atau mount
├── frontend/               # Vite + React + TypeScript
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
├── README.md
└── .dockerignore
```

## Lisensi

Private — hanya untuk keperluan kompetisi.

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
