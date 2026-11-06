/**
 * Local password + recovery signature auth (no OAuth required).
 * Password stored as SHA-256 hash. Signature is a backup recovery key.
 */

const STORAGE_KEY = "rogueaxf_local_auth_v1";

export type LocalAuthRecord = {
  username: string;
  passwordHash: string;
  /** Recovery signature — backup password / seed style string */
  signature: string;
  createdAt: string;
  userId: string;
};

function bytesToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function hashPassword(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return bytesToHex(digest);
}

/** Generate a unique recovery signature (backup password) */
export function generateSignature(): string {
  const parts: string[] = [];
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const arr = new Uint8Array(24);
  crypto.getRandomValues(arr);
  for (let i = 0; i < 24; i++) {
    parts.push(alphabet[arr[i] % alphabet.length]);
    if ((i + 1) % 4 === 0 && i < 23) parts.push("-");
  }
  return `RXF-${parts.join("")}`;
}

export function getLocalAuth(): LocalAuthRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalAuthRecord;
  } catch {
    return null;
  }
}

export function clearLocalAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("rogueaxf_session");
}

export async function registerLocal(params: {
  username: string;
  password: string;
}): Promise<{ record: LocalAuthRecord; signature: string }> {
  const username = params.username.trim().toLowerCase().replace(/[^a-z0-9._]/g, "");
  if (username.length < 3) throw new Error("Username minimal 3 karakter");
  if (params.password.length < 6) throw new Error("Password minimal 6 karakter");

  const userId =
    typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const signature = generateSignature();
  const passwordHash = await hashPassword(params.password, userId);

  const record: LocalAuthRecord = {
    username,
    passwordHash,
    signature,
    createdAt: new Date().toISOString(),
    userId,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  localStorage.setItem("rogueaxf_session", "1");
  return { record, signature };
}

export async function loginLocal(password: string): Promise<LocalAuthRecord> {
  const record = getLocalAuth();
  if (!record) throw new Error("Belum ada akun. Buat password dulu.");

  const hash = await hashPassword(password, record.userId);
  if (hash !== record.passwordHash) {
    if (password.trim() !== record.signature) {
      throw new Error("Password atau signature salah");
    }
  }

  localStorage.setItem("rogueaxf_session", "1");
  return record;
}

export async function recoverWithSignature(signature: string): Promise<LocalAuthRecord> {
  const record = getLocalAuth();
  if (!record) throw new Error("Tidak ada akun tersimpan di perangkat ini");
  if (signature.trim() !== record.signature) {
    throw new Error("Signature tidak cocok");
  }
  localStorage.setItem("rogueaxf_session", "1");
  return record;
}

export function hasActiveSession(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("rogueaxf_session") === "1" && !!getLocalAuth();
}

export function recordToUser(record: LocalAuthRecord) {
  return {
    id: record.userId,
    username: record.username,
    fullName: record.username,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${record.username}`,
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
    bio: "Akun lokal RogueAXF",
  };
}
