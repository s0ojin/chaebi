import numpy as np
import cv2
import matplotlib.pyplot as plt

# 이미지를 matplotlib을 사용해 표시하는 함수
def img_show(title='image', img=None, figsize=(8, 5)):
    plt.figure(figsize=figsize)

    # 이미지 리스트가 제공된 경우 모든 이미지를 표시
    if type(img) == list:
        if type(title) == list:
            titles = title
        else:
            titles = []
            for i in range(len(img)):
                titles.append(title)

        # 각 이미지를 서브플롯으로 표시
        for i in range(len(img)):
            if len(img[i].shape) <= 2:
                rgbImg = cv2.cvtColor(img[i], cv2.COLOR_GRAY2RGB)
            else:
                rgbImg = cv2.cvtColor(img[i], cv2.COLOR_BGR2RGB)

            plt.subplot(1, len(img), i + 1), plt.imshow(rgbImg)
            plt.title(titles[i])
            plt.xticks([]), plt.yticks([])

        plt.show()
    else:
        # 단일 이미지를 표시
        if len(img.shape) < 3:
            rgbImg = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
        else:
            rgbImg = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

        plt.imshow(rgbImg)
        plt.title(title)
        plt.xticks([]), plt.yticks([])
        plt.show()

# 사전 학습된 MobileNet SSD 모델 로드
prototxt_path = 'MobileNetSSD_deploy.prototxt.txt'
model_path = 'MobileNetSSD_deploy.caffemodel'
net = cv2.dnn.readNetFromCaffe(prototxt_path, model_path)

# MobileNet SSD가 감지하도록 학습된 클래스 레이블 리스트 정의
CLASSES = ["background", "aeroplane", "bicycle", "bird", "boat", 
           "bottle", "bus", "car", "cat", "chair", "cow", "diningtable",
           "dog", "horse", "motorbike", "person", "pottedplant", "sheep",
           "sofa", "train", "tvmonitor"]

# 각 클래스 레이블에 대한 랜덤 색상 생성
LABEL_COLORS = np.random.uniform(0, 255, size=(len(CLASSES), 3))

# 객체 감지를 위한 이미지 로드
img = cv2.imread("sample1.jpg")

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

# 시각화를 위한 원본 이미지 복사
vis = img.copy()
# 약한 감지를 필터링하기 위한 신뢰도 임계값 설정
conf = 0.2

# 감지 결과를 반복 처리
for i in np.arange(0, detections.shape[2]):
    # 감지의 신뢰도(즉, 확률) 추출
    confidence = detections[0, 0, i, 2]

    # 신뢰도가 임계값보다 큰 경우 약한 감지를 필터링
    if confidence > conf:
        # 감지 결과에서 클래스 레이블의 인덱스 추출
        idx = int(detections[0, 0, i, 1])
        # 경계 상자의 (x, y) 좌표 계산
        box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
        (startX, startY, endX, endY) = box.astype("int")

        # 감지된 객체에 대한 정보 출력
        print("[INFO] {} : [ {:.2f} % ]".format(CLASSES[idx], confidence * 100))

        # 감지된 객체 주변에 경계 상자 그리기
        cv2.rectangle(vis, (startX, startY), (endX, endY), LABEL_COLORS[idx], max(1, int(0.005 * (w + h) / 2)))
        # 경계 상자 위에 레이블 텍스트 표시
        y = startY - 10 if startY - 10 > 10 else startY + 10
        font_scale = max(0.5, 0.0005 * (w + h))  # 이미지 크기에 따라 폰트 크기 동적으로 설정
        cv2.putText(vis, "{} : {:.2f}%".format(CLASSES[idx], confidence * 100), (startX, y), cv2.FONT_HERSHEY_SIMPLEX, font_scale, LABEL_COLORS[idx], max(1, int(0.005 * (w + h) / 2)))

# 감지된 객체가 있는 결과 이미지 표시
img_show('Object Detection', vis, figsize=(16, 10))
