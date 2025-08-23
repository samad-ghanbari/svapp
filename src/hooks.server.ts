import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { TOKEN_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { checkNetworkPermissions } from '$lib/user';

export const handle: Handle = async ({ event, resolve }) => {
	// Allow unauthenticated access to static files and captcha API
	if (event.url.pathname.startsWith('/static') || event.url.pathname.startsWith('/api/captcha')) {
		return resolve(event);
	}

	console.log(event.getClientAddress());

	event.locals.user = null; // default to no user
	const token = event.cookies.get('token');

	if (token) {
		try {
			const user = jwt.verify(token, TOKEN_SECRET);

			const userAgent = event.request.headers.get('user-agent');
			const token_userAgent: string = (user as any).userAgent;

			let xForwardedFor: string | null | undefined = event.request.headers.get('x-forwarded-for');
			xForwardedFor = xForwardedFor?.split(',')[0]?.trim();
			const token_xForwardedFor: string = (user as any).xForwardedFor;

			const ip = event.getClientAddress();
			const token_ip: string = (user as any).ip;

			// check network
			const netPermit: boolean = checkNetworkPermissions(ip);

			if (
				netPermit == true &&
				ip === token_ip &&
				token_userAgent === userAgent &&
				token_xForwardedFor === xForwardedFor
			) {
				event.locals.user = user;
			} else {
				event.locals.user = null;
			}
		} catch (err) {
			event.cookies.delete('token', { path: '/' });
		}

		if (event.locals.user) {
			// Redirect authenticated users away from login page
			if (event.url.pathname === '/login') {
				throw redirect(303, '/');
			} else return resolve(event);
		} else {
			event.cookies.delete('token', { path: '/' });
			if (event.url.pathname === '/login') return resolve(event);
			else throw redirect(303, '/login');
		}
	} else {
		// No token present
		if (event.url.pathname === '/login') return resolve(event);
		else throw redirect(303, '/login');
	}
};
