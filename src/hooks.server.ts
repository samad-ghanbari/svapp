import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
import { TOKEN_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	// Allow unauthenticated access to static files and captcha API
	if (event.url.pathname.startsWith('/static') || event.url.pathname.startsWith('/api/captcha')) {
		return resolve(event);
	}

	event.locals.user = null; // default to no user
	console.log('read token');
	const token = event.cookies.get('token');

	if (token) {
		try {
			const user = jwt.verify(token, TOKEN_SECRET);
			event.locals.user = user;

			// Redirect authenticated users away from login page
			if (event.url.pathname === '/login') {
				console.log('redirect');
				throw redirect(303, '/');
			} else return resolve(event);
		} catch (err) {
			//event.cookies.delete('token', { path: '/' });
			// Invalid token, redirect to login
			console.log('catch error on hook');
			if (event.url.pathname === '/login') {
				return resolve(event);
			} else throw redirect(303, '/login');
		}
	} else {
		// No token present
		if (event.url.pathname === '/login') return resolve(event);
		else throw redirect(303, '/login');
	}
};
