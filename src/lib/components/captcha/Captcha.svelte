<script lang="ts">
  import { onMount } from 'svelte';
  import md5 from 'crypto-js/md5';

  export let onCaptchaReady: (data: { hash: string }) => void = () => {};

  let captchaText = '';
  let captchaImage = '';
  let captchaHash = '';

  function generateCaptchaText(length = 5): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let text = '';
    for (let i = 0; i < length; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return text;
  }

  function drawCaptcha(text: string): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Could not get canvas context');

    const width = 150;
    const height = 50;
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(0,0,0,${Math.random() * 0.3})`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }

    ctx.font = '30px Arial';
    ctx.fillStyle = '#333';

    for (let i = 0; i < text.length; i++) {
      const x = 10 + i * 25;
      const y = 30 + Math.random() * 10;
      const angle = (Math.random() - 0.5) * 0.4;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    return canvas.toDataURL();
  }

  function refreshCaptcha(): void {
    captchaText = generateCaptchaText();
    captchaImage = drawCaptcha(captchaText);
    captchaHash = md5(captchaText.toLowerCase()).toString();
    onCaptchaReady({ hash: captchaHash });
  }

  onMount(() => {
    refreshCaptcha();
  });
</script>

<div class="captcha-container">
  {#if captchaImage}
    <img src={captchaImage} alt="captcha" />
  {/if}
  <button type="button" on:click={refreshCaptcha}>↻</button>
</div>

<style>
  .captcha-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0.5rem 0;
  }

  img {
    border: 1px solid #ccc;
  }

  button {
    padding: 0.3rem 0.6rem;
    font-size: 1.1rem;
    cursor: pointer;
  }
</style>
