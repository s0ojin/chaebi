# main.py
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from app.fasttest import categorize_from_url
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",     # Spring Boot 서버
        "http://localhost:3000",     # React 서버
        "http://k11a309.p.ssafy.io:8080"     # 프로덕션 도메인
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept"],
)

@app.get("/categorize")
def categorize_image(presigned_url: str = Query(..., description="S3 Presigned URL for the image")):
    try:
        # 이미지 파일을 presigned URL을 통해 다운로드
        response = requests.get(presigned_url)
        if response.status_code == 200:
            image_data = response.content
        else:
            raise HTTPException(status_code=400, detail="Failed to download image from the presigned URL")
        
        categories = categorize_from_url(image_data)
        
        # print(categories[1])

        return categories
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 터미널 실행 코드
# curl -G "http://localhost:8000/categorize" --data-urlencode "presigned_url=https://amzn-s3-s11p31a309-rip.s3.ap-northeast-2.amazonaws.com/uploads/20241112112947_4897f2cd.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20241112T022947Z&X-Amz-SignedHeaders=host&X-Amz-Expires=518400&X-Amz-Credential=AKIA5WLTTCNVMRCYO2WO%2F20241112%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=1bbb577cc4a9c8db39b2f701b8bced9a46dd4f8bd271a82496c4b5ddeb83c000"