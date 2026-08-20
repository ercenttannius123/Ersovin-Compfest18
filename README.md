# FabriScan — Fabric Defect Detection

![FabriScan](https://img.shields.io/badge/FabriScan-ready-blue) ![License](https://img.shields.io/badge/license-private-lightgrey)
Team: Ersovin · Model: EfficientNet-B0 · Tech: FastAPI, React

---

## About

FabriScan is a prototype application for automatic fabric defect detection. The project contains:

- Backend: FastAPI + PyTorch for model inference.
- Frontend: React + TypeScript (Vite) for user interface — image upload/capture and prediction display.

Model used: EfficientNet-B0 (pretrained / fine-tuned). The model file is not included in this repository (`backend/model/best_model.pth`).

## Requirements

- Docker & Docker Compose (optional, recommended for consistent environment)
- Python 3.10+ (if running backend without Docker)
- Node.js 18+ / npm (if running frontend without Docker)

See "Run with Docker" below for Docker instructions.

## Run (Development, without Docker)

1. Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
# FabriScan — Fabric Defect Detection

![FabriScan](https://img.shields.io/badge/FabriScan-ready-blue) ![License](https://img.shields.io/badge/license-private-lightgrey)
Team: Ersovin · Model: EfficientNet-B0 · Tech: FastAPI, React

---

This repository contains a prototype for fabric defect detection. It is designed to be simple to run locally or in Docker for demonstrations and evaluation.

Features

- Image upload and camera capture UI (React + Vite)
- FastAPI backend serving PyTorch model for inference
- Ready-to-use Docker setup for quick deployment

Repository layout

- `backend/` — FastAPI service and model artifacts
- `frontend/` — Vite + React user interface
- `docker-compose.yml` — compose file to run both services together

Quick start (recommended)

```bash
docker-compose up --build -d

# frontend: http://localhost:5173
# backend:  http://localhost:8000
```

Development (without Docker)

- See `backend/README.md` and `frontend/README.md` for individual service development instructions.

Model files

- Place `best_model.pth` and `class_names.json` inside `backend/model/` before running predictions. These files are intentionally excluded from the repository.
- For large model files use Git LFS or host externally and mount into the container at runtime.

Contributing

- Use Conventional Commits for changes: `feat:`, `fix:`, `docs:`.

│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
├── README.md
└── .dockerignore
```

## License

Private — for competition use only.

---


## Commit dan Kontribusi

Kami menggunakan format Conventional Commits untuk menjaga konsistensi.
# FabriScan — Fabric Defect Detection

![FabriScan](https://img.shields.io/badge/FabriScan-ready-blue) ![License](https://img.shields.io/badge/license-private-lightgrey)
Team: Ersovin · Model: EfficientNet-B0 · Tech: FastAPI, React

---

FabriScan is a prototype application that detects fabric defects from images. This repository contains a React frontend (Vite) and a FastAPI backend that runs a PyTorch model.

Why this repo is useful for judges

- Minimal setup: Docker Compose for reproducible runs.
- Clear API: `POST /predict` for single-image inference.
- Submission-ready: checklist and instruction for packaging proofs (video, proposal) included below.

Repository layout

- `backend/` — FastAPI app and model artifacts (see `backend/README.md`)
- `frontend/` — Vite + React UI (see `frontend/README.md`)
- `docker-compose.yml` — compose file to run frontend + backend together

Quick start — recommended (Docker)

```bash
# from repository root
docker-compose up --build -d

# frontend: http://localhost:5173
# backend:  http://localhost:8000
```

Quick start — development (no Docker)

- Backend: follow `backend/README.md` (virtual env, pip install, `uvicorn main:app`)
- Frontend: follow `frontend/README.md` (`npm install`, `npm run dev`)

API (main endpoint)

- Endpoint: `POST /predict`
- Form: `multipart/form-data` with field `file` (image JPG/PNG/WEBP)
- Response (JSON):

```json
{
	"predicted_class": "defect free",
	"confidence": 92.3,
	"is_defect": false
}
```

Example cURL

```bash
curl -X POST "http://localhost:8000/predict" \
	-F "file=@/path/to/image.jpg"
```

Model files & large artifacts

- The model file (`backend/model/best_model.pth`) and `class_names.json` are NOT included in the repository.
- Options to provide the model:
	- Recommended (development): add the model locally and mount the folder in Docker. Example `docker-compose.dev.yml` (not included) would mount `./backend/model:/app/model:ro`.
	- For repository distribution: use Git LFS for files >100 MB.

Git LFS quick setup (optional)

```bash
git lfs install
git lfs track "backend/model/*.pth"
git add .gitattributes
```

Submission checklist (COMPETITION READY)

Before submitting to the competition/judges, ensure the repository contains or links to the following items:

1) Source code repository (this repo): include `README.md` with clear setup steps and `docker-compose.yml`.

2) Proof-of-work video (max 7 minutes):
	 - Upload to YouTube as UNLISTED.
	 - Naming format: `COMPFEST18 AIC: PROOF OF WORK - [Team Name] - [Project Name]`.

3) Innovation video (max 5 minutes):
	 - Upload to YouTube as PUBLIC.
	 - Naming format: `COMPFEST18 AIC: [Team Name] - [Project Name]`.

4) PDF proposal (max 20 pages, excluding cover/references/appendices) containing at least:
	 - Team name and project title
	 - Background and motivation
	 - Goals and benefits
	 - Methodology: dataset acquisition, model development (per-feature), integration with code/environment
	 - Other supporting methods/references
	 - Conclusion

5) Extra: include link to where judges can download the model (if not included in repo), or add instructions to obtain it.

How to present the repository to judges (recommended)

- Keep the repository root tidy: `README.md` (this file) + `docker-compose.yml` + per-service README files.
- In `README.md` provide direct links to the videos and to the PDF proposal (host on Google Drive, GitHub Releases, or similar), or explain how judges can run the app locally with the model mounted.

Security & privacy notes

- Do not commit `kaggle.json` credentials or any private keys — remove them before sharing publicly.

Contributing

- Use Conventional Commits for changes. Keep PRs small and focused.

License

Private — for competition use only.

docker-compose down
