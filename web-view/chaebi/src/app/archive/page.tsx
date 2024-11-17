'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ImageData {
  id: number;
  fileUrl: string;
  fileName: string;
  createdDate: string;
  keywords: string[];
  locate: string;
  capturedDate: string;
}

const ArchivePage = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/gallery/filterList', {
          userId: 8,
          recipientId: 7,
        });
        // yearClassification에서 2024년 데이터를 가져옴
        const imagesData = response.data.yearClassification['2024'] || [];
        setImages(imagesData);
      } catch (err) {
        setError('Failed to load images.');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Archive Page</h1>
      <div className="image-gallery">
        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img src={image.fileUrl} alt={image.fileName} />
            <p>{image.fileName}</p>
            <p>Location: {image.locate}</p>
            <p>Captured Date: {new Date(image.capturedDate).toLocaleDateString()}</p>
            <p>Keywords: {image.keywords.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArchivePage;
