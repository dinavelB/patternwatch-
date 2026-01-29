export enum AuthState {
  SIGN_UP = "SIGN_UP",
  LOGIN = "LOGIN",
  TERMS = "TERMS",
  SETUP = "SETUP",
  DASHBOARD = "DASHBOARD",
}

export interface User {
  username: string;
  email: string;
  pin?: string;
  password: string;
}

export interface Partner {
  username: string;
  status: "PENDING" | "LINKED";
}

export interface Conversation {
  id: string;
  app: string;
  contact: string;
  age: string;
  lastActivity: string;
}

export interface PatternAlert {
  id: string;
  app: string;
  reason: string;
  confidence: number;
  timestamp: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

export interface SystemStatus {
  initialized: number;
  encryptionActive: boolean;
  handshakeSuccess: boolean;
  tunnelEstablished: boolean;
}
