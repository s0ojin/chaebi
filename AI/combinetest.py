# 필요한 라이브러리 설치 지침 (터미널에서 실행)
# pip install torch torchvision transformers pillow tensorflow facenet-pytorch opencv-python

import numpy as np
import cv2
from transformers import CLIPProcessor, CLIPModel

# 사전 학습된 MobileNet SSD 모델 로드
prototxt_path = './AI/MobileNetSSD_deploy.prototxt.txt'
model_path = './AI/MobileNetSSD_deploy.caffemodel'
net = cv2.dnn.readNetFromCaffe(prototxt_path, model_path)

# MobileNet SSD가 감지하도록 학습된 클래스 레이블 리스트 정의
CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat", 
           "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
           "dog", "horse", "motorbike", "person", "pottedplant", "sheep",
           "sofa", "train", "tvmonitor"]

# 객체 감지를 위한 이미지 로드
img = cv2.imread("./AI/sample2.jpg")

# 이미지의 크기 가져오기
(h, w) = img.shape[:2]
# 모델 입력을 위해 이미지를 고정 크기로 리사이즈
new_size = min(h, w)
resized = cv2.resize(img, (new_size, new_size))
# 모델 입력을 위한 이미지 준비
blob = cv2.dnn.blobFromImage(resized, 0.007843, (300, 300), 127.5)

# 준비된 이미지를 네트워크에 입력으로 설정
net.setInput(blob)
# 감지 결과 얻기 위해 순방향 전달
detections = net.forward()

# 감지된 객체가 없으면 코드 종료
if detections.shape[2] == 0:
    print("[INFO] 감지된 객체가 없습니다.")
    exit()

# 사람 수 세기 위한 변수 초기화
person_count = 0

# 감지 결과를 반복 처리
for i in np.arange(0, detections.shape[2]):
    # 감지의 신뢰도(즉, 확률) 추출
    confidence = detections[0, 0, i, 2]

    # 신뢰도가 임계값보다 큰 경우 약한 감지를 필터링
    if confidence > 0.2:
        # 감지 결과에서 클래스 레이블의 인덱스 추출
        idx = int(detections[0, 0, i, 1])
        # 클래스가 'person'인 경우에만 사람 수를 증가
        if CLASSES[idx] == "person":
            person_count += 1

# 감지된 사람 수 출력
print("[INFO] 감지된 사람 수: {}명".format(person_count))

# CLIP 모델 및 프로세서 로드
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# 이미지 불러오기
image = cv2.imread("./AI/sample2.jpg")
inputs = processor(text=["family", "friends", "travel"], images=image, return_tensors="pt", padding=True)

# CLIP으로 이미지-텍스트 매칭 점수 계산
outputs = model(**inputs)
logits_per_image = outputs.logits_per_image
probs = logits_per_image.softmax(dim=1)  # 텍스트와의 연관성 점수

# 주제 연관성 분석 수행
print("CLIP 주제 연관성:", probs)