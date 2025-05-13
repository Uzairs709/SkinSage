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
  imageUri?: string;
  is_image?: boolean;
  image_ai_generated?: boolean;
  ai_analysis?: string;
}

export interface SendMessageRequest {
  patient_id: number;
  doctor_id: number;
  sender_id: number;
  // only required if sending text
  content?: string;
  // true if sending an image
  is_image: boolean;
  // only required if is_image===true
  file?: { uri: string; name: string; type: string };
}
export interface SendMessageResponse {
  conversation_id: number;
  message_id: number;
  sent_at: string;
}

export async function sendMessage(payload: SendMessageRequest): Promise<SendMessageResponse> {
  const form = new FormData();

  // append all your form fields
  form.append("patient_id", String(payload.patient_id));
  form.append("doctor_id", String(payload.doctor_id));
  form.append("sender_id", String(payload.sender_id));
  form.append("is_image", payload.is_image ? "true" : "false");

  if (payload.is_image) {
    if (!payload.file) {
      throw new Error("File object is required when is_image=true");
    }
    // this is the critical piece: send the binary
    form.append("file", {
      uri: payload.file.uri,
      name: payload.file.name,
      type: payload.file.type,
    } as any);
  } else {
    // text message path
    if (!payload.content) {
      throw new Error("content is required for text messages");
    }
    form.append("content", payload.content);
  }

  const response = await api.post("/chat/send", form, {
    headers: {
      // let axios set the correct multipart boundary
      "Content-Type": "multipart/form-data",
    },
  });

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