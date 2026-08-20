import json
import torch
import torch.nn as nn
from torchvision import transforms
from torchvision.models import efficientnet_b0, EfficientNet_B0_Weights
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

app = FastAPI()

# Enable CORS so the React frontend can access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load class names
with open("model/class_names.json", "r") as f:
    CLASS_NAMES = json.load(f)

NUM_CLASSES = len(CLASS_NAMES)

# Load model
def load_model():
    model = efficientnet_b0(weights=EfficientNet_B0_Weights.DEFAULT)
    for param in model.parameters():
        param.requires_grad = False
    in_features = model.classifier[1].in_features
    model.classifier = nn.Sequential(
        nn.Dropout(p=0.3),
        nn.Linear(in_features, NUM_CLASSES)
    )
    model.load_state_dict(torch.load("model/best_model.pth", map_location="cpu"))
    model.eval()
    return model

model = load_model()

# Transform
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

@app.get("/")
def root():
    return {"message": "FabriScan API is running!"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read image
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    
    # Preprocessing
    tensor = transform(img).unsqueeze(0)
    
    # Inference
    with torch.no_grad():
        outputs = model(tensor)
        probs = torch.softmax(outputs, dim=1)
        confidence, pred_idx = torch.max(probs, 1)
    
    pred_class = CLASS_NAMES[pred_idx.item()]
    conf = round(confidence.item() * 100, 2)
    
    return {
        "predicted_class": pred_class,
        "confidence": conf,
        "is_defect": pred_class != "defect free"
    }