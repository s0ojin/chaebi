# Base image
FROM python:3.10.14

# Set working directory
WORKDIR /app

# Copy all files into the container
COPY . .

# Install system dependencies
RUN apt-get update && apt-get install -y libgl1-mesa-glx

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
