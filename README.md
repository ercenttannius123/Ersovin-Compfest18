# FabriScan Backend - Fabric Defect Detection API

Backend API untuk sistem deteksi cacat kain menggunakan Deep Learning dengan model EfficientNet-B0.

## 📋 Prasyarat

- Python 3.8+
- pip atau conda untuk package management

## 🚀 Setup Guide

### 1. Clone Repository (Jika belum)
```bash
git clone <repository-url>
cd backend
```

### 2. Buat Virtual Environment (Recommended)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Pastikan Model Tersedia
Periksa bahwa file berikut ada di folder `model/`:
- `best_model.pth` - Model terlatih EfficientNet-B0
- `class_names.json` - Daftar nama class untuk klasifikasi

### 5. Jalankan Server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server akan berjalan di `http://localhost:8000`

## 📚 API Endpoints

### 1. Health Check
```
GET /
```
Response:
```json
{
  "message": "FabriScan API is running!"
}
```

### 2. Prediksi Cacat Kain
```
POST /predict
Content-Type: multipart/form-data
```

**Parameter:**
- `file` (required): File gambar kain dalam format JPG/PNG

**Response:**
```json
{
  "predicted_class": "defect free",
  "confidence": 95.5,
  "is_defect": false
}
```

## 🧪 Testing API

### Menggunakan cURL
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "accept: application/json" \
  -F "file=@path/to/your/image.jpg"
```

### Menggunakan Python
```python
import requests

url = "http://localhost:8000/predict"
with open("test_image.jpg", "rb") as f:
    files = {"file": f}
    response = requests.post(url, files=files)
    print(response.json())
```

### Menggunakan Swagger UI (FastAPI Built-in)
Buka browser dan akses: `http://localhost:8000/docs`

## 🏗️ Project Structure
```
backend/
├── main.py              # FastAPI aplikasi utama
├── requirements.txt     # Dependencies
├── model/
│   ├── best_model.pth   # Model terlatih
│   └── class_names.json # Nama-nama class
└── README.md           # File ini
```

## 🔧 Konfigurasi

### CORS Settings
Saat ini CORS diatur untuk memungkinkan semua origin. Untuk production, ubah di `main.py`:
```python
allow_origins=["https://yourdomain.com"]
```

### Model Architecture
- **Base Model**: EfficientNet-B0 (pre-trained)
- **Input Size**: 224 x 224 pixels
- **Output**: Klasifikasi multi-class dengan confidence score
- **Dropout**: 0.3 untuk regularisasi

## 📦 Dependencies Explanation
- **fastapi**: Web framework modern untuk membangun API
- **uvicorn**: ASGI server untuk menjalankan FastAPI
- **torch**: PyTorch deep learning framework
- **torchvision**: Computer vision utilities dengan pre-trained models
- **pillow**: Image processing library
- **python-multipart**: Untuk handling file upload di FastAPI

## ⚠️ Troubleshooting

### Error: "No module named 'torch'"
```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
```

### Error: "Model file not found"
Pastikan file `model/best_model.pth` ada di lokasi yang benar.

### CORS Error di Frontend
Pastikan server backend berjalan dengan CORS middleware yang benar.

## 📝 License
Private - Untuk keperluan kompetisi Ersovin Fabriscan

---
Untuk dokumentasi lebih lanjut tentang FastAPI, kunjungi: https://fastapi.tiangolo.com/
