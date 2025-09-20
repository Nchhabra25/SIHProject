/* API client for progress tracking endpoints */

const DEFAULT_USER_API_URL = "http://localhost:8082"; // user-service
const USER_BASE_URL = (import.meta as any)?.env?.VITE_USER_API_URL || DEFAULT_USER_API_URL;

export type LearningPathResponse = {
  pathId: number;
  title: string;
  description: string;
  totalLessons: number;
  icon: string;
  color: string;
  bgColor: string;
  sortOrder: number;
  isActive: boolean;
};

export type UserProgressResponse = {
  progressId: number;
  pathId: number;
  pathTitle: string;
  lessonsCompleted: number;
  progressPercentage: number;
  status: string;
  updatedAt: string;
};

export type UserAchievementsResponse = {
  achievementId: number;
  userId: number;
  pointsEarned: number;
  certificatesEarned: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  lastUpdated: string;
};

export type ProgressStatsResponse = {
  totalPaths: number;
  completedPaths: number;
  totalCertificates: number;
  totalPoints: number;
  level: number;
  streak: number;
  completionPercentage: number;
};

export type UpdateProgressRequest = {
  pathId: number;
  incrementPercent: number;
};

async function request<T>(path: string, options: RequestInit, token?: string): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${USER_BASE_URL}${path}`, {
    headers,
    ...options,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const progressApi = {
  initializeUserProgress: (userId: number, token: string) =>
    request<string>(`/api/progress/initialize/${userId}`, { method: "POST" }, token),

  updateProgress: (userId: number, request: UpdateProgressRequest, token: string) =>
    request<UserProgressResponse>(`/api/progress/update/${userId}`, {
      method: "PUT",
      body: JSON.stringify(request),
    }, token),

  getAllLearningPaths: (token: string) =>
    request<LearningPathResponse[]>("/api/progress/paths", { method: "GET" }, token),

  getUserProgress: (userId: number, token: string) =>
    request<UserProgressResponse[]>(`/api/progress/user/${userId}`, { method: "GET" }, token),

  getUserAchievements: (userId: number, token: string) =>
    request<UserAchievementsResponse>(`/api/progress/achievements/${userId}`, { method: "GET" }, token),

  getProgressStats: (userId: number, token: string) =>
    request<ProgressStatsResponse>(`/api/progress/stats/${userId}`, { method: "GET" }, token),
};

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
