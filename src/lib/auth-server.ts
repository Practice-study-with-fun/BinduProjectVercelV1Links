// Server-side only auth utilities
// This file should only be imported in server components or API routes

import { auth } from "./auth";

export { auth };

// Re-export only the server-side functions
export const getServerSession = auth.api.getSession;
export const getServerUser = auth.api.getUser;
