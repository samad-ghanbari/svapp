import { getCaptchaJson } from "$lib/captcha";

export async function GET() {
  const captcha = await getCaptchaJson();
 
  return new Response(JSON.stringify(captcha), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}