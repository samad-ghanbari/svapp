// src/routes/+page.js
import {HOST_URL, CAPTCHA_SECRET} from '$env/static/private' 
import jwt from 'jsonwebtoken';
import SHA256 from 'crypto-js/sha256';
import { redirect, fail } from '@sveltejs/kit';
import {authenticate, createToken} from '$lib/user'

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
        return fail(400,{ error:'عبارت امنیتی به درستی وارد نشده است.', username: username });
      }

      if(await authenticate(username, password))
      {
        const token = createToken(username);
        throw redirect(300,"/");
      }
      else
      {
        return fail(400,{ error:'نام کاربری یا رمزعبور اشتباه می‌باشد.', username: username });
      }

    }
    catch( err )
    {
      return fail(400,{ error:'عبارت امنیتی منقضی شده است.', username: '' });
    }
  }
};
