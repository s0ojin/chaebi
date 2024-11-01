# 필요한 라이브러리 설치 지침 (터미널에서 실행)
# pip install torch torchvision transformers pillow tensorflow facenet-pytorch opencv-python ultralytics

from transformers import CLIPProcessor, CLIPModel, pipeline
from facenet_pytorch import MTCNN
import torch
from PIL import Image
from facenet_pytorch import InceptionResnetV1
from torchvision import transforms
from ultralytics import YOLO
import os

# CLIP 모델 및 프로세서 로드
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# 감정 분석 파이프라인
emotion_analyzer = pipeline("sentiment-analysis")

# 이미지 불러오기
image = Image.open("sample2.jpg")
inputs = processor(text=["family", "friends", "travel"], images=image, return_tensors="pt", padding=True)

# CLIP으로 이미지-텍스트 매칭 점수 계산
outputs = model(**inputs)
logits_per_image = outputs.logits_per_image
probs = logits_per_image.softmax(dim=1)  # 텍스트와의 연관성 점수

# 감정 분석 수행
emotion_result = emotion_analyzer("A happy family photo")  # 예시 텍스트
print("CLIP 주제 연관성:", probs)
print("감정 분석 결과:", emotion_result)

# YOLOv8 모델 로드 (yolov8n 모델 사용)
yolo_model = YOLO('yolov8n.pt')

# YOLO 모델로 사람 영역 감지 후, MTCNN으로 얼굴 확인
mtcnn = MTCNN()

def detect_faces_with_validation(image_path):
    # YOLO로 사람 감지
    image = Image.open(image_path)
    results = yolo_model(image_path)
    # print(results[0].boxes)s
    valid_faces = []

    for i, det in enumerate(results[0].boxes.xyxy):  # 결과에서 bounding box 좌표 추출
        xmin, ymin, xmax, ymax = det[:4]
        confidence = results[0].boxes.conf[i]  # 감지 확률
        cls = int(results[0].boxes.cls[i])  # 감지된 객체 클래스
        if cls == 0:
            cropped_face = image.crop((int(xmin), int(ymin), int(xmax), int(ymax)))
            valid_faces.append(cropped_face)
        
        # print(f"클래스: {cls}, 위치: ({xmin}, {ymin}), ({xmax}, {ymax}), 확률: {confidence:.2f}")

    return valid_faces

# FaceNet 모델 로드
face_recognition_model = InceptionResnetV1(pretrained='vggface2').eval()

# 이미지를 텐서로 변환하기 위한 변환 정의
transform = transforms.Compose([
    transforms.Resize((160, 160)),
    transforms.ToTensor(),
    transforms.Normalize(mean=0.5, std=0.5)  # -1에서 1 사이로 정규화
])

# 두 얼굴 간 동일 인물 여부 비교 함수
def is_same_person(face1, face2, threshold=0.8):
    # 얼굴 이미지를 FaceNet 모델이 인식 가능한 텐서로 변환
    face1_tensor = transform(face1)
    face2_tensor = transform(face2)

    face1_embedding = face_recognition_model(face1_tensor.unsqueeze(0))
    face2_embedding = face_recognition_model(face2_tensor.unsqueeze(0))

    # 유클리드 거리 계산하여 threshold 이하이면 동일 인물로 간주
    distance = torch.dist(face1_embedding, face2_embedding)
    return distance < threshold

# 테스트 이미지에서 얼굴 감지 및 동일 인물 여부 확인
image_path = "sample2.jpg"
faces = detect_faces_with_validation(image_path)
print("Detected faces:", len(faces))

# for i, f in enumerate(faces):
#     f.show(title=f"Face {i+1}")  # 얼굴 이미지를 표시

# 감지된 얼굴들 간 동일 인물 여부 판단 (예시로 첫 두 얼굴 비교)
if len(faces) >= 4:
    same_person = is_same_person(faces[0], faces[3])
    print("Same person:" if same_person else "Different people")
