import { createCanvas } from 'canvas';
import jwt from 'jsonwebtoken';
import SHA256 from 'crypto-js/sha256';
import {CAPTCHA_SECRET, CAPTCHA_EXPIRES_IN} from '$env/static/private'



function generateRandomText(length: number = 4) {
  const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz23456789';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return text;
}

function getRandomColor() {
  // Generate a random integer between 0 and 0xFFFFFF (16777215)
  const randomInt = Math.floor(Math.random() * 16777216);
  // Convert to hex and pad with zeros if necessary
  const hexColor = "#" + randomInt.toString(16).padStart(6, "0");
  return hexColor;
}

function getSelectiveColors()
{
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#4a01f3ff', '#ec04ecff', '#00e4f5ff'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function getSelectiveBgColors()
{
  const colors = ['#f7e2ddff', '#cef5d5ff', '#c6cff7ff', '#c5acffff', '#f1c6f1ff', '#bdf4f8ff'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export const getCaptchaJson = async () =>{
  const width = 150;
  const height = 50;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = getSelectiveBgColors();
  ctx.fillRect(0, 0, width, height);

  // Generate text
  const text = generateRandomText(4);

  // Draw noise and lines for captcha
  //drawNoise(ctx, width, height);
  //drawLines(ctx, width, height);

  // Draw text
  ctx.font = '40px Times';
  ctx.fillStyle = getSelectiveColors();
  ctx.textBaseline = 'middle';

  // Slight random rotation and position for each letter for obfuscation
  const letterSpacing = 20;
  let x = 20;
  for (const char of text) {
    const angle = (Math.random() - 0.5) * 0.8; // rotate between -0.4 to 0.4 radians
    ctx.save();
    ctx.translate(x, height / 2);
    ctx.rotate(angle);
    ctx.fillText(char, 0, 0);
    ctx.restore();
    x += letterSpacing;
  }

  // draw lines
  const lineCount = 5;
  ctx.strokeStyle = getSelectiveColors();
  for (let i = 0; i < lineCount; i++) {
    ctx.beginPath();
    ctx.moveTo(Math.random() * width, Math.random() * height);
    ctx.lineTo(Math.random() * width, Math.random() * height);
    ctx.stroke();
  }
  // draw noise
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


  // Convert to PNG buffer
  const buffer = canvas.toBuffer('image/png');
  const base64Image = 'data:image/png;base64,' + buffer.toString('base64');

const secret = CAPTCHA_SECRET || 'mySecretKey123';
const expiresIn = Number(CAPTCHA_EXPIRES_IN) || 300; // 5 minutes in seconds 5*60

const textHash = SHA256(text).toString();
// Create JWT token with the text hash
const token = jwt.sign(
    { hash: textHash },
    secret,
    { expiresIn }
);

  return JSON.stringify({
      image: base64Image,
      token: token
    });

};
