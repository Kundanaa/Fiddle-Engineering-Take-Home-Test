import { useState } from "react";

export function useHistory<T>(initial: T) {
  const [history, setHistory] = useState<T[]>([initial]);
  const [pointer, setPointer] = useState(0);

  const push = (value: T) => {
    const newHistory = [...history.slice(0, pointer + 1), value];
    setHistory(newHistory);
    setPointer(newHistory.length - 1);
  };

  const undo = () => {
    if (pointer > 0) setPointer(pointer - 1);
  };

  const redo = () => {
    if (pointer < history.length - 1) setPointer(pointer + 1);
  };

  return { history, pointer, push, undo, redo };
}
