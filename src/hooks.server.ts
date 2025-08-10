import { redirect } from '@sveltejs/kit';
import type { Handle, HandleServerError } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  // Example: check if user exists in locals
  const user = event.locals.user;

  // Allow unauthenticated access to login page or static assets
  if (event.url.pathname === '/login' || event.url.pathname.startsWith('/static')) {
    return resolve(event);
  }

  if (!user) {
    // Redirect to login if user not present and not already on login page
    throw redirect(303, '/login');
  }

  // User is authenticated, continue
  return resolve(event);
};

// export const handleError: HandleServerError = ({ error, event }) => {
//   // Return custom error message (available in +error.svelte via `error.message`)
//   return{
//     message:  "NOT FOUND",
//     status: 404
//   }
// };