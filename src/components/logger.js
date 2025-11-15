// logger.js

const subscribers = [];
const resetSubscribers = [];

// Subscribe when a new log is added
export function subscribeToLogs(callback) {
  subscribers.push(callback);
  return () => {
    const index = subscribers.indexOf(callback);
    if (index !== -1) subscribers.splice(index, 1);
  };
}

// Subscribe for "reset logs" events
export function subscribeToReset(callback) {
  resetSubscribers.push(callback);
  return () => {
    const index = resetSubscribers.indexOf(callback);
    if (index !== -1) resetSubscribers.splice(index, 1);
  };
}

// Add a log
export function addLog(message) {
  const timestamp = new Date().toLocaleTimeString();
  const log = `[${timestamp}] ${message}`;
  subscribers.forEach((cb) => cb(log));
}

// 🔥 Clear logs everywhere
export function resetLogs() {
  resetSubscribers.forEach((cb) => cb());
}
