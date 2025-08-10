// src/routes/+page.js
export async function load({ fetch }) {
  const response = await fetch('/api/captcha'); 
  const captchaJson = await response.json();

  return {
    props: {
      captchaJson
    }
  };
}
