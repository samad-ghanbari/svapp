// src/routes/+page.js
export async function load({ fetch }) {
  const response = await fetch('http://localhost/api/captcha'); 
  const captchaJson = await response.json();

  return { captchaJson };
}
