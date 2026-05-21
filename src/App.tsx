import { useEffect, useMemo, useState } from 'react';
import { fetchRegistryModels } from './api/github';
import { DeployInstructions } from './components/DeployInstructions';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ModelGrid } from './components/ModelGrid';
import { SearchControls } from './components/SearchControls';
import { StatusBar } from './components/StatusBar';
import { SummaryStats } from './components/SummaryStats';
import type { GitHubApiError, RegistryFilters, RegistryModel, RegistryStats, RegistryStatus } from './types';

function App() {
  const [models, setModels] = useState<RegistryModel[]>([]);
  const [status, setStatus] = useState<{ type: RegistryStatus; message: string; showSpinner?: boolean }>({
    type: 'loading',
    message: 'Loading deployed model repositories from GitHub...',
    showSpinner: true,
  });
  const [filters, setFilters] = useState<RegistryFilters>({
    query: '',
    status: 'all',
  });

  useEffect(() => {
    let isMounted = true;

    async function loadModels() {
      try {
        const registryModels = await fetchRegistryModels();

        if (!isMounted) {
          return;
        }

        setModels(registryModels);
        setStatus({
          type: 'success',
          message: registryModels.length === 0
            ? 'GitHub responded successfully, but no boilerplate forks were found.'
            : `Loaded ${registryModels.length.toLocaleString()} deployed model repositor${registryModels.length === 1 ? 'y' : 'ies'}.`,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setStatus({
          type: 'error',
          message: buildErrorMessage(error),
        });
      }
    }

    loadModels();

    return () => {
      isMounted = false;
    };
  }, []);

  const stats = useMemo(() => calculateStats(models), [models]);
  const filteredModels = useMemo(() => filterModels(models, filters), [models, filters]);
  const hasFilters = filters.query.trim().length > 0 || filters.status !== 'all';

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-[1400px] mx-auto px-5 py-8 w-full">
        <Header />
        <StatusBar message={status.message} type={status.type} showSpinner={status.showSpinner} />
        <SummaryStats stats={stats} />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5 items-start">
          <div className="min-w-0">
            <SearchControls filters={filters} onFiltersChange={setFilters} />
            <ModelGrid models={filteredModels} hasFilters={hasFilters} />
          </div>
          <DeployInstructions />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function filterModels(models: RegistryModel[], filters: RegistryFilters) {
  const query = filters.query.trim().toLowerCase();

  return models.filter(model => {
    const statusMatches =
      filters.status === 'all' ||
      (filters.status === 'active' && !model.isArchived) ||
      (filters.status === 'archived' && model.isArchived);

    if (!statusMatches) {
      return false;
    }

    if (!query) {
      return true;
    }

    const searchableText = [
      model.name,
      model.fullName,
      model.owner,
      model.description,
      model.language,
      ...model.topics,
    ].filter(Boolean).join(' ').toLowerCase();

    return searchableText.includes(query);
  });
}

function calculateStats(models: RegistryModel[]): RegistryStats {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;

  return {
    totalModels: models.length,
    activeModels: models.filter(model => !model.isArchived).length,
    archivedModels: models.filter(model => model.isArchived).length,
    recentlyUpdated: models.filter(model => new Date(model.pushedAt || model.updatedAt).getTime() >= thirtyDaysAgo).length,
  };
}

function buildErrorMessage(error: unknown) {
  const gitHubError = error as GitHubApiError;

  if (gitHubError.status === 403 && gitHubError.rateLimitReset) {
    return `GitHub API rate limit reached. Try again after ${gitHubError.rateLimitReset.toLocaleTimeString()}.`;
  }

  if (error instanceof Error) {
    return `Failed to load registry data: ${error.message}`;
  }

  return 'Failed to load registry data due to an unknown error.';
}

export default App;
