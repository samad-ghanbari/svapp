import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '$env/static/private';

export async function authenticate(username: string, password: string) {
	return true;
}

export async function createToken(
	username: string,
	ip: string,
	userAgent: string | null,
	xForwardedFor: string | null | undefined
) {
	const payload = {
		userId: 123,
		username: username,
		ip: ip,
		userAgent: userAgent,
		xForwardedFor: xForwardedFor
	};
	const token = jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1d' });
	return token;
}

export function checkNetworkPermissions(ip: string | null): boolean {
	const ret: boolean = true;
	return ret;
}
