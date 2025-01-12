import { SignJWT, jwtVerify } from "jose";
import type  { RequestUser } from "../middlewares";

export function generateKey(secret: string) {
  return new TextEncoder().encode(secret);
}

export interface SignJwt {
  user: RequestUser["user"];
  secret: string;
  expiresAt: string
}

export async function signJwt({ user, secret, expiresAt }: SignJwt) {
  const key = generateKey(secret);
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(key);
}

export interface VerifyJwt {
  token?: string;
  secret: string;
}

export async function verifyJwt({ token = "", secret }: VerifyJwt) {
  try {
    const key = generateKey(secret);
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return payload as SignJwt["user"];
  } catch (error) {
    console.error("Failed to verify session", error);
    return null;
  }
}
