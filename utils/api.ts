// These values are injected from your project’s .env file at build time:
// EXPO_PUBLIC_API_URL – the base URL of your FastAPI server (e.g. https://api.yoursite.com)
// API_TOKEN – optional Bearer token if your /predict endpoint is protected
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import { EXPO_PUBLIC_API_URL, API_TOKEN } from "@env";

// Create an axios instance pointed at your FastAPI /predict endpoint
export const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    // Bearer token if your API requires authentication
    Authorization: API_TOKEN,
  },
});

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

  
  const response = await fetch(`${EXPO_PUBLIC_API_URL}/predict`, {
    method: "POST",
    headers: {
      Authorization: API_TOKEN,
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.statusText}`);
  }

  return response.json();
}

export default api;