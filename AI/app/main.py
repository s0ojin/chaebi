# main.py
from fastapi import FastAPI
from fasttest import add_numbers, suggest

app = FastAPI()

# imgurl = "./AI/sample2.jpg"

@app.get("/add")
def read_item(a: int, b: int):
    result = add_numbers(a, b)
    return {"result": result}

@app.get("/suggest")
def suggest_image():
    suggestion = suggest()
    return {"Suggestion" : suggestion}