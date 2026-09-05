// Signs and verifies member login sessions using an HMAC signature, so a
// visitor can't fake a "verified member" cookie without knowing SESSION_SECRET.
// Uses the Web Crypto API (not Node's "crypto" module) so this also works in
// Next.js middleware, which runs on the Edge runtime.

export const SESSION_COOKIE_NAME = "wls_session";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function base64UrlEncode(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function importKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(payload, secret) {
  const payloadBytes = encoder.encode(JSON.stringify(payload));
  const payloadB64 = base64UrlEncode(payloadBytes);

  const key = await importKey(secret);
  const signatureBytes = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64))
  );

  return `${payloadB64}.${base64UrlEncode(signatureBytes)}`;
}

export async function verifySessionToken(token, secret) {
  if (!token || !secret) return null;

  const [payloadB64, signatureB64] = token.split(".");
  if (!payloadB64 || !signatureB64) return null;

  const key = await importKey(secret);
  const expectedSignature = new Uint8Array(
    await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64))
  );
  const providedSignature = base64UrlDecode(signatureB64);

  if (expectedSignature.length !== providedSignature.length) return null;

  let mismatch = 0;
  for (let i = 0; i < expectedSignature.length; i++) {
    mismatch |= expectedSignature[i] ^ providedSignature[i];
  }
  if (mismatch !== 0) return null;

  try {
    const payload = JSON.parse(decoder.decode(base64UrlDecode(payloadB64)));
    if (payload.expiresAt && Date.now() > payload.expiresAt) return null;
    return payload;
  } catch {
    return null;
  }
}
