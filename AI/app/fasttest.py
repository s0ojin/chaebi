#fasttest.py
import numpy as np
import cv2
from transformers import CLIPProcessor, CLIPModel
import torch
import os


def suggest_from_url(image_data: bytes) -> str:
    suggestion = ''

    # 바이트 데이터로부터 이미지 로드
    img_array = np.asarray(bytearray(image_data), dtype=np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

    if img is None:
        raise ValueError("Failed to load image from provided data")

    # MobileNet SSD 모델 로드 (기존 경로 유지)
    # prototxt_path와 model_path는 기존 코드와 동일
    base_path = os.path.dirname(__file__)
    prototxt_path = os.path.join(base_path, "..", "data", "MobileNetSSD_deploy.prototxt.txt")
    model_path = os.path.join(base_path, "..", "data", "MobileNetSSD_deploy.caffemodel")
    net = cv2.dnn.readNetFromCaffe(prototxt_path, model_path)

    # MobileNet SSD가 감지하도록 학습된 클래스 레이블 리스트 정의
    CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat", 
            "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
            "dog", "horse", "motorbike", "person", "pottedplant", "sheep",
            "sofa", "train", "tvmonitor"]

    # 이미지 크기 조정 및 블롭 변환
    (h, w) = img.shape[:2]
    new_size = min(h, w)
    resized = cv2.resize(img, (new_size, new_size))
    blob = cv2.dnn.blobFromImage(resized, 0.007843, (300, 300), 127.5)

    net.setInput(blob)
    detections = net.forward()

    # 사람 수 세기 위한 변수 초기화
    person_count = 0

    # 감지 결과를 반복 처리
    for i in np.arange(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]

        if confidence > 0.2:
            idx = int(detections[0, 0, i, 1])
            if CLASSES[idx] == "person":
                person_count += 1

    # CLIP 모델 및 프로세서 로드
    model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
    processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

    texts = ["family", "friends", "sky", "abstract", "robots", "travel", "fantasy", "pets", "celebrations", "architecture"]
    inputs = processor(text=texts, images=img, return_tensors="pt", padding=True)

    outputs = model(**inputs)
    logits_per_image = outputs.logits_per_image
    probs = logits_per_image.softmax(dim=1)

    topk_values, topk_indices = torch.topk(probs, k=3, dim=1)
    top_topics = [(texts[idx], topk_values[0, i].item()) for i, idx in enumerate(topk_indices[0])]

    for topic, prob in top_topics:
        print(f"CLIP 주제 연관성: {topic} ({prob:.4f})")

    if person_count >= 2 and any(topic in ["friends", "family"] for topic, _ in top_topics):
        suggestion += "Suggest"
    else:
        suggestion += "Not-Suggest"

    return suggestion