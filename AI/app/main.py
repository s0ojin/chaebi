# main.py
from fastapi import FastAPI, HTTPException, Query
from app.fasttest import suggest_from_url
import requests

app = FastAPI()

@app.get("/suggest")
def suggest_image(presigned_url: str = Query(..., description="S3 Presigned URL for the image")):
    try:
        # 이미지 파일을 presigned URL을 통해 다운로드
        response = requests.get(presigned_url)
        if response.status_code == 200:
            image_data = response.content
        else:
            raise HTTPException(status_code=400, detail="Failed to download image from the presigned URL")
        
        suggestion = suggest_from_url(image_data)
        return {"Suggestion": suggestion}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))