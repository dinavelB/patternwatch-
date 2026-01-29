import React, { useState, useEffect } from "react";
import { PatternAlert } from "../types/types";
import { analyzeBehaviorPatterns } from "../services/gemini";

interface PatternEngineProps {
  isSystemActive: boolean;
}

const PatternEngine: React.FC<PatternEngineProps> = ({ isSystemActive }) => {
  const [alerts, setAlerts] = useState<PatternAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const runAnalysis = async () => {
    setIsLoading(true);
    // Simulated metadata for analysis
    const simulatedMetadata = `
      User A: claimed "Going to bed" at 22:00. 
      Observation: WhatsApp active at 22:45, 23:15.
      Activity Level: +40% higher than baseline.
      Interaction: New contact "Mark" added 1 hour ago.
    `;
    const results = await analyzeBehaviorPatterns(simulatedMetadata);
    setAlerts(results);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isSystemActive && alerts.length === 0) {
      runAnalysis();
    }
  }, [isSystemActive]);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8">
      <div className="mb-8 border-b border-zinc-800 pb-6 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-blue-500 tracking-tighter uppercase">
            Intelligence Alert Engine
          </h2>
          <p className="text-zinc-500 text-xs mt-2 font-mono uppercase tracking-widest">
            Behavioral Anomalies & Integrity Tracking
          </p>
        </div>
        <button
          onClick={runAnalysis}
          disabled={isLoading || !isSystemActive}
          className="px-6 py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white rounded text-[10px] font-bold uppercase tracking-widest transition-all disabled:opacity-30"
        >
          {isLoading ? "Scanning..." : "Manual Scan"}
        </button>
      </div>

      {!isSystemActive && (
        <div className="bg-blue-950/20 border border-blue-900/30 p-10 rounded-lg text-center">
          <p className="text-blue-500 font-mono text-sm uppercase tracking-widest">
            System Inactive: Intelligence Engine in Standby Mode
          </p>
        </div>
      )}

      {isSystemActive && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <div className="col-span-2 py-20 flex flex-col items-center justify-center gap-4">
              <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <p className="text-zinc-500 font-mono text-xs animate-pulse uppercase tracking-widest">
                Parsing Behavioral Metadata...
              </p>
            </div>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-zinc-950 border border-zinc-800 p-5 rounded-lg hover:border-blue-900/50 transition-all flex flex-col justify-between"
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${
                      alert.severity === "CRITICAL"
                        ? "bg-red-600 text-white"
                        : alert.severity === "HIGH"
                          ? "bg-orange-600 text-white"
                          : "bg-blue-600 text-white"
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-mono">
                    {alert.timestamp}
                  </span>
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                    {alert.app}
                  </p>
                  <p className="text-white text-sm font-semibold mt-1">
                    {alert.reason}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-900 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-600 font-bold uppercase">
                      Confidence
                    </span>
                    <span className="text-blue-400 font-mono text-xs">
                      {(alert.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 w-24 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${alert.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {isSystemActive && alerts.length === 0 && !isLoading && (
        <div className="py-20 text-center border border-dashed border-zinc-800 rounded-lg">
          <p className="text-zinc-600 font-mono uppercase tracking-widest">
            No Pattern Anomalies Detected in Current Buffer
          </p>
        </div>
      )}
    </div>
  );
};

export default PatternEngine;
