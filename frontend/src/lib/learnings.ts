// Utilities to fetch dynamic learning content based on user-provided topics

export type DynamicLesson = {
  id: string;
  title: string;
  summary: string;
  url: string;
  duration: string; // human readable, e.g., "12 min"
};

const WIKIPEDIA_SUMMARY = (topic: string) =>
  `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`;

function estimateDurationFromText(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(5, Math.min(25, Math.round(words / 180)));
  return `${minutes} min`;
}

export async function fetchDynamicLearnings(topics: string[]): Promise<DynamicLesson[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const results = await Promise.all(
      topics.map(async (topic) => {
        try {
          const res = await fetch(WIKIPEDIA_SUMMARY(topic), { signal: controller.signal });
          if (!res.ok) throw new Error(`Failed: ${res.status}`);
          const data = await res.json();
          const summary: string = data.extract || data.description || topic;
          return {
            id: (data.title || topic).toLowerCase().replace(/\s+/g, "-"),
            title: data.title || topic,
            summary,
            url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`,
            duration: estimateDurationFromText(summary),
          } as DynamicLesson;
        } catch {
          // Fallback for individual topic failure
          return {
            id: topic.toLowerCase().replace(/\s+/g, "-"),
            title: topic,
            summary: `Learn about ${topic} with curated open knowledge resources.`,
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`,
            duration: "10 min",
          } as DynamicLesson;
        }
      })
    );
    return results;
  } finally {
    clearTimeout(timeout);
  }
}

export function getDefaultTopics(): string[] {
  try {
    const saved = localStorage.getItem("ecoquest_topics");
    if (saved) {
      const arr = JSON.parse(saved);
      if (Array.isArray(arr) && arr.length > 0) return arr.slice(0, 6);
    }
  } catch {}
  return [
    "Climate change",
    "Renewable energy",
    "Waste management",
    "Biodiversity",
  ];
}

export function setUserTopics(topics: string[]) {
  try {
    localStorage.setItem("ecoquest_topics", JSON.stringify(topics.slice(0, 8)));
  } catch {}
}


