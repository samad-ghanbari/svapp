// src/routes/+page.js
export async function load() {
  const response = await fetch('http://localhost/api/captcha'); 
  const captchaJson = await response.json();

  return  {captcha : captchaJson} ;
}
