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

function getToken(): string {
  const token = process.env.GITHUB_TOKEN?.trim();
  if (!token) throw new Error("Missing GITHUB_TOKEN environment variable.");
  return token;
}

function headers(): Record<string, string> {
  return {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  };
}

export async function readLettersFromGitHub(): Promise<{ letters: Letter[]; sha: string | null }> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${LETTERS_PATH}`,
      { headers: headers(), next: { revalidate: 0 } }
    );

    if (res.status === 404) {
      return { letters: [], sha: null };
    }

    if (!res.ok) {
      const errText = await res.text();
      console.error("GitHub read error:", res.status, errText);
      return { letters: [], sha: null };
    }

    const data: GitHubFile = await res.json();
    const decoded = Buffer.from(data.content, "base64").toString("utf-8");
    const parsed: unknown = JSON.parse(decoded);
    const letters = Array.isArray(parsed) ? parsed : (parsed && typeof parsed === "object" && "letters" in parsed ? (parsed as { letters: Letter[] }).letters : []);
    return { letters, sha: data.sha };
  } catch (error) {
    console.error("Failed to read letters from GitHub:", error instanceof Error ? error.message : "unknown");
    return { letters: [], sha: null };
  }
}

export async function writeLettersToGitHub(
  letters: Letter[],
  existingSha: string | null
): Promise<boolean> {
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
