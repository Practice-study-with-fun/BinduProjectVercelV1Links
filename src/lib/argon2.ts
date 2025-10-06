// Password hashing utilities using argon2

import * as argon2 from "argon2";

const opts = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(password: string) {
  const result = await argon2.hash(password, opts);
  return result;
}

export async function verifyPassword(data: { password: string; hash: string }) {
  const { password, hash } = data;

  const result = await argon2.verify(hash, password);
  return result;
}
