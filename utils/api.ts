import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";

// Create an axios instance pointed at your FastAPI /predict endpoint
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    Authorization: process.env.EXPO_PUBLIC_HF_TOKEN,
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

  
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/predict`, {
    method: "POST",
    headers: {
      Authorization: process.env.EXPO_PUBLIC_HF_TOKEN ? `Bearer ${process.env.EXPO_PUBLIC_HF_TOKEN}` : undefined,
      "Content-Type": "multipart/form-data",
    } as HeadersInit,
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.statusText}`);
  }

  return response.json();
}

export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  imageUrl: string;
}

export async function getPatientConversations(patientId: string): Promise<Conversation[]> {
  const response = await api.get(`/patients/${patientId}/conversations`);
  return response.data;
}

export async function getDoctorConversations(docId: string): Promise<Conversation[]> {
  const response = await api.get(`/doctors/${docId}/conversations`);
  return response.data;
}

export interface Message {
  id: number;
  sender: "patient" | "doctor";
  text?: string;
  image_ai_generated?: boolean;
  ai_analysis?: string;
}

export interface SendMessageRequest {
  patient_id: number;
  doctor_id: number;
  sender_id: number;
  content: string;
}

export interface SendMessageResponse {
  conversation_id: number;
  message_id: number;
  sent_at: string;
}

export async function sendMessage(payload: SendMessageRequest): Promise<SendMessageResponse> {
  const response = await api.post('/chat/send', payload);
  return response.data;
}

export interface ChatMessage {
  id: number;
  conversation_id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  sent_at: string;
  is_ai_generated: boolean;
  is_image: boolean;
}

export async function getChatHistory(patientId: number, doctorId: number): Promise<ChatMessage[]> {
  const response = await api.get(`/chat/history?patient_id=${patientId}&doctor_id=${doctorId}`);
  return response.data;
}

export default api;