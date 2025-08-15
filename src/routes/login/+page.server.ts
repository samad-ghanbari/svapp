// src/routes/+page.js
import {HOST_URL} from '$env/static/private' 
import jwt from 'jsonwebtoken';
import {CAPTCHA_SECRET} from '$env/static/private'
import SHA256 from 'crypto-js/sha256';
import { redirect, fail } from '@sveltejs/kit';

export async function load() {
  const response = await fetch(HOST_URL+'/api/captcha'); 
  const captchaJson = await response.json();

  return {captcha: captchaJson };
}

export const actions = {
  default: async ({ request }) => {
    // post action
    const formData = await request.formData();
    const token : string = (formData.get("token") as string | null) ?? "";
    const username : string = (formData.get("username") as string |null) ?? "";
    const password : string = (formData.get("password") as string | null ) ?? "";
    const captcha : string  = (formData.get("captcha") as string | null ) ?? "";

    try
    {
      const decoded = jwt.verify(token, CAPTCHA_SECRET);
      const {hash} = decoded as { hash: string };
      const captchaHash = SHA256(captcha).toString();

      if(captchaHash !== hash)
      {
        // Captcha validation failed
        throw fail(400,{ error:'عبارت امنیتی به درستی وارد نشده است.', username: username });
      }

      const response = await fetch('/api/user/authenticate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username,
            password: password
          })
        }
      );

      const result = await response.json();
      console.log(result);
    }
    catch( err )
    {
    }
  }
};
