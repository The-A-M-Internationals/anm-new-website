export type SceneCaption = { idx?: string; title: string; line?: string; done: boolean };

export type SceneOptions = {
  /** +1 shifts the model right, -1 left (away from the copy card); applied on wide canvases only */
  bias?: number;
  onCaption?: (caption: SceneCaption) => void;
};

/** A standalone renderer the playback controller can drive */
export type Scene = {
  /** Run the story and render loop (resumes where it paused) */
  play(): void;
  /** Freeze on the current frame and stop requesting frames */
  pause(): void;
  /** Pointer position over the media, -0.5..0.5 on each axis; 0,0 recentres */
  setPointer(x: number, y: number): void;
  destroy(): void;
};

export type SceneFactory = (
  canvas: HTMLCanvasElement,
  overlay: HTMLCanvasElement | null,
  options: SceneOptions
) => Scene | null;
