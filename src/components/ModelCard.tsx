import type { RegistryModel } from '../types';

interface ModelCardProps {
  model: RegistryModel;
}

export function ModelCard({ model }: ModelCardProps) {
  const updatedAt = formatDate(model.pushedAt || model.updatedAt);
  const primarySiteUrl = model.homepageUrl || model.pagesUrl;

  return (
    <article className="panel h-auto">
      <div className="panel-header flex items-start justify-between gap-3">
        <div>
          <h3 className="panel-title">{model.name}</h3>
          <p className="text-xs opacity-85 mt-1 font-mono">{model.fullName}</p>
        </div>
        <span className={`text-[11px] px-2 py-1 border ${
          model.isArchived ? 'border-warning bg-warning-bg text-warning' : 'border-success bg-success-bg text-success'
        }`}>
          {model.isArchived ? 'Archived' : 'Active'}
        </span>
      </div>

      <div className="panel-body-padded">
        <p className="text-sm text-text-dark mb-4 min-h-[42px]">
          {model.description}
        </p>

        {model.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {model.topics.slice(0, 5).map(topic => (
              <span key={topic} className="text-[11px] px-2 py-1 bg-bg-light border border-border text-text-muted font-mono">
                {topic}
              </span>
            ))}
          </div>
        )}

        <dl className="grid grid-cols-2 gap-3 text-xs mb-4">
          <div>
            <dt className="text-text-muted uppercase tracking-wide">Owner</dt>
            <dd className="font-mono text-text-dark">{model.owner}</dd>
          </div>
          <div>
            <dt className="text-text-muted uppercase tracking-wide">Updated</dt>
            <dd className="font-mono text-text-dark">{updatedAt}</dd>
          </div>
          <div>
            <dt className="text-text-muted uppercase tracking-wide">Language</dt>
            <dd className="font-mono text-text-dark">{model.language || 'Unknown'}</dd>
          </div>
          <div>
            <dt className="text-text-muted uppercase tracking-wide">Stars / forks</dt>
            <dd className="font-mono text-text-dark">{model.stars} / {model.forks}</dd>
          </div>
        </dl>
      </div>

      <div className="panel-footer flex gap-3 max-lg:flex-col">
        <a className="btn btn-primary flex-1" href={primarySiteUrl} target="_blank" rel="noreferrer">
          Open Model
        </a>
        <a className="btn btn-secondary flex-1" href={model.repositoryUrl} target="_blank" rel="noreferrer">
          Repository
        </a>
      </div>
    </article>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value));
}
