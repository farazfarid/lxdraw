import ColorPicker from "../ColorPicker"; // Import ColorPicker
import PencilButton from "./PencilButton";
import EraserButton from "./EraserButton";
import RectangleButton from "./RectangleButton";
import EllipseButton from "./EllipseButton";
import UndoButton from "./UndoButton";
import RedoButton from "./RedoButton";
import ClearButton from "./ClearButton";
import SelectionButton from "./SelectionButton";
import MagicButton from "./MagicButton";
import { CanvasMode, LayerType, CanvasState, Color } from "../../types"; // Import Color
import styles from "./index.module.css";

type Props = {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  setLastUsedColor: (color: Color) => void; // Add setLastUsedColor
  clearCanvas: () => void;
  onAiClick: () => void;
};

export default function ToolsBar({
  canvasState,
  setCanvasState,
  undo,
  redo,
  canUndo,
  canRedo,
  setLastUsedColor,
  clearCanvas,
  onAiClick,
}: Props) {
  return (
    <div className={styles.tools_panel_container}>
      <div className={styles.tools_panel}>
        <div className={styles.tools_panel_section}>
          {/* Always visible ColorPicker */}
          <ColorPicker onChange={setLastUsedColor} />
        </div>

        <div className={styles.tools_panel_section}>
          <SelectionButton
            isActive={
              canvasState.mode === CanvasMode.None ||
              canvasState.mode === CanvasMode.Translating ||
              canvasState.mode === CanvasMode.SelectionNet ||
              canvasState.mode === CanvasMode.Pressing ||
              canvasState.mode === CanvasMode.Resizing
            }
            onClick={() => setCanvasState({ mode: CanvasMode.None })}
          />
          <PencilButton
            isActive={canvasState.mode === CanvasMode.Pencil}
            onClick={() => setCanvasState({ mode: CanvasMode.Pencil })}
          />
          <EraserButton
            isActive={canvasState.mode === CanvasMode.Eraser}
            onClick={() => setCanvasState({ mode: CanvasMode.Eraser })}
          />
          <RectangleButton
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Rectangle
            }
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Rectangle,
              })
            }
          />
          <EllipseButton
            isActive={
              canvasState.mode === CanvasMode.Inserting &&
              canvasState.layerType === LayerType.Ellipse
            }
            onClick={() =>
              setCanvasState({
                mode: CanvasMode.Inserting,
                layerType: LayerType.Ellipse,
              })
            }
          />
          <MagicButton
            isActive={false}
            onClick={onAiClick}
          />
        </div>

        <div className={styles.tools_panel_section}>
          <UndoButton onClick={undo} disabled={!canUndo} />
          <RedoButton onClick={redo} disabled={!canRedo} />
          <ClearButton
            onClick={() => {
              if (window.confirm("Are you sure you want to clear the canvas? This cannot be undone.")) {
                clearCanvas();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
