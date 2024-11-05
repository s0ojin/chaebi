# main.py
from fastapi import FastAPI
from fasttest import add_numbers

app = FastAPI()

@app.get("/add")
def read_item(a: int, b: int):
    result = add_numbers(a, b)
    return {"result": result}
