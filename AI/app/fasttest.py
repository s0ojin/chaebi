# fasttest.py
import numpy as np
import cv2
from transformers import CLIPProcessor, CLIPModel
import torch


def categorize_from_url(image_data: bytes) -> list:
    # 바이트 데이터로부터 이미지 로드
    img_array = np.asarray(bytearray(image_data), dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("Failed to load image from provided data")

    # CLIP 모델 및 프로세서 로드
    model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

    texts = ["family", "friends", "sky", "sea", "robots", "travel", "fantasy", "pets", "celebrations", "architecture"]
    inputs = processor(text=texts, images=img, return_tensors="pt", padding=True)

    outputs = model(**inputs)
    logits_per_image = outputs.logits_per_image
    probs = logits_per_image.softmax(dim=1)

    topk_values, topk_indices = torch.topk(probs, k=3, dim=1)
    top_topics = [texts[idx] for idx in topk_indices[0]]

    return top_topics
