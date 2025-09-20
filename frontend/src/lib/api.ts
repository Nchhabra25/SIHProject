/* Simple API client for auth endpoints */

const DEFAULT_API_URL = "http://localhost:8081"; // auth-service
const BASE_URL = (import.meta as any)?.env?.VITE_API_URL || DEFAULT_API_URL;
const DEFAULT_USER_API_URL = "http://localhost:8082"; // user-service
const USER_BASE_URL = (import.meta as any)?.env?.VITE_USER_API_URL || DEFAULT_USER_API_URL;

export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string; // STUDENT | TEACHER | AMBASSADOR
};

export type LoginRequest = {
  email: string;
  password: string;
};

async function request<T>(path: string, options: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed: ${res.status}`);
  }
  // auth-service returns token as plain string by default for /auth endpoints
  const text = await res.text();
  return text as unknown as T;
}

export const api = {
  signup: (payload: SignUpRequest) =>
    request<string>("/auth/signup", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload: LoginRequest) =>
    request<string>("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  // User-service admin APIs
  listPending: async (token: string) => {
    const res = await fetch(`${USER_BASE_URL}/users/pending`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  approveUser: async (token: string, id: number) => {
    const res = await fetch(`${USER_BASE_URL}/users/${id}/approve`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  rejectUser: async (token: string, id: number) => {
    const res = await fetch(`${USER_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return true;
  },
};

export async function fetchUserProfile(userServiceUrl: string, email: string) {
  const res = await fetch(`${userServiceUrl}/users?email=${encodeURIComponent(email)}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function decodeJwtPayload<T = any>(token: string): T | null {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    let payloadPart = parts[1];
    // Convert base64url to base64
    payloadPart = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
    // Pad base64 string if necessary
    const pad = payloadPart.length % 4;
    if (pad) {
      payloadPart += "=".repeat(4 - pad);
    }
    // Decode safely (unicode)
    const jsonStr = decodeURIComponent(
      Array.prototype.map
        .call(atob(payloadPart), (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonStr);
  } catch (err) {
    return null;
  }
}
