// Paints a "scruffy and muddy" version of the clean pug photo.
// Usage (from the project root so @playwright/test resolves):
//   node scripts/make-pug-before.mjs public/images/before-after/pug-after.jpg public/images/before-after/pug-before.jpg
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";

const [inPath, outPath] = process.argv.slice(2);
const dataUrl = `data:image/jpeg;base64,${readFileSync(inPath).toString("base64")}`;

const browser = await chromium.launch();
const page = await browser.newPage();
const result = await page.evaluate(async (src) => {
  const W = 1200;
  const H = 900;

  // Deterministic randomness so the output is reproducible.
  let seed = 20261111;
  const rand = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const between = (a, b) => a + rand() * (b - a);
  const pick = (list) => list[Math.floor(rand() * list.length)];

  const img = new Image();
  img.src = src;
  await img.decode();

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, W, H);

  // Outline of head + ears, traced from the photo.
  const outline = [
    [250, 420], [215, 405], [235, 330], [300, 275], [380, 240], [470, 232], [560, 255], [640, 275],
    [720, 290], [790, 305], [840, 340], [900, 375], [960, 450], [1010, 540], [1032, 600], [1010, 655],
    [960, 668], [930, 625], [935, 720], [950, 800], [975, 900], [300, 900], [298, 820], [268, 730],
    [258, 640], [262, 540], [285, 460],
  ];
  const center = [600, 570];
  const headPath = () => {
    ctx.beginPath();
    outline.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.closePath();
  };

  // 1. Dull, dusty coat: a grey-brown haze plus fine grit, clipped to the dog.
  ctx.save();
  headPath();
  ctx.clip();
  ctx.fillStyle = "rgba(125, 104, 78, 0.16)";
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 9000; i++) {
    ctx.fillStyle = `rgba(${pick(["150,128,96", "110,92,70", "170,150,120"])},${between(0.15, 0.4)})`;
    ctx.fillRect(between(200, 1040), between(220, 900), between(1, 2.6), between(1, 2.6));
  }
  ctx.restore();

  // Irregular blob for mud patches.
  const blob = (cx, cy, r) => {
    ctx.beginPath();
    const steps = 22;
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      const rr = r * between(0.65, 1.25);
      const x = cx + Math.cos(a) * rr;
      const y = cy + Math.sin(a) * rr * between(0.7, 1.1);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
  };

  // 2. Mud: soft-edged brown patches, darker cores, dried flecks and splatter dots.
  const mud = [
    [430, 690, 62], [525, 745, 48], [345, 610, 34], [610, 335, 46], [760, 650, 42],
    [870, 780, 46], [985, 840, 52], [690, 830, 48], [300, 360, 26],
  ];
  for (const [x, y, r] of mud) {
    ctx.save();
    ctx.filter = "blur(9px)";
    ctx.fillStyle = `rgba(${pick(["122,88,52", "104,74,44", "138,102,62"])},0.6)`;
    blob(x, y, r);
    ctx.fill();
    ctx.filter = "blur(3px)";
    ctx.fillStyle = "rgba(82,58,34,0.55)";
    blob(x + between(-8, 8), y + between(-8, 8), r * 0.55);
    ctx.fill();
    ctx.restore();
    for (let i = 0; i < r * 3; i++) {
      const a = between(0, Math.PI * 2);
      const d = between(0, r);
      ctx.fillStyle = `rgba(${pick(["176,142,98", "160,126,84", "92,66,40"])},${between(0.35, 0.8)})`;
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, between(0.8, 2.4), 0, Math.PI * 2);
      ctx.fill();
    }
    for (let i = 0; i < 10; i++) {
      const a = between(0, Math.PI * 2);
      const d = r * between(1.1, 1.9);
      ctx.fillStyle = "rgba(110,80,48,0.7)";
      ctx.beginPath();
      ctx.arc(x + Math.cos(a) * d, y + Math.sin(a) * d, between(1.5, 5), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // One wavy, slightly curling strand of hair.
  const strand = (x, y, angle, length, width, colour) => {
    const curl = between(-0.6, 0.6);
    const ex = x + Math.cos(angle) * length;
    const ey = y + Math.sin(angle) * length;
    const cx = x + Math.cos(angle + curl) * length * 0.55;
    const cy = y + Math.sin(angle + curl) * length * 0.55;
    ctx.strokeStyle = colour;
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(cx, cy, ex, ey);
    ctx.stroke();
  };
  const furColours = ["rgba(14,13,12,0.85)", "rgba(24,22,21,0.8)", "rgba(36,33,31,0.75)", "rgba(8,8,8,0.9)"];
  const sheenColours = ["rgba(78,72,66,0.45)", "rgba(96,88,78,0.35)", "rgba(62,56,50,0.5)"];
  // Soften every strand a touch so it blends with the photo instead of looking drawn on.
  ctx.filter = "blur(0.7px)";

  // 3a. Overgrown fringe sticking out all around the head and ears (skip the image bottom edge).
  for (let i = 0; i < outline.length; i++) {
    const [x1, y1] = outline[i];
    const [x2, y2] = outline[(i + 1) % outline.length];
    if (y1 >= 895 && y2 >= 895) continue;
    const segment = Math.hypot(x2 - x1, y2 - y1);
    const count = Math.round(segment * 1.1);
    for (let k = 0; k < count; k++) {
      const t = rand();
      const px = x1 + (x2 - x1) * t;
      const py = y1 + (y2 - y1) * t;
      const out = Math.atan2(py - center[1], px - center[0]);
      const inset = between(4, 26);
      const sx = px - Math.cos(out) * inset;
      const sy = py - Math.sin(out) * inset;
      const droop = 0.35; // gravity pulls long hair downward
      const angle = out + between(-0.55, 0.55) + (Math.PI / 2 - out) * droop * rand();
      strand(sx, sy, angle, between(22, 80), between(0.8, 2.2), pick(furColours));
    }
  }

  // 3b. Long shaggy fringe hanging down over the forehead and partly over the eyes.
  for (let i = 0; i < 650; i++) {
    const x = between(310, 850);
    const y = between(255, 380) + (x > 600 ? (x - 600) * 0.15 : 0);
    strand(x, y, Math.PI / 2 + between(-0.5, 0.5), between(30, 105), between(0.8, 2.2), pick(rand() < 0.8 ? furColours : sheenColours));
  }

  // 3c. Matted tufts on cheeks, jowls and down the chest.
  const tufts = [[300, 560], [330, 700], [560, 640], [820, 600], [880, 700], [640, 860], [420, 860], [760, 760]];
  for (const [tx, ty] of tufts) {
    for (let i = 0; i < 90; i++) {
      const base = Math.atan2(ty - center[1], tx - center[0]) * 0.5 + Math.PI / 2 * 0.5;
      strand(tx + between(-45, 45), ty + between(-35, 35), base + between(-0.9, 0.9), between(20, 65), between(0.8, 2), pick(rand() < 0.75 ? furColours : sheenColours));
    }
  }
  ctx.filter = "none";

  // 4. Overall: slightly flatter, tired-looking colour.
  const finished = document.createElement("canvas");
  finished.width = W;
  finished.height = H;
  const fctx = finished.getContext("2d");
  fctx.filter = "saturate(0.88) contrast(0.94) brightness(0.97)";
  fctx.drawImage(canvas, 0, 0);
  return finished.toDataURL("image/jpeg", 0.86);
}, dataUrl);

writeFileSync(outPath, Buffer.from(result.split(",")[1], "base64"));
await browser.close();
console.log(`wrote ${outPath}`);
