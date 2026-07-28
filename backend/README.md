## Backend — FabriScan (FastAPI)

This document explains how to run the backend API locally, the expected folder layout, and common troubleshooting steps.

Project layout (backend folder)
# FabriScan — Backend (FastAPI)

Backend API untuk FabriScan, menyediakan endpoint prediksi cacat kain menggunakan
model PyTorch (EfficientNet-B0).

---

## Prasyarat

- Python 3.8+ (disarankan 3.9+)
- pip

## Cepat: Setup & Run

1. Aktifkan environment dan install deps

```bash
cd backend
python -m venv .venv
# macOS / Linux
source .venv/bin/activate
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

2. Pastikan model ada di `backend/model/`:

- `best_model.pth`
- `class_names.json`

3. Jalankan server (dev):

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Docs interaktif (Swagger UI): `http://localhost:8000/docs`

---

## Endpoint utama

- GET `/` — health check
- POST `/predict` — upload gambar (multipart/form-data, field `file`)

Contoh respons:

```json
{
  "predicted_class": "defect free",
  "confidence": 95.5,
  "is_defect": false
}
```

Contoh cURL:

```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@/path/to/image.jpg"
```

Contoh Python (requests):

```python
import requests

url = "http://localhost:8000/predict"
with open("test.jpg", "rb") as f:
    resp = requests.post(url, files={"file": f})
    print(resp.json())
```

---

## Struktur folder (backend)

```
backend/
├── main.py
├── requirements.txt
└── model/
    ├── best_model.pth
    └── class_names.json
```

> Catatan: `best_model.pth` dan file sensitif lain tidak termasuk di repo. Simpan
> secara lokal atau di storage aman.

---

## Konfigurasi & Tips

- CORS: ubah `allow_origins` di `main.py` untuk production.
- Jika tidak memiliki GPU, pastikan model di-load ke CPU (`map_location='cpu'`).

## Dependencies utama

- `fastapi`, `uvicorn`, `torch`, `torchvision`, `pillow`, `python-multipart`

---

## Troubleshooting singkat

- "No module named 'torch'": install torch untuk CPU
  ```bash
  pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
  ```
- "Model file not found": pastikan `backend/model/best_model.pth` ada
- CORS errors: periksa `main.py` dan alamat origin yang diizinkan

---

Last updated: 2026-07-28
