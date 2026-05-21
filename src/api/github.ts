import type { GitHubApiError, RegistryModel } from '../types';

const DEFAULT_OWNER = 'Crispae';
const DEFAULT_TEMPLATE_REPO = 'PBPK-BoilerPlate-UI';

const owner = import.meta.env.VITE_GITHUB_OWNER || DEFAULT_OWNER;
const templateRepo = import.meta.env.VITE_TEMPLATE_REPO || DEFAULT_TEMPLATE_REPO;

const forksEndpoint = `https://api.github.com/repos/${owner}/${templateRepo}/forks?sort=newest&per_page=100`;

interface GitHubForkResponse {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  topics?: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  owner: {
    login: string;
  };
}

export const registrySource = {
  owner,
  templateRepo,
  forksEndpoint,
};

export async function fetchRegistryModels(): Promise<RegistryModel[]> {
  const response = await fetch(forksEndpoint, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  if (!response.ok) {
    throw await createGitHubError(response);
  }

  const forks = (await response.json()) as GitHubForkResponse[];

  return forks.map(mapForkToModel);
}

function mapForkToModel(fork: GitHubForkResponse): RegistryModel {
  const homepageUrl = normalizeHomepage(fork.homepage);

  return {
    id: fork.id,
    name: fork.name,
    fullName: fork.full_name,
    owner: fork.owner.login,
    description: fork.description || 'No model description has been provided yet.',
    repositoryUrl: fork.html_url,
    pagesUrl: `https://${fork.owner.login}.github.io/${fork.name}/`,
    homepageUrl,
    stars: fork.stargazers_count,
    forks: fork.forks_count,
    watchers: fork.watchers_count,
    language: fork.language || undefined,
    topics: fork.topics ?? [],
    createdAt: fork.created_at,
    updatedAt: fork.updated_at,
    pushedAt: fork.pushed_at,
    isArchived: fork.archived,
  };
}

async function createGitHubError(response: Response): Promise<GitHubApiError> {
  let message = `GitHub API request failed with status ${response.status}.`;

  try {
    const body = (await response.json()) as { message?: string };
    if (body.message) {
      message = body.message;
    }
  } catch {
    // GitHub sometimes returns plain text for edge errors.
  }

  const error = new Error(message) as GitHubApiError;
  error.status = response.status;

  const resetHeader = response.headers.get('X-RateLimit-Reset');
  if (resetHeader) {
    error.rateLimitReset = new Date(Number(resetHeader) * 1000);
  }

  return error;
}

function normalizeHomepage(homepage: string | null): string | undefined {
  if (!homepage) {
    return undefined;
  }

  if (homepage.startsWith('http://') || homepage.startsWith('https://')) {
    return homepage;
  }

  return `https://${homepage}`;
}
