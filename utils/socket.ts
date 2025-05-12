import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  async connect() {
    if (this.socket?.connected) return;

    const userData = await AsyncStorage.getItem('user');
    if (!userData) {
      throw new Error('User not found');
    }

    const user = JSON.parse(userData);
    
    this.socket = io(process.env.EXPO_PUBLIC_API_URL || '', {
      auth: {
        userId: user.id,
        userType: user.type // 'patient' or 'doctor'
      }
    });

    this.socket.on('connect', () => {
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinChat(patientId: number, doctorId: number) {
    if (!this.socket?.connected) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('join_chat', { patientId, doctorId });
  }

  leaveChat(patientId: number, doctorId: number) {
    if (!this.socket?.connected) {
      throw new Error('Socket not connected');
    }
    this.socket.emit('leave_chat', { patientId, doctorId });
  }

  onNewMessage(callback: (message: any) => void) {
    if (!this.socket?.connected) {
      throw new Error('Socket not connected');
    }
    this.socket.on('new_message', callback);
  }

  offNewMessage(callback: (message: any) => void) {
    if (!this.socket?.connected) {
      throw new Error('Socket not connected');
    }
    this.socket.off('new_message', callback);
  }
}

export const socketService = SocketService.getInstance(); 