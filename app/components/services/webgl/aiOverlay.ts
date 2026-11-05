/** 2D annotation layer drawn over the AI particles (per chapter) */
import { ANOMALY, GATES } from "./aiShapes";

type Frame = {
  key: string; into: number; time: number; rot: number;
  PV: Float32Array; w: number; h: number; dpr: number;
};

export function drawAnnotations(g: CanvasRenderingContext2D, { key, into, time, rot, PV, w, h, dpr }: Frame) {
  g.clearRect(0, 0, w, h);
  if (into <= 0.01) return;

  const proj = (p: number[]) => {
    const c = Math.cos(rot), s = Math.sin(rot);
    const x = c * p[0] + s * p[2], y = p[1], z = -s * p[0] + c * p[2];
    const X = PV[0] * x + PV[4] * y + PV[8] * z + PV[12],
          Y = PV[1] * x + PV[5] * y + PV[9] * z + PV[13],
          W = PV[3] * x + PV[7] * y + PV[11] * z + PV[15];
    return [((X / W) * 0.5 + 0.5) * w, (1 - ((Y / W) * 0.5 + 0.5)) * h];
  };
  const gold = "rgba(242,205,98,.9)", amber = "rgba(255,120,50,.95)";
  const label = (txt: string, x: number, y: number, col: string) => { g.fillStyle = col; g.fillText(txt.toUpperCase(), x, y); };

  g.globalAlpha = into; g.lineWidth = 1.2 * dpr; g.font = `600 ${10 * dpr}px ui-monospace, Menlo, Consolas, monospace`;
  g.textAlign = "left";
  if (key === "ml") {
    const [x, y] = proj(ANOMALY), rr = (20 + 3 * Math.sin(time * 4)) * dpr;
    g.strokeStyle = amber; g.beginPath(); g.arc(x, y, rr, 0, 6.2832); g.stroke();
    g.beginPath(); g.moveTo(x - rr * 0.7, y + rr * 0.7); g.lineTo(x - rr * 2.0, y + rr * 1.8); g.stroke();
    g.textAlign = "right"; label("Anomaly detected", x - rr * 2.1, y + rr * 1.8 + 4 * dpr, amber);
  } else if (key === "rpa") {
    g.textAlign = "center";
    ["Validate", "Process", "Post"].forEach((t, i) => { const [x, y] = proj([GATES[i], 0.8, 0]); label(t, x, y, gold); });
  } else if (key === "nlp") {
    const [x, y] = proj([0, -0.64, 0]); g.textAlign = "center"; label("Intent: support · sentiment: positive · 0.97", x, y, gold);
  } else if (key === "cv") {
    const a = proj([-1.4, 0.66, 0]), b = proj([1.4, -0.66, 0]), L = 16 * dpr;
    g.strokeStyle = gold; g.beginPath();
    [[a[0], a[1], 1, 1], [b[0], a[1], -1, 1], [a[0], b[1], 1, -1], [b[0], b[1], -1, -1]].forEach(([x, y, sx, sy]) => {
      g.moveTo(x + sx * L, y); g.lineTo(x, y); g.lineTo(x, y + sy * L);
    });
    g.stroke();
    const sy = a[1] + (b[1] - a[1]) * (0.5 + 0.5 * Math.sin(time * 1.6));
    g.globalAlpha = into * 0.35; g.beginPath(); g.moveTo(a[0], sy); g.lineTo(b[0], sy); g.stroke(); g.globalAlpha = into;
    label("Recognised · 98.6%", a[0], a[1] - 8 * dpr, gold);
  } else if (key === "gen") {
    const [x, y] = proj([0.95, 0.35, 0]); label("Generated", x, y, gold);
  }
  g.globalAlpha = 1;
}
