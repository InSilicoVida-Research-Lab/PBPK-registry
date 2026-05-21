import type { RegistryModel } from '../types';
import { ModelCard } from './ModelCard';

interface ModelGridProps {
  models: RegistryModel[];
  hasFilters: boolean;
}

export function ModelGrid({ models, hasFilters }: ModelGridProps) {
  if (models.length === 0) {
    return (
      <section className="panel">
        <div className="panel-header">
          <h2 className="panel-title">{hasFilters ? 'No Matching Models' : 'No Deployed Models Found'}</h2>
        </div>
        <div className="panel-body-padded text-sm text-text-muted">
          {hasFilters
            ? 'Try changing the search terms or repository status filter.'
            : 'No forks were returned for the configured PBPK boilerplate repository. Fork the boilerplate, enable GitHub Pages, and the model will appear here after GitHub indexes it.'}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-primary">
          Deployed Models
        </h2>
        <span className="text-xs text-text-muted font-mono">
          {models.length.toLocaleString()} shown
        </span>
      </div>
      <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
        {models.map(model => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </section>
  );
}
