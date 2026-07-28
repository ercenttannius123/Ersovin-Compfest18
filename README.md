# FabriScan - Fabric Defect Detection

Ringkasan singkat dan langkah yang jelas untuk menjalankan proyek ini secara lokal.

## Tentang
FabriScan adalah aplikasi untuk mendeteksi cacat kain menggunakan model Deep Learning (EfficientNet-B0). Proyek terdiri dari:

- Backend: FastAPI + PyTorch
- Frontend: React + TypeScript (Vite)

## Struktur Proyek

```
.
├── backend/                # FastAPI app and model artifacts
├── frontend/               # React + TypeScript frontend (Vite)
├── kaggle.json             # (NOT committed - keep locally)
├── .gitignore
└── README.md
```

## Persiapan (Prerequisites)

- Node.js >= 16
- npm atau pnpm
- Python 3.9+ dan `pip`
- Git

Pastikan juga port `8000` (backend) dan `5173` (frontend) tersedia pada mesin lokal.

## Menjalankan Lokal (Development)

1) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # macOS / Linux
# .venv\Scripts\activate   # Windows (PowerShell)
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API akan tersedia di `http://localhost:8000`.

Contoh endpoint (POST):

```
POST http://localhost:8000/predict
Form field: file (image)
Response: { "class": "defect_type", "confidence": 92.3 }
```

2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend dev server biasanya berjalan di `http://localhost:5173`.

Jika frontend tidak menemukan backend di `localhost:8000`, buka `frontend/src/config` atau gunakan proxy di `vite.config.ts`.

## Konfigurasi Sensitif

- Jangan commit `kaggle.json` atau kredensial lainnya. Tambahkan ke `.gitignore` (sudah ada).
- Jika perlu, gunakan environment variables untuk menyimpan path atau API keys.

## Contributing / Commit Message

Gunakan format commit singkat yang konsisten. Permintaan kamu: gunakan `feat:` untuk fitur.

Contoh pesan commit yang kita pakai di repo ini:

```
feat: short description
fix: short description
docs: update README
```

## Troubleshooting

- Jika kamera preview di browser tampil putih: pastikan browser memiliki izin, tutup aplikasi lain yang memakai webcam, dan coba refresh halaman.
- Jika backend error saat memuat model: pastikan file `backend/model/best_model.pth` ada dan versi PyTorch kompatibel.

## Menjalankan build/production (opsional)

Frontend build:
```bash
cd frontend
npm run build
```

Backend production (contoh menggunakan Gunicorn + Uvicorn Workers):
```bash
# contoh: gunicorn -k uvicorn.workers.UvicornWorker main:app -b 0.0.0.0:8000
```

## Dokumentasi Lebih Lanjut
- [Backend README](./backend/README.md)

## Lisensi
Private — untuk keperluan kompetisi.

---

Last Updated: 2026-07-28
