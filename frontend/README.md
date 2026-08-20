# FabriScan — Frontend

This folder contains the Vite + React frontend used to upload or capture images and display predictions returned by the backend API.

Quick start (development):

```bash
cd frontend
npm install
npm run dev
```

Open the app at `http://localhost:5173` (default Vite dev server).

If running via Docker Compose, the frontend is served by Nginx inside the container and is available on host port `5173`.

## Key Features

- Upload images from device
- Capture photos using the camera
- Camera preview with a simple capture button
- Display prediction results with confidence scores
- Responsive UI for desktop and mobile

## Prerequisites

- Node.js 16+ and npm

## Development

Install dependencies and run the dev server:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`.

## Project Structure

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

## Backend Integration

The frontend sends image files to the backend FastAPI server at `http://localhost:8000`.

Endpoint:
- `POST /predict` — form field: `file` (image)

Example cURL:

```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@image.jpg"
```

Example response:

```json
{
  "predicted_class": "defect free",
  "confidence": 95.5,
  "is_defect": false
}
```

## Tech Stack

- React 18
- TypeScript
- Vite

## Development Notes

- Ensure the backend server is running before using the prediction feature.
- The browser requires camera permission for the capture feature.
- If camera preview is blank, refresh the page and ensure no other application is using the camera.

## Production Build

```bash
npm run build
npm run preview
```

## License

Private — for competition use only.
