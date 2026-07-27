# FabriScan - Fabric Defect Detection System

Sistem deteksi cacat kain menggunakan Deep Learning (EfficientNet-B0) dengan API FastAPI dan Frontend React.

## 🎯 Tentang Proyek

**FabriScan** adalah solusi AI-powered untuk mendeteksi cacat pada kain secara otomatis. Sistem ini menggunakan:
- **Backend**: FastAPI + PyTorch + EfficientNet-B0
- **Frontend**: React + TypeScript (coming soon)
- **Model**: Deep Learning classifier untuk deteksi defect

## 📁 Project Structure

```
Ersovin-Fabriscan/
├── backend/                  # API FastAPI
│   ├── main.py              # Aplikasi utama
│   ├── model/
│   │   ├── best_model.pth   # Model terlatih
│   │   └── class_names.json # Daftar class
│   ├── requirements.txt      # Dependencies
│   └── README.md            # Setup guide backend
│
├── frontend/                # React Application (TBD)
│   ├── src/
│   ├── package.json
│   └── README.md
│
├── Pelengkap/              # Supporting files
│   ├── confusion_matrix.png
│   └── training_history.png
│
├── kaggle.json             # (⚠️ NOT PUSHED - add to .env locally)
├── .gitignore
└── README.md               # File ini
```

## 🚀 Quick Start

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API akan berjalan di `http://localhost:8000`

### Frontend
(Coming soon)

## 📚 Dokumentasi

- [Backend README](./backend/README.md) - Setup, API endpoints, troubleshooting

## 🧠 Model Details

- **Architecture**: EfficientNet-B0 (transfer learning)
- **Input**: Gambar kain 224x224 pixels  
- **Output**: Klasifikasi + confidence score
- **Training Data**: Kaggle Fabric Defect Detection Dataset

## 🔒 Security

**⚠️ IMPORTANT:** 
- `kaggle.json` contains sensitive credentials
- File ini **TIDAK** dipush ke GitHub
- Set di local machine saja atau gunakan environment variables
- Jika exposed, regenerate API key di https://www.kaggle.com/settings/account

## 📝 Commit Convention

Project mengikuti **Conventional Commits**:
- `feat:` - Fitur baru
- `fix:` - Bug fix
- `docs:` - Dokumentasi
- `refactor:` - Perubahan struktur
- `test:` - Testing

## 👥 Team

**Ersovin - Fabriscan**
- Compfest 18

## 📝 License

Private - Untuk keperluan kompetisi

---

Last Updated: 2026-07-27
