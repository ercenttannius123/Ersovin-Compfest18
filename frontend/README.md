# FabriScan Frontend - React UI

Professional web interface untuk FabriScan fabric defect detection system.

## 🎨 Features

- **Clean & Professional UI** - Modern, minimalist design optimized for production
- **Real-time Image Upload** - Drag-and-drop or click-to-upload interface
- **Instant Prediction** - AI predictions displayed with confidence scores
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **User-Friendly** - Simple, intuitive workflow (upload → analyze → result)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Server akan berjalan di `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # App header
│   │   ├── ImageUpload.tsx     # Upload component
│   │   └── PredictionResult.tsx# Result display
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # Main styles
│   ├── index.css               # Global styles
│   └── main.tsx                # Entry point
├── index.html                  # HTML template
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

## 🔌 API Integration

Frontend connects ke backend FastAPI di `http://localhost:8000`

### Endpoint: POST /predict
```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@image.jpg"
```

Response:
```json
{
  "predicted_class": "defect free",
  "confidence": 95.5,
  "is_defect": false
}
```

## 💻 Development

### Key Technologies
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **CSS3** - Modern styling

### File Format Support
- JPG/JPEG
- PNG
- WebP

### Browser Support
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Design Principles

1. **Simplicity First** - Focus on core workflow (upload → predict → result)
2. **User-Centric** - Clear feedback and guidance at each step
3. **Professional** - Production-ready appearance
4. **Performance** - Fast, responsive interface
5. **Accessibility** - Clear labels and instructions

## 🔐 Security

- No sensitive data stored locally
- CORS enabled for backend communication
- Input validation for file uploads
- No tracking or analytics

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## ⚡ Performance

- Lazy loading of components
- Optimized asset bundling
- Minimal CSS (no heavy frameworks)
- Fast page load times

## 🐳 Docker

Akan didefinisikan di docker-compose.yml project root.

Development mode:
```bash
docker-compose up frontend
```

## 📝 License

Private - Untuk keperluan kompetisi

---

**Next**: Install dependencies dan jalankan dengan `npm install && npm run dev`
