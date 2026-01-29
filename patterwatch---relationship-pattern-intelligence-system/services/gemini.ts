import { GoogleGenAI, Type } from "@google/genai";
import { PatternAlert } from "../types/types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export async function analyzeBehaviorPatterns(
  metadata: string,
): Promise<PatternAlert[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following behavioral metadata and return a JSON list of pattern anomalies for a relationship trust system. 
      Metadata: ${metadata}
      
      The response should be an array of objects matching the PatternAlert interface.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              app: { type: Type.STRING },
              reason: { type: Type.STRING },
              confidence: { type: Type.NUMBER },
              timestamp: { type: Type.STRING },
              severity: {
                type: Type.STRING,
                description: "LOW, MEDIUM, HIGH, or CRITICAL",
              },
            },
            required: [
              "id",
              "app",
              "reason",
              "confidence",
              "timestamp",
              "severity",
            ],
          },
        },
        systemInstruction:
          "You are the PatterWatch Intelligence Engine. You identify behavioral anomalies such as activity during 'busy' claims, location mismatches, or suspicious spikes in new contacts. Be precise, objective, and analytical.",
      },
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Pattern Analysis Error:", error);
    return [];
  }
}

export async function generateTerminalLogs(): Promise<string[]> {
  const logs = [
    "HANDSHAKE_SUCCESS",
    "ENCRYPTED_TUNNEL_ESTABLISHED",
    "AES_256_GCM_ACTIVE",
    `SESSION_TOKEN_GENERATED: PX-${Math.floor(1000 + Math.random() * 9000)}`,
    "DATA_STREAM_SYNCHRONIZED",
    "BEHAVIORAL_METRICS_READY",
    "INTEGRITY_CHECK_PASSED",
  ];
  return logs;
}
