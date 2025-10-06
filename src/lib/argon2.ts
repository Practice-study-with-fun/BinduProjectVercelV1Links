// Password hashing utilities using better-auth's built-in functionality
// This avoids the client-side bundling issues with @node-rs/argon2

import { hash, verify } from "better-auth";

const opts = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(password: string) {
  const result = await hash(password, opts);
  return result;
}

export async function verifyPassword(data: { password: string; hash: string }) {
  const { password, hash } = data;

  const result = await verify(hash, password, opts);
  return result;
}
