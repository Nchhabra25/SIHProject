// Simple local approvals store for demo purposes

export type ApprovalRole = "TEACHER" | "AMBASSADOR";

type PendingRecord = { email: string; role: ApprovalRole; requestedAt: string };

const PENDING_KEY = "ecoquest_pending_approvals";
const APPROVED_KEY = "ecoquest_approved_users";

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function addPendingApproval(email: string, role: ApprovalRole) {
  const list = load<PendingRecord[]>(PENDING_KEY, []);
  if (!list.find((r) => r.email === email)) {
    list.push({ email, role, requestedAt: new Date().toISOString() });
    save(PENDING_KEY, list);
  }
}

export function getPendingApprovals(): PendingRecord[] {
  return load<PendingRecord[]>(PENDING_KEY, []);
}

export function approveUser(email: string) {
  const list = load<PendingRecord[]>(PENDING_KEY, []);
  const remaining = list.filter((r) => r.email !== email);
  save(PENDING_KEY, remaining);
  const approved = load<string[]>(APPROVED_KEY, []);
  if (!approved.includes(email)) {
    approved.push(email);
    save(APPROVED_KEY, approved);
  }
}

export function rejectUser(email: string) {
  const list = load<PendingRecord[]>(PENDING_KEY, []);
  const remaining = list.filter((r) => r.email !== email);
  save(PENDING_KEY, remaining);
}

export function isUserApproved(email: string): boolean {
  const approved = load<string[]>(APPROVED_KEY, []);
  return approved.includes(email);
}


