const GITHUB_REPO = "HyperHrishi-HD/SPHD";
const LETTERS_PATH = "data/letters.json";

export interface Letter {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface GitHubFile {
  sha: string;
  content: string;
}

function getToken(): string | null {
  const token = process.env.GITHUB_TOKEN?.trim();
  return token || null;
}

function headers(): Record<string, string> {
  const token = getToken();
  if (!token) throw new Error("Missing GITHUB_TOKEN environment variable.");
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

export function isGitHubConfigured(): boolean {
  return getToken() !== null;
}

export async function readLettersFromGitHub(): Promise<{ letters: Letter[]; sha: string | null; configured: boolean }> {
  if (!isGitHubConfigured()) {
    return { letters: [], sha: null, configured: false };
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${LETTERS_PATH}`,
      { headers: headers(), next: { revalidate: 0 } }
    );

    if (res.status === 404) {
      return { letters: [], sha: null, configured: true };
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error("GitHub read error:", res.status, errText);
      return { letters: [], sha: null, configured: true };
    }

    const data: GitHubFile = await res.json();
    const decoded = Buffer.from(data.content, "base64").toString("utf-8");
    const parsed: unknown = JSON.parse(decoded);
    const letters = Array.isArray(parsed) ? parsed : (parsed && typeof parsed === "object" && "letters" in parsed ? (parsed as { letters: Letter[] }).letters : []);
    return { letters, sha: data.sha, configured: true };
  } catch (error) {
    console.error("Failed to read letters from GitHub:", error instanceof Error ? error.message : "unknown");
    return { letters: [], sha: null, configured: true };
  }
}

export async function writeLettersToGitHub(
  letters: Letter[],
  existingSha: string | null
): Promise<boolean> {
  if (!isGitHubConfigured()) {
    return false;
  }

  try {
    const content = JSON.stringify(letters, null, 2);
    const encoded = Buffer.from(content, "utf-8").toString("base64");

    const body: Record<string, unknown> = {
      message: `Update anniversary letters (${new Date().toISOString()})`,
      content: encoded,
      committer: {
        name: "SPHD Bot",
        email: "sphd@vercel.app",
      },
    };

    if (existingSha) {
      body.sha = existingSha;
    }

    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${LETTERS_PATH}`,
      {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("GitHub write error:", res.status, errText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to write letters to GitHub:", error instanceof Error ? error.message : "unknown");
    return false;
  }
}
