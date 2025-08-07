import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

type LocalsWithUser = RequestEvent['locals'] & { user?: any };

export const load = ({ locals }: { locals: LocalsWithUser }) => {
  if (!locals.user) {
    throw redirect(303, '/login');
  }
};
