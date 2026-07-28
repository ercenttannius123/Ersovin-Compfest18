# FabriScan — Deteksi Cacat Kain

![FabriScan](https://img.shields.io/badge/FabriScan-ready-blue) ![License](https://img.shields.io/badge/license-private-lightgrey)
Tim: Ersovin · Model: EfficientNet-B0 · Teknologi: FastAPI, React

---

## Tentang

FabriScan adalah prototipe aplikasi yang mendeteksi cacat pada kain secara otomatis. Aplikasi ini menggunakan model PyTorch yang dijalankan oleh FastAPI dan antarmuka React untuk unggah gambar, capture kamera, serta menampilkan hasil prediksi.

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

## Cara Menjalankan

### Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Buka frontend di `http://localhost:5173` dan backend di `http://localhost:8000`.

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

## Troubleshooting

- Preview kamera kosong atau putih: periksa izin kamera di browser, tutup aplikasi lain yang menggunakan kamera, lalu refresh halaman.
- Error model tidak ditemukan: pastikan `backend/model/best_model.pth` tersedia.
- Masalah CORS: periksa `AllowOrigins` di `backend/main.py`.

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

Last updated: 2026-07-28
