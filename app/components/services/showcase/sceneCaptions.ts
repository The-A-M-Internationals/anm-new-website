import type { SceneCaption } from "../webgl/types";

/** Story captions for the baked scene videos: [video time in seconds, caption]. Generated with the videos.
 *  The AI track was then edited by hand to the approved "AI for Oracle EPM" bullets (no re-bake needed). */
export const SCENE_CAPTIONS: Record<"epm" | "ai", [number, SceneCaption][]> = {
  "epm": [
    [
      0,
      {
        "title": "Entity books · UAE · USA · India",
        "done": false
      }
    ],
    [
      1.6,
      {
        "title": "Reconciling entity ledgers",
        "done": false
      }
    ],
    [
      7.6,
      {
        "title": "Consolidating to group",
        "done": false
      }
    ],
    [
      12.1,
      {
        "title": "Group view coming together",
        "done": false
      }
    ],
    [
      17.1,
      {
        "title": "Planning & forecast",
        "done": false
      }
    ],
    [
      20.1,
      {
        "title": "Board reporting",
        "done": false
      }
    ],
    [
      25.6,
      {
        "title": "Month-end close complete",
        "done": true
      }
    ],
    [
      30.8,
      {
        "title": "Entity books · UAE · USA · India",
        "done": false
      }
    ]
  ],
  "ai": [
    [
      0,
      {
        "idx": "01",
        "title": "EPM Build Agent (coming soon)",
        "done": false
      }
    ],
    [
      10.3,
      {
        "idx": "02",
        "title": "EPM Automation Tools",
        "done": false
      }
    ],
    [
      20.6,
      {
        "idx": "03",
        "title": "AI on Oracle Cloud",
        "done": false
      }
    ],
    [
      30,
      {
        "idx": "AI",
        "title": "AI for Oracle EPM",
        "done": true
      }
    ],
    [
      33.8,
      {
        "idx": "01",
        "title": "EPM Build Agent (coming soon)",
        "done": false
      }
    ]
  ]
};
