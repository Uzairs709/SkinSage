import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";

// Hugging Face token
const HF_TOKEN = "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";

// Create an axios instance pointed at your FastAPI /predict endpoint
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Authorization': `Bearer ${HF_TOKEN}`,
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: {
        ...config.headers,
        'Authorization': 'Bearer [REDACTED]' // Hide token in logs
      },
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Function to set auth token
export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${HF_TOKEN}`;
  } else {
    api.defaults.headers.common['Authorization'] = `Bearer ${HF_TOKEN}`;
  }
};

/**
 * Convert any image (PNG, HEIC, etc.) to JPEG using Expo ImageManipulator
 */
export async function convertToJpegAsync(uri: string): Promise<string> {
  const manipulated = await ImageManipulator.manipulateAsync(
    uri,
    [], // no resize or rotation
    { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
  );
  return manipulated.uri;
}

/**
 * Upload a local image URI to the /predict endpoint and return JSON result
 */
export async function predictImage(uri: string): Promise<any> {
  // Convert to JPEG first
  const jpegUri = await convertToJpegAsync(uri);

  const formData = new FormData();
  formData.append("file", {
    uri: jpegUri,
    name: "photo.jpg",
    type: "image/jpeg",
  } as any);

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/predict`, {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${HF_TOKEN}`,
      "Content-Type": "multipart/form-data",
    } as any,
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.statusText}`);
  }

  return response.json();
}

export default api;