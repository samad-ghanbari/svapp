// +page.server.ts
export const load = async () => {
	const val = { id: 1, name: 'home page' };
	return val;
	//return { id: 1, name: 'home page' };
};
