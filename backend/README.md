## Backend — FabriScan (FastAPI)

This document explains how to run the backend API locally, the expected folder layout, and common troubleshooting steps.

Project layout (backend folder)

```
backend/
├── main.py                # FastAPI application entrypoint
├── requirements.txt      # Python dependencies
├── model/
│   ├── best_model.pth    # Trained PyTorch model (NOT committed in repo)
│   └── class_names.json  # Label mapping used by the model
```

Quick setup (development)

1. Create and activate a virtual environment (recommended):

```bash
cd backend
python -m venv .venv
# macOS / Linux
source .venv/bin/activate
# Windows PowerShell
.venv\Scripts\Activate.ps1
# Windows CMD
.venv\Scripts\activate.bat
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Place model artifacts

- Copy your `best_model.pth` and `class_names.json` into `backend/model/`.
- Do NOT commit `best_model.pth` to the git repository (it is large and sensitive).

4. Run the API (development):

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API reference (examples)

- Health check: GET `http://localhost:8000/`
- Prediction (example): POST `http://localhost:8000/predict`

Example curl request (multipart/form-data):

```bash
curl -X POST "http://localhost:8000/predict" \
  -F "file=@/path/to/image.jpg" \
  -H "Accept: application/json"
```

Expected JSON response (example):

```json
{
  "class": "hole",
  "confidence": 92.3
}
```

Common issues & troubleshooting

- Model file not found: ensure `backend/model/best_model.pth` exists and path is correct.
- Torch / CUDA errors: if you don't have CUDA, ensure model is loaded to CPU in `main.py`.
- Port conflicts: if port 8000 is in use, run on another port and update frontend config.
- CORS errors: the backend already enables CORS for local development — if you see CORS issues, check the console and allowed origins in `main.py`.

Notes

- Sensitive files (e.g. `kaggle.json`, model weights) should remain local and be added to `.gitignore`.
- See root `README.md` for how to run frontend and linking frontend -> backend.

If you want, I can also add example unit tests for the prediction endpoint or a small script to test multiple images in a folder.

Last updated: 2026-07-28
