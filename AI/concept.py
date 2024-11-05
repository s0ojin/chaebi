# 필요한 라이브러리 설치 지침 (터미널에서 실행)
# pip install torch torchvision transformers pillow tensorflow facenet-pytorch opencv-python

from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import cv2

# CLIP 모델 및 프로세서 로드
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# 감정 분석 파이프라인
# emotion_analyzer = pipeline("sentiment-analysis")

# 이미지 불러오기
# image = Image.open("./AI/sample2.jpg")

image = cv2.imread("./AI/sample2.jpg")

inputs = processor(text=["family", "friends", "travel"], images=image, return_tensors="pt", padding=True)

# CLIP으로 이미지-텍스트 매칭 점수 계산
outputs = model(**inputs)
logits_per_image = outputs.logits_per_image
probs = logits_per_image.softmax(dim=1)  # 텍스트와의 연관성 점수

# 감정 분석 수행
# emotion_result = emotion_analyzer("A happy family photo")  # 예시 텍스트
print("CLIP 주제 연관성:", probs)
# print("감정 분석 결과:", emotion_result)