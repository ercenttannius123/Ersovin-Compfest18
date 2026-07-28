# FabriScan Frontend — Antarmuka React

Dokumentasi singkat untuk menjalankan frontend FabriScan.

## Fitur Utama

- Unggah gambar dari perangkat
- Tangkap foto langsung menggunakan kamera
- Preview kamera dan tombol capture yang mudah digunakan
- Menampilkan hasil prediksi dengan confidence
- UI responsif untuk desktop dan mobile

## Persiapan

### Prasyarat
- Node.js 16+ dan npm

### Instalasi

```bash
cd frontend
npm install
```

### Menjalankan dalam mode pengembangan

```bash
npm run dev
```

Frontend akan aktif di `http://localhost:5173`.

## Struktur Folder

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ImageUpload.tsx
│   │   └── PredictionResult.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Integrasi Backend

Frontend mengirimkan file gambar ke backend FastAPI di `http://localhost:8000`.

### Endpoint
- `POST /predict`
- Form field: `file`

### Contoh cURL

```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@image.jpg"
```

### Contoh respons

```json
{
  "predicted_class": "defect free",
  "confidence": 95.5,
  "is_defect": false
}
```

## Teknologi

- React 18
- TypeScript
- Vite
- CSS murni

## Catatan Pengembangan

- Pastikan backend sudah berjalan sebelum menggunakan fitur prediksi.
- Browser perlu izin kamera untuk fitur capture.
- Jika preview kamera kosong, refresh halaman dan pastikan tidak ada aplikasi lain yang mengunci kamera.

## Build Produksi

```bash
npm run build
npm run preview
```

## Lisensi

Private — hanya untuk keperluan kompetisi.
