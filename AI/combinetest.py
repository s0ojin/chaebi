import numpy as np
import cv2
import matplotlib.pyplot as plt
from transformers import CLIPProcessor, CLIPModel, pipeline
from facenet_pytorch import MTCNN
import torch
from PIL import Image
from facenet_pytorch import InceptionResnetV1
from torchvision import transforms