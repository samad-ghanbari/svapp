import { getCaptchaJson } from "$lib/captcha";

export async function GET() {
  const captcha = await getCaptchaJson();

  console.log('Captcha generated');
  
  return new Response(JSON.stringify(captcha), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}