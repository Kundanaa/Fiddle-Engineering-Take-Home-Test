import React from "react";

interface UndoRedoProps {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const UndoRedoControls: React.FC<UndoRedoProps> = ({ undo, redo, canUndo, canRedo }) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={undo}
        disabled={!canUndo}
        className={`px-4 py-2 rounded-lg ${canUndo ? "bg-indigo-500 text-white hover:bg-indigo-600" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
      >
        Undo
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        className={`px-4 py-2 rounded-lg ${canRedo ? "bg-indigo-500 text-white hover:bg-indigo-600" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
      >
        Redo
      </button>
    </div>
  );
};
