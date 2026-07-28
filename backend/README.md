# FabriScan Backend — FastAPI

Backend FastAPI untuk FabriScan menyediakan API prediksi cacat kain menggunakan model PyTorch.

## Prasyarat

- Python 3.8+ (disarankan 3.9+)
- pip

## Cara Menjalankan

1. Masuk ke folder backend:

```bash
cd backend
```

2. Buat virtual environment dan aktifkan:

```bash
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
```

3. Pasang ketergantungan:

```bash
pip install -r requirements.txt
```

4. Jalankan server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

5. Buka Swagger UI di `http://localhost:8000/docs`.

## Struktur Folder Backend

```
backend/
├── main.py
├── requirements.txt
└── model/
    ├── best_model.pth
    └── class_names.json
```

> Catatan: `backend/model/best_model.pth` dan `class_names.json` tidak termasuk di repositori.

## Endpoint

- `GET /` — health check sederhana
- `POST /predict` — upload gambar untuk prediksi

### Request

- Tipe: `multipart/form-data`
- Field: `file` (gambar JPG/PNG/WebP)

### Contoh cURL

```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@/path/to/image.jpg"
```

### Contoh respons

```json
{
  "predicted_class": "defect free",
  "confidence": 95.5,
  "is_defect": false
}
```

## Konfigurasi Penting

- CORS sudah diaktifkan untuk semua origin di `main.py` agar frontend dapat terhubung.
- Model di-load ke CPU dengan `map_location='cpu'` agar berjalan di mesin tanpa GPU.

## Dependencies Utama

- `fastapi`
- `uvicorn`
- `torch`
- `torchvision`
- `pillow`
- `python-multipart`

## Troubleshooting

- `No module named 'torch'`: install PyTorch sesuai platform.
- `Model file not found`: pastikan `backend/model/best_model.pth` tersedia.
- Error CORS: periksa pengaturan di `main.py`.

---

Last updated: 2026-07-28
