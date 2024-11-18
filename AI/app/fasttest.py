# fasttest.py
import numpy as np
import cv2
from transformers import CLIPProcessor, CLIPModel
import torch

def categorize_from_url(image_data: bytes) -> str:
    # 바이트 데이터로부터 이미지 로드
    img_array = np.asarray(bytearray(image_data), dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("Failed to load image from provided data")

    # CLIP 모델 및 프로세서 로드
    model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

    texts = ["people", "sky", "sea", "dog", "cat", "food"]
    inputs = processor(text=texts, images=img, return_tensors="pt", padding=True)

    outputs = model(**inputs)
    logits_per_image = outputs.logits_per_image
    probs = logits_per_image.softmax(dim=1)

    topk_values, topk_indices = torch.topk(probs, k=2, dim=1)
    top1_value, top1_index = topk_values[0][0].item(), topk_indices[0][0].item()
    top2_index = topk_indices[0][1].item()

    if texts[top1_index] == "people" and top1_value <= 0.4:
        return texts[top2_index]
    else:
        return texts[top1_index]
