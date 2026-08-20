# FabriScan — Backend

This folder contains the FastAPI backend that serves the PyTorch model for fabric defect detection.

Quick start (development):

```bash
cd backend
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API:
- `POST /predict` — multipart/form-data with `file` field (image). Returns predicted class and confidence.

Model:
- Place `best_model.pth` under `backend/model/` before running. If you prefer not to add the model to git, mount the folder in Docker or provide a download script.

Notes:
- Check `main.py` for CORS settings and allowed origins.
 - Check `main.py` for CORS settings and allowed origins.

## FabriScan Backend — FastAPI

The FastAPI backend exposes prediction endpoints that use a PyTorch model for fabric defect detection.

## Prerequisites

- Python 3.8+ (3.9+ recommended)
- pip

## Run (development)

1. Enter the backend folder:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

4. Run the server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

5. Open the Swagger UI at `http://localhost:8000/docs`.

## Backend Folder Structure

```
backend/
├── main.py
├── requirements.txt
└── model/
    ├── best_model.pth
    └── class_names.json
```

> Note: `backend/model/best_model.pth` and `class_names.json` are not included in the repository.

## Endpoints

- `GET /` — simple health check
- `POST /predict` — upload an image for prediction

### Request

- Type: `multipart/form-data`
- Field: `file` (image JPG/PNG/WebP)

### Example cURL

```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@/path/to/image.jpg"
```

### Example response

```json
{
  "predicted_class": "defect free",
  "confidence": 95.5,
  "is_defect": false
}
```

## Important configuration

- CORS is enabled in `main.py` to allow the frontend to connect.
- The model is loaded to CPU with `map_location='cpu'` to run on machines without GPU.

## Main dependencies

- `fastapi`
- `uvicorn`
- `torch`
- `torchvision`
- `pillow`
- `python-multipart`

## Troubleshooting

- `No module named 'torch'`: install PyTorch for your platform.
- `Model file not found`: ensure `backend/model/best_model.pth` is available.
- CORS errors: check settings in `main.py`.

---

Last updated: 2026-08-20
