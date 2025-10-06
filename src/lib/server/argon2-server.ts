// ./src/lib/server/argon2-server.ts
import * as argon2 from '@node-rs/argon2';

export async function hashPassword(password: string) {
  return await argon2.hash(password);
}