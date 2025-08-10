import type { RequestHandler } from '@sveltejs/kit';
import { createCanvas } from 'canvas';

function generateRandomText(length: number = 4) {
  const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

function drawNoise(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const noiseCount = 30;
  for (let i = 0; i < noiseCount; i++) {
    ctx.fillStyle = `rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},0.3)`;
    ctx.beginPath();
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 3;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLines(ctx: CanvasRenderingContext2D, width: number, height: number) {
  const lineCount = 5;
  ctx.strokeStyle = 'rgba(0,0,0,0.2)';
  for (let i = 0; i < lineCount; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.stroke();
  }
}

export const GET: RequestHandler = async () => {
  const width = 150;
  const height = 50;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#deecf5ff';
  ctx.fillRect(0, 0, width, height);

  // Generate text
  const text = generateRandomText(6);

  // Draw noise and lines for captcha
  //drawNoise(ctx, width, height);
  //drawLines(ctx, width, height);

  // Draw text
  ctx.font = '30px Arial';
  ctx.fillStyle = '#004d40';
  ctx.textBaseline = 'middle';

  // Slight random rotation and position for each letter for obfuscation
  const letterSpacing = 20;
  let x = 20;
  for (const char of text) {
    const angle = (Math.random() - 0.5) * 0.4; // rotate between -0.2 to 0.2 radians
    ctx.save();
    ctx.translate(x, height / 2);
    ctx.rotate(angle);
    ctx.fillText(char, 0, 0);
    ctx.restore();
    x += letterSpacing;
  }

  // Convert to PNG buffer
  const buffer = canvas.toBuffer('image/png');
  const base64Image = 'data:image/png;base64,' + buffer.toString('base64');

  return new Response(
    JSON.stringify({
      hash: text,
      image: base64Image
    }),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

};
