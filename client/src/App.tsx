import React, { useState } from "react";
import { UndoRedoControls } from "./components/UndoRedoControls";
import { TonePicker } from "./components/TonePicker";
import { useHistory } from "./hooks/useHistory";
import { changeTone } from "./utils/api";

const App: React.FC = () => {
  const [text, setText] = useState("");
  const { history, pointer, push, undo, redo } = useHistory<string>("");

  const handleToneChange = async (toneX: number, toneY: number) => {
    if (!text) return;
    try {
      const newText = await changeTone(text, toneX, toneY);
      push(newText);
      setText(newText);
    } catch (err) {
      alert("Error changing tone. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="grid grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Text Editor */}
        <div className="flex flex-col space-y-4">
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              push(e.target.value);
            }}
            placeholder="Type your text here..."
            className="w-full h-96 border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <UndoRedoControls undo={undo} redo={redo} canUndo={pointer > 0} canRedo={pointer < history.length - 1} />
        </div>

        {/* Tone Picker */}
        <div className="flex flex-col items-center space-y-4">
          <TonePicker onSelectTone={handleToneChange} />
          <button
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => {
              setText("");
              push("");
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
