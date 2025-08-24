// src/routes/+page.js
import { HOST_URL, CAPTCHA_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import SHA256 from 'crypto-js/sha256';
import { redirect, fail } from '@sveltejs/kit';
import { authenticate, createToken } from '$lib/user';

export async function load() {
	const response = await fetch(HOST_URL + '/api/captcha');
	const captchaJson = await response.json();

	return { captcha: captchaJson };
}

export const actions = {
	default: async (event) => {
		// post action
		const formData = await event.request.formData();
		const formToken: string = (formData.get('token') as string | null) ?? '';
		const username: string = (formData.get('username') as string | null) ?? '';
		const password: string = (formData.get('password') as string | null) ?? '';
		const captcha: string = (formData.get('captcha') as string | null) ?? '';
		let authenticated: boolean = false;
		let errorMessage: string = '';
		let token: string = '';
		try {
			const decoded = jwt.verify(formToken, CAPTCHA_SECRET);
			const { hash } = decoded as { hash: string };
			const captchaHash = SHA256(captcha).toString();

			if (captchaHash !== hash) {
				// Captcha validation failed
				return fail(400, { error: 'عبارت امنیتی به درستی وارد نشده است.', username: username });
			}

			if (await authenticate(username, password)) {
				// check user-agent
				const userAgent = event.request.headers.get('user-agent');
				// x-forwarded-for
				let xForwardedFor: string | null | undefined = event.request.headers.get('x-forwarded-for');
				xForwardedFor = xForwardedFor?.split(',')[0]?.trim();
				const ip: string = event.getClientAddress();

				token = await createToken(username, ip, userAgent, xForwardedFor);
				authenticated = true;
			} else {
				authenticated = false;
				errorMessage = 'نام کاربری یا رمزعبور اشتباه می‌باشد.';
			}
		} catch (err) {
			authenticated = false;
			errorMessage = 'عبارت امنیتی منقضی شده است.';
		}

		if (authenticated) {
			// Set cookie with token
			event.cookies.set('token', token, {
				path: '/',
				httpOnly: true,
				secure: false,
				sameSite: 'strict',
				maxAge: 60 * 60 // 1 hour
			});
			throw redirect(303, '/');
		} else {
			return fail(400, { error: errorMessage, username: username });
		}
	}
};
