export type RegistryStatus = 'loading' | 'success' | 'error';

export interface RegistryModel {
  id: number;
  name: string;
  fullName: string;
  owner: string;
  description: string;
  repositoryUrl: string;
  pagesUrl: string;
  homepageUrl?: string;
  stars: number;
  forks: number;
  watchers: number;
  language?: string;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  isArchived: boolean;
}

export interface RegistryStats {
  totalModels: number;
  activeModels: number;
  archivedModels: number;
  recentlyUpdated: number;
}

export interface RegistryFilters {
  query: string;
  status: 'all' | 'active' | 'archived';
}

export interface GitHubApiError extends Error {
  status?: number;
  rateLimitReset?: Date;
}
