import React from "react";

interface TonePickerProps {
  onSelectTone: (x: number, y: number) => void;
}

export const TonePicker: React.FC<TonePickerProps> = ({ onSelectTone }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from({ length: 3 }).map((_, i) =>
        Array.from({ length: 3 }).map((_, j) => (
          <button
            key={`${i}-${j}`}
            className="w-20 h-20 border rounded-lg hover:bg-indigo-100 transition"
            onClick={() => onSelectTone(i - 1, j - 1)}
          >
            {i - 1}, {j - 1}
          </button>
        ))
      )}
    </div>
  );
};
