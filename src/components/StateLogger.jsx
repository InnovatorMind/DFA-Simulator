import { useEffect, useState, useRef } from "react";
import { subscribeToLogs, subscribeToReset } from "./logger";

export function StateLogger() {
  const [logs, setLogs] = useState([]);
  const logRef = useRef(null);

  useEffect(() => {
    const unsubscribeLog = subscribeToLogs((newLog) => {
      setLogs((prev) => [...prev, newLog]);
    });

    const unsubscribeReset = subscribeToReset(() => {
      setLogs([]); // clear UI logs
    });

    return () => {
      unsubscribeLog();
      unsubscribeReset();
    };
  }, []);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      ref={logRef}
      className="
        w-full bg-zinc-900 text-emerald-400 font-mono 
        p-2 sm:p-3 rounded-lg overflow-y-auto shadow-md 
        leading-tight sm:leading-snug mb-2
        text-[11px] sm:text-sm h-24 sm:h-28
      "
    >
      {logs.map((log, index) => (
        <div key={index} className="mb-0.5">
          {log}
        </div>
      ))}

      {logs.length === 0 && (
        <div className="text-zinc-500">No logs yet...</div>
      )}
    </div>
  );
}

export default StateLogger;
